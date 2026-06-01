# Capacitor Preparation

Build and approve the web app first. After the LearnView Nexus web version is stable on GitHub Pages and connected to Google Sheets, wrap it with Capacitor.

## Suggested steps

```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "LearnView Nexus" "za.co.learnview.nexus" --web-dir .
npx cap add android
npx cap sync android
```

## Web-first rules

- Keep `index.html`, `styles.css` and `app.js` working directly in the browser.
- Do not add Android-only paths that break GitHub Pages.
- Keep Google Apps Script as the backend API.
- Test printing from the browser before APK conversion.
