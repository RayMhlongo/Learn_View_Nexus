# LearnView Nexus

Premium tutor management web app for LearnView.

Tagline: **Learn Smarter. Manage Smarter.**

## What is included

- Commercial SaaS-style dashboard with login, KPIs, quick actions and demo data.
- Official LearnView logo asset in `assets/learnview-logo.jpeg`, used across app and print documents.
- Modular frontend under `src/` with separated state, API, rendering, components and print templates.
- Configurable Google Apps Script URL from the Setup screen, with connection test, bulk load and bulk sync controls.
- Sync status indicators for demo, connected, syncing and failed states.
- ID-based relationships for students, subjects, schedules, attendance, assessments, invoices, invoice items, payments, reports and messages.
- Dedicated student profile workflow with parent details, subjects, attendance, assessments, invoices, payments, trends, notes and report history.
- Advanced schedule views for weekly calendar, monthly calendar and daily agenda, with conflict warnings and drag/drop lesson movement.
- Attendance tracking for Present, Absent, Late and Excused statuses.
- Parent communication tools for WhatsApp-ready invoice, attendance and performance messages.
- BI dashboard for revenue, growth, attendance, subject, student and assessment analytics.
- Premium printable invoice, report card and weekly schedule layouts with 6% logo watermark and QR-style verification block.
- PWA manifest and service worker for APK readiness and basic caching.
- Central Google Apps Script API hook in `app.js`.
- Google Apps Script backend in `apps-script/Code.gs`.
- GitHub Pages-ready static files.
- Capacitor preparation notes in `CAPACITOR.md`.

## Local use

Open `index.html` in a browser. The demo admin password is:

```text
learnview-admin
```

The app runs in demo mode until a Google Apps Script web app URL is saved in **Setup > Apps Script web app URL**.

## Google Sheets setup

1. Create a Google Sheet.
2. Open **Extensions > Apps Script**.
3. Paste the contents of `apps-script/Code.gs`.
4. Save and run `setupSheets` once, or use the connection test after deployment. The script creates and repairs these sheets:
   `Settings`, `Subjects`, `Students`, `Schedule`, `Attendance`, `Assessments`, `Invoices`, `InvoiceItems`, `Payments`, `ReportCards`, `Messages`.
5. Deploy as a web app with access set to the tutor account or anyone with the link, depending on your deployment needs.
6. Open LearnView Nexus, go to **Google Sheets Setup**, paste the deployment URL, and click **Test connection**.
7. Use **Sync now** to push current data or **Load from Sheets** to pull existing data.

## GitHub Pages deployment

1. Push this repository to GitHub.
2. In GitHub, open **Settings > Pages**.
3. Select the `main` branch and root folder.
4. Save. GitHub Pages will serve the static web app.

## Notes

The app is still static and GitHub Pages-ready, but the UI has been structured so it can later be split into components during a React or Capacitor build pass.
