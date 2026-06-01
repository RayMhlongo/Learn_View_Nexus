import { actionMenu, badge, table } from "../utils.js";
import { attendancePercent, state, studentName, subjectName } from "../state.js";
import { kpi } from "./dashboard.js";

export function attendance() {
  const action = window.ui.sectionAction.attendance;
  if (!action) return actionMenu("Attendance", [
    { section: "attendance", action: "mark", icon: "clipboard-plus", title: "Mark Attendance" },
    { section: "attendance", action: "history", icon: "list", title: "Attendance History" },
    { section: "attendance", action: "reports", icon: "chart-column", title: "Attendance Reports" },
    { section: "attendance", action: "poor", icon: "alert-circle", title: "Poor Attendance" }
  ]);
  if (action === "mark") return `<section class="card"><div class="section-title"><h3>Mark Attendance</h3><button class="btn ghost" onclick="setSectionAction('attendance','')">Back</button></div><button class="btn primary" onclick="openAttendance()">Open attendance form</button></section>`;
  return `<div class="grid cols-4">${kpi("Attendance rate", `${Math.round(state.students.reduce((sum, student) => sum + attendancePercent(student.id), 0) / state.students.length)}%`, "badge-check")}${kpi("Present", count("Present"), "check")}${kpi("Late", count("Late"), "clock")}${kpi("Absent", count("Absent"), "x")}</div><section class="card"><div class="section-title"><h3>Attendance register</h3><button class="btn primary" onclick="openAttendance()">Mark attendance</button></div>${table("", ["Date", "Student", "Subject", "Status", "Notes", ""], state.attendance.map(row => [row.date, studentName(row.studentId), subjectName(row.subjectId), badge(row.status), row.notes, actions("attendance", row.id)]))}</section>`;
}

function count(status) {
  return state.attendance.filter(row => row.status === status).length;
}

function actions(collection, id) {
  return `<div class="actions"><button class="btn ghost" onclick="editRecord('${collection}','${id}')">Edit</button><button class="btn danger" onclick="deleteRecord('${collection}','${id}')">Delete</button></div>`;
}

export function attendanceForm(record = {}) {
  return `<div class="form-grid"><label class="field"><span>Student</span><select name="studentId">${state.students.map(student => `<option value="${student.id}" ${record.studentId === student.id ? "selected" : ""}>${student.name}</option>`).join("")}</select></label><label class="field"><span>Subject</span><select name="subjectId">${state.subjects.map(subject => `<option value="${subject.id}" ${record.subjectId === subject.id ? "selected" : ""}>${subject.name}</option>`).join("")}</select></label><label class="field"><span>Date</span><input name="date" type="date" value="${record.date || ""}"></label><label class="field"><span>Status</span><select name="status">${["Present", "Absent", "Late", "Excused"].map(status => `<option ${record.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label><label class="field"><span>Notes</span><textarea name="notes">${record.notes || ""}</textarea></label></div>`;
}
