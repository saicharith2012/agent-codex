import type { ToolResult } from "../types/global";

export async function getCurrentTime(
  args: Record<string, unknown>,
): Promise<ToolResult> {
  const date = new Date();
  const currentDateAndTime = date.toUTCString();
  return { ok: true, result: currentDateAndTime };
}
