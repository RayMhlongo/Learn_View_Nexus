const SHEETS = ["Settings", "Subjects", "Students", "Schedule", "Attendance", "Assessments", "Invoices", "InvoiceItems", "Payments", "ReportCards", "Messages"];

function doGet(e) {
  return jsonResponse(handleRequest({ action: "GET", sheet: e.parameter.sheet }));
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || "{}");
  return jsonResponse(handleRequest(body));
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleRequest(req) {
  try {
    setupSheets();
    const sheetName = req.sheet;
    if (!SHEETS.includes(sheetName)) throw new Error("Unknown sheet: " + sheetName);
    const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    const action = String(req.action || "GET").toUpperCase();
    if (action === "GET") return { ok: true, data: readRows(sheet) };
    if (action === "POST") return { ok: true, data: appendRow(sheet, req.payload || {}) };
    if (action === "UPDATE") return { ok: true, data: updateRow(sheet, req.payload || {}) };
    if (action === "DELETE") return { ok: true, data: deactivateOrDelete(sheet, req.payload || {}) };
    throw new Error("Unsupported action: " + action);
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function setupSheets() {
  const ss = SpreadsheetApp.getActive();
  const headers = {
    Settings: ["ID","BusinessName","Tagline","TutorName","Phone","Email","Address","Banking","Rate","Prefix","Terms","CreatedAt","UpdatedAt"],
    Subjects: ["ID","Name","Description","GradeRange","Price","Status","CreatedAt","UpdatedAt"],
    Students: ["ID","Name","Grade","Guardian","ParentPhone","ParentEmail","StudentPhone","Address","Subjects","StartDate","Frequency","Days","Time","PaymentType","Status","Notes","CreatedAt","UpdatedAt"],
    Schedule: ["ID","Student","Subject","Day","Start","End","Sessions","Type","Location","Notes","CreatedAt","UpdatedAt"],
    Attendance: ["ID","Student","Subject","Date","Status","Notes","CreatedAt","UpdatedAt"],
    Assessments: ["ID","Student","Subject","Type","Name","Date","Term","Mark","Total","Percentage","Comment","CreatedAt","UpdatedAt"],
    Invoices: ["ID","Date","Due","Student","Guardian","Package","Qty","Rate","Discount","Total","Status","Method","Notes","CreatedAt","UpdatedAt"],
    InvoiceItems: ["ID","InvoiceID","Description","Qty","Rate","Total","CreatedAt","UpdatedAt"],
    Payments: ["ID","InvoiceID","Date","Amount","Method","Reference","CreatedAt","UpdatedAt"],
    ReportCards: ["ID","Student","Period","Subjects","OverallAverage","Comments","CreatedAt","UpdatedAt"],
    Messages: ["ID","Date","Student","Type","Text","CreatedAt","UpdatedAt"]
  };
  SHEETS.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
    if (sheet.getLastRow() === 0) sheet.appendRow(headers[name]);
  });
}

function readRows(sheet) {
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  return values.filter(r => r.some(Boolean)).map(row => Object.fromEntries(headers.map((h, i) => [h, row[i]])));
}

function appendRow(sheet, payload) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const now = new Date();
  const id = payload.ID || payload.id || Utilities.getUuid();
  const row = headers.map(h => {
    if (h === "ID") return id;
    if (h === "CreatedAt" || h === "UpdatedAt") return now;
    if (h === "Percentage") return percentage(payload);
    if (h === "Total" && payload.Qty) return Number(payload.Qty || payload.qty) * Number(payload.Rate || payload.rate) - Number(payload.Discount || payload.discount || 0);
    return payload[h] ?? payload[lowerFirst(h)] ?? "";
  });
  sheet.appendRow(row);
  return { ID: id };
}

function updateRow(sheet, payload) {
  const id = payload.ID || payload.id;
  if (!id) throw new Error("ID is required for update");
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  for (let r = 1; r < values.length; r++) {
    if (String(values[r][0]) === String(id)) {
      headers.forEach((h, c) => {
        if (h === "UpdatedAt") sheet.getRange(r + 1, c + 1).setValue(new Date());
        else if (payload[h] !== undefined || payload[lowerFirst(h)] !== undefined) sheet.getRange(r + 1, c + 1).setValue(payload[h] ?? payload[lowerFirst(h)]);
      });
      return { ID: id };
    }
  }
  throw new Error("Record not found: " + id);
}

function deactivateOrDelete(sheet, payload) {
  const id = payload.ID || payload.id;
  if (!id) throw new Error("ID is required for delete");
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const statusCol = headers.indexOf("Status") + 1;
  for (let r = 1; r < values.length; r++) {
    if (String(values[r][0]) === String(id)) {
      if (statusCol) sheet.getRange(r + 1, statusCol).setValue("Inactive");
      else sheet.deleteRow(r + 1);
      return { ID: id };
    }
  }
  throw new Error("Record not found: " + id);
}

function lowerFirst(value) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function percentage(payload) {
  const mark = Number(payload.Mark || payload.mark || 0);
  const total = Number(payload.Total || payload.total || 1);
  return Math.round((mark / total) * 100);
}
