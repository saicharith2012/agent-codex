import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";
import { callLLM } from "../llm/llm";
import type { LLMResponse, LLMResponseError } from "../types/global";

export class Agent {
  private messages: ChatCompletionMessageParam[] = [];

  async Run(prompt: string): Promise<string> {
    this.messages.push({ role: "user", content: prompt });
    const llmResponse = await callLLM(this.messages);

    if (!llmResponse.ok) {
      return `error: ${(llmResponse as LLMResponseError).error}`;
    }

    const responseContent = llmResponse.chatCompletion.choices[0]?.message.content

    this.messages.push({ role: "assistant", content: responseContent });
    return responseContent!;
  }
}
