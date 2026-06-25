export function calculate(expression: string): string {
  try {
    const result = eval(expression);
    return String(result);
  } catch (err) {
    return `Error: ${err instanceof Error ? err.message : `error while evaluating ${expression}`}`;
  }
}
