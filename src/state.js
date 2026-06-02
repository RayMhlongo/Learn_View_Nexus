import { average, clone, safeGet, safeRemove, safeSet, scorePercent, timeOverlaps, uid } from "./utils.js";

export const STORAGE_KEY = "learnview-nexus-state-v3";
export const SESSION_KEY = "learnview-nexus-session";
export const SESSION_TIMEOUT_MS = 1000 * 60 * 45;

export const seed = {
  meta: { syncStatus: "Demo mode", lastSync: "" },
  settings: {
    businessName: "LearnView",
    tagline: "Learn Smarter. Manage Smarter.",
    tutorName: "Ray Mhlongo",
    phone: "+27 72 000 0000",
    email: "hello@learnview.co.za",
    address: "Johannesburg, South Africa",
    banking: "Bank: Capitec | Acc: 0000000000 | Branch: 470010",
    rate: 280,
    prefix: "LVN",
    terms: "Term 1, Term 2, Term 3, Term 4",
    availability: "Mon-Fri 14:00-19:00, Sat 08:00-13:00",
    apiUrl: "",
    adminPassword: "learnview-admin",
    setupComplete: false
  },
  subjects: [
    { id: "SUB-0001", name: "Mathematics", description: "CAPS support and exam mastery", gradeRange: "8-12", price: 280, status: "Active" },
    { id: "SUB-0002", name: "Physical Sciences", description: "Physics, chemistry and practical revision", gradeRange: "10-12", price: 320, status: "Active" },
    { id: "SUB-0003", name: "Accounting", description: "Ledger work, statements and exam prep", gradeRange: "10-12", price: 300, status: "Active" },
    { id: "SUB-0004", name: "English", description: "Comprehension, essays and literature", gradeRange: "8-12", price: 260, status: "Active" }
  ],
  students: [
    { id: "STU-0001", name: "Amahle Dlamini", grade: "Grade 11", guardian: "Nokuthula Dlamini", parentPhone: "+27 82 111 8899", parentEmail: "nokuthula@example.com", studentPhone: "+27 71 442 9001", address: "Soweto", subjectIds: ["SUB-0001", "SUB-0002"], startDate: "2026-01-15", frequency: 2, days: "Tuesday, Thursday", time: "16:00", paymentType: "Monthly", status: "Active", photo: "", availabilityNotes: "Prefers late afternoons.", notes: "Strong algebra; needs mechanics practice." },
    { id: "STU-0002", name: "Liam Jacobs", grade: "Grade 10", guardian: "Karen Jacobs", parentPhone: "+27 83 222 7766", parentEmail: "karen@example.com", studentPhone: "+27 72 450 1122", address: "Randburg", subjectIds: ["SUB-0003", "SUB-0004"], startDate: "2026-02-01", frequency: 1, days: "Saturday", time: "09:00", paymentType: "Per lesson", status: "Active", photo: "", availabilityNotes: "Saturday mornings only.", notes: "Prefers concise homework packs." },
    { id: "STU-0003", name: "Thabo Mokoena", grade: "Grade 12", guardian: "Mpho Mokoena", parentPhone: "+27 84 333 6677", parentEmail: "mpho@example.com", studentPhone: "+27 76 118 2277", address: "Midrand", subjectIds: ["SUB-0001"], startDate: "2026-01-22", frequency: 2, days: "Monday, Wednesday", time: "17:30", paymentType: "Monthly", status: "Active", photo: "", availabilityNotes: "Avoid Friday evenings.", notes: "Exam sprint plan. Monitor calculus confidence." }
  ],
  schedule: [
    { id: "SCH-0001", studentId: "STU-0001", subjectId: "SUB-0001", day: "Tuesday", date: "2026-06-02", start: "16:00", end: "17:30", recurring: true, status: "Scheduled", type: "Individual", location: "Online", notes: "Functions" },
    { id: "SCH-0002", studentId: "STU-0001", subjectId: "SUB-0002", day: "Thursday", date: "2026-06-04", start: "16:00", end: "17:30", recurring: true, status: "Scheduled", type: "Individual", location: "Online", notes: "Newton laws" },
    { id: "SCH-0003", studentId: "STU-0002", subjectId: "SUB-0003", day: "Saturday", date: "2026-06-06", start: "09:00", end: "10:30", recurring: true, status: "Scheduled", type: "Individual", location: "LearnView office", notes: "Ledger drills" },
    { id: "SCH-0004", studentId: "STU-0003", subjectId: "SUB-0001", day: "Monday", date: "2026-06-01", start: "17:30", end: "19:00", recurring: true, status: "Scheduled", type: "Individual", location: "Online", notes: "Differentiation" }
  ],
  attendance: [
    { id: "ATT-0001", studentId: "STU-0001", subjectId: "SUB-0001", scheduleId: "SCH-0001", date: "2026-05-21", status: "Present", notes: "On time" },
    { id: "ATT-0002", studentId: "STU-0001", subjectId: "SUB-0002", scheduleId: "SCH-0002", date: "2026-05-23", status: "Late", notes: "10 minutes late" },
    { id: "ATT-0003", studentId: "STU-0002", subjectId: "SUB-0003", scheduleId: "SCH-0003", date: "2026-05-24", status: "Present", notes: "Completed homework" },
    { id: "ATT-0004", studentId: "STU-0003", subjectId: "SUB-0001", scheduleId: "SCH-0004", date: "2026-05-26", status: "Excused", notes: "School event" },
    { id: "ATT-0005", studentId: "STU-0003", subjectId: "SUB-0001", scheduleId: "SCH-0004", date: "2026-05-28", status: "Absent", notes: "No show" }
  ],
  assessments: [
    { id: "ASM-0001", studentId: "STU-0001", subjectId: "SUB-0001", type: "Monthly", name: "Functions Test", date: "2026-05-10", term: "Term 2", mark: 78, total: 100, comment: "Good improvement." },
    { id: "ASM-0002", studentId: "STU-0001", subjectId: "SUB-0002", type: "Weekly", name: "Forces Quiz", date: "2026-05-14", term: "Term 2", mark: 32, total: 40, comment: "Confident with diagrams." },
    { id: "ASM-0003", studentId: "STU-0002", subjectId: "SUB-0003", type: "Quarterly", name: "Financial Statements", date: "2026-05-18", term: "Term 2", mark: 61, total: 100, comment: "Needs more practice." },
    { id: "ASM-0004", studentId: "STU-0003", subjectId: "SUB-0001", type: "Weekly", name: "Calculus Sprint", date: "2026-05-20", term: "Term 2", mark: 70, total: 100, comment: "Solid, but speed needs work." }
  ],
  invoices: [
    { id: "LVN-0001", date: "2026-05-01", due: "2026-05-07", studentId: "STU-0001", guardian: "Nokuthula Dlamini", discount: 0, notes: "May tuition" },
    { id: "LVN-0002", date: "2026-05-02", due: "2026-05-09", studentId: "STU-0002", guardian: "Karen Jacobs", discount: 100, notes: "Balance due" },
    { id: "LVN-0003", date: "2026-05-03", due: "2026-05-10", studentId: "STU-0003", guardian: "Mpho Mokoena", discount: 0, notes: "Paid in full" }
  ],
  invoiceItems: [
    { id: "IIT-0001", invoiceId: "LVN-0001", subjectId: "SUB-0001", description: "Mathematics lessons", qty: 4, rate: 280 },
    { id: "IIT-0002", invoiceId: "LVN-0001", subjectId: "SUB-0002", description: "Physical Sciences lessons", qty: 4, rate: 280 },
    { id: "IIT-0003", invoiceId: "LVN-0002", subjectId: "SUB-0003", description: "Accounting lessons", qty: 4, rate: 300 },
    { id: "IIT-0004", invoiceId: "LVN-0003", subjectId: "SUB-0001", description: "Mathematics lessons", qty: 8, rate: 280 }
  ],
  payments: [
    { id: "PAY-0001", invoiceId: "LVN-0002", studentId: "STU-0002", date: "2026-05-05", amount: 600, method: "EFT", reference: "KJ-LIAM-MAY" },
    { id: "PAY-0002", invoiceId: "LVN-0003", studentId: "STU-0003", date: "2026-05-04", amount: 2240, method: "EFT", reference: "MM-THABO-MAY" }
  ],
  reportCards: [
    { id: "RPT-0001", studentId: "STU-0001", periodType: "Term", periodLabel: "Term 2 progress", startDate: "2026-05-01", endDate: "2026-05-31", subjectIds: ["SUB-0001", "SUB-0002"], tutorComments: "Excellent academic momentum.", date: "2026-05-28" }
  ],
  messages: []
};

export const state = loadState();
export const ui = {
  view: "dashboard",
  sectionAction: {},
  selectedStudentId: state.students[0]?.id || "",
  selectedInvoiceId: state.invoices[0]?.id || "",
  selectedReportId: state.reportCards[0]?.id || "",
  scheduleMode: "week",
  filters: {},
  navigationStack: [],
  aiMessages: [],
  aiLoading: false,
  aiLastContext: null,
  reportDraft: {
    studentId: state.students[0]?.id || "",
    periodType: "Term",
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    subjectIds: [],
    tutorComments: ""
  }
};

export function loadState() {
  const saved = safeGet(localStorage, STORAGE_KEY);
  const loaded = saved ? JSON.parse(saved) : clone(seed);
  return normalize(loaded);
}

export function normalize(data) {
  const merged = { ...clone(seed), ...data, settings: { ...seed.settings, ...(data.settings || {}) }, meta: { ...seed.meta, ...(data.meta || {}) } };
  merged.students = merged.students.map(student => ({ ...student, subjectIds: student.subjectIds || subjectIdsFromNames(student.subjects || []) }));
  merged.schedule = merged.schedule.map(row => ({ ...row, studentId: row.studentId || studentIdFromName(row.student), subjectId: row.subjectId || subjectIdFromName(row.subject), status: row.status || "Scheduled", recurring: row.recurring ?? true }));
  merged.attendance = merged.attendance.map(row => ({ ...row, studentId: row.studentId || studentIdFromName(row.student), subjectId: row.subjectId || subjectIdFromName(row.subject) }));
  merged.assessments = merged.assessments.map(row => ({ ...row, studentId: row.studentId || studentIdFromName(row.student), subjectId: row.subjectId || subjectIdFromName(row.subject) }));
  merged.invoices = merged.invoices.map(row => ({ ...row, studentId: row.studentId || studentIdFromName(row.student), discount: Number(row.discount || 0) }));
  merged.payments = merged.payments.map(row => ({ ...row, invoiceId: row.invoiceId || row.invoice, studentId: row.studentId || studentIdFromName(row.student) }));
  return merged;
}

function subjectIdsFromNames(names) {
  return names.map(subjectIdFromName).filter(Boolean);
}
function subjectIdFromName(name) {
  return seed.subjects.find(subject => subject.name === name)?.id || name;
}
function studentIdFromName(name) {
  return seed.students.find(student => student.name === name)?.id || name;
}

export function saveState() {
  safeSet(localStorage, STORAGE_KEY, JSON.stringify(state));
}

export function isAuthenticated() {
  const raw = safeGet(sessionStorage, SESSION_KEY);
  if (!raw) return false;
  const session = JSON.parse(raw);
  if (Date.now() - session.lastActive > SESSION_TIMEOUT_MS) {
    safeRemove(sessionStorage, SESSION_KEY);
    return false;
  }
  session.lastActive = Date.now();
  safeSet(sessionStorage, SESSION_KEY, JSON.stringify(session));
  return true;
}

export function login(password) {
  if (password !== state.settings.adminPassword) return false;
  safeSet(sessionStorage, SESSION_KEY, JSON.stringify({ signedIn: true, lastActive: Date.now() }));
  return true;
}

export function logout() {
  safeRemove(sessionStorage, SESSION_KEY);
}

export function getStudent(id) {
  return state.students.find(student => student.id === id);
}

export function getSubject(id) {
  return state.subjects.find(subject => subject.id === id);
}

export function studentName(id) {
  return getStudent(id)?.name || "Unknown student";
}

export function subjectName(id) {
  return getSubject(id)?.name || "Unknown subject";
}

export function invoiceItems(invoiceId) {
  return state.invoiceItems.filter(item => item.invoiceId === invoiceId);
}

export function invoiceSubtotal(invoiceId) {
  return invoiceItems(invoiceId).reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.rate || 0), 0);
}

export function invoicePaid(invoiceId) {
  return state.payments.filter(payment => payment.invoiceId === invoiceId).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
}

export function invoiceTotal(invoice) {
  return Math.max(0, invoiceSubtotal(invoice.id) - Number(invoice.discount || 0));
}

export function invoiceBalance(invoice) {
  return Math.max(0, invoiceTotal(invoice) - invoicePaid(invoice.id));
}

export function invoiceStatus(invoice) {
  const balance = invoiceBalance(invoice);
  if (balance <= 0) return "Paid";
  if (new Date(invoice.due) < new Date()) return "Overdue";
  if (invoicePaid(invoice.id) > 0) return "Partial";
  return "Unpaid";
}

export function attendancePercent(studentId) {
  const rows = state.attendance.filter(row => row.studentId === studentId);
  if (!rows.length) return 0;
  const counted = rows.filter(row => ["Present", "Late", "Excused"].includes(row.status)).length;
  return Math.round(counted / rows.length * 100);
}

export function performanceAverage(studentId, subjectIds, startDate, endDate) {
  const marks = state.assessments
    .filter(row => row.studentId === studentId)
    .filter(row => !subjectIds?.length || subjectIds.includes(row.subjectId))
    .filter(row => (!startDate || new Date(row.date) >= new Date(startDate)) && (!endDate || new Date(row.date) <= new Date(endDate)))
    .map(scorePercent);
  return average(marks);
}

export function hasScheduleConflict(lesson) {
  return state.schedule.some(row => row.id !== lesson.id
    && row.status !== "Cancelled"
    && lesson.status !== "Cancelled"
    && ((row.date && lesson.date && row.date === lesson.date) || row.day === lesson.day)
    && timeOverlaps(row.start, row.end, lesson.start, lesson.end));
}

export function upsert(collection, record) {
  const list = state[collection];
  const index = list.findIndex(item => item.id === record.id);
  if (index >= 0) list[index] = { ...list[index], ...record };
  else list.push({ ...record, id: record.id || uid(prefixFor(collection), list) });
  saveState();
  return index >= 0 ? list[index] : list[list.length - 1];
}

export function removeRecord(collection, id, soft = true) {
  const list = state[collection];
  const index = list.findIndex(item => item.id === id);
  if (index < 0) return;
  if (soft && "status" in list[index]) list[index].status = "Inactive";
  else list.splice(index, 1);
  saveState();
}

export function prefixFor(collection) {
  return {
    subjects: "SUB", students: "STU", schedule: "SCH", attendance: "ATT",
    assessments: "ASM", invoices: state.settings.prefix || "LVN",
    invoiceItems: "IIT", payments: "PAY", reportCards: "RPT", messages: "MSG"
  }[collection] || "REC";
}

export function replaceAll(nextState) {
  Object.keys(state).forEach(key => delete state[key]);
  Object.assign(state, normalize(nextState));
  saveState();
}
