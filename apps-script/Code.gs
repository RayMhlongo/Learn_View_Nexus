const SCHEMA = {
  Settings: ["ID","businessName","tagline","tutorName","phone","email","address","banking","rate","prefix","terms","availability","apiUrl","adminPassword","setupComplete","CreatedAt","UpdatedAt"],
  Subjects: ["id","name","description","gradeRange","price","status","CreatedAt","UpdatedAt"],
  Students: ["id","name","grade","guardian","parentPhone","parentEmail","studentPhone","address","subjectIds","startDate","frequency","days","time","paymentType","status","photo","availabilityNotes","notes","CreatedAt","UpdatedAt"],
  Schedule: ["id","studentId","subjectId","day","date","start","end","recurring","status","type","location","notes","CreatedAt","UpdatedAt"],
  Attendance: ["id","studentId","subjectId","scheduleId","date","status","notes","CreatedAt","UpdatedAt"],
  Assessments: ["id","studentId","subjectId","type","name","date","term","mark","total","comment","CreatedAt","UpdatedAt"],
  Invoices: ["id","date","due","studentId","guardian","discount","notes","CreatedAt","UpdatedAt"],
  InvoiceItems: ["id","invoiceId","subjectId","description","qty","rate","CreatedAt","UpdatedAt"],
  Payments: ["id","invoiceId","studentId","date","amount","method","reference","CreatedAt","UpdatedAt"],
  ReportCards: ["id","studentId","periodType","periodLabel","startDate","endDate","subjectIds","tutorComments","subjectComments","date","CreatedAt","UpdatedAt"],
  Messages: ["id","studentId","type","text","date","CreatedAt","UpdatedAt"]
};

function doGet() {
  return json({ ok: true, message: "LearnView Nexus Apps Script API is online.", sheets: Object.keys(SCHEMA) });
}

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents || "{}");
    setupSheets();
    return json(route(req));
  } catch (error) {
    return json({ ok: false, error: error.message });
  }
}

function route(req) {
  const action = String(req.action || "GET").toUpperCase();
  if (action === "TEST") return { ok: true, message: "Connected", timestamp: new Date().toISOString() };
  if (action === "BULK_READ") return { ok: true, data: bulkRead() };
  if (action === "BULK_SYNC") return { ok: true, data: bulkSync(req.payload || {}) };
  const sheetName = req.sheet;
  if (!SCHEMA[sheetName]) throw new Error("Unknown sheet: " + sheetName);
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (action === "GET") return { ok: true, data: readRows(sheet) };
  if (action === "POST") return { ok: true, data: appendRow(sheet, req.payload || {}) };
  if (action === "UPDATE") return { ok: true, data: updateRow(sheet, req.payload || {}) };
  if (action === "DELETE") return { ok: true, data: deleteOrDeactivate(sheet, req.payload || {}) };
  throw new Error("Unsupported action: " + action);
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function setupSheets() {
  const ss = SpreadsheetApp.getActive();
  Object.keys(SCHEMA).forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
    repairHeaders(sheet, SCHEMA[name]);
  });
}

function repairHeaders(sheet, expected) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(Boolean);
  if (!existing.length) {
    sheet.getRange(1, 1, 1, expected.length).setValues([expected]);
    return;
  }
  const missing = expected.filter(header => existing.indexOf(header) === -1);
  if (missing.length) sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
}

function bulkRead() {
  const out = {};
  Object.keys(SCHEMA).forEach(name => {
    out[name] = readRows(SpreadsheetApp.getActive().getSheetByName(name));
  });
  return out;
}

function bulkSync(payload) {
  Object.keys(SCHEMA).forEach(name => {
    if (!payload[name]) return;
    const sheet = SpreadsheetApp.getActive().getSheetByName(name);
    clearData(sheet);
    payload[name].forEach(row => appendRow(sheet, row));
  });
  return bulkRead();
}

function clearData(sheet) {
  if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
}

function readRows(sheet) {
  const values = sheet.getDataRange().getValues();
  const headers = values.shift() || [];
  return values.filter(row => row.some(Boolean)).map(row => {
    const object = {};
    headers.forEach((header, index) => object[header] = parseCell(row[index]));
    return object;
  });
}

function appendRow(sheet, payload) {
  validate(sheet.getName(), payload, false);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const now = new Date();
  const record = Object.assign({}, payload);
  if (!record.id && sheet.getName() !== "Settings") record.id = generateId(sheet.getName());
  if (sheet.getName() === "Settings" && !record.ID) record.ID = "settings";
  const row = headers.map(header => {
    if (header === "CreatedAt" || header === "UpdatedAt") return now;
    return serialize(record[header]);
  });
  sheet.appendRow(row);
  return record;
}

function updateRow(sheet, payload) {
  validate(sheet.getName(), payload, true);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const idHeader = sheet.getName() === "Settings" ? "ID" : "id";
  const id = payload[idHeader] || payload.id || "settings";
  const idCol = headers.indexOf(idHeader);
  const values = sheet.getDataRange().getValues();
  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    if (String(values[rowIndex][idCol]) === String(id)) {
      headers.forEach((header, colIndex) => {
        if (header === "UpdatedAt") sheet.getRange(rowIndex + 1, colIndex + 1).setValue(new Date());
        else if (payload[header] !== undefined) sheet.getRange(rowIndex + 1, colIndex + 1).setValue(serialize(payload[header]));
      });
      return payload;
    }
  }
  return appendRow(sheet, payload);
}

function deleteOrDeactivate(sheet, payload) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const idHeader = sheet.getName() === "Settings" ? "ID" : "id";
  const id = payload[idHeader] || payload.id;
  if (!id) throw new Error("id is required for delete");
  const idCol = headers.indexOf(idHeader);
  const statusCol = headers.indexOf("status");
  const values = sheet.getDataRange().getValues();
  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    if (String(values[rowIndex][idCol]) === String(id)) {
      if (statusCol >= 0) sheet.getRange(rowIndex + 1, statusCol + 1).setValue("Inactive");
      else sheet.deleteRow(rowIndex + 1);
      return { id };
    }
  }
  throw new Error("Record not found: " + id);
}

function validate(sheetName, payload, update) {
  const required = {
    Subjects: ["name"],
    Students: ["name"],
    Schedule: ["studentId","subjectId","date","start","end"],
    Attendance: ["studentId","subjectId","date","status"],
    Assessments: ["studentId","subjectId","name","mark","total"],
    Invoices: ["studentId","date","due"],
    InvoiceItems: ["invoiceId","description","qty","rate"],
    Payments: ["invoiceId","amount"],
    ReportCards: ["studentId"],
    Messages: ["studentId","text"]
  }[sheetName] || [];
  required.forEach(field => {
    if (!update && (payload[field] === undefined || payload[field] === "")) throw new Error(sheetName + " requires " + field);
  });
}

function generateId(sheetName) {
  const prefix = { Subjects: "SUB", Students: "STU", Schedule: "SCH", Attendance: "ATT", Assessments: "ASM", Invoices: "LVN", InvoiceItems: "IIT", Payments: "PAY", ReportCards: "RPT", Messages: "MSG" }[sheetName] || "REC";
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const next = Math.max(1, sheet.getLastRow());
  return prefix + "-" + String(next).padStart(4, "0");
}

function serialize(value) {
  if (Array.isArray(value) || typeof value === "object" && value !== null) return JSON.stringify(value);
  return value === undefined ? "" : value;
}

function parseCell(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try { return JSON.parse(trimmed); } catch (error) {}
  }
  return value;
}
