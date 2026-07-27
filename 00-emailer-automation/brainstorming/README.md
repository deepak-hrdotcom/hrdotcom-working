# Webcast Emailer Automation - Brainstorming Session

This folder contains the architecture, scripts, and design notes for the automated webcast promotional email system.

## 🎯 Project Goals
- **Automate** the creation of premium HR.com promotional emailers.
- **Source of Truth**: A Google Spreadsheet populated with webcast data.
- **Dynamic Content**: AI-driven "Rewriting" of webcast descriptions and objectives for better email engagement.
- **Consistency**: Fixed footer and branding across all webcasts.

## 🛠️ Components

### 1. Data Extractor (`webcast_extractor.js`)
A browser script used to quickly pull "clean" data from any HR.com webcast landing page into a format ready for Google Sheets.

### 2. The Data Input (Google Sheet Schema)
The spreadsheet should follow this column structure:
- **Webcast Title**
- **Date & Time**
- **Host Name**
- **Host Title**
- **Host Image URL**
- **Sponsor Name**
- **Objectives** (Pipe-separated: `|`)
- **Full Description**
- **Target Communities**
- **Registration Link**
- **Original URL**

### 3. The Generator Engine (Upcoming)
- A **Master Template** built in high-performance, responsive HTML/CSS.
- A **Python Script** that reads the sheet, sends content to the LLM (Antigravity) for rewriting, and generates final HTML files.

## 🎨 Design Rules
- **Font**: Manrope (Primary) with Arial fallbacks.
- **Colors**: HR.com Pink (`#EF4A3D`) for buttons, with Sponsor logos highlighted.
- **Format**: Hybrid/Fluid layout (Outlook and Mobile compatible).

---
*Brainstorming updated on 2026-04-03*
