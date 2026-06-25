import Groq from "groq-sdk";
import { env } from "../utils/env";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";
import { systemPrompt } from "../agent/prompt";
import type { LLMResponse, LLMResponseError } from "../types/global";
import type { ChatCompletionTool } from "groq-sdk/resources/chat.mjs";
import { debug } from "../utils/debug";

const client = new Groq({
  apiKey: env.groqAPIKey,
});

export async function callLLM(
  messages: ChatCompletionMessageParam[],
  toolSchema: ChatCompletionTool[],
): Promise<LLMResponse | LLMResponseError> {
  try {
    debug("messages", messages);
    debug("tools", toolSchema);
    const chatCompletion = await client.chat.completions.create({
      model: env.groqModel,
      messages: [systemPrompt, ...messages],
      tools: toolSchema,
    });

    return {
      ok: true,
      chatCompletion,
    };
  } catch (error) {
    return {
      ok: false,
      error: `Something's off about the LLM, chief. ${error instanceof Error ? `'${error.message}'` : ""}`,
    };
  }
}
