import { bulkSync, loadFromSheets, syncCollection, testConnection } from "./api.js";
import { formData, safeSet, toast, uid } from "./utils.js";
import { hasScheduleConflict, invoiceStatus, logout, login, prefixFor, removeRecord, saveState, state, ui, upsert } from "./state.js";
import { renderApp } from "./render.js";
import { studentForm } from "./components/students.js";
import { subjectForm } from "./components/subjects.js";
import { scheduleForm } from "./components/schedule.js";
import { attendanceForm } from "./components/attendance.js";
import { assessmentForm } from "./components/assessments.js";
import { invoiceForm, paymentForm } from "./components/invoices.js";
import { reportForm } from "./components/reports.js";

const forms = {
  students: studentForm,
  subjects: subjectForm,
  schedule: scheduleForm,
  attendance: attendanceForm,
  assessments: assessmentForm,
  invoices: invoiceForm,
  reportCards: reportForm
};

window.ui = ui;
window.renderApp = renderApp;

window.loginSubmit = event => {
  event.preventDefault();
  if (login(document.getElementById("password").value.trim())) {
    renderApp();
    if (state.settings.apiUrl) loadFromSheets().then(renderApp);
    toast("Signed in");
  } else toast("Incorrect password");
};

window.confirmLogout = () => {
  if (confirm("Log out of LearnView Nexus?")) {
    logout();
    renderApp();
  }
};

window.go = view => {
  ui.view = view;
  renderApp();
};

window.setSectionAction = (section, action) => {
  ui.sectionAction[section] = action;
  renderApp();
};

window.setFilter = (key, value) => {
  ui.filters[key] = value;
  renderApp();
};

window.selectStudent = id => {
  ui.selectedStudentId = id;
  renderApp();
};

window.selectInvoice = id => {
  ui.selectedInvoiceId = id;
  ui.sectionAction.invoices = "view";
  renderApp();
};

window.setScheduleMode = mode => {
  ui.scheduleMode = mode;
  renderApp();
};

window.dragLesson = (event, id) => {
  event.dataTransfer.setData("text/plain", id);
};

window.dropLesson = async (event, day) => {
  const id = event.dataTransfer.getData("text/plain");
  const lesson = state.schedule.find(row => row.id === id);
  if (!lesson) return;
  lesson.day = day;
  const date = new Date(lesson.date || Date.now());
  const target = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(day);
  if (target >= 0) {
    const current = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() + (target - current));
    lesson.date = date.toISOString().slice(0, 10);
  }
  saveState();
  await syncCollection("schedule", "UPDATE", lesson);
  renderApp();
  toast(hasScheduleConflict(lesson) ? "Lesson moved with conflict warning" : "Lesson moved");
};

window.openModal = (title, body, onSubmit) => {
  document.getElementById("modal").innerHTML = `<form class="modal-card" onsubmit="${onSubmit}(event)"><div class="section-title"><h3>${title}</h3><button class="btn ghost" type="button" onclick="closeModal()">Close</button></div>${body}<div class="actions"><button class="btn primary" type="submit">Save</button></div></form>`;
  document.getElementById("modal").classList.add("open");
};

window.closeModal = () => document.getElementById("modal").classList.remove("open");

window.openStudent = () => openCrud("students");
window.openSubject = () => openCrud("subjects");
window.openSchedule = () => openCrud("schedule");
window.openAttendance = () => openCrud("attendance");
window.openAssessment = () => openCrud("assessments");
window.openInvoice = () => openCrud("invoices");
window.openReport = () => openCrud("reportCards");

function openCrud(collection, id) {
  const record = id ? state[collection].find(item => item.id === id) : {};
  window.openModal(`${id ? "Edit" : "New"} ${collection}`, `<input type="hidden" name="id" value="${id || ""}">${forms[collection](record || {})}`, `saveCrud_${collection}`);
}

Object.keys(forms).forEach(collection => {
  window[`saveCrud_${collection}`] = async event => {
    event.preventDefault();
    const data = formData(event.target);
    const existingId = data.id;
    const record = { ...data, id: existingId || uid(prefixFor(collection), state[collection]) };
    let extraSync = null;
    if (collection === "invoices") extraSync = saveInvoiceWithItem(record, data);
    else upsert(collection, record);
    await syncCollection(collection, existingId ? "UPDATE" : "POST", record);
    if (extraSync) await syncCollection("invoiceItems", extraSync.existing ? "UPDATE" : "POST", extraSync.record);
    window.closeModal();
    renderApp();
    toast(`${collection} saved`);
  };
});

function saveInvoiceWithItem(invoice, data) {
  upsert("invoices", invoice);
  const first = state.invoiceItems.find(item => item.invoiceId === invoice.id);
  const item = {
    id: first?.id || uid("IIT", state.invoiceItems),
    invoiceId: invoice.id,
    description: data.itemDescription,
    subjectId: data.itemSubjectId,
    qty: Number(data.itemQty || 1),
    rate: Number(data.itemRate || 0)
  };
  upsert("invoiceItems", item);
  ui.selectedInvoiceId = invoice.id;
  ui.sectionAction.invoices = "view";
  return { record: item, existing: Boolean(first) };
}

window.editRecord = (collection, id) => openCrud(collection, id);

window.deleteRecord = async (collection, id) => {
  if (!confirm("Delete or deactivate this record?")) return;
  removeRecord(collection, id);
  await syncCollection(collection, "DELETE", { id });
  renderApp();
  toast("Record updated");
};

window.openPayment = invoiceId => {
  window.openModal("Record payment", paymentForm(invoiceId), "savePayment");
};

window.savePayment = async event => {
  event.preventDefault();
  const data = formData(event.target);
  const invoice = state.invoices.find(row => row.id === data.invoiceId);
  const record = { ...data, id: uid("PAY", state.payments), studentId: invoice?.studentId, amount: Number(data.amount || 0) };
  upsert("payments", record);
  await syncCollection("payments", "POST", record);
  window.closeModal();
  renderApp();
  toast(`Payment recorded. Invoice is ${invoice ? invoiceStatus(invoice) : "updated"}.`);
};

window.composeMessage = async (studentId, type) => {
  const student = state.students.find(row => row.id === studentId);
  const due = state.invoices.filter(invoice => invoice.studentId === studentId).reduce((sum, invoice) => sum + Number(invoice.discount || 0), 0);
  const text = {
    invoice: `Hi ${student.guardian}, this is LearnView. Please review ${student.name}'s latest invoice and payment status. Current invoice reminders are available in LearnView Nexus.`,
    attendance: `Hi ${student.guardian}, attendance update for ${student.name}: please note the current attendance record in LearnView Nexus.`,
    performance: `Hi ${student.guardian}, performance update for ${student.name}: we are monitoring progress and will focus the next lesson on key improvement areas.`
  }[type];
  const record = { id: uid("MSG", state.messages), studentId, type, text, date: new Date().toLocaleDateString("en-ZA") };
  upsert("messages", record);
  await syncCollection("messages", "POST", record);
  window.openModal("WhatsApp-ready message", `<textarea readonly>${text}</textarea><p class="muted">Copy this into WhatsApp. The message is saved in the Messages log.</p>`, "closeOnly");
};

window.closeOnly = event => {
  event.preventDefault();
  window.closeModal();
};

window.saveSettings = async () => {
  Object.keys(state.settings).forEach(key => {
    const element = document.getElementById(`set-${key}`);
    if (!element) return;
    state.settings[key] = element.value === "true" ? true : element.value === "false" ? false : element.value;
  });
  saveState();
  await syncCollection("settings", "UPDATE", state.settings);
  renderApp();
  toast("Settings saved");
};

window.saveApiUrl = () => {
  state.settings.apiUrl = document.getElementById("api-url").value.trim();
  saveState();
  renderApp();
  toast("API URL saved");
};

window.testApiUrl = async () => {
  state.settings.apiUrl = document.getElementById("api-url").value.trim();
  const result = await testConnection();
  renderApp();
  toast(result.ok ? "Connected to Google Sheets" : result.error);
};

window.syncNow = async () => {
  const result = await bulkSync();
  renderApp();
  toast(result.ok ? "Sync complete" : result.error);
};

window.loadSheets = async () => {
  const result = await loadFromSheets();
  renderApp();
  toast(result.ok ? "Loaded from Sheets" : result.error);
};

window.quickAdd = () => {
  ({ students: window.openStudent, schedule: window.openSchedule, attendance: window.openAttendance, assessments: window.openAssessment, invoices: window.openInvoice, subjects: window.openSubject, reports: window.openReport }[ui.view] || window.openStudent)();
};

window.printCurrent = () => {
  document.body.classList.add("print-document");
  window.print();
  setTimeout(() => document.body.classList.remove("print-document"), 300);
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

renderApp();
if (state.settings.apiUrl) loadFromSheets().then(renderApp);
