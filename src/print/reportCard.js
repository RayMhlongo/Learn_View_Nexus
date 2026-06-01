import { average, badge, dateInRange, logo, qrElement, scorePercent, table } from "../utils.js";
import { attendancePercent, getStudent, performanceAverage, state, subjectName } from "../state.js";
import { docHead, watermark } from "./invoice.js";

export function reportCardPrint(report) {
  const student = getStudent(report.studentId);
  if (!student) return "";
  const subjectIds = report.subjectIds?.length ? report.subjectIds : student.subjectIds;
  const marks = state.assessments
    .filter(mark => mark.studentId === student.id)
    .filter(mark => subjectIds.includes(mark.subjectId))
    .filter(mark => dateInRange(mark.date, report.startDate, report.endDate));
  const overall = performanceAverage(student.id, subjectIds, report.startDate, report.endDate);
  const rows = subjectIds.map(subjectId => {
    const subjectMarks = marks.filter(mark => mark.subjectId === subjectId);
    return [
      subjectName(subjectId),
      subjectMarks.length,
      subjectMarks.map(mark => `${mark.name}: ${scorePercent(mark)}%`).join("<br>"),
      `${average(subjectMarks.map(scorePercent))}%`,
      report.subjectComments?.[subjectId] || ""
    ];
  });
  return `<section class="print-doc report-template only-printable">${watermark()}<div class="doc-content">
    <header class="print-head">
      <div>${logo("logo-doc")}<p class="muted">Learn Smarter.</p></div>
      <div class="print-title"><h1>REPORT CARD</h1><span>${report.periodLabel || report.periodType}</span><dl><dt>Date Generated</dt><dd>${new Date().toLocaleDateString("en-ZA")}</dd><dt>Report ID</dt><dd>${report.id}</dd></dl></div>
    </header>
    <div class="print-info-grid report-top">
      <section class="print-box"><h3>Student Information</h3><dl><dt>Student Name</dt><dd>${student.name}</dd><dt>Student ID</dt><dd>${student.id}</dd><dt>Grade</dt><dd>${student.grade}</dd><dt>Parent / Guardian</dt><dd>${student.guardian}</dd><dt>Contact</dt><dd>${student.parentPhone}</dd><dt>Email</dt><dd>${student.parentEmail}</dd></dl></section>
      <section class="print-box"><h3>Performance Summary</h3><div class="report-metrics">${metric("Overall Average", `${overall}%`)}${metric("Performance", overall >= 75 ? "Very Good" : overall >= 60 ? "Good" : "Support")}${metric("Subjects", subjectIds.length)}${metric("Attendance", `${attendancePercent(student.id)}%`)}</div><h3>Tutor Comment</h3><p>${report.tutorComments || "Consistent effort and positive attitude towards learning. Keep focusing on exam technique and time management."}</p></section>
    </div>
    <table class="print-table report-table"><thead><tr><th>Subject</th><th>Assessments</th><th>Average (%)</th><th>Grade</th><th>Comment</th></tr></thead><tbody>${rows.map(row => `<tr><td>${row[0]}</td><td>${row[2] || "No marks"}</td><td><strong class="teal">${row[3]}</strong></td><td>${grade(row[3])}</td><td>${row[4] || "Continued practice recommended."}</td></tr>`).join("")}</tbody></table>
    <div class="report-bottom"><section class="print-box"><h3>Attendance Summary</h3><p>Attendance: <strong>${attendancePercent(student.id)}%</strong><br>Period: ${report.startDate || ""} to ${report.endDate || ""}</p></section><section class="print-box"><h3>Key Strengths</h3><p>Analytical skills<br>Problem solving<br>Consistent improvement<br>Class participation</p></section><section class="print-box verify-box">${qrElement(`Report ${report.id} ${student.name}`, `qr-report-${report.id}`)}<p>Scan to verify this report card<br>Report ID: ${report.id}</p></section></div>
    <footer class="print-footer">${state.settings.phone} · ${state.settings.email} · ${state.settings.address}</footer>
  </div></section>`;
}

function metric(label, value) {
  return `<section class="metric-box"><strong>${value}</strong><span>${label}</span></section>`;
}

function grade(value) {
  const n = Number(String(value).replace("%", ""));
  if (n >= 90) return "A+";
  if (n >= 80) return "A";
  if (n >= 70) return "B";
  if (n >= 60) return "C";
  if (n >= 50) return "D";
  return "E";
}
