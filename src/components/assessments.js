import { barChart, scorePercent, table } from "../utils.js";
import { performanceAverage, state, studentName, subjectName } from "../state.js";

export function assessments() {
  const subjectData = Object.fromEntries(state.subjects.map(subject => [subject.name, averageForSubject(subject.id)]));
  return `<section class="card"><div class="section-title"><h3>Assessment history</h3><button class="btn primary" onclick="openAssessment()">Add mark</button></div>${table("", ["Student", "Subject", "Type", "Date", "Score", "Comment", ""], state.assessments.map(row => [studentName(row.studentId), subjectName(row.subjectId), row.type, row.date, `${scorePercent(row)}%`, row.comment, actions("assessments", row.id)]))}</section><section class="card">${barChart("Subject averages", subjectData, "%")}</section>`;
}

function averageForSubject(subjectId) {
  const rows = state.assessments.filter(row => row.subjectId === subjectId);
  return rows.length ? Math.round(rows.reduce((sum, row) => sum + scorePercent(row), 0) / rows.length) : 0;
}

function actions(collection, id) {
  return `<div class="actions"><button class="btn ghost" onclick="editRecord('${collection}','${id}')">Edit</button><button class="btn danger" onclick="deleteRecord('${collection}','${id}')">Delete</button></div>`;
}

export function assessmentForm(record = {}) {
  return `<div class="form-grid"><label class="field"><span>Student</span><select name="studentId">${state.students.map(student => `<option value="${student.id}" ${record.studentId === student.id ? "selected" : ""}>${student.name}</option>`).join("")}</select></label><label class="field"><span>Subject</span><select name="subjectId">${state.subjects.map(subject => `<option value="${subject.id}" ${record.subjectId === subject.id ? "selected" : ""}>${subject.name}</option>`).join("")}</select></label><label class="field"><span>Type</span><select name="type">${["Weekly", "Monthly", "Quarterly", "Custom test"].map(type => `<option ${record.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label><label class="field"><span>Name</span><input name="name" value="${record.name || ""}"></label><label class="field"><span>Date</span><input name="date" type="date" value="${record.date || ""}"></label><label class="field"><span>Term or month</span><input name="term" value="${record.term || ""}"></label><label class="field"><span>Mark</span><input name="mark" type="number" value="${record.mark || ""}"></label><label class="field"><span>Total</span><input name="total" type="number" value="${record.total || 100}"></label><label class="field"><span>Comment</span><textarea name="comment">${record.comment || ""}</textarea></label></div>`;
}
