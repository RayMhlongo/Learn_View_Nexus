import { buildRelevantContext, SYSTEM_PROMPT } from "./context.js";

const WORKER_URL = "https://learnview.rodgersmhlongo.workers.dev";

const FREE_MODELS = [
  "openrouter/free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free"
];

export function getAiSettings() {
  return {
    hasWorker: true,
    workerUrl: WORKER_URL,
    model: "Auto free model"
  };
}

export function saveAiSettings() {
  return true;
}

export function clearAiKey() {
  return true;
}

async function callWorker(messages, model) {
  const response = await fetch(WORKER_URL, {
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
  const context = buildRelevantContext(question);

  if (!context.hasData) {
    throw new Error("No relevant LearnView data is available for that question.");
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: [
        `Tutor question: ${question}`,
        "Use only the structured LearnView data below. If the answer cannot be found in this data, say what is unavailable.",
        JSON.stringify(context, null, 2)
      ].join("\n\n")
    }
  ];

  let lastError = null;

  for (const model of FREE_MODELS) {
    try {
      const data = await callWorker(messages, model);
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
