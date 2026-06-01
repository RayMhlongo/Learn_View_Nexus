const CACHE_NAME = "learnview-nexus-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./assets/learnview-logo.jpeg",
  "./src/main.js",
  "./src/state.js",
  "./src/api.js",
  "./src/render.js",
  "./src/utils.js",
  "./src/components/navigation.js",
  "./src/components/dashboard.js",
  "./src/components/students.js",
  "./src/components/schedule.js",
  "./src/components/attendance.js",
  "./src/components/assessments.js",
  "./src/components/invoices.js",
  "./src/components/reports.js",
  "./src/components/analytics.js",
  "./src/components/settings.js",
  "./src/components/communications.js",
  "./src/components/subjects.js",
  "./src/print/invoice.js",
  "./src/print/reportCard.js",
  "./src/print/schedule.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
