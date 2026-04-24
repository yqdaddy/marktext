import { ipcRenderer } from 'electron'
import { changeLanguage, getAvailableLanguages } from '../../i18n'

const state = {
  language: 'en',
  availableLanguages: getAvailableLanguages()
}

const getters = {
  language: state => state.language,
  availableLanguages: state => state.availableLanguages
}

const mutations = {
  SET_LANGUAGE (state, lang) {
    state.language = lang
  }
}

const actions = {
  CHANGE_LANGUAGE ({ commit, state, dispatch }, lang) {
    console.log('[i18n] CHANGE_LANGUAGE called:', lang, 'current:', state.language)

    return changeLanguage(lang).then(() => {
      console.log('[i18n] Language changed successfully to:', lang)
      commit('SET_LANGUAGE', lang)
      // 同步更新 preferences state（关键修复：确保 UI 状态一致）
      commit('SET_USER_PREFERENCE', { language: lang }, { root: true })
      // 通知主进程更新菜单
      ipcRenderer.send('mt::language-change', lang)
      // 保存到偏好设置（持久化）- preferences 模块没有 namespaced
      console.log('[i18n] Saving preference:', { type: 'language', value: lang })
      dispatch('SET_SINGLE_PREFERENCE', { type: 'language', value: lang }, { root: true })
    }).catch(err => {
      console.error('Failed to change language:', err)
    })
  },

  INIT_LANGUAGE ({ commit, state }, lang) {
    if (!lang) return
    commit('SET_LANGUAGE', lang)
    // 实际加载语言包并切换 locale
    changeLanguage(lang).catch(err => {
      console.error('Failed to init language:', err)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
