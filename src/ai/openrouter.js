import { buildRelevantContext, SYSTEM_PROMPT } from "./context.js";
import { safeGet, safeRemove, safeSet } from "../utils.js";

const WORKER_URL_STORAGE = "learnview-cloudflare-worker-url";

const FREE_MODELS = [
  "openrouter/free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free"
];

export function getAiSettings() {
  const workerUrl = safeGet(localStorage, WORKER_URL_STORAGE) || "";

  return {
    hasWorkerUrl: Boolean(workerUrl),
    workerUrl,
    model: "Auto free model"
  };
}

export function saveAiSettings(workerUrl) {
  const trimmedUrl = workerUrl.trim();

  if (!trimmedUrl) {
    throw new Error("Add your Cloudflare Worker URL before saving AI settings.");
  }

  safeSet(localStorage, WORKER_URL_STORAGE, trimmedUrl);
}

export function clearAiKey() {
  safeRemove(localStorage, WORKER_URL_STORAGE);
}

async function callWorker(workerUrl, messages, model) {
  const response = await fetch(workerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text };
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.details?.error?.message ||
      data?.details?.message ||
      `Cloudflare Worker request failed with status ${response.status}.`
    );
  }

  return data;
}

export async function askLearnViewAi(question) {
  const workerUrl = safeGet(localStorage, WORKER_URL_STORAGE);

  if (!workerUrl) {
    throw new Error("Add your Cloudflare Worker URL in AI Settings before sending a question.");
  }

  const context = buildRelevantContext(question);

  if (!context.hasData) {
    throw new Error("No relevant LearnView Nexus data is available for that question.");
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: [
        `Tutor question: ${question}`,
        "Use only the structured LearnView Nexus data below. If the answer cannot be found in this data, say what is unavailable.",
        JSON.stringify(context, null, 2)
      ].join("\n\n")
    }
  ];

  let lastError = null;

  for (const model of FREE_MODELS) {
    try {
      const data = await callWorker(workerUrl, messages, model);
      const answer = data.choices?.[0]?.message?.content?.trim();

      if (answer) {
        return { answer, context, modelUsed: model };
      }

      lastError = new Error(`The model ${model} did not return a response.`);
    } catch (error) {
      lastError = error;
    }
  }

  console.error("All free AI models failed:", lastError);

  throw new Error("All free AI models are currently unavailable. Please try again later.");
}
