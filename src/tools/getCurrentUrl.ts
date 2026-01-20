import { tool } from 'ai'
import { z } from 'zod'
import type { Page } from 'playwright'

export const createGetCurrentUrlTool = (page: Page) => {
  return tool({
    description: 'Get the current URL of the page',
    parameters: z.object({}),
    execute: async () => {
      const url = page.url();
      return `Current URL: ${url}`;
    },
  })
}
