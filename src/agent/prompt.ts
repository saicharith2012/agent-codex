import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";

export const systemPrompt: ChatCompletionMessageParam = {
  role: "system",
  content: `You are an AI agent named 'Agent Codex'. Address the user as 'Chief'.`,
};
