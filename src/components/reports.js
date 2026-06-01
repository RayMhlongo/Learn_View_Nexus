import { badge } from "../utils.js";
import { getStudent, state, ui } from "../state.js";
import { reportCardPrint } from "../print/reportCard.js";

export function reports() {
  const report = state.reportCards.find(row => row.id === ui.selectedReportId) || buildDraftReport();
  return `<section class="card no-print"><div class="section-title"><h3>Report card generator</h3><div class="actions"><button class="btn primary" onclick="openReport()">Generate report</button><button class="btn ghost" onclick="printCurrent()">Print selected</button></div></div>${reportControls(report)}</section>${reportCardPrint(report)}`;
}

function buildDraftReport() {
  const student = getStudent(ui.reportDraft.studentId) || state.students[0];
  return {
    id: "Preview",
    studentId: student.id,
    periodType: ui.reportDraft.periodType,
    periodLabel: `${ui.reportDraft.periodType} preview`,
    startDate: ui.reportDraft.startDate,
    endDate: ui.reportDraft.endDate,
    subjectIds: ui.reportDraft.subjectIds.length ? ui.reportDraft.subjectIds : student.subjectIds,
    tutorComments: ui.reportDraft.tutorComments
  };
}

function reportControls(report) {
  return `<div class="toolbar"><select onchange="ui.reportDraft.studentId=this.value;renderApp()">${state.students.map(student => `<option value="${student.id}" ${report.studentId === student.id ? "selected" : ""}>${student.name}</option>`).join("")}</select><select onchange="ui.reportDraft.periodType=this.value;renderApp()">${["Month", "Quarter", "Term", "Custom"].map(type => `<option ${report.periodType === type ? "selected" : ""}>${type}</option>`).join("")}</select><input type="date" value="${report.startDate || ""}" onchange="ui.reportDraft.startDate=this.value;renderApp()"><input type="date" value="${report.endDate || ""}" onchange="ui.reportDraft.endDate=this.value;renderApp()"></div><p>${badge(report.periodType || "Term")} The print template filters assessments by selected period and subjects.</p>`;
}

export function reportForm(record = {}) {
  const student = getStudent(record.studentId) || state.students[0];
  return `<div class="form-grid"><label class="field"><span>Student</span><select name="studentId">${state.students.map(item => `<option value="${item.id}" ${record.studentId === item.id ? "selected" : ""}>${item.name}</option>`).join("")}</select></label><label class="field"><span>Period type</span><select name="periodType">${["Month", "Quarter", "Term", "Custom"].map(type => `<option ${record.periodType === type ? "selected" : ""}>${type}</option>`).join("")}</select></label><label class="field"><span>Period label</span><input name="periodLabel" value="${record.periodLabel || ""}"></label><label class="field"><span>Start date</span><input name="startDate" type="date" value="${record.startDate || ""}"></label><label class="field"><span>End date</span><input name="endDate" type="date" value="${record.endDate || ""}"></label><label class="field"><span>Subjects</span><select name="subjectIds" multiple>${state.subjects.map(subject => `<option value="${subject.id}" ${(record.subjectIds || student.subjectIds || []).includes(subject.id) ? "selected" : ""}>${subject.name}</option>`).join("")}</select></label><label class="field"><span>Tutor comments</span><textarea name="tutorComments">${record.tutorComments || ""}</textarea></label></div>`;
}
