import { tool } from 'ai'
import { z } from 'zod'
import type { Page } from 'playwright'

export const createNavigateTool = (page: Page) => {
  return tool({
    description: 'Navigate to a URL in the browser',
    parameters: z.object({
      url: z.string().url().describe('URL to navigate to'),
    }),
    execute: async ({ url }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      return `Navigated to ${url}`;
    },
  })
}
