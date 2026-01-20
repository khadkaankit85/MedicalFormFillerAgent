import { tool } from 'ai'
import { z } from 'zod'
import type { Page } from 'playwright'

export const createClickTool = (page: Page) => {
  return tool({
    description: 'Click on an element',
    parameters: z.object({
      selector: z.string().describe('CSS selector for the element to click'),
    }),
    execute: async ({ selector }) => {
      await page.click(selector);
      await page.waitForTimeout(800);
      return `Clicked ${selector}`;
    },
  })
}
