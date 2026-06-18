import { callLLM } from "../llm/llm";
import type { Message } from "../types/global";
import { systemPrompt } from "./prompt";

export class Agent {
  private messages: Message[] = [{ role: "system", content: systemPrompt }];

  async Run(prompt: string): Promise<string> {
    this.messages.push({ role: "user", content: prompt });
    const llmResponse = await callLLM(this.messages);
    this.messages.push({ role: "assistant", content: llmResponse });
    return llmResponse;
  }
}
