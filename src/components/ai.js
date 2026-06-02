import { getAiSettings } from "../ai/openrouter.js";
import { state, ui } from "../state.js";
import { icon } from "../utils.js";

export function ai() {
  const settings = getAiSettings();
  const messages = ui.aiMessages || [];
  const loading = ui.aiLoading;
  const status = settings.hasApiKey ? `${state.meta.syncStatus} data ready` : "API key required";
  return `<section class="card ai-shell">
    <div class="section-title">
      <h3>LearnView AI</h3>
      <span class="badge">${status}</span>
    </div>
    <div class="ai-conversation" id="ai-conversation" aria-live="polite">
      ${messages.length ? messages.map(messageBubble).join("") : `<div class="empty ai-empty"><strong>No chat yet.</strong></div>`}
      ${loading ? `<div class="ai-message assistant"><strong>LearnView AI</strong><p>Reviewing current LearnView Nexus data...</p></div>` : ""}
    </div>
    <form class="ai-compose" onsubmit="sendAiMessage(event)">
      <label class="field ai-input"><span>Message</span><textarea id="ai-question" required ${loading ? "disabled" : ""}></textarea></label>
      <button class="btn primary" type="submit" ${loading ? "disabled" : ""}>${icon("send")} Send</button>
    </form>
    <div class="ai-actions">
      <button class="btn ghost" onclick="clearAiChat()">${icon("trash-2")} Clear chat</button>
      <button class="btn ghost" onclick="refreshAiData()">${icon("refresh-cw")} Refresh data</button>
      <button class="btn ghost" onclick="openAiSettings()">${icon("settings")} AI Settings</button>
      <span class="ai-status">${status}</span>
    </div>
  </section>`;
}

export function aiSettingsForm() {
  const settings = getAiSettings();
  return `<label class="field"><span>OpenRouter API key</span><input id="ai-api-key" type="password" autocomplete="off" placeholder="${settings.hasApiKey ? "Stored locally. Enter a new key to replace it." : "Enter your OpenRouter API key"}"></label>
    <label class="field"><span>OpenRouter model</span><input id="ai-model" value="${settings.model}" autocomplete="off"></label>
    <p class="muted">Your key is stored only in this browser's local storage and is used directly for OpenRouter requests.</p>
    <div class="actions"><button class="btn ghost" type="button" onclick="clearAiKeySetting()">Remove stored key</button></div>`;
}

function messageBubble(message) {
  return `<article class="ai-message ${message.role}"><strong>${message.role === "user" ? "Tutor" : "LearnView AI"}</strong><p>${escapeHtml(message.content).replace(/\n/g, "<br>")}</p></article>`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}
