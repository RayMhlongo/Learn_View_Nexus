import { barChart, icon, money, scorePercent, table } from "../utils.js";
import { attendancePercent, invoiceBalance, invoiceStatus, performanceAverage, state, studentName, subjectName, ui } from "../state.js";

export function kpi(label, value, ic) {
  return `<section class="card kpi"><div class="icon-pill">${icon(ic)}</div><div><div class="value">${value}</div><div class="label">${label}</div></div></section>`;
}

export function dashboard() {
  const active = state.students.filter(student => student.status === "Active").length;
  const outstanding = state.invoices.reduce((sum, invoice) => sum + invoiceBalance(invoice), 0);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return `<section class="panel"><div class="profile-hero"><div><p class="eyebrow">Client ready operations</p><h1 style="margin:0;font-size:34px">LearnView Nexus is now structured for real sync, CRUD and print workflows.</h1><p class="muted">Local cache remains as offline fallback; Google Sheets can be connected from Setup.</p></div><button class="btn primary" onclick="go('setup')">${icon("database")} Connect Sheets</button></div></section>
  <div class="grid cols-5">${kpi("Students", state.students.length, "users")}${kpi("Active", active, "user-check")}${kpi("Attendance", `${Math.round(state.students.reduce((s, x) => s + attendancePercent(x.id), 0) / state.students.length)}%`, "badge-check")}${kpi("Outstanding", money(outstanding), "receipt")}${kpi("Performance", `${Math.round(state.students.reduce((s, x) => s + performanceAverage(x.id), 0) / state.students.length)}%`, "trending-up")}</div>
  <div class="grid cols-2">
    <section class="card"><div class="section-title"><h3>Priority workflows</h3></div><div class="actions">${quick("students", "Student profile", "user-round")}${quick("schedule", "Schedule", "calendar-plus")}${quick("attendance", "Attendance", "clipboard-check")}${quick("invoices", "Invoice", "receipt")}${quick("reports", "Report", "file-text")}${quick("communications", "Message", "message-circle")}</div></section>
    <section class="card"><div class="section-title"><h3>Today’s agenda</h3><span class="badge active">${today}</span></div>${agendaRows(state.schedule.filter(row => row.day === today))}</section>
  </div>
  <div class="grid cols-2">
    <section class="card">${barChart("Invoice status", invoiceStatusTotals(), "money")}</section>
    <section class="card">${table("Recent assessment signals", ["Student", "Subject", "Score", "Comment"], state.assessments.slice(-5).reverse().map(mark => [studentName(mark.studentId), subjectName(mark.subjectId), `${scorePercent(mark)}%`, mark.comment]))}</section>
  </div>`;
}

function quick(view, label, ic) {
  return `<button class="btn primary" onclick="go('${view}')">${icon(ic)} ${label}</button>`;
}

function agendaRows(rows) {
  if (!rows.length) return "<p class='muted'>No lessons scheduled today.</p>";
  return rows.sort((a, b) => a.start.localeCompare(b.start)).map(row => `<div class="agenda-row"><strong>${row.start}</strong><div class="lesson"><strong>${studentName(row.studentId)}</strong><br>${subjectName(row.subjectId)} · ${row.status}<br><span class="muted">${row.location}</span></div></div>`).join("");
}

function invoiceStatusTotals() {
  return state.invoices.reduce((out, invoice) => {
    const status = invoiceStatus(invoice);
    out[status] = (out[status] || 0) + invoiceBalance(invoice);
    return out;
  }, {});
}
