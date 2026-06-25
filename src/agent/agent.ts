import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";
import { callLLM } from "../llm/llm";
import type { LLMResponseError } from "../types/global";

import { toolRegistry, toolSchema } from "../tools/tools";
import { debug } from "../utils/debug";

export class Agent {
  private messages: ChatCompletionMessageParam[] = [];

  async Run(prompt: string): Promise<string> {
    const userMessage: ChatCompletionMessageParam = {
      role: "user",
      content: prompt,
    };
    this.messages.push(userMessage);
    debug("request", userMessage);

    while (true) {
      const llmResponse = await callLLM(this.messages, toolSchema);

      if (!llmResponse.ok) {
        return `error: ${(llmResponse as LLMResponseError).error}`;
      }

      const responseMessage = llmResponse.chatCompletion.choices[0]?.message;
      debug("response", responseMessage);

      this.messages.push(responseMessage!);
      debug("messages", this.messages);

      if (llmResponse.chatCompletion.choices[0]?.finish_reason === "stop") {
        return responseMessage?.content!;
      } else {
        const toolCalls =
          llmResponse.chatCompletion.choices[0]?.message.tool_calls;

        debug("toolcalls", toolCalls);

        for (const toolCall of toolCalls!) {
          const functionName = toolCall.function
            .name as keyof typeof toolRegistry;
          const functionArgs = JSON.parse(toolCall.function.arguments);

          const functionToCall = toolRegistry[functionName]?.execute;

          if (!functionToCall) {
            return `Error: function '${functionName}' not available`;
          }

          const functionResponse = await functionToCall(functionArgs);

          if (!functionResponse.ok) {
            return `Error: ${functionResponse.error}`;
          }

          this.messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: functionResponse.result,
          });
        }
      }
    }
  }
}
