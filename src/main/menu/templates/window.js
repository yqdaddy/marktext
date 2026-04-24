import { Menu } from 'electron'
import { minimizeWindow, toggleAlwaysOnTop, toggleFullScreen } from '../actions/window'
import { zoomIn, zoomOut } from '../../windows/utils'
import { isOsx } from '../../config'
import { t } from '../../../i18n/main'

export default function (keybindings) {
  const menu = {
    label: t('menu.window.label', 'Window'),
    role: 'window',
    submenu: [{
      label: t('menu.window.minimize', 'Minimize'),
      accelerator: keybindings.getAccelerator('window.minimize'),
      click (menuItem, browserWindow) {
        minimizeWindow(browserWindow)
      }
    }, {
      id: 'alwaysOnTopMenuItem',
      label: t('menu.window.alwaysOnTop', 'Always on Top'),
      type: 'checkbox',
      accelerator: keybindings.getAccelerator('window.toggle-always-on-top'),
      click (menuItem, browserWindow) {
        toggleAlwaysOnTop(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.view.zoomIn', 'Zoom In'),
      accelerator: keybindings.getAccelerator('window.zoom-in'),
      click (menuItem, browserWindow) {
        zoomIn(browserWindow)
      }
    }, {
      label: t('menu.view.zoomOut', 'Zoom Out'),
      accelerator: keybindings.getAccelerator('window.zoom-out'),
      click (menuItem, browserWindow) {
        zoomOut(browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.view.fullScreen', 'Show in Full Screen'),
      accelerator: keybindings.getAccelerator('window.toggle-full-screen'),
      click (item, browserWindow) {
        if (browserWindow) {
          toggleFullScreen(browserWindow)
        }
      }
    }]
  }

  if (isOsx) {
    menu.submenu.push({
      label: t('menu.window.bringAllToFront', 'Bring All to Front'),
      click () {
        Menu.sendActionToFirstResponder('arrangeInFront:')
      }
    })
  }
  return menu
}
