import { app } from 'electron'
import { showAboutDialog } from '../actions/help'
import * as actions from '../actions/marktext'
import { t } from '../../../i18n/main'

// macOS only menu.

export default function (keybindings) {
  return {
    label: t('menu.marktext.label', 'MarkText'),
    submenu: [{
      label: t('menu.marktext.about', 'About MarkText'),
      click (menuItem, focusedWindow) {
        showAboutDialog(focusedWindow)
      }
    }, {
      label: t('menu.marktext.checkUpdates', 'Check for updates...'),
      click (menuItem, focusedWindow) {
        actions.checkUpdates(focusedWindow)
      }
    }, {
      label: t('menu.marktext.preferences', 'Preferences'),
      accelerator: keybindings.getAccelerator('file.preferences'),
      click () {
        actions.userSetting()
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.marktext.services', 'Services'),
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: t('menu.marktext.hide', 'Hide MarkText'),
      accelerator: keybindings.getAccelerator('mt.hide'),
      click () {
        actions.osxHide()
      }
    }, {
      label: t('menu.marktext.hideOthers', 'Hide Others'),
      accelerator: keybindings.getAccelerator('mt.hide-others'),
      click () {
        actions.osxHideAll()
      }
    }, {
      label: t('menu.marktext.showAll', 'Show All'),
      click () {
        actions.osxShowAll()
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.marktext.quit', 'Quit MarkText'),
      accelerator: keybindings.getAccelerator('file.quit'),
      click: app.quit
    }]
  }
}
