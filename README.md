# LearnView Nexus

Premium tutor management web app for LearnView.

Tagline: **Learn Smarter. Manage Smarter.**

## What is included

- Responsive web dashboard with login, KPIs, quick actions and demo data.
- Dynamic subject, student, schedule, assessment and invoice interfaces.
- Printable invoice, report card and weekly schedule layouts with LearnView logo watermark.
- Central Google Apps Script API hook in `app.js`.
- Google Apps Script backend in `apps-script/Code.gs`.
- GitHub Pages-ready static files.
- Capacitor preparation notes in `CAPACITOR.md`.

## Local use

Open `index.html` in a browser. The demo admin password is:

```text
learnview-admin
```

The app runs in demo mode until a Google Apps Script web app URL is added to `API_URL` in `app.js`.

## Google Sheets setup

1. Create a Google Sheet.
2. Open **Extensions > Apps Script**.
3. Paste the contents of `apps-script/Code.gs`.
4. Save and run `setupSheets` once to create these sheets:
   `Settings`, `Subjects`, `Students`, `Schedule`, `Assessments`, `Invoices`, `InvoiceItems`, `Payments`, `ReportCards`.
5. Deploy as a web app with access set to the tutor account or anyone with the link, depending on your deployment needs.
6. Copy the deployment URL into `API_URL` in `app.js`.

## GitHub Pages deployment

1. Push this repository to GitHub.
2. In GitHub, open **Settings > Pages**.
3. Select the `main` branch and root folder.
4. Save. GitHub Pages will serve the static web app.

## Notes

The current logo is an editable SVG LearnView mark based on the teal and dark slate brand direction. Replace `logo()` in `app.js` with the official logo asset path when a separate logo file is available.
