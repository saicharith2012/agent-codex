import type { ChatCompletionTool } from "groq-sdk/resources/chat.mjs";
import { calculate } from "./calculate";
import { getCurrentTime } from "./getCurrentTime";
import type { Tool } from "../types/global";

export const toolRegistry: Record<string, Tool> = {
  calculate: {
    execute: calculate,
  },
  getCurrentTime: {
    execute: getCurrentTime,
  },
};

export const toolSchema: ChatCompletionTool[] = JSON.parse(
  await Bun.file(new URL("./schema.json", import.meta.url)).text(),
);
