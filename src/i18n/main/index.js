import path from 'path'
import fs from 'fs'

let currentLanguage = 'en'
let translations = {}

// 加载翻译文件
function loadTranslations (lang) {
  const langPath = path.join(__dirname, 'langs', `${lang}.json`)
  try {
    const content = fs.readFileSync(langPath, 'utf-8')
    translations = JSON.parse(content)
    currentLanguage = lang
  } catch (err) {
    console.error(`Failed to load language file: ${lang}`, err)
    // 回退到英语
    if (lang !== 'en') {
      loadTranslations('en')
    }
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
  if (currentLanguage !== lang) {
    loadTranslations(lang)
  }
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

// 初始化
loadTranslations('en')
