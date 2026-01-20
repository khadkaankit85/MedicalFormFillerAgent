import { tool } from 'ai'
import { z } from 'zod'
import type { Page } from 'playwright'

export const createSelectDropdownTool = (page: Page) => {
  return tool({
    description: 'Select an option from a dropdown/select element',
    parameters: z.object({
      selector: z.string().describe('CSS selector for the select element'),
      value: z.string().describe('Value or text of the option to select'),
    }),
    execute: async ({ selector, value }) => {
      await page.selectOption(selector, value);
      return `Selected "${value}" from dropdown ${selector}`;
    },
  })
}
