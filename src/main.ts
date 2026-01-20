import { generateText } from "ai";
import { model } from "./_internal/setup";
import { createSession } from "./session";
import { createTools } from "./tools";
import { getPrompt } from "./prompts/fillMedicalForm";

export async function main() {
  const page = await createSession("https://www.google.com");
  const tools = createTools(page);

  const response = await generateText({
    model,
    tools,
    maxSteps: 20,
    prompt: getPrompt(),
    onStepFinish: ({ toolResults }) => {
      if (toolResults) {
        toolResults.forEach(result => {
          console.log(`\n=== TOOL: ${result.toolName} ===`);
          console.log(result.result);
        });
      }
    },
  });

  console.log("\n=== AGENT STEPS ===");
  response.steps?.forEach((step, index) => {
    console.log(`\n--- Step ${index + 1} ---`);
    console.log("Text:", step.text);
    if (step.toolCalls && step.toolCalls.length > 0) {
      console.log("Tool Calls:", step.toolCalls.map(tc => `${tc.toolName}(${JSON.stringify(tc.args)})`));
    }
    if (step.toolResults && step.toolResults.length > 0) {
      console.log("Tool Results:", step.toolResults.map(tr => JSON.stringify(tr.result).substring(0, 200)));
    }
  });

  console.log("\n=== FINAL RESPONSE ===");
  console.log(response.text);

  await new Promise(resolve => setTimeout(resolve, 15000));
}
