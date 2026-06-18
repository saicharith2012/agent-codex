import { Agent } from "./agent/agent";

const agent = new Agent();

const welcomeMessage =
  "Agent>\tHello Chief! This is Agent Codex. How may I help you?\nYou>\t";

process.stdout.write(welcomeMessage);

for await (const line of console) {
  if (line.trim() === "exit" || line.trim() === "clear") {
    process.stdout.write(`Agent>\tGoodbye...chief!\n`);
    process.exit(0);
  }

  process.stdout.write("Agent>\t");

  const response = await agent.Run(line);

  process.stdout.write(`${response}\nYou>\t`);
}
