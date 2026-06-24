import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";
import { callLLM } from "../llm/llm";
import { systemPrompt } from "./prompt";

export class Agent {
  private messages: ChatCompletionMessageParam[] = [systemPrompt];

  async Run(prompt: string): Promise<string> {
    this.messages.push({ role: "user", content: prompt });
    const llmResponse = await callLLM(this.messages);
    this.messages.push({ role: "assistant", content: llmResponse });
    return llmResponse;
  }
}
