import { badge, money, table } from "../utils.js";
import { invoiceBalance, invoiceItems, invoicePaid, invoiceStatus, invoiceTotal, state, studentName, subjectName, ui } from "../state.js";
import { invoicePrint } from "../print/invoice.js";

export function invoices() {
  const selected = state.invoices.find(invoice => invoice.id === ui.selectedInvoiceId) || state.invoices[0];
  if (selected) ui.selectedInvoiceId = selected.id;
  return `<section class="card no-print"><div class="section-title"><h3>Invoice control</h3><div class="actions"><button class="btn primary" onclick="openInvoice()">New invoice</button><button class="btn ghost" onclick="openPayment('${selected?.id || ""}')">Record payment</button></div></div>${table("", ["Invoice", "Student", "Due", "Total", "Paid", "Balance", "Status", ""], state.invoices.map(invoice => [invoice.id, studentName(invoice.studentId), invoice.due, money(invoiceTotal(invoice)), money(invoicePaid(invoice.id)), money(invoiceBalance(invoice)), badge(invoiceStatus(invoice)), `<button class="btn ghost" onclick="selectInvoice('${invoice.id}')">View</button>`]))}</section>${invoicePrint(selected)}`;
}

export function invoiceForm(record = {}) {
  const firstItem = invoiceItems(record.id || "")[0] || {};
  return `<div class="form-grid"><label class="field"><span>Student</span><select name="studentId">${state.students.map(student => `<option value="${student.id}" ${record.studentId === student.id ? "selected" : ""}>${student.name}</option>`).join("")}</select></label><label class="field"><span>Guardian</span><input name="guardian" value="${record.guardian || ""}"></label><label class="field"><span>Invoice date</span><input name="date" type="date" value="${record.date || ""}"></label><label class="field"><span>Due date</span><input name="due" type="date" value="${record.due || ""}"></label><label class="field"><span>Discount</span><input name="discount" type="number" value="${record.discount || 0}"></label><label class="field"><span>Notes</span><textarea name="notes">${record.notes || ""}</textarea></label></div><h3>Line items</h3><div class="form-grid"><label class="field"><span>Description</span><input name="itemDescription" value="${firstItem.description || ""}"></label><label class="field"><span>Subject</span><select name="itemSubjectId">${state.subjects.map(subject => `<option value="${subject.id}" ${firstItem.subjectId === subject.id ? "selected" : ""}>${subject.name}</option>`).join("")}</select></label><label class="field"><span>Quantity</span><input name="itemQty" type="number" value="${firstItem.qty || 1}"></label><label class="field"><span>Rate</span><input name="itemRate" type="number" value="${firstItem.rate || state.settings.rate}"></label></div><p class="muted">This form saves a primary line item. Additional lines can be added through the invoice items table after sync expansion.</p>`;
}

export function paymentForm(invoiceId) {
  const invoice = state.invoices.find(row => row.id === invoiceId);
  return `<div class="form-grid"><label class="field"><span>Invoice</span><input name="invoiceId" readonly value="${invoice?.id || ""}"></label><label class="field"><span>Student</span><input readonly value="${studentName(invoice?.studentId)}"></label><label class="field"><span>Date</span><input name="date" type="date"></label><label class="field"><span>Amount</span><input name="amount" type="number"></label><label class="field"><span>Method</span><select name="method"><option>EFT</option><option>Cash</option><option>Card</option></select></label><label class="field"><span>Reference</span><input name="reference"></label></div>`;
}
