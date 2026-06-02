import { actionMenu, badge, dayNames, emptyState } from "../utils.js";
import { hasScheduleConflict, state, studentName, subjectName, ui } from "../state.js";
import { schedulePrint } from "../print/schedule.js";

export function schedule() {
  const action = ui.sectionAction.schedule;
  if (!action) return actionMenu("Schedule", [
    { section: "schedule", action: "add", icon: "calendar-plus", title: "Add Lesson" },
    { section: "schedule", action: "week", icon: "calendar-days", title: "Weekly Schedule" },
    { section: "schedule", action: "day", icon: "list", title: "Daily Agenda" },
    { section: "schedule", action: "month", icon: "calendar", title: "Monthly Calendar" },
    { section: "schedule", action: "print", icon: "printer", title: "Print Schedule" }
  ]);
  if (action === "add") return `<section class="card"><div class="section-title"><h3>Add Lesson</h3><button class="btn ghost" onclick="navigateBack()">Back</button></div><button class="btn primary" onclick="openSchedule()">Open lesson form</button></section>`;
  ui.scheduleMode = action === "print" ? "week" : action;
  return `<section class="card no-print"><div class="calendar-toolbar"><div class="tabs">${["week", "month", "day"].map(mode => `<button class="${ui.scheduleMode === mode ? "active" : ""}" onclick="setScheduleMode('${mode}')">${mode}</button>`).join("")}</div><div class="actions"><button class="btn ghost" onclick="navigateBack()">Back</button><button class="btn ghost" onclick="printCurrent()">Print</button></div></div></section><section class="card no-print"><div class="section-title"><h3>Tutor availability</h3><span class="badge active">Conflict detection active</span></div><div class="availability">${state.settings.availability.split(",").map(item => `<div>${item.trim()}</div>`).join("")}</div></section><section class="print-doc">${scheduleGrid()}</section>`;
}

export function scheduleGrid() {
  if (ui.scheduleMode === "day") return dayAgenda(state.schedule);
  if (ui.scheduleMode === "month") return `<div class="calendar-month">${Array.from({ length: 35 }, (_, index) => `<div class="month-day" ondragover="event.preventDefault()" ondrop="dropLesson(event,'${dayNames()[index % 7]}')"><strong>${index + 1}</strong>${state.schedule.filter(row => dayNames().indexOf(row.day) === index % 7).slice(0, 2).map(lessonCard).join("")}</div>`).join("")}</div>`;
  return `<div class="calendar-week">${dayNames().map(day => `<div class="day" ondragover="event.preventDefault()" ondrop="dropLesson(event,'${day}')"><strong>${day}</strong>${state.schedule.filter(row => row.day === day).sort((a, b) => a.start.localeCompare(b.start)).map(lessonCard).join("")}</div>`).join("")}</div>`;
}

function dayAgenda(rows) {
  if (!rows.length) return emptyState("No lessons scheduled.");
  return `<div class="timeline">${rows.sort((a, b) => a.start.localeCompare(b.start)).map(row => `<div class="agenda-row"><strong>${row.start}</strong>${lessonCard(row)}</div>`).join("")}</div>`;
}

function lessonCard(row) {
  return `<div class="lesson ${hasScheduleConflict(row) ? "conflict" : ""}" draggable="true" ondragstart="dragLesson(event,'${row.id}')"><strong>${row.start}-${row.end}</strong><br>${studentName(row.studentId)}<br>${subjectName(row.subjectId)}<br>${badge(row.status)} <span class="muted">${row.location}</span></div>`;
}

export function scheduleForm(record = {}) {
  return `<div class="form-grid"><label class="field"><span>Student</span><select name="studentId">${state.students.map(student => `<option value="${student.id}" ${record.studentId === student.id ? "selected" : ""}>${student.name}</option>`).join("")}</select></label><label class="field"><span>Subject</span><select name="subjectId">${state.subjects.map(subject => `<option value="${subject.id}" ${record.subjectId === subject.id ? "selected" : ""}>${subject.name}</option>`).join("")}</select></label><label class="field"><span>Date</span><input name="date" type="date" value="${record.date || ""}"></label><label class="field"><span>Day</span><select name="day">${dayNames().map(day => `<option ${record.day === day ? "selected" : ""}>${day}</option>`).join("")}</select></label><label class="field"><span>Start</span><input name="start" type="time" value="${record.start || ""}"></label><label class="field"><span>End</span><input name="end" type="time" value="${record.end || ""}"></label><label class="field"><span>Status</span><select name="status">${["Scheduled", "Completed", "Cancelled", "Missed", "Rescheduled"].map(status => `<option ${record.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label><label class="field"><span>Recurring weekly</span><select name="recurring"><option value="true">Yes</option><option value="false">No</option></select></label><label class="field"><span>Lesson type</span><select name="type"><option>Individual</option><option>Group</option></select></label><label class="field"><span>Location</span><input name="location" value="${record.location || ""}"></label><label class="field"><span>Notes</span><textarea name="notes">${record.notes || ""}</textarea></label></div>`;
}
