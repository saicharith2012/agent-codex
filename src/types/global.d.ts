import type Groq from "groq-sdk";

export type LLMResponse = {
  ok: true;
  chatCompletion: Groq.Chat.Completions.ChatCompletion;
};

export type LLMResponseError = { ok: false; error: string };
