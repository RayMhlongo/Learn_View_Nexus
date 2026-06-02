import { buildRelevantContext, SYSTEM_PROMPT } from "./context.js";
import { safeGet, safeRemove, safeSet } from "../utils.js";

const API_KEY_STORAGE = "learnview-openrouter-api-key";
const MODEL_STORAGE = "learnview-openrouter-model";
const DEFAULT_MODEL = "openrouter/auto";

export function getAiSettings() {
  return {
    hasApiKey: Boolean(safeGet(localStorage, API_KEY_STORAGE)),
    model: safeGet(localStorage, MODEL_STORAGE) || DEFAULT_MODEL
  };
}

export function saveAiSettings(apiKey, model = DEFAULT_MODEL) {
  const trimmedKey = apiKey.trim();
  if (trimmedKey) safeSet(localStorage, API_KEY_STORAGE, trimmedKey);
  safeSet(localStorage, MODEL_STORAGE, model.trim() || DEFAULT_MODEL);
}

export function clearAiKey() {
  safeRemove(localStorage, API_KEY_STORAGE);
}

export async function askLearnViewAi(question) {
  const apiKey = safeGet(localStorage, API_KEY_STORAGE);
  if (!apiKey) throw new Error("Add your OpenRouter API key in AI Settings before sending a question.");

  const context = buildRelevantContext(question);
  if (!context.hasData) throw new Error("No relevant LearnView Nexus data is available for that question.");

  const model = safeGet(localStorage, MODEL_STORAGE) || DEFAULT_MODEL;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": location.origin,
      "X-Title": "LearnView Nexus"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            `Tutor question: ${question}`,
            "Use only the structured LearnView Nexus data below. If the answer cannot be found in this data, say what is unavailable.",
            JSON.stringify(context, null, 2)
          ].join("\n\n")
        }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `OpenRouter request failed with status ${response.status}.`);
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error("The selected OpenRouter model did not return a response.");
  return { answer, context };
}
