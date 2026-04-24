import { t } from '../../../i18n/main'

export default function (keybindings) {
  return {
    label: t('menu.edit.label', 'Edit'),
    submenu: [{
      label: t('menu.edit.cut', 'Cut'),
      accelerator: keybindings.getAccelerator('edit.cut'),
      role: 'cut'
    }, {
      label: t('menu.edit.copy', 'Copy'),
      accelerator: keybindings.getAccelerator('edit.copy'),
      role: 'copy'
    }, {
      label: t('menu.edit.paste', 'Paste'),
      accelerator: keybindings.getAccelerator('edit.paste'),
      role: 'paste'
    }, {
      type: 'separator'
    }, {
      label: t('menu.edit.selectAll', 'Select All'),
      accelerator: keybindings.getAccelerator('edit.select-all'),
      role: 'selectAll'
    }]
  }
}
