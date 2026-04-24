<template>
  <div class="pref-general">
    <h4>{{ $t('preferences.general.title') }}</h4>
    <compound>
      <template #head>
        <h6 class="title">{{ $t('preferences.general.autoSave.title') }}</h6>
      </template>
      <template #children>
        <bool
          :description="$t('preferences.general.autoSave.autoSaveDesc')"
          :bool="autoSave"
          :onChange="value => onSelectChange('autoSave', value)"
        ></bool>
        <range
          :description="$t('preferences.general.autoSave.delayDesc')"
          :value="autoSaveDelay"
          :min="1000"
          :max="10000"
          unit="ms"
          :step="100"
          :onChange="value => onSelectChange('autoSaveDelay', value)"
        ></range>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('preferences.general.window.title') }}</h6>
      </template>
      <template #children>
        <cur-select
          v-if="!isOsx"
          :description="$t('preferences.general.window.titleBarStyle')"
          :notes="$t('common.restartRequired')"
          :value="titleBarStyle"
          :options="titleBarStyleOptions"
          :onChange="value => onSelectChange('titleBarStyle', value)"
        ></cur-select>
        <bool
          :description="$t('preferences.general.window.hideScrollbar')"
          :bool="hideScrollbar"
          :onChange="value => onSelectChange('hideScrollbar', value)"
        ></bool>
        <bool
          :description="$t('preferences.general.window.openFilesInNewWindow')"
          :bool="openFilesInNewWindow"
          :onChange="value => onSelectChange('openFilesInNewWindow', value)"
        ></bool>
        <bool
          :description="$t('preferences.general.window.openFoldersInNewWindow')"
          :bool="openFolderInNewWindow"
          :onChange="value => onSelectChange('openFolderInNewWindow', value)"
        ></bool>
        <cur-select
          :description="$t('preferences.general.window.zoom')"
          :value="zoom"
          :options="zoomOptions"
          :onChange="value => onSelectChange('zoom', value)"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('preferences.general.sidebar.title') }}</h6>
      </template>
      <template #children>
        <bool
          :description="$t('preferences.general.sidebar.wordWrapInToc')"
          :bool="wordWrapInToc"
          :onChange="value => onSelectChange('wordWrapInToc', value)"
        ></bool>
        <cur-select
          :description="$t('preferences.general.sidebar.fileSortBy')"
          :value="fileSortBy"
          :options="fileSortByOptions"
          :onChange="value => onSelectChange('fileSortBy', value)"
          :disable="true"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('preferences.general.startup.title') }}</h6>
      </template>
      <template #children>
        <section class="startup-action-ctrl">
          <el-radio-group v-model="startUpAction">
            <el-radio label="folder" style="margin-bottom: 10px;">{{ $t('preferences.general.startup.openDefaultDir') }}<span>: {{defaultDirectoryToOpen}}</span></el-radio>
            <el-button size="small" @click="selectDefaultDirectoryToOpen">{{ $t('preferences.general.startup.selectFolder') }}</el-button>
            <el-radio label="blank">{{ $t('preferences.general.startup.openBlank') }}</el-radio>
          </el-radio-group>
        </section>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('preferences.general.misc.title') }}</h6>
      </template>
      <template #children>
        <cur-select
          :description="$t('preferences.general.misc.language')"
          :value="language"
          :options="languageOptions"
          :onChange="handleChangeLanguage"
        ></cur-select>
      </template>
    </compound>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Compound from '../common/compound'
import Range from '../common/range'
import CurSelect from '../common/select'
import Bool from '../common/bool'
import Separator from '../common/separator'
import { isOsx } from '@/util'

import {
  titleBarStyleOptions,
  zoomOptions,
  fileSortByOptions,
  languageOptions
} from './config'

export default {
  components: {
    Compound,
    Bool,
    Range,
    CurSelect,
    Separator
  },
  data () {
    this.titleBarStyleOptions = titleBarStyleOptions
    this.zoomOptions = zoomOptions
    this.fileSortByOptions = fileSortByOptions
    this.languageOptions = languageOptions
    this.isOsx = isOsx
    return {}
  },
  computed: {
    ...mapState({
      autoSave: state => state.preferences.autoSave,
      autoSaveDelay: state => state.preferences.autoSaveDelay,
      titleBarStyle: state => state.preferences.titleBarStyle,
      defaultDirectoryToOpen: state => state.preferences.defaultDirectoryToOpen,
      openFilesInNewWindow: state => state.preferences.openFilesInNewWindow,
      openFolderInNewWindow: state => state.preferences.openFolderInNewWindow,
      zoom: state => state.preferences.zoom,
      hideScrollbar: state => state.preferences.hideScrollbar,
      wordWrapInToc: state => state.preferences.wordWrapInToc,
      fileSortBy: state => state.preferences.fileSortBy,
      language: state => state.preferences.language
    }),
    startUpAction: {
      get: function () {
        return this.$store.state.preferences.startUpAction
      },
      set: function (value) {
        const type = 'startUpAction'
        this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
      }
    }
  },
  methods: {
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    },
    handleChangeLanguage (lang) {
      this.$store.dispatch('i18n/CHANGE_LANGUAGE', lang)
    },
    selectDefaultDirectoryToOpen () {
      this.$store.dispatch('SELECT_DEFAULT_DIRECTORY_TO_OPEN')
    }
  }
}
</script>

<style scoped>
  .pref-general {
    & .startup-action-ctrl {
      font-size: 14px;
      user-select: none;
      color: var(--editorColor);
      & .el-button--small {
        margin-left: 25px;
      }
      & label {
        display: block;
        margin: 20px 0;
      }
    }
  }
</style>
