import { tool } from "ai";
import type { Page } from "playwright";
import { z } from "zod";

export const createFillInputTool = (page: Page) => {
  return tool({
    description: "Fill text inputs, date inputs, and dropdowns",
    parameters: z.object({
      fields: z.array(
        z.object({
          selector: z.string(),
          value: z.string(),
        }),
      ),
    }),
    execute: async ({ fields }) => {
      const results = [];

      for (const field of fields) {
        try {
          await page.waitForSelector(field.selector, {
            timeout: 5000,
            state: "visible",
          });

          const element = page.locator(field.selector).first();
          const tagName = await element.evaluate((el) =>
            el.tagName.toLowerCase(),
          );

          if (tagName === "select") {
            await page.selectOption(field.selector, field.value);
          } else {
            await page.fill(field.selector, field.value);
          }

          results.push(`OK: ${field.selector}`);
        } catch (e) {
          results.push(`ERROR: ${field.selector} - ${e instanceof Error ? e.message : String(e)}`);
        }
      }

      return `${results.filter((r) => r.startsWith("OK")).length}/${fields.length} filled\n${results.join("\n")}`;
    },
  });
};
