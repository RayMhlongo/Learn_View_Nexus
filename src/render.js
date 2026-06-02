import { renderQRCodes, refreshIcons } from "./utils.js";
import { isAuthenticated, state, ui } from "./state.js";
import { analytics } from "./components/analytics.js";
import { ai } from "./components/ai.js";
import { assessments } from "./components/assessments.js";
import { attendance } from "./components/attendance.js";
import { communications } from "./components/communications.js";
import { dashboard } from "./components/dashboard.js";
import { invoices } from "./components/invoices.js";
import { sidebar, topbar } from "./components/navigation.js";
import { reports } from "./components/reports.js";
import { schedule } from "./components/schedule.js";
import { settings, setup } from "./components/settings.js";
import { students } from "./components/students.js";
import { subjects } from "./components/subjects.js";
import { icon, logo } from "./utils.js";

const routes = { dashboard, students, schedule, invoices, more, ai, attendance, assessments, reports, analytics, communications, subjects, settings, setup };

export function renderApp() {
  const app = document.getElementById("app");
  app.innerHTML = isAuthenticated() ? shell() : loginScreen();
  refreshIcons();
  renderQRCodes();
}

function loginScreen() {
  return `<section class="login"><div class="login-hero"><div>${logo()}<p class="eyebrow">LearnView Nexus</p></div><div><h1>Client-ready tutoring operations.</h1><p class="login-copy">Google Sheets sync, modular workflows, commercial print templates and APK-ready PWA foundations.</p></div><p><strong>${state.settings.tagline}</strong></p></div><form class="login-card" onsubmit="loginSubmit(event)">${logo()}<h2>Welcome back</h2><p class="muted">Sign in to manage LearnView Nexus.</p><label class="field"><span>Admin password</span><input id="password" type="password" required autocomplete="current-password"></label><button class="btn primary" type="submit">${icon("log-in")} Sign in</button>${state.settings.setupComplete ? "" : `<p class="muted">Initial password: <strong>learnview-admin</strong></p>`}</form></section>`;
}

function shell() {
  const route = routes[ui.view] || routes.dashboard;
  return `<section class="shell">${sidebar()}<section class="content">${topbar()}<div class="page">${route()}</div><button class="btn primary fab" onclick="quickAdd()" title="Quick add">${icon("plus")}</button></section><div class="modal" id="modal"></div><div class="toast"></div></section>`;
}

function more() {
  const items = [
    ["ai", "LearnView AI", "sparkles"],
    ["attendance", "Attendance", "user-check"],
    ["assessments", "Assessments", "clipboard-check"],
    ["reports", "Report Cards", "file-text"],
    ["analytics", "Analytics", "chart-column"],
    ["communications", "Messages", "message-circle"],
    ["subjects", "Subjects", "book-open"],
    ["settings", "Settings", "settings"],
    ["setup", "Setup", "database"]
  ];
  return `<section class="card"><div class="section-title"><h3>More</h3></div><div class="category-grid">${items.map(([view, title, ic]) => `<button class="category-card" onclick="go('${view}')">${icon(ic)}<span>${title}</span></button>`).join("")}</div></section>`;
}
