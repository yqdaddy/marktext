import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import enElement from 'element-ui/lib/locale/lang/en'
import zhCNElement from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

// Element UI 语言包映射
const elementLanguageMap = {
  en: enElement,
  'zh-CN': zhCNElement
}

// 已加载的语言
const loadedLanguages = []

// i18n 实例
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages: {}
})

// 加载语言包
async function loadLanguageAsync (lang) {
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve()
  }

  try {
    const messages = await import(`./langs/${lang}.json`)
    i18n.mergeLocaleMessage(lang, messages.default || messages)
    loadedLanguages.push(lang)
    return Promise.resolve()
  } catch (err) {
    console.error(`Failed to load language: ${lang}`, err)
    // Fallback to English if the requested language fails to load
    if (lang !== 'en') {
      return loadLanguageAsync('en')
    }
    return Promise.reject(err)
  }
}

// 初始化 i18n
async function setupI18n (initialLang = 'en') {
  // Always load fallback language first to ensure missing keys can fallback
  await loadLanguageAsync('en')
  if (initialLang !== 'en') {
    await loadLanguageAsync(initialLang)
  }
  i18n.locale = initialLang

  // 同步 Element UI 语言
  const elementLang = elementLanguageMap[initialLang] || elementLanguageMap.en || enElement
  ElementLocale.use(elementLang)

  // 设置 document lang
  document.documentElement.lang = initialLang

  return i18n
}

// 切换语言
async function changeLanguage (lang) {
  await loadLanguageAsync(lang)

  // Only update if the language is different to avoid unnecessary UI updates
  if (i18n.locale !== lang) {
    i18n.locale = lang

    // 同步 Element UI 语言
    const elementLang = elementLanguageMap[lang] || elementLanguageMap.en || enElement
    ElementLocale.use(elementLang)

    // 设置 document lang
    document.documentElement.lang = lang
  }

  return lang
}

// 获取可用语言列表
function getAvailableLanguages () {
  return [
    { label: 'English', value: 'en' },
    { label: '简体中文', value: 'zh-CN' }
  ]
}

export {
  i18n,
  setupI18n,
  changeLanguage,
  getAvailableLanguages,
  loadedLanguages
}
