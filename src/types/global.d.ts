import type Groq from "groq-sdk";

export type LLMResponse = {
  ok: true;
  chatCompletion: Groq.Chat.Completions.ChatCompletion;
};

export type LLMResponseError = { ok: false; error: string };

type ToolResult =
  | {
      ok: true;
      result: string;
    }
  | {
      ok: false;
      error: string;
    };

export type Tool = {
  execute: (args: Record<string, unknown>) => Promise<ToolResult>;
};
