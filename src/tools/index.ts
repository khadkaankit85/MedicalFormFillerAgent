import type { Page } from 'playwright'
import { createNavigateTool } from './navigate'
import { createGetCurrentUrlTool } from './getCurrentUrl'
import { createFillInputTool } from './fillInput'
import { createClickTool } from './click'
import { createSelectDropdownTool } from './selectDropdown'
import { createScrollTool } from './scroll'
import { createGetFormElementsTool } from './getFormElements'

export function createTools(page: Page) {
  return {
    navigate: createNavigateTool(page),
    getCurrentUrl: createGetCurrentUrlTool(page),
    getFormElements: createGetFormElementsTool(page),
    fillInput: createFillInputTool(page),
    click: createClickTool(page),
    selectDropdown: createSelectDropdownTool(page),
    scroll: createScrollTool(page),
  }
}
