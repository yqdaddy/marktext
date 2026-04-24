import WindowManager from '../app/windowManager'
import Preference from '../preferences'
import DataCenter from '../dataCenter'
import Keybindings from '../keyboard/shortcutHandler'
import AppMenu from '../menu'
import { loadMenuCommands } from '../menu/actions'
import { CommandManager, loadDefaultCommands } from '../commands'
import { setLanguage } from '../../i18n/main'

class Accessor {
  /**
   * @param {AppEnvironment} appEnvironment The application environment instance.
   */
  constructor (appEnvironment) {
    const userDataPath = appEnvironment.paths.userDataPath

    this.env = appEnvironment
    this.paths = appEnvironment.paths // export paths to make it better accessible

    this.preferences = new Preference(this.paths)
    this.dataCenter = new DataCenter(this.paths)

    // 从偏好设置初始化主进程语言
    const savedLanguage = this.preferences.getItem('language')
    if (savedLanguage && savedLanguage !== 'en') {
      setLanguage(savedLanguage)
    }

    this.commandManager = CommandManager
    this._loadCommands()

    this.keybindings = new Keybindings(this.commandManager, appEnvironment)
    this.menu = new AppMenu(this.preferences, this.keybindings, userDataPath)
    this.windowManager = new WindowManager(this.menu, this.preferences)
  }

  _loadCommands () {
    const { commandManager } = this
    loadDefaultCommands(commandManager)
    loadMenuCommands(commandManager)

    if (this.env.isDevMode) {
      commandManager.__verifyDefaultCommands()
    }
  }
}

export default Accessor
