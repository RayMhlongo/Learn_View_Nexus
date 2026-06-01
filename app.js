const ADMIN_PASSWORD = "learnview-admin";
const API_URL = "";

const logo = () => `
<svg class="brand-mark" viewBox="0 0 96 96" aria-hidden="true">
  <defs><linearGradient id="lv-g" x1="12" x2="82" y1="12" y2="84"><stop stop-color="#12bfd0"/><stop offset="1" stop-color="#49d7b4"/></linearGradient></defs>
  <rect x="10" y="10" width="76" height="76" rx="22" fill="url(#lv-g)"/>
  <path d="M26 29h15c13 0 23 10 23 22v16H51V52c0-6-5-11-11-11H26V29Z" fill="#fff"/>
  <path d="M26 49h12c8 0 14 6 14 14v4H39v-3c0-2-2-4-4-4h-9V49Z" fill="#273242"/>
  <circle cx="66" cy="31" r="6" fill="#273242"/>
</svg>`;

const seed = {
  settings: {
    businessName: "LearnView", tagline: "Learn Smarter. Manage Smarter.", tutorName: "Ray Mhlongo",
    phone: "+27 72 000 0000", email: "hello@learnview.co.za", address: "Johannesburg, South Africa",
    banking: "Bank: Capitec | Acc: 0000000000 | Branch: 470010", rate: 280, prefix: "LVN", terms: "Term 1, Term 2, Term 3, Term 4"
  },
  subjects: [
    { id: "SUB-001", name: "Mathematics", description: "Core CAPS support", gradeRange: "8-12", price: 280, status: "Active" },
    { id: "SUB-002", name: "Physical Sciences", description: "Physics and Chemistry", gradeRange: "10-12", price: 320, status: "Active" },
    { id: "SUB-003", name: "Accounting", description: "Exam and homework support", gradeRange: "10-12", price: 300, status: "Active" }
  ],
  students: [
    { id: "STU-001", name: "Amahle Dlamini", grade: "Grade 11", guardian: "Nokuthula Dlamini", parentPhone: "+27 82 111 8899", parentEmail: "nokuthula@example.com", studentPhone: "", address: "Soweto", subjects: ["Mathematics","Physical Sciences"], startDate: "2026-01-15", frequency: 2, days: "Tuesday, Thursday", time: "16:00", paymentType: "Monthly", status: "Active", notes: "Strong algebra, needs mechanics practice." },
    { id: "STU-002", name: "Liam Jacobs", grade: "Grade 10", guardian: "Karen Jacobs", parentPhone: "+27 83 222 7766", parentEmail: "karen@example.com", studentPhone: "", address: "Randburg", subjects: ["Accounting"], startDate: "2026-02-01", frequency: 1, days: "Saturday", time: "09:00", paymentType: "Per lesson", status: "Active", notes: "Prefers morning slots." },
    { id: "STU-003", name: "Thabo Mokoena", grade: "Grade 12", guardian: "Mpho Mokoena", parentPhone: "+27 84 333 6677", parentEmail: "mpho@example.com", studentPhone: "", address: "Midrand", subjects: ["Mathematics"], startDate: "2026-01-22", frequency: 2, days: "Monday, Wednesday", time: "17:30", paymentType: "Monthly", status: "Inactive", notes: "Paused for exams." }
  ],
  schedule: [
    { id: "SCH-001", student: "Amahle Dlamini", subject: "Mathematics", day: "Tuesday", start: "16:00", end: "17:30", sessions: 1, type: "Individual", location: "Online", notes: "Functions" },
    { id: "SCH-002", student: "Amahle Dlamini", subject: "Physical Sciences", day: "Thursday", start: "16:00", end: "17:30", sessions: 1, type: "Individual", location: "Online", notes: "Newton laws" },
    { id: "SCH-003", student: "Liam Jacobs", subject: "Accounting", day: "Saturday", start: "09:00", end: "10:30", sessions: 1, type: "Individual", location: "LearnView office", notes: "Ledger drills" }
  ],
  assessments: [
    { id: "ASM-001", student: "Amahle Dlamini", subject: "Mathematics", type: "Monthly", name: "Functions Test", date: "2026-05-10", term: "Term 2", mark: 78, total: 100, comment: "Good improvement." },
    { id: "ASM-002", student: "Amahle Dlamini", subject: "Physical Sciences", type: "Weekly", name: "Forces Quiz", date: "2026-05-14", term: "Term 2", mark: 32, total: 40, comment: "Confident with diagrams." },
    { id: "ASM-003", student: "Liam Jacobs", subject: "Accounting", type: "Quarterly", name: "Financial Statements", date: "2026-05-18", term: "Term 2", mark: 61, total: 100, comment: "Needs more practice." }
  ],
  invoices: [
    { id: "INV-0001", date: "2026-05-01", due: "2026-05-07", student: "Amahle Dlamini", guardian: "Nokuthula Dlamini", package: "8 lessons: Maths and Science", qty: 8, rate: 280, discount: 0, status: "Unpaid", method: "EFT", notes: "May tuition" },
    { id: "INV-0002", date: "2026-05-02", due: "2026-05-09", student: "Liam Jacobs", guardian: "Karen Jacobs", package: "4 Accounting lessons", qty: 4, rate: 300, discount: 100, status: "Partial", method: "EFT", notes: "Balance due" }
  ],
  payments: [],
  reportCards: []
};

let state = loadState();
let view = "dashboard";
let filters = {};

function loadState() {
  const saved = storageGet("learnview-demo-state");
  return saved ? JSON.parse(saved) : clone(seed);
}
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function storageGet(key) {
  try { return localStorage.getItem(key); } catch (error) { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (error) {}
}
function sessionGet(key) {
  try { return sessionStorage.getItem(key); } catch (error) { return null; }
}
function sessionSet(key, value) {
  try { sessionStorage.setItem(key, value); } catch (error) {}
}
function sessionRemove(key) {
  try { sessionStorage.removeItem(key); } catch (error) {}
}
function saveState() { storageSet("learnview-demo-state", JSON.stringify(state)); }
function money(n) { return `R ${Number(n || 0).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; }
function pct(a) { return Math.round((Number(a.mark) / Number(a.total || 1)) * 100); }
function id(prefix, list) { return `${prefix}-${String(list.length + 1).padStart(3, "0")}`; }
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
function icon(name) { return `<i data-lucide="${name}"></i>`; }
function refreshIcons() { if (window.lucide) lucide.createIcons(); }

const api = {
  async request(action, sheet, payload = {}) {
    if (!API_URL) return { ok: true, demo: true };
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, sheet, payload })
    });
    return res.json();
  }
};

function render() {
  const authed = sessionGet("learnview-auth") === "true";
  document.getElementById("app").innerHTML = authed ? shell() : login();
  refreshIcons();
}

function brand(name = "LearnView Nexus") {
  return `<div class="brand">${logo()}<div><div class="brand-title">${name}</div><div class="tagline">${state.settings.tagline}</div></div></div>`;
}

function login() {
  return `
  <section class="login">
    <div class="login-art">
      ${brand()}
      <div>
        <h1>Premium tutor management for sharper learning operations.</h1>
        <p class="login-copy">Manage students, subjects, schedules, marks, invoices and polished printable reports from one responsive LearnView workspace.</p>
      </div>
      <p class="tagline">Demo password: learnview-admin</p>
    </div>
    <form class="login-panel" onsubmit="loginSubmit(event)">
      ${brand("LearnView")}
      <h2>Welcome back</h2>
      <label class="field"><span>Admin password</span><input type="password" id="password" required autocomplete="current-password"></label>
      <button class="btn primary" type="submit">${icon("log-in")} Sign in</button>
      <p class="login-copy" style="font-size:14px">Simple admin protection is configurable in <strong>app.js</strong> and ready to be replaced by a stronger auth layer later.</p>
    </form>
  </section>`;
}

function loginSubmit(e) {
  e.preventDefault();
  const password = document.getElementById("password").value.trim();
  if (password === ADMIN_PASSWORD) {
    sessionSet("learnview-auth", "true");
    render();
    toast("Signed in");
  } else toast("Incorrect password");
}

function shell() {
  const titles = {
    dashboard: "Dashboard", settings: "Settings", subjects: "Subjects", students: "Students",
    schedule: "Weekly Schedule", assessments: "Assessments", reports: "Report Cards",
    invoices: "Invoices", analytics: "Analytics", setup: "Google Sheets Setup"
  };
  return `
  <section class="shell">
    <aside class="sidebar">
      ${brand("LearnView")}
      <nav class="nav">${[
        ["dashboard","layout-dashboard"],["students","users"],["subjects","book-open"],["schedule","calendar-days"],["assessments","clipboard-check"],
        ["invoices","receipt"],["reports","file-text"],["analytics","chart-column"],["settings","settings"],["setup","database"]
      ].map(([k,i]) => `<button class="${view===k?"active":""}" onclick="go('${k}')">${icon(i)}<span>${titles[k]}</span></button>`).join("")}</nav>
      <div class="setup-mini card setup"><strong>Demo mode</strong><br><small>Set <code>API_URL</code> in app.js after deploying Apps Script.</small></div>
    </aside>
    <section class="content">
      <header class="topbar">
        <div><div class="mobile-brand">${logo()}<strong>LearnView</strong></div><h2>${titles[view]}</h2><p>${state.settings.businessName} · ${state.settings.tagline}</p></div>
        <div class="actions"><button class="btn ghost" onclick="window.print()">${icon("printer")} Print</button><button class="btn" onclick="logout()">${icon("log-out")} Exit</button></div>
      </header>
      <div class="page">${routes[view]()}</div>
    </section>
    <div class="modal" id="modal"></div><div class="toast"></div>
  </section>`;
}
function go(v) { view = v; render(); }
function logout() { sessionRemove("learnview-auth"); render(); }

const routes = {
  dashboard() {
    const active = state.students.filter(s => s.status === "Active").length;
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const outstanding = state.invoices.filter(i => i.status !== "Paid").reduce((s,i)=>s + i.qty*i.rate - Number(i.discount||0),0);
    const avg = Math.round(state.assessments.reduce((s,a)=>s+pct(a),0) / state.assessments.length);
    return `
    <div class="grid cols-4">
      ${kpi("Total students", state.students.length, "users")}
      ${kpi("Active students", active, "user-check")}
      ${kpi("Subjects offered", state.subjects.filter(s=>s.status==="Active").length, "book-open")}
      ${kpi("Outstanding", money(outstanding), "receipt")}
    </div>
    <div class="grid cols-2">
      <section class="card"><div class="section-title"><h3>Quick actions</h3></div><div class="actions">
        ${quick("students","Add Student","user-plus")} ${quick("subjects","Add Subject","plus")} ${quick("assessments","Add Test Mark","clipboard-plus")}
        ${quick("invoices","Create Invoice","receipt")} ${quick("schedule","Print Schedule","printer")} ${quick("reports","Generate Report Card","file-text")}
      </div></section>
      <section class="card"><div class="section-title"><h3>Today</h3><span class="badge active">${today}</span></div>
        <div class="grid cols-3">${kpi("This week lessons", state.schedule.length, "calendar")}${kpi("Upcoming today", state.schedule.filter(s=>s.day===today).length, "clock")}${kpi("Average performance", `${avg}%`, "trending-up")}</div></section>
    </div>
    <section class="card">${table("Recent test entries", ["Student","Subject","Assessment","Score","Comment"], state.assessments.slice(-5).reverse().map(a => [a.student,a.subject,a.name,`${pct(a)}%`,a.comment]))}</section>`;
  },
  settings() {
    return `<section class="card"><div class="section-title"><h3>Business profile</h3><button class="btn primary" onclick="saveSettings()">${icon("save")} Save settings</button></div>
    <div class="form-grid">${["businessName|Business name","tagline|Tagline","tutorName|Tutor name","phone|Phone number","email|Email address","address|Physical address","banking|Banking details","rate|Default rate","prefix|Invoice prefix","terms|Report card term labels"].map(x => {
      const [k,l]=x.split("|"); return `<label class="field"><span>${l}</span><input id="set-${k}" value="${state.settings[k] ?? ""}"></label>`;
    }).join("")}</div></section>`;
  },
  subjects() {
    return manager("subjects", "Subject", ["Name","Grade range","Default price","Status"], s => [s.name,s.gradeRange,money(s.price),badge(s.status)], subjectForm);
  },
  students() {
    const rows = filteredStudents().map(s => [s.id,s.name,s.grade,s.guardian,s.subjects.join(", "),badge(s.status), rowActions("students", s.id, true)]);
    return `${studentFilters()}<section class="card">${table("Student register", ["ID","Student","Grade","Guardian","Subjects","Status",""], rows, `<button class="btn primary" onclick="openStudent()">${icon("user-plus")} Add student</button>`)}</section>`;
  },
  schedule() {
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    return `<section class="card setup"><strong>Printable weekly schedule</strong><p>Includes business details, logo and timetable layout when printed.</p></section>
    <div class="actions"><button class="btn primary" onclick="openSchedule()">${icon("calendar-plus")} Add lesson</button><button class="btn ghost" onclick="window.print()">${icon("printer")} Print schedule</button></div>
    <section class="print-doc">${watermark()}<div class="doc-content">${docHead("Weekly Schedule", "Current teaching week")}<div class="calendar">${days.map(d => `<div class="day"><strong>${d}</strong>${state.schedule.filter(s=>s.day===d).map(s=>`<div class="lesson"><strong>${s.start}-${s.end}</strong><br>${s.student}<br>${s.subject}<br><small>${s.type} · ${s.location}</small></div>`).join("") || "<p class='tagline'>No lessons</p>"}</div>`).join("")}</div></div></section>`;
  },
  assessments() {
    return manager("assessments", "Assessment", ["Student","Subject","Type","Date","Score","Comment"], a => [a.student,a.subject,a.type,a.date,`${pct(a)}%`,a.comment], assessmentForm);
  },
  invoices() {
    const inv = state.invoices[0];
    return `<div class="actions"><button class="btn primary" onclick="openInvoice()">${icon("receipt")} Create invoice</button></div>
    <section class="card">${table("Invoice history", ["Invoice","Student","Due","Total","Status",""], state.invoices.map(i => [i.id,i.student,i.due,money(i.qty*i.rate-Number(i.discount||0)),badge(i.status),`<button class="btn ghost" onclick="previewInvoice('${i.id}')">${icon("eye")} View</button>`]))}</section>
    ${invoiceDoc(inv)}`;
  },
  reports() {
    const student = state.students[0];
    return `<div class="actions"><button class="btn primary" onclick="toast('Report generated from current assessment data')">${icon("file-text")} Generate report</button></div>${reportDoc(student)}`;
  },
  analytics() {
    const byGrade = groupCount(state.students, "grade");
    const bySubject = {}; state.students.forEach(s => s.subjects.forEach(sub => bySubject[sub]=(bySubject[sub]||0)+1));
    const byPerf = {}; state.assessments.forEach(a => { byPerf[a.subject] ??= []; byPerf[a.subject].push(pct(a)); });
    return `<div class="grid cols-3">${kpi("Revenue estimate", money(state.invoices.reduce((s,i)=>s+i.qty*i.rate-Number(i.discount||0),0)), "banknote")}${kpi("Outstanding total", money(state.invoices.filter(i=>i.status!=="Paid").reduce((s,i)=>s+i.qty*i.rate-Number(i.discount||0),0)), "alert-circle")}${kpi("Upcoming lessons", state.schedule.length, "calendar-clock")}</div>
    <div class="grid cols-2"><section class="card">${bars("Students per grade", byGrade)}</section><section class="card">${bars("Students per subject", bySubject)}</section></div>
    <section class="card">${bars("Average performance by subject", Object.fromEntries(Object.entries(byPerf).map(([k,v])=>[k, Math.round(v.reduce((a,b)=>a+b,0)/v.length)])), "%")}</section>`;
  },
  setup() {
    return `<section class="card setup"><h3>Google Sheets connection</h3><p>Deploy <code>apps-script/Code.gs</code> as a Google Apps Script web app, paste the deployed URL into <code>API_URL</code> in <code>app.js</code>, then redeploy GitHub Pages.</p></section>
    <section class="card">${table("Required sheets", ["Sheet","Purpose"], ["Settings","Subjects","Students","Schedule","Assessments","Invoices","InvoiceItems","Payments","ReportCards"].map(s=>[s,`${s} records with CreatedAt and UpdatedAt timestamps`]))}</section>
    <section class="card"><h3>Capacitor later</h3><p>Keep the web app stable first. When ready, run <code>npm init</code>, install Capacitor, set <code>webDir</code> to this static build, and add Android.</p></section>`;
  }
};

function kpi(label, value, ic) { return `<div class="card kpi"><div>${icon(ic)}</div><div><div class="value">${value}</div><div class="label">${label}</div></div></div>`; }
function quick(v, label, ic) { return `<button class="btn primary" onclick="go('${v}')">${icon(ic)} ${label}</button>`; }
function badge(s) { return `<span class="badge ${String(s).toLowerCase()}">${s}</span>`; }
function waterMarkBrand() { return logo(); }
function watermark() { return `<div class="watermark">${waterMarkBrand()}</div>`; }
function docHead(title, meta) { return `<div class="doc-head"><div>${brand(state.settings.businessName)}<p>${state.settings.tutorName}<br>${state.settings.phone} · ${state.settings.email}<br>${state.settings.address}</p></div><div><div class="doc-title">${title}</div><p>${meta}</p></div></div>`; }
function table(title, heads, rows, action = "") {
  return `<div class="section-title"><h3>${title}</h3>${action}</div><div class="table-wrap"><table><thead><tr>${heads.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td data-label="${heads[i]}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function rowActions(type,id,profile=false){ return `<div class="actions">${profile?`<button class="btn ghost" onclick="toast('Profile view: ${id}')">${icon("user-round")} Profile</button>`:""}<button class="btn ghost" onclick="editRecord('${type}','${id}')">${icon("pencil")} Edit</button><button class="btn danger" onclick="deleteRecord('${type}','${id}')">${icon("trash-2")}</button></div>`; }
function manager(type, label, heads, map, form) {
  const rows = state[type].map(x => [...map(x), rowActions(type, x.id)]);
  return `<section class="card">${table(`${label} management`, [...heads,""], rows, `<button class="btn primary" onclick="openGeneric('${type}')">${icon("plus")} Add ${label}</button>`)}</section>`;
}
function studentFilters() {
  return `<section class="card"><div class="toolbar"><input placeholder="Search students" oninput="filters.search=this.value;render()" value="${filters.search||""}"><select onchange="filters.grade=this.value;render()"><option value="">All grades</option>${["Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"].map(g=>`<option ${filters.grade===g?"selected":""}>${g}</option>`)}</select><select onchange="filters.subject=this.value;render()"><option value="">All subjects</option>${state.subjects.map(s=>`<option ${filters.subject===s.name?"selected":""}>${s.name}</option>`)}</select><select onchange="filters.status=this.value;render()"><option value="">All statuses</option><option>Active</option><option>Inactive</option></select></div></section>`;
}
function filteredStudents() {
  return state.students.filter(s => (!filters.search || JSON.stringify(s).toLowerCase().includes(filters.search.toLowerCase())) && (!filters.grade || s.grade===filters.grade) && (!filters.subject || s.subjects.includes(filters.subject)) && (!filters.status || s.status===filters.status));
}
function groupCount(list, key) { return list.reduce((a,x)=>{a[x[key]]=(a[x[key]]||0)+1; return a;},{}); }
function bars(title, data, suffix="") { const max = Math.max(1,...Object.values(data)); return `<div class="section-title"><h3>${title}</h3></div><div class="chart-bar">${Object.entries(data).map(([k,v])=>`<div class="bar-row"><strong>${k}</strong><div class="bar"><span style="width:${(v/max)*100}%"></span></div><b>${v}${suffix}</b></div>`).join("")}</div>`; }

function openModal(title, body, submit) {
  document.getElementById("modal").innerHTML = `<form class="modal-card" onsubmit="${submit}(event)"><div class="section-title"><h3>${title}</h3><button class="btn ghost" type="button" onclick="closeModal()">${icon("x")} Close</button></div>${body}<div class="actions"><button class="btn primary" type="submit">${icon("save")} Save</button></div></form>`;
  document.getElementById("modal").classList.add("open"); refreshIcons();
}
function closeModal(){ document.getElementById("modal").classList.remove("open"); }
function field(k,l,v="",type="input"){ return `<label class="field"><span>${l}</span><${type} name="${k}" ${type==="textarea"?"":`value="${v}"`}>${type==="textarea"?v:""}</${type}></label>`; }
function dataFrom(e){ return Object.fromEntries(new FormData(e.target).entries()); }
function openGeneric(type){ ({subjects:openSubject, assessments:openAssessment, invoices:openInvoice}[type]||(()=>{}))(); }
function openSubject(){ openModal("Subject", `<div class="form-grid">${field("name","Subject name")}${field("gradeRange","Grade range")}${field("price","Default price")}${field("description","Description")}${select("status","Status",["Active","Inactive"])}</div>`, "saveSubject"); }
function subjectForm() {}
async function saveSubject(e){ e.preventDefault(); const d=dataFrom(e); state.subjects.push({id:id("SUB",state.subjects),...d}); await api.request("POST","Subjects",d); saveState(); closeModal(); render(); toast("Subject saved"); }
function openStudent(){ openModal("Student registration", `<div class="form-grid">${field("name","Full name")}${select("grade","Grade",["Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"])}${field("guardian","Parent or guardian")}${field("parentPhone","Parent phone")}${field("parentEmail","Parent email")}${field("studentPhone","Student phone optional")}${field("address","Address optional")}${select("subjects","Subjects",state.subjects.map(s=>s.name), true)}${field("startDate","Start date")}${field("frequency","Lessons per week")}${field("days","Preferred days")}${field("time","Preferred time")}${select("paymentType","Payment type",["Monthly","Per lesson"])}${select("status","Status",["Active","Inactive"])}${field("notes","Notes","","textarea")}</div>`, "saveStudent"); }
async function saveStudent(e){ e.preventDefault(); const d=dataFrom(e); d.subjects = Array.from(e.target.subjects.selectedOptions).map(o=>o.value); state.students.push({id:id("STU",state.students),...d}); await api.request("POST","Students",d); saveState(); closeModal(); render(); toast("Student saved"); }
function openSchedule(){ openModal("Schedule lesson", `<div class="form-grid">${select("student","Student",state.students.map(s=>s.name))}${select("subject","Subject",state.subjects.map(s=>s.name))}${select("day","Day",["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"])}${field("start","Start time")}${field("end","End time")}${field("sessions","Sessions per week")}${select("type","Lesson type",["Individual","Group"])}${field("location","Location or online")}${field("notes","Notes","","textarea")}</div>`, "saveSchedule"); }
async function saveSchedule(e){ e.preventDefault(); const d=dataFrom(e); state.schedule.push({id:id("SCH",state.schedule),...d}); await api.request("POST","Schedule",d); saveState(); closeModal(); render(); toast("Lesson scheduled"); }
function openAssessment(){ openModal("Assessment mark", `<div class="form-grid">${select("student","Student",state.students.map(s=>s.name))}${select("subject","Subject",state.subjects.map(s=>s.name))}${select("type","Assessment type",["Weekly","Monthly","Quarterly","Custom test"])}${field("name","Assessment name")}${field("date","Date")}${field("term","Term or month")}${field("mark","Mark obtained")}${field("total","Total mark")}${field("comment","Comment","","textarea")}</div>`, "saveAssessment"); }
function assessmentForm() {}
async function saveAssessment(e){ e.preventDefault(); const d=dataFrom(e); state.assessments.push({id:id("ASM",state.assessments),...d}); await api.request("POST","Assessments",d); saveState(); closeModal(); render(); toast("Assessment saved"); }
function openInvoice(){ openModal("Invoice", `<div class="form-grid">${select("student","Student",state.students.map(s=>s.name))}${field("guardian","Guardian")}${field("package","Subjects or package")}${field("qty","Quantity")}${field("rate","Rate",state.settings.rate)}${field("discount","Discount optional",0)}${field("date","Invoice date")}${field("due","Due date")}${select("status","Payment status",["Unpaid","Partial","Paid"])}${select("method","Payment method",["EFT","Cash","Card"])}${field("notes","Notes","","textarea")}</div>`, "saveInvoice"); }
async function saveInvoice(e){ e.preventDefault(); const d=dataFrom(e); state.invoices.push({id:`${state.settings.prefix}-${String(state.invoices.length+1).padStart(4,"0")}`,...d}); await api.request("POST","Invoices",d); saveState(); closeModal(); render(); toast("Invoice created"); }
function select(k,l,opts,multi=false){ return `<label class="field"><span>${l}</span><select name="${k}" ${multi?"multiple":""}>${opts.map(o=>`<option>${o}</option>`).join("")}</select></label>`; }
function saveSettings(){ Object.keys(state.settings).forEach(k=>{ const el=document.getElementById(`set-${k}`); if(el) state.settings[k]=el.value; }); api.request("UPDATE","Settings",state.settings); saveState(); render(); toast("Settings saved"); }
function editRecord(){ toast("Edit opens through the add form pattern; record-level patching is ready for Apps Script update."); }
function deleteRecord(type, recordId){ state[type] = state[type].filter(x=>x.id!==recordId); api.request("DELETE", type, { id: recordId }); saveState(); render(); toast("Record removed"); }
function previewInvoice(invoiceId){ const inv = state.invoices.find(i=>i.id===invoiceId); document.querySelector(".print-doc")?.remove(); document.querySelector(".page").insertAdjacentHTML("beforeend", invoiceDoc(inv)); refreshIcons(); }
function invoiceDoc(i) {
  if (!i) return "";
  const total = i.qty*i.rate-Number(i.discount||0);
  return `<section class="print-doc">${watermark()}<div class="doc-content">${docHead("Invoice", i.id)}<div class="grid cols-2"><div><strong>Bill to</strong><p>${i.student}<br>${i.guardian}</p></div><div><strong>Dates</strong><p>Invoice: ${i.date}<br>Due: ${i.due}<br>${badge(i.status)}</p></div></div>${table("Items",["Description","Qty","Rate","Discount","Total"],[[i.package,i.qty,money(i.rate),money(i.discount),money(total)]])}<p><strong>Banking details:</strong> ${state.settings.banking}</p><p>${i.notes||""}</p></div></section>`;
}
function reportDoc(s) {
  const marks = state.assessments.filter(a=>a.student===s.name);
  const avg = marks.length ? Math.round(marks.reduce((sum,a)=>sum+pct(a),0)/marks.length) : 0;
  return `<section class="print-doc">${watermark()}<div class="doc-content">${docHead("Report Card", s.name)}<div class="grid cols-2"><p><strong>Grade:</strong> ${s.grade}<br><strong>Guardian:</strong> ${s.guardian}<br><strong>Period:</strong> Current term</p><p><strong>Overall average:</strong> ${avg}%<br><strong>Performance rating:</strong> ${avg>=75?"Excellent":avg>=60?"Satisfactory":"Needs attention"}</p></div>${table("Assessment marks",["Subject","Assessment","Date","Score","Comment"],marks.map(a=>[a.subject,a.name,a.date,`${pct(a)}%`,a.comment]))}<div class="grid cols-2"><p style="margin-top:40px;border-top:1px solid var(--line);padding-top:10px">Parent signature</p><p style="margin-top:40px;border-top:1px solid var(--line);padding-top:10px">Tutor signature</p></div><p>Date generated: ${new Date().toLocaleDateString("en-ZA")}</p></div></section>`;
}

Object.assign(window, {
  loginSubmit, go, logout, saveSettings, openStudent, openSchedule, openAssessment,
  openInvoice, openGeneric, closeModal, saveSubject, saveStudent, saveSchedule,
  saveAssessment, saveInvoice, editRecord, deleteRecord, previewInvoice, toast
});

render();
