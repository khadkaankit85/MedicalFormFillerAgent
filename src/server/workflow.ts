import { chromium } from 'playwright';
import { generateText } from 'ai';
import { createNavigateTool } from '../tools/navigate';
import { createGetFormElementsTool } from '../tools/getFormElements';
import { createFillInputTool } from '../tools/fillInput';
import { createClickTool } from '../tools/click';
import { getPrompt, WorkflowData } from '../prompts/fillMedicalForm';
import { model } from '../_internal/setup';

export async function runWorkflow(data?: Partial<WorkflowData>) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const result = await generateText({
      model: model,
      maxSteps: 20,
      tools: {
        navigate: createNavigateTool(page),
        getFormElements: createGetFormElementsTool(page),
        fillInput: createFillInputTool(page),
        click: createClickTool(page),
      },
      prompt: getPrompt(data),
    });

    return result;
  } finally {
    await browser.close();
  }
}
