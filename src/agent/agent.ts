import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";
import { callLLM } from "../llm/llm";
import type { LLMResponseError } from "../types/global";

import { toolRegistry, toolSchema } from "../tools/tools";
import { debug } from "../utils/debug";

export class Agent {
  private messages: ChatCompletionMessageParam[] = [];

  async Run(prompt: string): Promise<string> {
    this.messages.push({ role: "user", content: prompt });

    while (true) {
      const llmResponse = await callLLM(this.messages, toolSchema);

      if (!llmResponse.ok) {
        return `error: ${(llmResponse as LLMResponseError).error}`;
      }

      const responseMessage = llmResponse.chatCompletion.choices[0]?.message;

      this.messages.push(responseMessage!);

      if (llmResponse.chatCompletion.choices[0]?.finish_reason === "stop") {
        return responseMessage?.content!;
      } else {
        const toolCalls =
          llmResponse.chatCompletion.choices[0]?.message.tool_calls;

        for (const toolCall of toolCalls!) {
          const functionName = toolCall.function
            .name as keyof typeof toolRegistry;
          const functionArgs = Object.values(
            JSON.parse(toolCall.function.arguments),
          ) as string[];
          const functionToCall = toolRegistry[functionName];

          if (!functionToCall) {
            return `Error: function '${functionName}' not available`;
          }

          const functionResponse = functionToCall(...functionArgs);

          this.messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: functionResponse,
          });
        }
      }
    }
  }
}
