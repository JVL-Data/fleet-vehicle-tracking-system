# Data Dictionary

## Table of Contents

- [Overview](#overview)
- [FLEET_MASTER](#fleet_master)
- [ENTERPRISE_EXPORT](#enterprise_export)
- [SETTINGS](#settings)
- [General Notes](#general-notes)

## Overview

This document provides field-level definitions for datasets used in the **Fleet Vehicle Tracking System**.  
It is intended to support consistent understanding across operational, analytics, and technical teams.

---

## FLEET_MASTER

| Column Name | Description |
|------------|-------------|
| **Primary Region** | Assigned owning region |
| **Transfer Region** | Temporary region |
| **Status** | Current operational status |
| **Current Truck #** | Unique identifier for each fleet vehicle |
| **Enterprise #** | Unique identifier for each fleet vehicle assigned by Enterprise system and pulled from the 'ENTERPRISE_EXPORT' tab using **VIN #** lookup|
| **VIN #** | Vehicle Identification Number |
| **Plate** | Vehicle plate |
| **Year** | Vehicle manufactured year |
| **Make** | Vehicle manufacturer |
| **Model** | Vehicle model associated with Make |
| **Wrapped Color** | Current advertising wrap on vehicle |
| **Prior Maintenance Mileage** | Mileage on date of prior maintenance; used to trigger maintenance alerts if driven over allowed miles based on **Current Mileage** since **Prior Maintenance Mileage** |
| **Prior Maintenance Date** | Date of prior maintenance; used to trigger maintenance alerts if more than the allowed duration of months have passed since **Prior Maintenance Date** |
| **Current Mileage** | Current vehicle mileage from GPS system |
| **Current Mileage Date** | Current mileage date from GPS system's last connection |
| **Lease Start** | Date of vehicle lease start or blank if vehicle is ownedowned |
| **Lease End** | Date of vehicle lease end or blank if vehicle is ownedowned |
| **Fuel Card**  | Driver fuel card number |
| **Toll #** | Driver toll card/account number |
| **GPS S/N #** | GPS identifier assigned to vehicle |
| **Driver** | Driver assigned to vehicle |
| **Fleet Comments** | Operational comments or annotations used by fleet team |

---

## ENTERPRISE_EXPORT

| Field | Description |
|------|-------------|
| **VIN #** | Vehicle Identification Number for **Enterprise #** lookup from `FLEET_MASTER` tab |
| **Enterprise #** | Unique identifier for each fleet vehicle assigned by Enterprise system |

---

## SETTINGS

| Field | Description |
|------|-------------|
| **REGION** | Allowed dropdown values for **Primary Region** and **Transfer Region** in `FLEET_MASTER` tab |
| **CONTACT NAME** | Primary reporting contact for each region; used to store contact information for daily email reports |
| **CONTACT EMAIL** | Email recipient for region reports; used to store contact information for daily email reports |
| **STATUS** | Allowed dropdown values for **Status** in `FLEET_MASTER` tab |
| **MAKE** Headers (H1–Z1) | Allowed dropdown values for **Make** in `FLEET_MASTER` tab |
| **MODEL** Values (H2:Z25) | Allowed dropdown values for **Model** in `FLEET_MASTER` tab |

---

## General Notes

- Column names are case-sensitive
- Changes to column headers may require script updates
- New fields should be documented prior to use
