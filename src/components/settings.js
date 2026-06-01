import { state } from "../state.js";

export function settings() {
  const action = window.ui.sectionAction.settings;
  if (!action) return `<section class="card module-menu"><div class="section-title"><h3>Settings</h3></div><div class="category-grid">${[
    ["business", "Business Details", "briefcase"], ["branding", "Logo and Branding", "palette"], ["sheets", "Google Sheets Connection", "database"], ["subjects", "Subjects Setup", "book-open"], ["security", "Password and Security", "lock"], ["print", "Print Template Settings", "printer"]
  ].map(([action, title, icon]) => `<button class="category-card" onclick="setSectionAction('settings','${action}')"><i data-lucide="${icon}"></i><span>${title}</span></button>`).join("")}</div></section>`;
  return `<section class="card"><div class="section-title"><h3>Business settings</h3><button class="btn primary" onclick="saveSettings()">Save settings</button></div><div class="form-grid">${fields().map(([key, label, type = "input"]) => `<label class="field"><span>${label}</span><${type} id="set-${key}" ${type === "textarea" ? "" : `value="${state.settings[key] || ""}"`}>${type === "textarea" ? state.settings[key] || "" : ""}</${type}></label>`).join("")}</div></section><section class="card"><h3>Login security</h3><div class="form-grid"><label class="field"><span>Admin password</span><input id="set-adminPassword" type="password" value="${state.settings.adminPassword || ""}"></label><label class="field"><span>Setup complete</span><select id="set-setupComplete"><option value="false">No, show demo hint</option><option value="true" ${state.settings.setupComplete ? "selected" : ""}>Yes, hide demo hint</option></select></label></div></section>`;
}

function fields() {
  return [
    ["businessName", "Business name"], ["tagline", "Tagline"], ["tutorName", "Tutor name"],
    ["phone", "Phone number"], ["email", "Email address"], ["address", "Physical address"],
    ["banking", "Banking details", "textarea"], ["rate", "Default rate"], ["prefix", "Invoice prefix"],
    ["terms", "Report card term labels"], ["availability", "Tutor availability", "textarea"]
  ];
}

export function setup() {
  return `<section class="card"><div class="section-title"><h3>Google Sheets connection</h3><span class="badge active">${state.meta.syncStatus}</span></div><label class="field"><span>Apps Script web app URL</span><input id="api-url" value="${state.settings.apiUrl || ""}" placeholder="https://script.google.com/macros/s/.../exec"></label><div class="actions"><button class="btn primary" onclick="saveApiUrl()">Save URL</button><button class="btn ghost" onclick="testApiUrl()">Test connection</button><button class="btn ghost" onclick="syncNow()">Sync now</button><button class="btn ghost" onclick="loadSheets()">Load from Sheets</button></div><p class="muted">LocalStorage is used as cache/offline fallback. Once connected, CRUD actions call Apps Script.</p></section><section class="card"><h3>Required sheets</h3><p>Settings, Subjects, Students, Schedule, Attendance, Assessments, Invoices, InvoiceItems, Payments, ReportCards, Messages.</p></section>`;
}
