import { tool } from 'ai'
import { z } from 'zod'
import type { Page } from 'playwright'

export const createGetFormElementsTool = (page: Page) => {
  return tool({
    description: 'Get visible form fields and buttons',
    parameters: z.object({}),
    execute: async () => {
      const data = await page.evaluate(() => {
        const isVisible = (el: HTMLElement) => {
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') {
            return false;
          }
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight;
        };

        const fields = Array.from(document.querySelectorAll('input, select, textarea'))
          .filter(el => isVisible(el as HTMLElement))
          .map(el => {
            const input = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
            const label = document.querySelector(`label[for="${input.id}"]`)?.textContent?.trim() ||  // ← Fixed backtick
              input.getAttribute('placeholder') || '';

            let options = undefined;
            if (input.tagName.toLowerCase() === 'select') {
              const selectEl = input as HTMLSelectElement;
              options = Array.from(selectEl.options)
                .filter(opt => opt.value)
                .map(opt => ({
                  value: opt.value,
                  label: opt.textContent?.trim() || opt.value
                }));
            }

            return {
              selector: input.id ? `#${input.id}` : `[name="${input.name}"]`,
              label: label,
              type: input.tagName.toLowerCase(),
              options: options
            };
          });

        const buttons = Array.from(document.querySelectorAll('button'))
          .filter(el => isVisible(el as HTMLElement))
          .map(btn => {
            const text = btn.textContent?.trim() || '';
            return {
              selector: `button:has-text("${text}")`,
              text: text,
              buttonType: btn.getAttribute('type') || 'button'
            };
          });

        return { fields, buttons };
      });

      const toggleButtons = data.buttons.filter(b => b.buttonType === 'button').slice(1);
      const submitButtons = data.buttons.filter(b => b.buttonType === 'submit');

      return JSON.stringify({
        visibleFields: data.fields,
        toggleButtons: toggleButtons,
        submitButton: submitButtons[0] || null
      }, null, 2);
    },
  })
}
