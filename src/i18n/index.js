import { i18n, setupI18n, changeLanguage, getAvailableLanguages } from './setup'

// 导出翻译函数，用于非 Vue 环境
export function t (key, values = {}) {
  return i18n.t(key, i18n.locale, values)
}

// 获取当前语言
export function getCurrentLocale () {
  return i18n.locale
}

export {
  i18n,
  setupI18n,
  changeLanguage,
  getAvailableLanguages
}

export default i18n
