import { app } from 'electron'
import * as actions from '../actions/file'
import { userSetting } from '../actions/marktext'
import { isOsx } from '../../config'
import { t } from '../../../i18n/main'

export default function (keybindings, userPreference, recentlyUsedFiles) {
  const { autoSave } = userPreference.getAll()
  const fileMenu = {
    label: t('menu.file.label', 'File'),
    submenu: [{
      label: t('menu.file.newTab', 'New Tab'),
      accelerator: keybindings.getAccelerator('file.new-tab'),
      click (menuItem, browserWindow) {
        actions.newBlankTab(browserWindow)
      }
    }, {
      label: t('menu.file.newWindow', 'New Window'),
      accelerator: keybindings.getAccelerator('file.new-window'),
      click (menuItem, browserWindow) {
        actions.newEditorWindow()
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.file.openFile', 'Open File...'),
      accelerator: keybindings.getAccelerator('file.open-file'),
      click (menuItem, browserWindow) {
        actions.openFile(browserWindow)
      }
    }, {
      label: t('menu.file.openFolder', 'Open Folder...'),
      accelerator: keybindings.getAccelerator('file.open-folder'),
      click (menuItem, browserWindow) {
        actions.openFolder(browserWindow)
      }
    }]
  }

  if (!isOsx) {
    const recentlyUsedMenu = {
      label: t('menu.file.openRecent', 'Open Recent'),
      submenu: []
    }

    for (const item of recentlyUsedFiles) {
      recentlyUsedMenu.submenu.push({
        label: item,
        click (menuItem, browserWindow) {
          actions.openFileOrFolder(browserWindow, menuItem.label)
        }
      })
    }

    recentlyUsedMenu.submenu.push({
      type: 'separator',
      visible: recentlyUsedFiles.length > 0
    }, {
      label: t('menu.file.clearRecentlyUsed', 'Clear Recently Used'),
      enabled: recentlyUsedFiles.length > 0,
      click (menuItem, browserWindow) {
        actions.clearRecentlyUsed()
      }
    })
    fileMenu.submenu.push(recentlyUsedMenu)
  } else {
    fileMenu.submenu.push({
      role: 'recentdocuments',
      submenu: [
        {
          role: 'clearrecentdocuments'
        }
      ]
    })
  }

  fileMenu.submenu.push({
    type: 'separator'
  }, {
    label: t('menu.file.save', 'Save'),
    accelerator: keybindings.getAccelerator('file.save'),
    click (menuItem, browserWindow) {
      actions.save(browserWindow)
    }
  }, {
    label: t('menu.file.saveAs', 'Save As...'),
    accelerator: keybindings.getAccelerator('file.save-as'),
    click (menuItem, browserWindow) {
      actions.saveAs(browserWindow)
    }
  }, {
    label: t('menu.file.autoSave', 'Auto Save'),
    type: 'checkbox',
    checked: autoSave,
    id: 'autoSaveMenuItem',
    click (menuItem, browserWindow) {
      actions.autoSave(menuItem, browserWindow)
    }
  }, {
    type: 'separator'
  }, {
    label: t('menu.file.moveTo', 'Move To...'),
    accelerator: keybindings.getAccelerator('file.move-file'),
    click (menuItem, browserWindow) {
      actions.moveTo(browserWindow)
    }
  }, {
    label: t('menu.file.rename', 'Rename...'),
    accelerator: keybindings.getAccelerator('file.rename-file'),
    click (menuItem, browserWindow) {
      actions.rename(browserWindow)
    }
  }, {
    type: 'separator'
  }, {
    label: t('menu.file.import', 'Import...'),
    click (menuItem, browserWindow) {
      actions.importFile(browserWindow)
    }
  }, {
    label: t('menu.file.export', 'Export'),
    submenu: [
      {
        label: t('menu.file.exportAsHtml', 'HTML'),
        click (menuItem, browserWindow) {
          actions.exportFile(browserWindow, 'styledHtml')
        }
      }, {
        label: t('menu.file.exportAsPdf', 'PDF'),
        click (menuItem, browserWindow) {
          actions.exportFile(browserWindow, 'pdf')
        }
      }
    ]
  }, {
    label: t('menu.file.print', 'Print'),
    accelerator: keybindings.getAccelerator('file.print'),
    click (menuItem, browserWindow) {
      actions.printDocument(browserWindow)
    }
  }, {
    type: 'separator',
    visible: !isOsx
  }, {
    label: t('menu.file.preferences', 'Preferences...'),
    accelerator: keybindings.getAccelerator('file.preferences'),
    visible: !isOsx,
    click () {
      userSetting()
    }
  }, {
    type: 'separator'
  }, {
    label: t('menu.file.closeTab', 'Close Tab'),
    accelerator: keybindings.getAccelerator('file.close-tab'),
    click (menuItem, browserWindow) {
      actions.closeTab(browserWindow)
    }
  }, {
    label: t('menu.file.closeWindow', 'Close Window'),
    accelerator: keybindings.getAccelerator('file.close-window'),
    click (menuItem, browserWindow) {
      actions.closeWindow(browserWindow)
    }
  }, {
    type: 'separator',
    visible: !isOsx
  }, {
    label: t('menu.file.quit', 'Quit'),
    accelerator: keybindings.getAccelerator('file.quit'),
    visible: !isOsx,
    click: app.quit
  })
  return fileMenu
}
