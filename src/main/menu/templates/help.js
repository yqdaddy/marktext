import path from 'path'
import { shell } from 'electron'
import { isFile } from 'common/filesystem'
import * as actions from '../actions/help'
import { checkUpdates } from '../actions/marktext'
import { t } from '../../../i18n/main'

/// Check whether the package is updatable at runtime.
const isUpdatable = () => {
  // TODO: If not updatable, allow to check whether there is a new version available.

  const resFile = isFile(path.join(process.resourcesPath, 'app-update.yml'))
  if (!resFile) {
    // No update resource file available.
    return false
  } else if (process.env.APPIMAGE) {
    // We are running as AppImage.
    return true
  } else if (process.platform === 'win32' && isFile(path.join(process.resourcesPath, 'md.ico'))) {
    // Windows is a little but tricky. The update resource file is always available and
    // there is no way to check the target type at runtime (electron-builder#4119).
    // As workaround we check whether "md.ico" exists that is only included in the setup.
    return true
  }

  // Otherwise assume that we cannot perform an auto update (standalone binary, archives,
  // packed for package manager).
  return false
}

export default function () {
  const helpMenu = {
    label: t('menu.help.label', 'Help'),
    role: 'help',
    submenu: [{
      label: t('menu.help.quickStart', 'Quick Start...'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/blob/master/docs/README.md')
      }
    }, {
      label: t('menu.help.markdownReference', 'Markdown Reference...'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/blob/master/docs/MARKDOWN_SYNTAX.md')
      }
    }, {
      label: t('menu.help.changelog', 'Changelog...'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/blob/master/.github/CHANGELOG.md')
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.help.donate', 'Donate via Open Collective...'),
      click (item, win) {
        shell.openExternal('https://opencollective.com/marktext')
      }
    }, {
      label: t('menu.help.twitterFeedback', 'Feedback via Twitter...'),
      click (item, win) {
        actions.showTweetDialog(win, 'twitter')
      }
    }, {
      label: t('menu.help.reportIssue', 'Report Issue or Request Feature...'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/issues')
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.help.website', 'Website...'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext')
      }
    }, {
      label: t('menu.help.watchOnGitHub', 'Watch on GitHub...'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext')
      }
    }, {
      label: t('menu.help.followGitHub', 'Follow us on Github...'),
      click () {
        shell.openExternal('https://github.com/Jocs')
      }
    }, {
      label: t('menu.help.followTwitter', 'Follow us on Twitter...'),
      click () {
        shell.openExternal('https://twitter.com/marktextapp')
      }
    }, {
      type: 'separator'
    }, {
      label: t('menu.help.license', 'License...'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/blob/master/LICENSE')
      }
    }]
  }

  if (isUpdatable()) {
    helpMenu.submenu.push({
      type: 'separator'
    }, {
      label: t('menu.help.checkUpdates', 'Check for updates...'),
      click (menuItem, browserWindow) {
        checkUpdates(browserWindow)
      }
    })
  }

  if (process.platform !== 'darwin') {
    helpMenu.submenu.push({
      type: 'separator'
    }, {
      label: t('menu.help.about', 'About MarkText...'),
      click (menuItem, browserWindow) {
        actions.showAboutDialog(browserWindow)
      }
    })
  }
  return helpMenu
}
