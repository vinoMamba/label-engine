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
  shortcuts: {
    'btn': 'rounded bg-white p-4 px-8',
    'setter-h6': 'm-0 mb-16 p-0  text-18 text-#333 font-700 relative before:absolute before:top-2 before:left--8 before:content-empty before:bg-#018bff before:w-4 before:h-full'
  }
})
