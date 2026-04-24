import * as actions from '../actions/edit'
import { isOsx } from '../../config'
import { COMMANDS } from '../../commands'
import { t } from '../../../i18n/main'

export default function (keybindings) {
  return {
    label: t('menu.edit.label', 'Edit'),
    submenu: [{
      label: t('menu.edit.undo', 'Undo'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_UNDO),
      click: (menuItem, browserWindow) => {
        actions.editorUndo(browserWindow)
      }
    }, {
      label: t('menu.edit.redo', 'Redo'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_REDO),
      click: (menuItem, browserWindow) => {
        actions.editorRedo(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.cut', 'Cut'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_CUT),
      click (menuItem, browserWindow) {
        actions.nativeCut(browserWindow)
      }
    }, {
      label: t('menu.edit.copy', 'Copy'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_COPY),
      click (menuItem, browserWindow) {
        actions.nativeCopy(browserWindow)
      }
    }, {
      label: t('menu.edit.paste', 'Paste'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_PASTE),
      click (menuItem, browserWindow) {
        actions.nativePaste(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.copyAsMarkdown', 'Copy as Markdown'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_COPY_AS_MARKDOWN),
      click (menuItem, browserWindow) {
        actions.editorCopyAsMarkdown(browserWindow)
      }
    }, {
      label: t('menu.edit.copyAsHtml', 'Copy as HTML'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_COPY_AS_HTML),
      click (menuItem, browserWindow) {
        actions.editorCopyAsHtml(browserWindow)
      }
    }, {
      label: t('menu.edit.pasteAsPlainText', 'Paste as Plain Text'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_PASTE_AS_PLAINTEXT),
      click (menuItem, browserWindow) {
        actions.editorPasteAsPlainText(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.selectAll', 'Select All'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_SELECT_ALL),
      click (menuItem, browserWindow) {
        actions.editorSelectAll(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.duplicate', 'Duplicate'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_DUPLICATE),
      click (menuItem, browserWindow) {
        actions.editorDuplicate(browserWindow)
      }
    }, {
      label: t('menu.edit.createParagraph', 'Create Paragraph'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_CREATE_PARAGRAPH),
      click (menuItem, browserWindow) {
        actions.editorCreateParagraph(browserWindow)
      }
    }, {
      label: t('menu.edit.deleteParagraph', 'Delete Paragraph'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_DELETE_PARAGRAPH),
      click (menuItem, browserWindow) {
        actions.editorDeleteParagraph(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.find', 'Find'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_FIND),
      click (menuItem, browserWindow) {
        actions.editorFind(browserWindow)
      }
    }, {
      label: t('menu.edit.findNext', 'Find Next'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_FIND_NEXT),
      click (menuItem, browserWindow) {
        actions.editorFindNext(browserWindow)
      }
    }, {
      label: t('menu.edit.findPrevious', 'Find Previous'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_FIND_PREVIOUS),
      click (menuItem, browserWindow) {
        actions.editorFindPrevious(browserWindow)
      }
    }, {
      label: t('menu.edit.replace', 'Replace'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_REPLACE),
      click (menuItem, browserWindow) {
        actions.editorReplace(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.findInFolder', 'Find in Folder'),
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_FIND_IN_FOLDER),
      click (menuItem, browserWindow) {
        actions.findInFolder(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.screenshot', 'Screenshot'),
      id: 'screenshot',
      visible: isOsx,
      accelerator: keybindings.getAccelerator(COMMANDS.EDIT_SCREENSHOT),
      click (menuItem, browserWindow) {
        actions.screenshot(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.lineEnding', 'Line Ending'),
      submenu: [{
        id: 'crlfLineEndingMenuEntry',
        label: t('menu.edit.crlf', 'Carriage return and line feed (CRLF)'),
        type: 'radio',
        click (menuItem, browserWindow) {
          actions.lineEnding(browserWindow, 'crlf')
        }
      }, {
        id: 'lfLineEndingMenuEntry',
        label: t('menu.edit.lf', 'Line feed (LF)'),
        type: 'radio',
        click (menuItem, browserWindow) {
          actions.lineEnding(browserWindow, 'lf')
        }
      }]
    }]
  }
}
