import Groq from "groq-sdk";
import { env } from "../utils/env";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";
import { systemPrompt } from "../agent/prompt";
import type { LLMResponse, LLMResponseError } from "../types/global";

const client = new Groq({
  apiKey: env.groqAPIKey,
});

export async function callLLM(
  messages: ChatCompletionMessageParam[],
): Promise<LLMResponse | LLMResponseError> {
  try {
    const chatCompletion = await client.chat.completions.create({
      model: env.groqModel,
      messages: [systemPrompt, ...messages],
    });

    if (!chatCompletion || !chatCompletion.choices[0]?.message.content) {
      throw new Error("LLM is not responding chief!");
    }

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
