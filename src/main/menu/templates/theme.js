import * as actions from '../actions/theme'
import { t } from '../../../i18n/main'

export default function (userPreference) {
  const { theme } = userPreference.getAll()
  return {
    label: t('menu.theme.label', 'Theme'),
    id: 'themeMenu',
    submenu: [{
      label: t('menu.theme.cadmiumLight', 'Cadmium Light'),
      type: 'radio',
      id: 'light',
      checked: theme === 'light',
      click (menuItem, browserWindow) {
        actions.selectTheme('light')
      }
    }, {
      label: t('menu.theme.dark', 'Dark'),
      type: 'radio',
      id: 'dark',
      checked: theme === 'dark',
      click (menuItem, browserWindow) {
        actions.selectTheme('dark')
      }
    }, {
      label: t('menu.theme.graphiteLight', 'Graphite Light'),
      type: 'radio',
      id: 'graphite',
      checked: theme === 'graphite',
      click (menuItem, browserWindow) {
        actions.selectTheme('graphite')
      }
    }, {
      label: t('menu.theme.materialDark', 'Material Dark'),
      type: 'radio',
      id: 'material-dark',
      checked: theme === 'material-dark',
      click (menuItem, browserWindow) {
        actions.selectTheme('material-dark')
      }
    }, {
      label: t('menu.theme.oneDark', 'One Dark'),
      type: 'radio',
      id: 'one-dark',
      checked: theme === 'one-dark',
      click (menuItem, browserWindow) {
        actions.selectTheme('one-dark')
      }
    }, {
      label: t('menu.theme.ulyssesLight', 'Ulysses Light'),
      type: 'radio',
      id: 'ulysses',
      checked: theme === 'ulysses',
      click (menuItem, browserWindow) {
        actions.selectTheme('ulysses')
      }
    }]
  }
}
