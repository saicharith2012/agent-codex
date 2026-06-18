import Groq from "groq-sdk";
import { env } from "../utils/env";
import type { Message } from "../types/global";

const client = new Groq({
  apiKey: env.groqAPIKey,
});

export async function callLLM(messages: Message[]): Promise<string> {
  try {
    const chatCompletion = await client.chat.completions.create({
      model: env.groqModel,
      messages,
    });

    if (!chatCompletion || !chatCompletion.choices[0]?.message.content) {
      throw new Error("LLM is not responding chief!");
    }

    return chatCompletion.choices[0]?.message.content;
  } catch (error) {
    return `Something's off about the LLM, chief. ${error instanceof Error ? `'${error.message}'` : ""}`;
  }
}
