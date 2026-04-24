// NOTE: This are mutable fields that may change at runtime.

import { t } from '../../../i18n/main'

export const CUT = {
  label: () => t('contextMenu.cut', 'Cut'),
  id: 'cutMenuItem',
  role: 'cut'
}

export const COPY = {
  label: () => t('contextMenu.copy', 'Copy'),
  id: 'copyMenuItem',
  role: 'copy'
}

export const PASTE = {
  label: () => t('contextMenu.paste', 'Paste'),
  id: 'pasteMenuItem',
  role: 'paste'
}

export const COPY_AS_MARKDOWN = {
  label: () => t('contextMenu.copyAsMarkdown', 'Copy As Markdown'),
  id: 'copyAsMarkdownMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-copy-as-markdown')
  }
}

export const COPY_AS_HTML = {
  label: () => t('contextMenu.copyAsHtml', 'Copy As Html'),
  id: 'copyAsHtmlMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-copy-as-html')
  }
}

export const PASTE_AS_PLAIN_TEXT = {
  label: () => t('contextMenu.pasteAsPlainText', 'Paste as Plain Text'),
  id: 'pasteAsPlainTextMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-paste-as-plain-text')
  }
}

export const INSERT_BEFORE = {
  label: () => t('contextMenu.insertParagraphBefore', 'Insert Paragraph Before'),
  id: 'insertParagraphBeforeMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-insert-paragraph', 'before')
  }
}

export const INSERT_AFTER = {
  label: () => t('contextMenu.insertParagraphAfter', 'Insert Paragraph After'),
  id: 'insertParagraphAfterMenuItem',
  click (menuItem, targetWindow) {
    targetWindow.webContents.send('mt::cm-insert-paragraph', 'after')
  }
}

export const SEPARATOR = {
  type: 'separator'
}
