# Project Governance

## Table of Contents

- [Project Overview](#project-overview)
- [Data Ownership](#data-ownership)
- [Data Quality Standards](#data-quality-standards)
- [Change Management](#change-management)
- [Access & Security](#access--security)

## Project Overview

This document defines the data governance principles for the **Fleet Vehicle Tracking System**. 
The goal is to ensure data accuracy, consistency, accountability, and responsible access across operational reporting workflows.


---

## Data Ownership

- **Business Ownership:** Fleet operations leadership owns the business meaning of all fleet data
- **Technical Ownership:** Analytics / BI owns data integrity, validation rules, and reporting automation
- **Source Accountability:** Changes to source system values must be communicated prior to structural changes

---

## Data Quality Standards

The following standards are enforced:

- Required fields must not be blank where validation is applied
- Dropdown-controlled columns must align with approved reference values
- Region assignments must match configured region lists
- Make and Model values must follow approved mappings

Invalid or inconsistent data is prevented at point of entry where possible.

---

## Change Management

All structural changes require:

- Review of downstream reporting impact
- Validation of Apps Script logic
- Update to the data dictionary if fields are added or modified

Ad-hoc changes to column headers or control tables are discouraged.

---

## Access & Security

- Edit access is limited to operational staff and BI administrators
- Email recipients are controlled via the `SETTINGS` tab
- Reports are distributed via Gmail attachments rather than shared Drive access

Sensitive data should not be added without appropriate approval.
