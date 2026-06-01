import { badge, logo, money, qrElement, table } from "../utils.js";
import { getStudent, invoiceBalance, invoiceItems, invoicePaid, invoiceStatus, invoiceSubtotal, invoiceTotal, state, subjectName } from "../state.js";

export function invoicePrint(invoice) {
  if (!invoice) return "";
  const student = getStudent(invoice.studentId);
  const status = invoiceStatus(invoice);
  const items = invoiceItems(invoice.id);
  return `<section class="print-doc only-printable">${watermark()}<div class="status-ribbon">${status}</div><div class="doc-content">
    ${docHead("Invoice", invoice.id, `Invoice ${invoice.id} · ${student?.name || ""}`)}
    <div class="grid cols-3">
      <section class="card"><strong>Parent details</strong><p>${invoice.guardian || student?.guardian}<br>${student?.parentPhone || ""}<br>${student?.parentEmail || ""}</p></section>
      <section class="card"><strong>Student details</strong><p>${student?.name || ""}<br>${student?.grade || ""}<br>${student?.address || ""}</p></section>
      <section class="card"><strong>Balance due</strong><h2>${money(invoiceBalance(invoice))}</h2>${badge(status)}</section>
    </div>
    ${table("Line items", ["Description", "Subject", "Qty", "Rate", "Line total"], items.map(item => [item.description, subjectName(item.subjectId), item.qty, money(item.rate), money(Number(item.qty) * Number(item.rate))]))}
    <div class="grid cols-2">
      <section class="card"><h3>Totals</h3><p>Subtotal: <strong>${money(invoiceSubtotal(invoice.id))}</strong><br>Discount: <strong>${money(invoice.discount)}</strong><br>Total: <strong>${money(invoiceTotal(invoice))}</strong><br>Amount paid: <strong>${money(invoicePaid(invoice.id))}</strong><br>Balance: <strong>${money(invoiceBalance(invoice))}</strong></p></section>
      <section class="card"><h3>Banking details</h3><p>${state.settings.banking}</p><p>${invoice.notes || ""}</p></section>
    </div>
    ${table("Payment history", ["Date", "Amount", "Method", "Reference"], state.payments.filter(payment => payment.invoiceId === invoice.id).map(payment => [payment.date, money(payment.amount), payment.method, payment.reference]))}
  </div></section>`;
}

export function watermark() {
  return `<div class="watermark">${logo("logo-doc")}</div>`;
}

export function docHead(title, meta, qrText) {
  return `<div class="doc-head"><div>${logo("logo-doc")}<p><strong>${state.settings.businessName}</strong><br>${state.settings.tutorName}<br>${state.settings.phone} · ${state.settings.email}<br>${state.settings.address}</p></div><div><div class="doc-title">${title}</div><p class="muted">${meta}</p>${qrElement(qrText, `qr-${Math.random().toString(16).slice(2)}`)}</div></div>`;
}
