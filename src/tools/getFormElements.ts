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
          return style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            el.offsetParent !== null;
        };

        const fields = Array.from(document.querySelectorAll('input, select, textarea'))
          .filter(el => isVisible(el as HTMLElement))
          .map(el => {
            const input = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
            const label = document.querySelector(`label[for="${input.id}"]`)?.textContent?.trim() ||
              input.getAttribute('placeholder') || '';
            return {
              selector: input.id ? `#${input.id}` : `[name="${input.name}"]`,
              label: label,
              type: input.tagName.toLowerCase()
            };
          });

        const buttons = Array.from(document.querySelectorAll('button'))
          .filter(el => isVisible(el as HTMLElement))
          .map(btn => ({
            selector: btn.id ? `#${btn.id}` : `text=${btn.textContent?.trim()}`,
            text: btn.textContent?.trim() || '',
            buttonType: btn.getAttribute('type') || 'button'
          }));

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
