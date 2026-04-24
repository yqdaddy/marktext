// 使用 import 导入语言文件，确保 webpack 正确打包
import enTranslations from './langs/en.json'
import zhCNTranslations from './langs/zh-CN.json'

const translationsMap = {
  en: enTranslations,
  'zh-CN': zhCNTranslations
}

let currentLanguage = 'en'
let translations = enTranslations

// 加载翻译文件
function loadTranslations (lang) {
  const langData = translationsMap[lang]
  if (langData) {
    translations = langData
    currentLanguage = lang
  } else {
    console.error(`Language not found: ${lang}`)
    // 回退到英语
    translations = enTranslations
    currentLanguage = 'en'
  }
}

// 翻译函数
export function t (key, fallback = '') {
  const value = translations[key]
  if (value !== undefined) {
    return value
  }
  return fallback || key
}

// 切换语言
export function setLanguage (lang) {
  loadTranslations(lang)
}

// 获取当前语言
export function getCurrentLanguage () {
  return currentLanguage
}

// 获取可用语言
export function getAvailableLanguages () {
  return [
    { label: 'English', value: 'en' },
    { label: '简体中文', value: 'zh-CN' }
  ]
}
