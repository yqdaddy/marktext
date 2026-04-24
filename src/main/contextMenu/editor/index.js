import { Menu, MenuItem } from 'electron'
import {
  CUT,
  COPY,
  PASTE,
  COPY_AS_MARKDOWN,
  COPY_AS_HTML,
  PASTE_AS_PLAIN_TEXT,
  SEPARATOR,
  INSERT_BEFORE,
  INSERT_AFTER
} from './menuItems'
import spellcheckMenuBuilder from './spellcheck'
import { t } from '../../../i18n/main'

const getContextMenuItems = () => [
  { ...INSERT_BEFORE, label: INSERT_BEFORE.label() },
  { ...INSERT_AFTER, label: INSERT_AFTER.label() },
  SEPARATOR,
  { ...CUT, label: CUT.label() },
  { ...COPY, label: COPY.label() },
  { ...PASTE, label: PASTE.label() },
  SEPARATOR,
  { ...COPY_AS_MARKDOWN, label: COPY_AS_MARKDOWN.label() },
  { ...COPY_AS_HTML, label: COPY_AS_HTML.label() },
  { ...PASTE_AS_PLAIN_TEXT, label: PASTE_AS_PLAIN_TEXT.label() }
]

const isInsideEditor = params => {
  const { isEditable, editFlags, inputFieldType } = params
  // WORKAROUND for Electron#32102: `params.spellcheckEnabled` is always false. Try to detect the editor container via other information.
  return isEditable && inputFieldType === 'none' && !!editFlags.canEditRichly
}

export const showEditorContextMenu = (win, event, params, isSpellcheckerEnabled) => {
  const { isEditable, hasImageContents, selectionText, editFlags, misspelledWord, dictionarySuggestions } = params

  // NOTE: We have to get the word suggestions from this event because `webFrame.getWordSuggestions` and
  //       `webFrame.isWordMisspelled` doesn't work on Windows (Electron#28684).

  // Make sure that the request comes from a contenteditable inside the editor container.
  if (isInsideEditor(params) && !hasImageContents) {
    const hasText = selectionText.trim().length > 0
    const canCopy = hasText && editFlags.canCut && editFlags.canCopy
    // const canPaste = hasText && editFlags.canPaste
    const isMisspelled = isEditable && !!selectionText && !!misspelledWord

    const menu = new Menu()
    if (isSpellcheckerEnabled) {
      const spellingSubmenu = spellcheckMenuBuilder(isMisspelled, misspelledWord, dictionarySuggestions)
      menu.append(new MenuItem({
        label: t('contextMenu.spelling', 'Spelling...'),
        submenu: spellingSubmenu
      }))
      menu.append(new MenuItem(SEPARATOR))
    }

    const contextItems = getContextMenuItems()
    contextItems.forEach(item => {
      if (item.id && (item.id === 'cutMenuItem' || item.id === 'copyMenuItem' || item.id === 'copyAsHtmlMenuItem' || item.id === 'copyAsMarkdownMenuItem')) {
        item.enabled = canCopy
      }
      menu.append(new MenuItem(item))
    })
    menu.popup([{ window: win, x: event.clientX, y: event.clientY }])
  }
}
