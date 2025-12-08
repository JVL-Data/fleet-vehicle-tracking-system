/**
 * Fleet Vehicle Tracking System
 * --------------------------------
 * Formats dropdowns in FLEET_MASTER tab based on SETTINGS tab.
 * Generates region-specific fleet reports and emails them daily.
 *
 * Data Sources:
 * - SETTINGS tab: regional contacts and configuration
 * - FLEET_MASTER tab: master fleet dataset
 *
 * Email Schedule:
 * - Runs daily between 4:00 and 5:00 AM MST via time-driven trigger
 *
 * Output:
 * - Region-filtered xlsx reports emailed via Gmail
 * - Temporary files are deleted after sending
 *
 * Author: Joshua Vanlaar
 */

function onOpen() {
  initDropdowns();
}

function initDropdowns() {
  const ss = SpreadsheetApp.getActive();
  const master = ss.getSheetByName("FLEET_MASTER");
  const settings = ss.getSheetByName("SETTINGS");
  const lastRow = master.getMaxRows();

  // Regions (A/B)
  applyValidation(master, 2, 1, lastRow - 1, getColumnValues(settings, 1));
  applyValidation(master, 2, 2, lastRow - 1, getColumnValues(settings, 1));

  // Status (C)
  applyValidation(master, 2, 3, lastRow - 1, getColumnValues(settings, 3));

  // Makes (I)
  const makes = settings.getRange("F1:Z1").getValues()[0].filter(String);
  if (makes.length) applyValidation(master, 2, 9, lastRow - 1, makes);

  // Models (J) initial
  setInitialModelDropdowns(master, settings, lastRow);
}

// --- Helper: set initial model dropdowns based on Make or all models ---
function setInitialModelDropdowns(master, settings, lastRow) {
  const makeValues = master.getRange(2, 9, lastRow - 1).getValues();
  const modelMap = buildMakeModelMap(settings);
  const allModels = [...new Set(Object.values(modelMap).flat())];

  const rules = makeValues.map(r => {
    const list = r[0] ? modelMap[r[0]] || [] : allModels;
    return [SpreadsheetApp.newDataValidation()
      .requireValueInList(list, true)
      .setAllowInvalid(false)
      .build()];
  });

  master.getRange(2, 10, lastRow - 1).setDataValidations(rules);
}

// --- onEdit handler for Make + Model ---
function onEdit(e) {
  const sh = e.range.getSheet();
  if (sh.getName() !== "FLEET_MASTER") return;

  const row = e.range.getRow();
  const col = e.range.getColumn();

  if (col === 9 && row >= 2) updateModelDropdown(sh, row, e.range.getValue());
}

// --- Update Model dropdown for given row ---
function updateModelDropdown(sheet, row, make) {
  const ss = SpreadsheetApp.getActive();
  const settings = ss.getSheetByName("SETTINGS");
  const modelCell = sheet.getRange(row, 10);
  modelCell.clearContent();

  const modelMap = buildMakeModelMap(settings);
  const allModels = [...new Set(Object.values(modelMap).flat())];
  const list = make ? modelMap[make] || [] : allModels;

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(list, true)
    .setAllowInvalid(false)
    .build();

  modelCell.setDataValidation(rule);
}

// --- Helper: read non-empty values from a column ---
function getColumnValues(sheet, col) {
  return sheet.getRange(2, col, sheet.getLastRow() - 1)
    .getValues().flat().filter(String);
}

// --- Helper: apply dropdown validation to range ---
function applyValidation(sheet, startRow, startCol, numRows, values) {
  if (!values.length) return;
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(values, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(startRow, startCol, numRows).setDataValidation(rule);
}

// --- Build dictionary of Make + Models ---
function buildMakeModelMap(settings) {
  const headers = settings.getRange("F1:Z1").getValues()[0];
  const cols = settings.getRange(2, 6, settings.getLastRow() - 1, 20).getValues();

  const map = {};
  headers.forEach((make, i) => {
    if (make) map[make] = cols.map(r => r[i]).filter(String);
  });
  return map;
}

// --- Send Daily Regional Report Emails ---
function sendDailyRegionalReports() {
  const ss = SpreadsheetApp.getActive();
  const settings = ss.getSheetByName("SETTINGS");
  const fleet = ss.getSheetByName("FLEET_MASTER");

  // Read regional email list
  const data = settings.getRange("A2:C").getValues().filter(r => r[0]);

  data.forEach(row => {
    const region = row[0].toString().trim();
    const contactName = row[1];
    const contactEmail = row[2];

    // Get FLEET_MASTER data
    const fleetData = fleet.getDataRange().getValues();
    const header = fleetData[0];

    // Index columns
    const primaryIndex = header.indexOf("Primary Region");
    const transferIndex = header.indexOf("Transfer Region");

    // Filter regional data
    const filteredRows = fleetData.filter((r, i) => {
      if (i === 0) return true;
      return (
        r[primaryIndex] === region ||
        r[transferIndex] === region
      );
    });

    // Create temporary report
    const tempSheet = SpreadsheetApp.create(`Fleet Report - ${region}`);
    const tempRange = tempSheet.getActiveSheet().getRange(1, 1, filteredRows.length, filteredRows[0].length);
    tempRange.setValues(filteredRows);

    // Export as xlsx 
    const url =
      `https://docs.google.com/spreadsheets/d/${tempSheet.getId()}/export?format=xlsx`;

    const token = ScriptApp.getOAuthToken();

    const response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const xlsxBlob = response
      .getBlob()
      .setName(`Fleet_Report_${region}.xlsx`);

    const pdfBlob = response.getBlob().setName(`Fleet_Report_${region}.pdf`);

    // Delete the temporary file
    DriveApp.getFileById(tempSheet.getId()).setTrashed(true);

    // Prepare email
    const message = 
`Good Morning,

Please see the attached Fleet records for Report Inc - ${region}.

If you need to make any changes please notify ${contactName} - ${contactEmail}.

Best,
Report Inc. Data Team`;

    // Send email
    MailApp.sendEmail({
      to: contactEmail,
      subject: `Fleet Report – ${region}`,
      body: message,
      attachments: [xlsxBlob]
    });
  });
}
