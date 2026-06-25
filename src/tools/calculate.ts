import type { ToolResult } from "../types/global";

export async function calculate(
  args: Record<string, unknown>,
): Promise<ToolResult> {
  const expression = args.expression;

  if (typeof expression !== "string") {
    throw new Error("Invalid input: Expression must be a string");
  }

  try {
    return { ok: true, result: String(eval(expression)) };
  } catch (err) {
    return {
      ok: false,
      error: `Error while evaluating expression ${expression}: ${err instanceof Error ? err.message : ""}`,
    };
  }
}
