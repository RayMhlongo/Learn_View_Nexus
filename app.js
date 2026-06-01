const ADMIN_PASSWORD = "learnview-admin";
const API_URL = "";
const LOGO_SRC = "assets/learnview-logo.jpeg";

const seed = {
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
    availability: "Mon-Fri 14:00-19:00, Sat 08:00-13:00"
  },
  subjects: [
    { id: "SUB-001", name: "Mathematics", description: "CAPS support and exam mastery", gradeRange: "8-12", price: 280, status: "Active" },
    { id: "SUB-002", name: "Physical Sciences", description: "Physics, chemistry and practical revision", gradeRange: "10-12", price: 320, status: "Active" },
    { id: "SUB-003", name: "Accounting", description: "Ledger work, statements and exam prep", gradeRange: "10-12", price: 300, status: "Active" },
    { id: "SUB-004", name: "English", description: "Comprehension, essays and literature", gradeRange: "8-12", price: 260, status: "Active" }
  ],
  students: [
    { id: "STU-001", name: "Amahle Dlamini", grade: "Grade 11", guardian: "Nokuthula Dlamini", parentPhone: "+27 82 111 8899", parentEmail: "nokuthula@example.com", studentPhone: "+27 71 442 9001", address: "Soweto", subjects: ["Mathematics", "Physical Sciences"], startDate: "2026-01-15", frequency: 2, days: "Tuesday, Thursday", time: "16:00", paymentType: "Monthly", status: "Active", photo: "", notes: "Strong algebra; needs mechanics practice." },
    { id: "STU-002", name: "Liam Jacobs", grade: "Grade 10", guardian: "Karen Jacobs", parentPhone: "+27 83 222 7766", parentEmail: "karen@example.com", studentPhone: "+27 72 450 1122", address: "Randburg", subjects: ["Accounting", "English"], startDate: "2026-02-01", frequency: 1, days: "Saturday", time: "09:00", paymentType: "Per lesson", status: "Active", photo: "", notes: "Prefers morning slots and concise homework packs." },
    { id: "STU-003", name: "Thabo Mokoena", grade: "Grade 12", guardian: "Mpho Mokoena", parentPhone: "+27 84 333 6677", parentEmail: "mpho@example.com", studentPhone: "+27 76 118 2277", address: "Midrand", subjects: ["Mathematics"], startDate: "2026-01-22", frequency: 2, days: "Monday, Wednesday", time: "17:30", paymentType: "Monthly", status: "Active", photo: "", notes: "Exam sprint plan. Monitor calculus confidence." }
  ],
  schedule: [
    { id: "SCH-001", student: "Amahle Dlamini", subject: "Mathematics", day: "Tuesday", date: "2026-06-02", start: "16:00", end: "17:30", sessions: 1, type: "Individual", location: "Online", notes: "Functions" },
    { id: "SCH-002", student: "Amahle Dlamini", subject: "Physical Sciences", day: "Thursday", date: "2026-06-04", start: "16:00", end: "17:30", sessions: 1, type: "Individual", location: "Online", notes: "Newton laws" },
    { id: "SCH-003", student: "Liam Jacobs", subject: "Accounting", day: "Saturday", date: "2026-06-06", start: "09:00", end: "10:30", sessions: 1, type: "Individual", location: "LearnView office", notes: "Ledger drills" },
    { id: "SCH-004", student: "Thabo Mokoena", subject: "Mathematics", day: "Monday", date: "2026-06-01", start: "17:30", end: "19:00", sessions: 1, type: "Individual", location: "Online", notes: "Differentiation" }
  ],
  assessments: [
    { id: "ASM-001", student: "Amahle Dlamini", subject: "Mathematics", type: "Monthly", name: "Functions Test", date: "2026-05-10", term: "Term 2", mark: 78, total: 100, comment: "Good improvement." },
    { id: "ASM-002", student: "Amahle Dlamini", subject: "Physical Sciences", type: "Weekly", name: "Forces Quiz", date: "2026-05-14", term: "Term 2", mark: 32, total: 40, comment: "Confident with diagrams." },
    { id: "ASM-003", student: "Liam Jacobs", subject: "Accounting", type: "Quarterly", name: "Financial Statements", date: "2026-05-18", term: "Term 2", mark: 61, total: 100, comment: "Needs more practice." },
    { id: "ASM-004", student: "Thabo Mokoena", subject: "Mathematics", type: "Weekly", name: "Calculus Sprint", date: "2026-05-20", term: "Term 2", mark: 70, total: 100, comment: "Solid, but speed needs work." }
  ],
  attendance: [
    { id: "ATT-001", student: "Amahle Dlamini", subject: "Mathematics", date: "2026-05-21", status: "Present", notes: "On time" },
    { id: "ATT-002", student: "Amahle Dlamini", subject: "Physical Sciences", date: "2026-05-23", status: "Late", notes: "10 minutes late" },
    { id: "ATT-003", student: "Liam Jacobs", subject: "Accounting", date: "2026-05-24", status: "Present", notes: "Completed homework" },
    { id: "ATT-004", student: "Thabo Mokoena", subject: "Mathematics", date: "2026-05-26", status: "Excused", notes: "School event" },
    { id: "ATT-005", student: "Thabo Mokoena", subject: "Mathematics", date: "2026-05-28", status: "Absent", notes: "No show" }
  ],
  invoices: [
    { id: "LVN-0001", date: "2026-05-01", due: "2026-05-07", student: "Amahle Dlamini", guardian: "Nokuthula Dlamini", package: "8 lessons: Maths and Science", qty: 8, rate: 280, discount: 0, status: "Unpaid", method: "EFT", notes: "May tuition" },
    { id: "LVN-0002", date: "2026-05-02", due: "2026-05-09", student: "Liam Jacobs", guardian: "Karen Jacobs", package: "4 Accounting lessons", qty: 4, rate: 300, discount: 100, status: "Partial", method: "EFT", notes: "Balance due" },
    { id: "LVN-0003", date: "2026-05-03", due: "2026-05-10", student: "Thabo Mokoena", guardian: "Mpho Mokoena", package: "8 Mathematics lessons", qty: 8, rate: 280, discount: 0, status: "Paid", method: "EFT", notes: "Paid in full" }
  ],
  payments: [
    { id: "PAY-001", invoice: "LVN-0002", student: "Liam Jacobs", date: "2026-05-05", amount: 600, method: "EFT", reference: "KJ-LIAM-MAY" },
    { id: "PAY-002", invoice: "LVN-0003", student: "Thabo Mokoena", date: "2026-05-04", amount: 2240, method: "EFT", reference: "MM-THABO-MAY" }
  ],
  reportCards: [
    { id: "RPT-001", student: "Amahle Dlamini", period: "Term 2 progress", overallAverage: 79, date: "2026-05-28" }
  ],
  messages: []
};

let state = loadState();
let view = "dashboard";
let selectedStudentId = state.students[0]?.id || "";
let scheduleMode = "week";
let filters = {};

const views = {
  dashboard: { title: "Command Center", icon: "layout-dashboard" },
  students: { title: "Student Profiles", icon: "users" },
  schedule: { title: "Scheduling", icon: "calendar-days" },
  attendance: { title: "Attendance", icon: "user-check" },
  assessments: { title: "Assessments", icon: "clipboard-check" },
  invoices: { title: "Invoices", icon: "receipt" },
  reports: { title: "Report Cards", icon: "file-text" },
  analytics: { title: "Business Intelligence", icon: "chart-column" },
  communications: { title: "Parent Communication", icon: "message-circle" },
  subjects: { title: "Subjects", icon: "book-open" },
  settings: { title: "Settings", icon: "settings" },
  setup: { title: "Google Sheets Setup", icon: "database" }
};

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function storageGet(key) { try { return localStorage.getItem(key); } catch (error) { return null; } }
function storageSet(key, value) { try { localStorage.setItem(key, value); } catch (error) {} }
function sessionGet(key) { try { return sessionStorage.getItem(key); } catch (error) { return null; } }
function sessionSet(key, value) { try { sessionStorage.setItem(key, value); } catch (error) {} }
function sessionRemove(key) { try { sessionStorage.removeItem(key); } catch (error) {} }
function loadState() {
  const saved = storageGet("learnview-commercial-state");
  if (saved) return normalize(JSON.parse(saved));
  return normalize(clone(seed));
}
function normalize(data) {
  return {
    ...clone(seed),
    ...data,
    settings: { ...seed.settings, ...(data.settings || {}) },
    attendance: data.attendance || seed.attendance,
    messages: data.messages || []
  };
}
function saveState() { storageSet("learnview-commercial-state", JSON.stringify(state)); }
function money(n) { return `R ${Number(n || 0).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; }
function pct(a) { return Math.round((Number(a.mark) / Number(a.total || 1)) * 100); }
function avg(list) { return list.length ? Math.round(list.reduce((sum, n) => sum + n, 0) / list.length) : 0; }
function totalInvoice(i) { return Number(i.qty || 0) * Number(i.rate || 0) - Number(i.discount || 0); }
function paidFor(invoiceId) { return state.payments.filter(p => p.invoice === invoiceId).reduce((sum, p) => sum + Number(p.amount || 0), 0); }
function balanceDue(i) { return Math.max(0, totalInvoice(i) - paidFor(i.id)); }
function id(prefix, list) { return `${prefix}-${String(list.length + 1).padStart(3, "0")}`; }
function invoiceId() { return `${state.settings.prefix}-${String(state.invoices.length + 1).padStart(4, "0")}`; }
function initials(name) { return name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase(); }
function logo(cls = "logo-main") { return `<img class="logo ${cls}" src="${LOGO_SRC}" alt="LearnView logo">`; }
function icon(name) { return `<i data-lucide="${name}" aria-hidden="true"></i>`; }
function refreshIcons() { if (window.lucide) lucide.createIcons(); }
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}
function badge(value) { return `<span class="badge ${String(value).toLowerCase()}">${value}</span>`; }
function studentByName(name) { return state.students.find(s => s.name === name); }
function selectedStudent() { return state.students.find(s => s.id === selectedStudentId) || state.students[0]; }
function studentAssessments(name) { return state.assessments.filter(a => a.student === name); }
function studentAttendance(name) { return state.attendance.filter(a => a.student === name); }
function studentInvoices(name) { return state.invoices.filter(i => i.student === name); }
function attendancePercent(name) {
  const rows = studentAttendance(name);
  if (!rows.length) return 0;
  const good = rows.filter(r => ["Present", "Late", "Excused"].includes(r.status)).length;
  return Math.round((good / rows.length) * 100);
}
function performanceAverage(name) { return avg(studentAssessments(name).map(pct)); }

const api = {
  async request(action, sheet, payload = {}) {
    if (!API_URL) return { ok: true, demo: true };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action, sheet, payload })
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Google Sheets request failed");
      return data;
    } catch (error) {
      toast(error.message);
      return { ok: false, error: error.message };
    }
  }
};

function render() {
  const authed = sessionGet("learnview-auth") === "true";
  document.getElementById("app").innerHTML = authed ? shell() : login();
  refreshIcons();
}

function login() {
  return `
    <section class="login">
      <div class="login-hero">
        <div>${logo()}<p class="eyebrow">LearnView Nexus</p></div>
        <div>
          <h1>Commercial tutoring operations, beautifully controlled.</h1>
          <p class="login-copy">A premium workspace for student profiles, scheduling, attendance, assessments, invoices, report cards, analytics and parent communication.</p>
        </div>
        <p><strong>${state.settings.tagline}</strong></p>
      </div>
      <form class="login-card" onsubmit="loginSubmit(event)">
        ${logo()}
        <h2>Welcome back</h2>
        <p class="muted">Sign in to manage LearnView Nexus.</p>
        <label class="field"><span>Admin password</span><input id="password" type="password" required autocomplete="current-password" placeholder="Enter admin password"></label>
        <button class="btn primary" type="submit">${icon("log-in")} Sign in</button>
        <p class="muted">Demo password: <strong>learnview-admin</strong></p>
      </form>
    </section>`;
}

function loginSubmit(e) {
  e.preventDefault();
  if (document.getElementById("password").value.trim() === ADMIN_PASSWORD) {
    sessionSet("learnview-auth", "true");
    render();
    toast("Signed in");
  } else toast("Incorrect password");
}

function shell() {
  return `
    <section class="shell">
      <aside class="sidebar">
        <div class="brand">${logo("logo-main")}</div>
        <nav class="nav">${Object.entries(views).map(([key, meta]) => navButton(key, meta)).join("")}</nav>
        <div class="sidebar-card">
          <strong>Demo mode</strong>
          <p>Connect Apps Script when ready to sync every workflow to Google Sheets.</p>
        </div>
      </aside>
      <section class="content">
        <header class="topbar">
          <div>
            <div class="mobile-brand">${logo("logo-mini")}<strong>LearnView</strong></div>
            <h2>${views[view].title}</h2>
            <p>${state.settings.businessName} · ${state.settings.tagline}</p>
          </div>
          <div class="actions">
            <button class="btn ghost" onclick="window.print()">${icon("printer")} Print</button>
            <button class="btn" onclick="logout()">${icon("log-out")} Exit</button>
          </div>
        </header>
        <div class="page">${routes[view]()}</div>
        <button class="btn primary fab" onclick="quickAdd()" title="Quick add">${icon("plus")}</button>
      </section>
      <div class="modal" id="modal"></div>
      <div class="toast"></div>
    </section>`;
}
function navButton(key, meta) {
  return `<button class="${view === key ? "active" : ""}" onclick="go('${key}')">${icon(meta.icon)}<span>${meta.title}</span></button>`;
}
function go(target) { view = target; render(); }
function logout() { sessionRemove("learnview-auth"); render(); }
function quickAdd() {
  const map = { students: openStudent, schedule: openSchedule, attendance: openAttendance, assessments: openAssessment, invoices: openInvoice, subjects: openSubject };
  (map[view] || openStudent)();
}

const routes = {
  dashboard() {
    const active = state.students.filter(s => s.status === "Active").length;
    const outstanding = state.invoices.reduce((sum, i) => sum + balanceDue(i), 0);
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return `
      <section class="panel">
        <div class="profile-hero">
          <div>${logo("logo-main")}</div>
          <div>
            <p class="eyebrow">Premium SaaS Operations</p>
            <h1 style="margin:0;font-size:34px">Run every learner, lesson and rand from one command center.</h1>
            <p class="muted">Live demo data is active until the Google Sheets backend is connected.</p>
          </div>
          <button class="btn primary" onclick="go('analytics')">${icon("chart-column")} View BI</button>
        </div>
      </section>
      <div class="grid cols-5">
        ${kpi("Total students", state.students.length, "users")}
        ${kpi("Active students", active, "user-check")}
        ${kpi("Attendance", `${avg(state.students.map(s => attendancePercent(s.name)))}%`, "badge-check")}
        ${kpi("Outstanding", money(outstanding), "receipt")}
        ${kpi("Avg performance", `${avg(state.students.map(s => performanceAverage(s.name)))}%`, "trending-up")}
      </div>
      <div class="grid cols-2">
        <section class="card">
          <div class="section-title"><h3>Priority workflows</h3></div>
          <div class="actions">
            ${quick("students", "Student profile", "user-round")}
            ${quick("schedule", "Schedule lesson", "calendar-plus")}
            ${quick("attendance", "Mark attendance", "clipboard-check")}
            ${quick("invoices", "Create invoice", "receipt")}
            ${quick("reports", "Generate report", "file-text")}
            ${quick("communications", "Message parent", "message-circle")}
          </div>
        </section>
        <section class="card">
          <div class="section-title"><h3>Today’s agenda</h3><span class="badge active">${today}</span></div>
          ${agendaList(state.schedule.filter(s => s.day === today), true)}
        </section>
      </div>
      <div class="grid cols-2">
        <section class="card">${bars("Revenue by invoice status", invoiceStatusTotals(), "R")}</section>
        <section class="card">${table("Recent assessment signals", ["Student", "Subject", "Score", "Comment"], state.assessments.slice(-5).reverse().map(a => [a.student, a.subject, `${pct(a)}%`, a.comment]))}</section>
      </div>`;
  },
  students() {
    const students = filteredStudents();
    return `
      <section class="card no-print">${studentFilters()}</section>
      <div class="grid cols-3">
        <section class="card" style="grid-column:span 1">
          <div class="section-title"><h3>Students</h3><button class="btn primary" onclick="openStudent()">${icon("user-plus")} Add</button></div>
          <div class="timeline">${students.map(studentListItem).join("") || emptyState("No students match these filters.")}</div>
        </section>
        <section class="card" style="grid-column:span 2">${studentProfile(selectedStudent())}</section>
      </div>`;
  },
  schedule() {
    return `
      <section class="card no-print">
        <div class="calendar-toolbar">
          <div class="tabs">${["week", "month", "day"].map(m => `<button class="${scheduleMode === m ? "active" : ""}" onclick="setScheduleMode('${m}')">${m[0].toUpperCase() + m.slice(1)}</button>`).join("")}</div>
          <div class="actions">
            <button class="btn primary" onclick="openSchedule()">${icon("calendar-plus")} Add lesson</button>
            <button class="btn ghost" onclick="window.print()">${icon("printer")} Print schedule</button>
          </div>
        </div>
      </section>
      <section class="card no-print">
        <div class="section-title"><h3>Tutor availability</h3><span class="badge active">Conflict detection on</span></div>
        <div class="availability">${["Mon 14-19", "Tue 14-19", "Wed 14-19", "Thu 14-19", "Fri 14-18", "Sat 08-13", "Sun Closed"].map(x => `<div>${x}</div>`).join("")}</div>
      </section>
      <section class="print-doc">${watermark()}<div class="doc-content">${docHead("Weekly Schedule", "Printable teaching timetable")}${scheduleView()}</div></section>`;
  },
  attendance() {
    const rows = state.attendance.map(a => [a.date, a.student, a.subject, badge(a.status), a.notes]);
    return `
      <div class="grid cols-4">
        ${kpi("Attendance rate", `${avg(state.students.map(s => attendancePercent(s.name)))}%`, "badge-check")}
        ${kpi("Present", state.attendance.filter(a => a.status === "Present").length, "check")}
        ${kpi("Late", state.attendance.filter(a => a.status === "Late").length, "clock")}
        ${kpi("Absent", state.attendance.filter(a => a.status === "Absent").length, "x")}
      </div>
      <section class="card"><div class="section-title"><h3>Attendance register</h3><button class="btn primary" onclick="openAttendance()">${icon("clipboard-plus")} Mark attendance</button></div>${table("", ["Date", "Student", "Subject", "Status", "Notes"], rows)}</section>
      <section class="card">${bars("Attendance by student", Object.fromEntries(state.students.map(s => [s.name, attendancePercent(s.name)])), "%")}</section>`;
  },
  assessments() {
    return `
      <section class="card"><div class="section-title"><h3>Assessment history</h3><button class="btn primary" onclick="openAssessment()">${icon("clipboard-plus")} Add mark</button></div>
      ${table("", ["Student", "Subject", "Type", "Date", "Score", "Performance", "Comment"], state.assessments.map(a => [a.student, a.subject, a.type, a.date, `${a.mark}/${a.total}`, `${pct(a)}%`, a.comment]))}</section>
      <div class="grid cols-2"><section class="card">${bars("Subject averages", subjectAverages(), "%")}</section><section class="card">${performanceTrends()}</section></div>`;
  },
  invoices() {
    const selected = state.invoices[0];
    return `
      <section class="card no-print"><div class="section-title"><h3>Invoice control</h3><button class="btn primary" onclick="openInvoice()">${icon("receipt")} New invoice</button></div>
      ${table("", ["Invoice", "Student", "Due", "Total", "Paid", "Balance", "Status", ""], state.invoices.map(i => [i.id, i.student, i.due, money(totalInvoice(i)), money(paidFor(i.id)), money(balanceDue(i)), badge(i.status), `<button class="btn ghost" onclick="previewInvoice('${i.id}')">${icon("eye")} View</button>`]))}</section>
      ${invoiceDoc(selected)}`;
  },
  reports() {
    const student = selectedStudent();
    return `
      <section class="card no-print">
        <div class="section-title"><h3>Report card generator</h3><div class="actions">${studentPicker()}<button class="btn primary" onclick="saveReportCard()">${icon("file-text")} Generate</button></div></div>
      </section>
      ${reportDoc(student)}`;
  },
  analytics() {
    return `
      <div class="grid cols-4">
        ${kpi("Monthly income", money(state.payments.reduce((s,p)=>s+Number(p.amount||0),0)), "banknote")}
        ${kpi("Outstanding", money(state.invoices.reduce((s,i)=>s+balanceDue(i),0)), "alert-circle")}
        ${kpi("Growth", "+18%", "trending-up")}
        ${kpi("At-risk students", studentsNeedingAttention().length, "radar")}
      </div>
      <div class="grid cols-2">
        <section class="card">${bars("Students per grade", groupCount(state.students, "grade"))}</section>
        <section class="card">${bars("Students per subject", subjectCounts())}</section>
        <section class="card">${bars("Assessment analytics", subjectAverages(), "%")}</section>
        <section class="card">${bars("Attendance analytics", Object.fromEntries(state.students.map(s => [s.name, attendancePercent(s.name)])), "%")}</section>
      </div>
      <section class="card"><div class="section-title"><h3>Business trend</h3><span class="badge active">Interactive chart style</span></div>${spark([38, 44, 52, 61, 73, 82, 88, 96])}</section>
      <section class="card">${table("Students needing attention", ["Student", "Performance", "Attendance", "Action"], studentsNeedingAttention().map(s => [s.name, `${performanceAverage(s.name)}%`, `${attendancePercent(s.name)}%`, `<button class="btn ghost" onclick="composeMessage('${s.id}','performance')">${icon("message-circle")} Notify</button>`]))}</section>`;
  },
  communications() {
    return `
      <section class="panel">
        <div class="profile-hero">
          ${logo("logo-main")}
          <div><p class="eyebrow">Parent communication</p><h2 style="margin:0">Generate polished WhatsApp-ready messages.</h2><p class="muted">Invoice reminders, attendance notices and performance updates are generated from live student data.</p></div>
          <button class="btn primary" onclick="composeMessage('${selectedStudentId}','invoice')">${icon("message-circle")} Compose</button>
        </div>
      </section>
      <div class="grid cols-3">${state.students.map(s => commCard(s)).join("")}</div>
      <section class="card">${table("Message log", ["Date", "Student", "Type", "Message"], state.messages.slice().reverse().map(m => [m.date, m.student, m.type, m.text]))}</section>`;
  },
  subjects() {
    return `<section class="card"><div class="section-title"><h3>Subject catalogue</h3><button class="btn primary" onclick="openSubject()">${icon("plus")} Add subject</button></div>${table("", ["Name", "Description", "Grades", "Default price", "Status", ""], state.subjects.map(s => [s.name, s.description, s.gradeRange, money(s.price), badge(s.status), rowActions("subjects", s.id)]))}</section>`;
  },
  settings() {
    return `<section class="card"><div class="section-title"><h3>Business settings</h3><button class="btn primary" onclick="saveSettings()">${icon("save")} Save</button></div><div class="form-grid">${[
      ["businessName","Business name"],["tagline","Tagline"],["tutorName","Tutor name"],["phone","Phone number"],["email","Email address"],["address","Physical address"],["banking","Banking details"],["rate","Default hourly rate"],["prefix","Invoice prefix"],["terms","Report card term labels"],["availability","Tutor availability"]
    ].map(([k,l]) => fieldHtml(k, l, state.settings[k], "set-")).join("")}</div></section>`;
  },
  setup() {
    return `<section class="card">${emptyState("Google Sheets setup is ready. Deploy apps-script/Code.gs, paste the web app URL into API_URL, then all commercial workflows can sync from one service layer.")}</section>
    <section class="card">${table("Required database sheets", ["Sheet", "Commercial purpose"], ["Settings", "Subjects", "Students", "Schedule", "Attendance", "Assessments", "Invoices", "InvoiceItems", "Payments", "ReportCards", "Messages"].map(s => [s, `${s} records with CreatedAt and UpdatedAt timestamps`]))}</section>`;
  }
};

function kpi(label, value, ic) {
  return `<section class="card kpi"><div class="icon-pill">${icon(ic)}</div><div><div class="value">${value}</div><div class="label">${label}</div></div></section>`;
}
function quick(v, label, ic) { return `<button class="btn primary" onclick="go('${v}')">${icon(ic)} ${label}</button>`; }
function emptyState(text) { return `<div class="empty">${logo("logo-mini")}<strong>${text}</strong></div>`; }
function table(title, heads, rows) {
  const heading = title ? `<div class="section-title"><h3>${title}</h3></div>` : "";
  return `${heading}<div class="table-wrap"><table><thead><tr>${heads.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td data-label="${heads[i]}">${c ?? ""}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function bars(title, data, suffix = "") {
  const values = Object.values(data).map(Number);
  const max = Math.max(1, ...values);
  return `<div class="section-title"><h3>${title}</h3></div><div class="chart-bar">${Object.entries(data).map(([k, v]) => `<div class="bar-row"><strong>${k}</strong><div class="bar"><span style="width:${Math.max(4, (Number(v) / max) * 100)}%"></span></div><b>${suffix === "R" ? money(v) : `${v}${suffix}`}</b></div>`).join("")}</div>`;
}
function spark(points) { return `<div class="sparkline">${points.map(p => `<span style="height:${p}%"></span>`).join("")}</div>`; }
function groupCount(list, key) { return list.reduce((a, x) => { a[x[key]] = (a[x[key]] || 0) + 1; return a; }, {}); }
function subjectCounts() {
  const out = {};
  state.students.forEach(s => s.subjects.forEach(sub => out[sub] = (out[sub] || 0) + 1));
  return out;
}
function subjectAverages() {
  const out = {};
  state.subjects.forEach(s => {
    const marks = state.assessments.filter(a => a.subject === s.name).map(pct);
    out[s.name] = avg(marks);
  });
  return out;
}
function invoiceStatusTotals() {
  return state.invoices.reduce((a, i) => { a[i.status] = (a[i.status] || 0) + totalInvoice(i); return a; }, {});
}
function studentsNeedingAttention() {
  return state.students.filter(s => performanceAverage(s.name) < 65 || attendancePercent(s.name) < 80);
}
function studentFilters() {
  return `<div class="toolbar">
    <input aria-label="Search students" placeholder="Search students, parents, subjects" oninput="filters.search=this.value;render()" value="${filters.search || ""}">
    <select aria-label="Grade" onchange="filters.grade=this.value;render()"><option value="">All grades</option>${["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map(g => `<option ${filters.grade === g ? "selected" : ""}>${g}</option>`).join("")}</select>
    <select aria-label="Subject" onchange="filters.subject=this.value;render()"><option value="">All subjects</option>${state.subjects.map(s => `<option ${filters.subject === s.name ? "selected" : ""}>${s.name}</option>`).join("")}</select>
    <select aria-label="Status" onchange="filters.status=this.value;render()"><option value="">All statuses</option><option>Active</option><option>Inactive</option></select>
  </div>`;
}
function filteredStudents() {
  return state.students.filter(s => (!filters.search || JSON.stringify(s).toLowerCase().includes(filters.search.toLowerCase())) && (!filters.grade || s.grade === filters.grade) && (!filters.subject || s.subjects.includes(filters.subject)) && (!filters.status || s.status === filters.status));
}
function studentListItem(s) {
  return `<button class="timeline-card" style="text-align:left;border:0" onclick="selectStudent('${s.id}')"><div class="profile-hero" style="grid-template-columns:auto 1fr"><div class="avatar">${s.photo ? `<img src="${s.photo}" alt="">` : initials(s.name)}</div><div><strong>${s.name}</strong><br><span class="muted">${s.grade} · ${s.subjects.join(", ")}</span><br>${badge(s.status)}</div></div></button>`;
}
function selectStudent(id) { selectedStudentId = id; render(); }
function studentProfile(s) {
  if (!s) return emptyState("No student selected.");
  const marks = studentAssessments(s.name);
  const invoices = studentInvoices(s.name);
  const attendance = studentAttendance(s.name);
  return `
    <div class="profile-hero">
      <div class="avatar">${s.photo ? `<img src="${s.photo}" alt="${s.name}">` : initials(s.name)}</div>
      <div><h2 style="margin:0">${s.name}</h2><p class="muted">${s.grade} · ${s.subjects.join(", ")} · ${s.status}</p></div>
      <div class="actions"><button class="btn ghost" onclick="composeMessage('${s.id}','performance')">${icon("message-circle")} Message</button><button class="btn primary" onclick="go('reports')">${icon("file-text")} Report</button></div>
    </div>
    <div class="grid cols-4" style="margin-top:18px">
      ${kpi("Performance", `${performanceAverage(s.name)}%`, "trending-up")}
      ${kpi("Attendance", `${attendancePercent(s.name)}%`, "badge-check")}
      ${kpi("Outstanding", money(invoices.reduce((sum, i) => sum + balanceDue(i), 0)), "receipt")}
      ${kpi("Lessons/week", s.frequency, "calendar-clock")}
    </div>
    <div class="tabs" style="margin-top:18px"><button class="active">Overview</button><button>Parent</button><button>Subjects</button><button>Attendance</button><button>Assessments</button><button>Invoices</button><button>Notes</button></div>
    <div class="grid cols-2" style="margin-top:18px">
      <section class="card"><h3>Parent information</h3><p><strong>${s.guardian}</strong><br>${s.parentPhone}<br>${s.parentEmail}<br>${s.address}</p></section>
      <section class="card"><h3>Performance trend</h3>${spark(marks.map(pct).concat([performanceAverage(s.name)]))}</section>
      <section class="card">${table("Attendance", ["Date", "Subject", "Status", "Notes"], attendance.map(a => [a.date, a.subject, badge(a.status), a.notes]))}</section>
      <section class="card">${table("Assessment history", ["Date", "Subject", "Assessment", "Score"], marks.map(a => [a.date, a.subject, a.name, `${pct(a)}%`]))}</section>
      <section class="card">${table("Invoices", ["Invoice", "Total", "Paid", "Balance", "Status"], invoices.map(i => [i.id, money(totalInvoice(i)), money(paidFor(i.id)), money(balanceDue(i)), badge(i.status)]))}</section>
      <section class="card"><h3>Notes</h3><p>${s.notes}</p><p><strong>Generated reports:</strong> ${state.reportCards.filter(r => r.student === s.name).length}</p></section>
    </div>`;
}
function agendaList(items, compact = false) {
  if (!items.length) return emptyState("No lessons scheduled.");
  return `<div class="timeline">${items.map(s => `<div class="agenda-row"><strong>${s.start}</strong><div class="lesson ${hasConflict(s) ? "conflict" : ""}" draggable="true" ondragstart="dragLesson(event,'${s.id}')"><strong>${s.student}</strong><br>${s.subject} · ${s.location}<br><span class="muted">${s.start}-${s.end} ${hasConflict(s) ? "· conflict" : ""}</span></div></div>`).join("")}</div>`;
}
function hasConflict(lesson) {
  return state.schedule.some(s => s.id !== lesson.id && s.day === lesson.day && s.start < lesson.end && lesson.start < s.end);
}
function scheduleView() {
  if (scheduleMode === "day") return agendaList(state.schedule.sort((a,b) => a.start.localeCompare(b.start)));
  if (scheduleMode === "month") return `<div class="calendar-month">${Array.from({ length: 35 }, (_, i) => `<div class="month-day" ondragover="event.preventDefault()" ondrop="dropLesson(event,'${dayNames()[i % 7]}')"><strong>${i + 1}</strong>${state.schedule.filter(s => dayNames().indexOf(s.day) === i % 7).slice(0, 2).map(s => `<div class="lesson">${s.start} ${s.student}</div>`).join("")}</div>`).join("")}</div>`;
  return `<div class="calendar-week">${dayNames().map(d => `<div class="day" ondragover="event.preventDefault()" ondrop="dropLesson(event,'${d}')"><strong>${d}</strong>${state.schedule.filter(s => s.day === d).sort((a,b)=>a.start.localeCompare(b.start)).map(s => `<div class="lesson ${hasConflict(s) ? "conflict" : ""}" draggable="true" ondragstart="dragLesson(event,'${s.id}')"><strong>${s.start}-${s.end}</strong><br>${s.student}<br>${s.subject}<br><span class="muted">${s.type} · ${s.location}</span></div>`).join("")}</div>`).join("")}</div>`;
}
function dayNames() { return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]; }
function setScheduleMode(mode) { scheduleMode = mode; render(); }
function dragLesson(e, lessonId) { e.dataTransfer.setData("text/plain", lessonId); }
function dropLesson(e, day) {
  const lesson = state.schedule.find(s => s.id === e.dataTransfer.getData("text/plain"));
  if (lesson) {
    lesson.day = day;
    saveState();
    render();
    toast("Lesson moved. Conflict detection refreshed.");
  }
}
function studentPicker() {
  return `<select onchange="selectedStudentId=this.value;render()">${state.students.map(s => `<option value="${s.id}" ${selectedStudentId === s.id ? "selected" : ""}>${s.name}</option>`).join("")}</select>`;
}
function watermark() { return `<div class="watermark">${logo("logo-doc")}</div>`; }
function docHead(title, meta) {
  return `<div class="doc-head"><div>${logo("logo-doc")}<p><strong>${state.settings.businessName}</strong><br>${state.settings.tutorName}<br>${state.settings.phone} · ${state.settings.email}<br>${state.settings.address}</p></div><div><div class="doc-title">${title}</div><p class="muted">${meta}</p><div class="qr" aria-label="QR verification code"></div></div></div>`;
}
function invoiceDoc(i) {
  if (!i) return "";
  const student = studentByName(i.student);
  return `<section class="print-doc">${watermark()}<div class="status-ribbon">${i.status}</div><div class="doc-content">${docHead("Invoice", i.id)}
    <div class="grid cols-3"><section class="card"><strong>Bill to</strong><p>${i.student}<br>${i.guardian}<br>${student?.parentEmail || ""}</p></section><section class="card"><strong>Due date</strong><p>${i.due}</p>${badge(i.status)}</section><section class="card"><strong>Balance due</strong><h2>${money(balanceDue(i))}</h2></section></div>
    ${table("Invoice items", ["Description", "Qty", "Rate", "Subtotal", "Discount", "Total"], [[i.package, i.qty, money(i.rate), money(Number(i.qty)*Number(i.rate)), money(i.discount), money(totalInvoice(i))]])}
    ${table("Payment history", ["Date", "Amount", "Method", "Reference"], state.payments.filter(p => p.invoice === i.id).map(p => [p.date, money(p.amount), p.method, p.reference]))}
    <p><strong>Banking details:</strong> ${state.settings.banking}</p><p>${i.notes || ""}</p></div></section>`;
}
function reportDoc(s) {
  const marks = studentAssessments(s.name);
  const overall = performanceAverage(s.name);
  return `<section class="print-doc">${watermark()}<div class="doc-content">${docHead("Report Card", `${s.name} · ${s.grade}`)}
    <div class="grid cols-4">${kpi("Overall average", `${overall}%`, "trending-up")}${kpi("Attendance", `${attendancePercent(s.name)}%`, "badge-check")}${kpi("Rating", overall >= 75 ? "Excellent" : overall >= 60 ? "Satisfactory" : "Support", "award")}${kpi("Subjects", s.subjects.length, "book-open")}</div>
    <div class="grid cols-2" style="margin-top:18px"><section class="card"><h3>Student details</h3><p>${s.name}<br>${s.grade}<br>Guardian: ${s.guardian}</p></section><section class="card"><h3>Tutor comments</h3><p>${overall >= 75 ? "Excellent academic momentum. Continue extension practice." : overall >= 60 ? "Steady progress. Focus on consistency and exam timing." : "Additional intervention recommended with weekly progress checks."}</p></section></div>
    ${table("Subject results", ["Subject", "Assessment", "Date", "Score", "Comment"], marks.map(a => [a.subject, a.name, a.date, `${pct(a)}%`, a.comment]))}
    <div class="grid cols-2"><p style="margin-top:42px;border-top:1px solid var(--line);padding-top:12px">Parent signature</p><p style="margin-top:42px;border-top:1px solid var(--line);padding-top:12px">Tutor signature</p></div><p>Date generated: ${new Date().toLocaleDateString("en-ZA")}</p></div></section>`;
}
function commCard(s) {
  return `<section class="card"><div class="profile-hero" style="grid-template-columns:auto 1fr"><div class="avatar">${initials(s.name)}</div><div><h3>${s.name}</h3><p class="muted">${s.guardian} · ${s.parentPhone}</p></div></div><div class="actions"><button class="btn ghost" onclick="composeMessage('${s.id}','invoice')">Invoice</button><button class="btn ghost" onclick="composeMessage('${s.id}','attendance')">Attendance</button><button class="btn primary" onclick="composeMessage('${s.id}','performance')">Performance</button></div></section>`;
}
function composeMessage(studentId, type) {
  const s = state.students.find(x => x.id === studentId);
  const due = studentInvoices(s.name).reduce((sum, i) => sum + balanceDue(i), 0);
  const templates = {
    invoice: `Hi ${s.guardian}, this is LearnView. ${s.name}'s current balance is ${money(due)}. Please use the banking details on the latest invoice. Thank you.`,
    attendance: `Hi ${s.guardian}, attendance update for ${s.name}: current attendance is ${attendancePercent(s.name)}%. We will keep monitoring lesson consistency.`,
    performance: `Hi ${s.guardian}, performance update for ${s.name}: current average is ${performanceAverage(s.name)}%. We recommend focusing on ${s.subjects[0]} practice this week.`
  };
  const text = templates[type];
  state.messages.push({ id: id("MSG", state.messages), date: new Date().toLocaleDateString("en-ZA"), student: s.name, type, text });
  saveState();
  openModal("WhatsApp message", `<textarea readonly>${text}</textarea><p class="muted">Copy this into WhatsApp or connect a messaging integration later.</p>`, "closeOnly");
}
function saveReportCard() {
  const s = selectedStudent();
  state.reportCards.push({ id: id("RPT", state.reportCards), student: s.name, period: "Generated report", overallAverage: performanceAverage(s.name), date: new Date().toLocaleDateString("en-ZA") });
  saveState();
  toast("Report card generated");
}
function performanceTrends() {
  return `<div class="section-title"><h3>Performance trends</h3></div>${state.students.map(s => `<div style="margin-bottom:14px"><strong>${s.name}</strong>${spark(studentAssessments(s.name).map(pct).concat([performanceAverage(s.name)]))}</div>`).join("")}`;
}
function rowActions(type, recordId) {
  return `<div class="actions"><button class="btn ghost" onclick="editRecord('${type}','${recordId}')">${icon("pencil")} Edit</button><button class="btn danger icon-only" onclick="deleteRecord('${type}','${recordId}')">${icon("trash-2")}</button></div>`;
}
function openModal(title, body, submit) {
  document.getElementById("modal").innerHTML = `<form class="modal-card" onsubmit="${submit}(event)"><div class="section-title"><h3>${title}</h3><button class="btn ghost" type="button" onclick="closeModal()">${icon("x")} Close</button></div>${body}<div class="actions"><button class="btn primary" type="submit">${icon("save")} Save</button></div></form>`;
  document.getElementById("modal").classList.add("open");
  refreshIcons();
}
function closeModal() { document.getElementById("modal").classList.remove("open"); }
function closeOnly(e) { e.preventDefault(); closeModal(); }
function fieldHtml(name, label, value = "", prefix = "", type = "input") {
  return `<label class="field"><span>${label}</span><${type} id="${prefix}${name}" name="${name}" ${type === "textarea" ? "" : `value="${value || ""}"`}>${type === "textarea" ? value || "" : ""}</${type}></label>`;
}
function selectHtml(name, label, options, multiple = false) {
  return `<label class="field"><span>${label}</span><select name="${name}" ${multiple ? "multiple" : ""}>${options.map(o => `<option>${o}</option>`).join("")}</select></label>`;
}
function dataFrom(e) { return Object.fromEntries(new FormData(e.target).entries()); }
function openStudent() {
  openModal("Student profile", `<div class="form-grid">${fieldHtml("name","Full name")}${selectHtml("grade","Grade",["Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"])}${fieldHtml("guardian","Parent or guardian")}${fieldHtml("parentPhone","Parent phone")}${fieldHtml("parentEmail","Parent email")}${fieldHtml("studentPhone","Student phone")}${fieldHtml("address","Address")}${fieldHtml("photo","Student photo URL")}${selectHtml("subjects","Subjects",state.subjects.map(s=>s.name),true)}${fieldHtml("startDate","Start date")}${fieldHtml("frequency","Lessons per week")}${fieldHtml("days","Preferred days")}${fieldHtml("time","Preferred time")}${selectHtml("paymentType","Payment type",["Monthly","Per lesson"])}${selectHtml("status","Status",["Active","Inactive"])}${fieldHtml("notes","Notes","","","textarea")}</div>`, "saveStudent");
}
async function saveStudent(e) {
  e.preventDefault();
  const d = dataFrom(e);
  d.subjects = Array.from(e.target.subjects.selectedOptions).map(o => o.value);
  const student = { id: id("STU", state.students), ...d };
  state.students.push(student);
  selectedStudentId = student.id;
  await api.request("POST", "Students", student);
  saveState(); closeModal(); render(); toast("Student profile created");
}
function openSubject() { openModal("Subject", `<div class="form-grid">${fieldHtml("name","Subject name")}${fieldHtml("gradeRange","Grade range")}${fieldHtml("price","Default price")}${fieldHtml("description","Description")}${selectHtml("status","Status",["Active","Inactive"])}</div>`, "saveSubject"); }
async function saveSubject(e) { e.preventDefault(); const d = { id: id("SUB", state.subjects), ...dataFrom(e) }; state.subjects.push(d); await api.request("POST", "Subjects", d); saveState(); closeModal(); render(); toast("Subject saved"); }
function openSchedule() { openModal("Lesson", `<div class="form-grid">${selectHtml("student","Student",state.students.map(s=>s.name))}${selectHtml("subject","Subject",state.subjects.map(s=>s.name))}${selectHtml("day","Day",dayNames())}${fieldHtml("date","Date")}${fieldHtml("start","Start time")}${fieldHtml("end","End time")}${fieldHtml("sessions","Sessions per week")}${selectHtml("type","Lesson type",["Individual","Group"])}${fieldHtml("location","Location or online")}${fieldHtml("notes","Notes","","","textarea")}</div>`, "saveSchedule"); }
async function saveSchedule(e) { e.preventDefault(); const d = { id: id("SCH", state.schedule), ...dataFrom(e) }; state.schedule.push(d); await api.request("POST", "Schedule", d); saveState(); closeModal(); render(); toast(hasConflict(d) ? "Lesson saved with a conflict warning" : "Lesson scheduled"); }
function openAttendance() { openModal("Attendance", `<div class="form-grid">${selectHtml("student","Student",state.students.map(s=>s.name))}${selectHtml("subject","Subject",state.subjects.map(s=>s.name))}${fieldHtml("date","Date")}${selectHtml("status","Status",["Present","Absent","Late","Excused"])}${fieldHtml("notes","Notes","","","textarea")}</div>`, "saveAttendance"); }
async function saveAttendance(e) { e.preventDefault(); const d = { id: id("ATT", state.attendance), ...dataFrom(e) }; state.attendance.push(d); await api.request("POST", "Attendance", d); saveState(); closeModal(); render(); toast("Attendance saved"); }
function openAssessment() { openModal("Assessment", `<div class="form-grid">${selectHtml("student","Student",state.students.map(s=>s.name))}${selectHtml("subject","Subject",state.subjects.map(s=>s.name))}${selectHtml("type","Assessment type",["Weekly","Monthly","Quarterly","Custom test"])}${fieldHtml("name","Assessment name")}${fieldHtml("date","Date")}${fieldHtml("term","Term or month")}${fieldHtml("mark","Mark obtained")}${fieldHtml("total","Total mark")}${fieldHtml("comment","Comment","","","textarea")}</div>`, "saveAssessment"); }
async function saveAssessment(e) { e.preventDefault(); const d = { id: id("ASM", state.assessments), ...dataFrom(e) }; state.assessments.push(d); await api.request("POST", "Assessments", d); saveState(); closeModal(); render(); toast("Assessment saved"); }
function openInvoice() { openModal("Invoice", `<div class="form-grid">${selectHtml("student","Student",state.students.map(s=>s.name))}${fieldHtml("guardian","Guardian")}${fieldHtml("package","Subjects or package")}${fieldHtml("qty","Quantity")}${fieldHtml("rate","Rate",state.settings.rate)}${fieldHtml("discount","Discount",0)}${fieldHtml("date","Invoice date")}${fieldHtml("due","Due date")}${selectHtml("status","Payment status",["Unpaid","Partial","Paid"])}${selectHtml("method","Payment method",["EFT","Cash","Card"])}${fieldHtml("notes","Notes","","","textarea")}</div>`, "saveInvoice"); }
async function saveInvoice(e) { e.preventDefault(); const d = { id: invoiceId(), ...dataFrom(e) }; state.invoices.unshift(d); await api.request("POST", "Invoices", d); saveState(); closeModal(); render(); toast("Invoice created"); }
function previewInvoice(invoiceIdValue) { const i = state.invoices.find(x => x.id === invoiceIdValue); document.querySelector(".print-doc")?.remove(); document.querySelector(".page").insertAdjacentHTML("beforeend", invoiceDoc(i)); refreshIcons(); }
function editRecord() { toast("Record editing is staged for the next connected CRUD pass."); }
function deleteRecord(type, recordId) { state[type] = state[type].filter(x => x.id !== recordId); saveState(); render(); toast("Record removed"); }
function saveSettings() {
  Object.keys(state.settings).forEach(k => {
    const el = document.getElementById(`set-${k}`);
    if (el) state.settings[k] = el.value;
  });
  api.request("UPDATE", "Settings", state.settings);
  saveState(); render(); toast("Settings saved");
}

Object.assign(window, {
  loginSubmit, go, logout, quickAdd, selectStudent, setScheduleMode, dragLesson, dropLesson,
  openStudent, saveStudent, openSubject, saveSubject, openSchedule, saveSchedule,
  openAttendance, saveAttendance, openAssessment, saveAssessment, openInvoice, saveInvoice,
  previewInvoice, editRecord, deleteRecord, saveSettings, closeModal, closeOnly,
  composeMessage, saveReportCard, toast
});

render();
