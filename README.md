# Fleet Vehicle Tracking System Project

## Project Overview
This project came out of a very real need inside the company. Our national fleet information — things like vehicle type, mileage, lease dates, and who was currently driving what — was all kept in several large Google Sheets that had been added to over the years. It technically worked, but it was not easy for anyone to get quick answers from it, especially when leadership needed a clear view of the fleet or when a vehicle sat unused longer than expected.

To make things easier for everyone, I rebuilt the sheet into a cleaner, more structured format that the fleet manager could update without changing the way they worked day to day. From there, I connected the data into SQL and Looker so the information could update automatically for reporting. That allowed us to build live dashboards showing fleet counts, usage trends, lease timelines, and driver assignments — all without anyone having to manually pull reports.

The end result was a system that gave the company a clearer picture of its fleet at any moment, reduced downtime caused by outdated information, and made it much simpler for both the fleet team and leadership to stay aligned.

---

## Tech Stack Showcased
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-00758F?style=for-the-badge&logo=postgresql&logoColor=white)
![Looker](https://img.shields.io/badge/Looker-00A0C6?style=for-the-badge&logo=looker&logoColor=white)
![Excel](https://img.shields.io/badge/Excel-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## Workflow

1. **Data Cleanup & Standardization**  
   Rebuilt the fleet manager’s spreadsheet from scratch with structured fields, dropdowns, validation rules, and consistent formats for VINs, dates, mileage, and driver information.

2. **Automated Data Feed**  
   Configured the cleaned Google Sheet to feed directly into SQL and Looker using Google Apps Script, eliminating manual report updates and ensuring executives always had current fleet data.

3. **BI Dashboards for Leadership**  
   Designed dashboards showing:  
   - Active vs. inactive vehicle counts  
   - Vehicle age & lease term tracking  
   - Mileage trends  
   - Technician assignments  
   - Fuel card status  
   - Underutilized fleet report  

4. **Accountability & Operational Impact**  
   The system reduced downtime where vehicles sat unused due to outdated records or maintenance issues and increased visibility into fleet health. Leadership could quickly identify unassigned vehicles, optimize utilization, and verify fleet manager updates to enhance accountability.

---

## Key Features

- Clean, structured Fleet Master File with validation rules  
- Automatic data bridge into SQL and Looker  
- Interactive Looker dashboards (vehicle counts, usage, assignments, lease tracking)  
- Operational alerts for outdated or missing entries  
- Improved reporting accuracy with near real-time updates  

---

## Value Delivered

- Reduced vehicle downtime caused by inaccurate or outdated tracking  
- Enabled executives to make faster, data-driven decisions  
- Improved accountability for fleet management  
- Eliminated hours of manual reporting each month  
- Created a scalable, maintainable fleet tracking model  

---

## Google Sheet & Tab Explanations

A redacted version of the Fleet Vehicle Tracking System Google Sheet is available here (View Only):  
🔗 [Fleet Vehicle Tracking System Sheet](https://docs.google.com/spreadsheets/d/1s2uDXDJCzIm7hVbWeURKjn20iA9xUMuQIJM_ajIaXO4/edit?usp=sharing)

The sheet contains the following tabs:

| Tab Name       | Purpose |
|----------------|---------|
| `INFO`       | Links back to this GitHub repository for detailed documentation. |
| `FLEET_MASTER` | The master dataset containing all fleet records. This tab is filtered automatically for each region when generating daily emails. Appscript handles **Model** dropdowns based on the **Make** chosen and the corresponding section from the `SETTINGS` tab. |
| `ENTERPRISE_EXPORT`   | Updated as vehicles are added to Enterprise system and populates **Enterprise #** in `FLEET_MASTER` tab. |
| `SETTINGS`   | Stores dropdown values, regional contacts, and configuration for daily automation. Changes here affect report generation. |

---

## Apps Script Automation

The Fleet Vehicle Tracking System includes a Google Apps Script that automates **daily regional report emails**. 

This script:

1. Reads the `SETTINGS` tab for regional contacts.
2. Filters the `FLEET_MASTER` tab for each region, including rows where:
   - **Primary Region** = REGION, OR
   - **Transfer Region** = REGION
3. Generates a temporary report file for the region.
4. Sends a formatted email to the regional contact using Gmail, attaching the filtered report.
5. Deletes the temporary file after sending to keep Drive clean.

### Script Details
- The script runs automatically every day between **4:00 and 5:00 AM MST**.
- Temporary report files are generated as xlsx files.
- The automation regional contacts are configurable by updating the `SETTINGS` tab.

### Access the Script
The full Apps Script code is available here:
[`/appscript/code.gs`](./appscript/code.gs)

---

## Documentation

Additional technical and operational documentation for this project is available below:

- [Project Governance](docs/governance.md)
- [Service Level Agreements (SLAs)](docs/slas.md)
- [Data Dictionary](docs/data_dictionary.md)
- [Apps Script Automation](docs/appscript.md)

---

## Screenshots

<!--
**Data Flow: Google Sheets → SQL → Looker Dashboards**  
![Workflow Diagram](assets/fleet_workflow.png)

**Cleaned & Standardized Fleet Master File**  
![Fleet Master Example](assets/fleet_master_example.png)

**Fleet Dashboard Overview (Mockup)**  
![Dashboard Mockup](assets/fleet_dashboard_mockup.png)
-->
