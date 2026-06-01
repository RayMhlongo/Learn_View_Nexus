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
  return `<section class="print-doc only-printable">${watermark()}<div class="doc-content">
    ${docHead("Report Card", `${student.name} · ${report.periodLabel || report.periodType}`, `Report ${report.id} · ${student.name}`)}
    <div class="grid cols-4">
      ${metric("Overall average", `${overall}%`)}
      ${metric("Attendance", `${attendancePercent(student.id)}%`)}
      ${metric("Rating", overall >= 75 ? "Excellent" : overall >= 60 ? "Satisfactory" : "Support")}
      ${metric("Subjects", subjectIds.length)}
    </div>
    <div class="grid cols-2" style="margin-top:18px">
      <section class="card"><h3>Student</h3><p>${student.name}<br>${student.grade}<br>Guardian: ${student.guardian}</p></section>
      <section class="card"><h3>Tutor comments</h3><p>${report.tutorComments || "Keep building consistency with weekly practice and review."}</p>${badge(report.periodType || "Term")}</section>
    </div>
    ${table("Subject results", ["Subject", "Assessments", "Breakdown", "Average", "Subject comment"], rows)}
    ${table("Assessment breakdown", ["Date", "Subject", "Assessment", "Score", "Comment"], marks.map(mark => [mark.date, subjectName(mark.subjectId), mark.name, `${scorePercent(mark)}%`, mark.comment]))}
    <div class="grid cols-2"><p style="margin-top:42px;border-top:1px solid var(--line);padding-top:12px">Parent signature</p><p style="margin-top:42px;border-top:1px solid var(--line);padding-top:12px">Tutor signature</p></div>
    <p>Date generated: ${new Date().toLocaleDateString("en-ZA")}</p>
  </div></section>`;
}

function metric(label, value) {
  return `<section class="card kpi"><div><div class="value">${value}</div><div class="label">${label}</div></div></section>`;
}
