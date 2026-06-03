import { icon } from "../utils.js";
import { state, getStudent, ui } from "../state.js";
import { invoicePrint } from "../print/invoice.js";
import { reportCardPrint } from "../print/reportCard.js";
import { schedulePrint } from "../print/schedule.js";

export function printPreview() {
  const { type, id } = ui.printPreview || {};
  const documentHtml = printDocument(type, id);
  return `<section class="print-preview">
    <header class="print-preview-toolbar no-print">
      <button class="btn ghost" onclick="navigateBack()">${icon("arrow-left")} Back</button>
      <div><strong>${previewTitle(type)}</strong><p class="muted">Previewing the selected document only.</p></div>
      <div class="actions">
        <button class="btn ghost" onclick="printCurrent()">${icon("printer")} Print</button>
        <button class="btn primary" onclick="downloadCurrentPdf()">${icon("download")} Download PDF</button>
      </div>
    </header>
    <main class="print-preview-stage">${documentHtml || emptyPreview()}</main>
  </section>`;
}

export function printDocument(type, id) {
  if (type === "invoice") {
    return invoicePrint(state.invoices.find(invoice => invoice.id === id) || state.invoices[0]);
  }

  if (type === "report") {
    return reportCardPrint(state.reportCards.find(report => report.id === id) || state.reportCards[0] || draftReport());
  }

  if (type === "schedule") {
    return schedulePrint(filteredSchedule());
  }

  return "";
}

window.currentPdfFilename = () => {
  const { type, id } = ui.printPreview || {};

  if (type === "invoice") {
    const invoice = state.invoices.find(row => row.id === id) || state.invoices[0];
    return `LearnView_Invoice_${invoice?.id || "Selected"}.pdf`;
  }

  if (type === "report") {
    const report = state.reportCards.find(row => row.id === id) || state.reportCards[0] || draftReport();
    const term = String(report.periodLabel || report.periodType || "Report").replace(/\s+/g, "");
    return `LearnView_ReportCard_${report.studentId || "Student"}_${term}.pdf`;
  }

  const date = new Date().toISOString().slice(0, 10);
  return `LearnView_WeeklySchedule_${date}.pdf`;
};

function filteredSchedule() {
  return state.schedule.filter(row =>
    (!ui.filters.scheduleStudentId || row.studentId === ui.filters.scheduleStudentId)
    && (!ui.filters.scheduleSubjectId || row.subjectId === ui.filters.scheduleSubjectId)
    && (!ui.filters.scheduleDay || row.day === ui.filters.scheduleDay)
    && (!ui.filters.scheduleStatus || row.status === ui.filters.scheduleStatus)
    && (!ui.filters.scheduleMonth || String(row.date || "").slice(0, 7) === ui.filters.scheduleMonth)
  );
}

function draftReport() {
  const student = getStudent(ui.reportDraft.studentId) || state.students[0];
  return {
    id: "Preview",
    studentId: student?.id || "",
    periodType: ui.reportDraft.periodType,
    periodLabel: `${ui.reportDraft.periodType} preview`,
    startDate: ui.reportDraft.startDate,
    endDate: ui.reportDraft.endDate,
    subjectIds: ui.reportDraft.subjectIds.length ? ui.reportDraft.subjectIds : student?.subjectIds || [],
    tutorComments: ui.reportDraft.tutorComments
  };
}

function previewTitle(type) {
  return {
    invoice: "Invoice preview",
    report: "Report card preview",
    schedule: "Schedule preview"
  }[type] || "Print preview";
}

function emptyPreview() {
  return `<section class="card"><p class="muted">No document is available to preview.</p></section>`;
}
