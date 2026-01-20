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
      try {
        console.log(`Attempting to click: ${selector}`);

        if (selector.startsWith('xpath=')) {
          const xpath = selector.replace('xpath=', '');
          await page.locator(`xpath=${xpath}`).click({ timeout: 5000 });
        } else {
          await page.waitForSelector(selector, {
            state: 'visible',
            timeout: 5000
          });
          await page.click(selector, { timeout: 5000 });
        }

        await page.waitForTimeout(1200);

        console.log(`Successfully clicked: ${selector}`);
        return `Clicked ${selector}`;

      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error(`Failed to click ${selector}:`, errorMsg);
        return `ERROR: Failed to click ${selector} - ${errorMsg}`;
      }
    },
  })
}
