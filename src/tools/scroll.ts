import { tool } from 'ai'
import { z } from 'zod'
import type { Page } from 'playwright'

export const createScrollTool = (page: Page) => {
  return tool({
    description: 'Scroll the page or scroll to a specific element',
    parameters: z.object({
      selector: z.string().optional().describe('CSS selector of element to scroll to. If not provided, scrolls the page down'),
      direction: z.enum(['up', 'down']).optional().describe('Direction to scroll if no selector provided'),
    }),
    execute: async ({ selector, direction }) => {
      if (selector) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        return `Scrolled to element ${selector}`;
      } else {
        const scrollAmount = direction === 'up' ? -500 : 500;
        await page.evaluate((amount) => window.scrollBy(0, amount), scrollAmount);
        return `Scrolled ${direction || 'down'}`;
      }
    },
  })
}
