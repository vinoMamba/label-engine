import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts(),
  ],
  rules: [
    [/^max-w-(\d+)$/, ([_, match]) => ({ maxWidth: `${match}px` })],
  ],
  shortcuts: {}
})
