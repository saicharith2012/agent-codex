import type { ChatCompletionTool } from "groq-sdk/resources/chat.mjs";
import { calculate } from "./calculate";
import { getCurrentTime } from "./getCurrentTime";

export const toolRegistry: Record<string, (...args: string[]) => string> = {
  calculate: calculate,
  getCurrentTime: getCurrentTime,
};

export const toolSchema: ChatCompletionTool[] = JSON.parse(await (Bun.file(new URL("./schema.json", import.meta.url))).text())