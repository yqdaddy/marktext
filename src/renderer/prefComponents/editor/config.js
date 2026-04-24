import { ENCODING_NAME_MAP } from 'common/encoding'

export const tabSizeOptions = [{
  label: '1',
  value: 1
}, {
  label: '2',
  value: 2
}, {
  label: '3',
  value: 3
}, {
  label: '4',
  value: 4
}]

export const endOfLineOptions = [{
  label: 'options.endOfLine.default',
  value: 'default'
}, {
  label: 'options.endOfLine.crlf',
  value: 'crlf'
}, {
  label: 'options.endOfLine.lf',
  value: 'lf'
}]

export const trimTrailingNewlineOptions = [{
  label: 'options.trimTrailingNewline.trimAll',
  value: 0
}, {
  label: 'options.trimTrailingNewline.ensureOne',
  value: 1
}, {
  label: 'options.trimTrailingNewline.preserveStyle',
  value: 2
}, {
  label: 'options.trimTrailingNewline.doNothing',
  value: 3
}]

export const textDirectionOptions = [{
  label: 'options.textDirection.ltr',
  value: 'ltr'
}, {
  label: 'options.textDirection.rtl',
  value: 'rtl'
}]

let defaultEncodingOptions = null
export const getDefaultEncodingOptions = () => {
  if (defaultEncodingOptions) {
    return defaultEncodingOptions
  }

  defaultEncodingOptions = []
  for (const [value, label] of Object.entries(ENCODING_NAME_MAP)) {
    defaultEncodingOptions.push({ label, value })
  }
  return defaultEncodingOptions
}
