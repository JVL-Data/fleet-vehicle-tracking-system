# Google Apps Script Automation

## Table of Contents

- [Overview](#overview)
- [Core Capabilities](#core-capabilities)
- [Data Sources](#data-sources)
- [Automation Schedule](#automation-schedule)
- [Email Delivery](#email-delivery)
- [Permissions & Authorization](#permissions--authorization)
- [Error Handling & Logging](#error-handling--logging)
- [Design Considerations](#design-considerations)
- [Maintenance Notes](#maintenance-notes)

---

## Overview

This document describes the Google Apps Script used to automate validation, reporting, and distribution for the **Fleet Vehicle Tracking System**.

The script is designed to support operational reporting workflows by reducing manual effort and enforcing consistent data standards.

---

## Core Capabilities

- Dynamic dropdown validation
- Make & Model enforcement
- Region-based data filtering
- Automated Excel (.xlsx) report generation
- Scheduled email distribution

---

## Data Sources

### FLEET_MASTER
Primary operational dataset containing all fleet records used for reporting.

### ENTERPRISE_EXPORT
Export used for **Enterprise #** lookup using **VIN #** from `FLEET_MASTER' tab.

### SETTINGS
Configuration table used for:
- Region definitions
- Report recipients
- Make & Model mappings

All business configuration is driven from `SETTINGS`; no values are hard-coded.

---

## Automation Schedule

- Executed via time-driven trigger
- Runs daily between **4:00–5:00 AM MST**
- One report is generated per configured region

---

## Email Delivery

- One email sent per region
- Attachments are delivered as Excel (.xlsx) files
- Emails are sent from the script owner’s Gmail account
- Regions with no applicable data are skipped

---

## Permissions & Authorization

The script requires access to:
- Google Sheets
- Google Drive (temporary file creation and deletion)
- Gmail (email delivery)

Unverified app warnings are expected for internal tooling and portfolio use cases.

---

## Error Handling & Logging

- Required column headers are validated prior to execution
- Empty datasets are skipped
- Execution details are recorded using `Logger.log()` for audit and troubleshooting purposes

---

## Design Considerations

- Configuration over hard-coded values
- Clear separation of data, logic, and output
- Daily reporting behavior
- Scalable to additional regions with minor code changes

---

## Maintenance Notes

- Column header changes may require script updates
- New regions require updates to the `SETTINGS` tab only
- Make / Model changes do not require script modifications unless exceeding allowed additions
