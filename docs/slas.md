# Service Level Agreements (SLAs)

## Table of Contents

- [Scope & Purpose](#scope--purpose)
- [Data Availability](#data-availability)
- [Report Delivery](#report-delivery)
- [Data Accuracy](#data-accuracy)
- [Incident Response](#incident-response)
- [Maintenance Windows](#maintenance-windows)

## Scope & Purpose

This document defines the service level expectations for the **Fleet Vehicle Tracking System**.  
It outlines delivery timing, data availability, incident response, and operational maintenance standards.

---

## Data Availability

- Fleet data is available on demand within the Google Sheet
- Reports reflect the latest saved data at execution time
- Near real-time data availability is not guaranteed

---

## Report Delivery

- **Frequency:** Daily
- **Delivery Window:** Between 4:00–5:00 AM MST
- **Format:** Excel (.xlsx)
- **Distribution:** Region-specific email delivery

If a scheduled delivery fails, the report will be delivered on the next successful run (next day).

---

## Data Accuracy

- Dropdown validations enforce allowed values
- Accuracy depends on correctness of source-entered data
- No automated reconciliation with upstream systems is performed

---

## Incident Response

| Severity | Description | Response Time |
|--------|------------|---------------|
| High | Automation failure or missing reports | Same business day |
| Medium | Incorrect data filtering or mapping | Next business day |
| Low | Cosmetic or formatting issues | As scheduled |

---

## Maintenance Windows

- Scripts may be updated outside of business hours
- Temporary reporting interruptions may occur during maintenance
- Stakeholders will be notified if extended downtime is expected
