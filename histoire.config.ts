import { fileURLToPath, URL } from 'node:url'

import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'
import type { LoggingFunction, RollupLog } from 'rollup'

const ignoreOptionalSetupExportWarnings = (warning: RollupLog, warn: LoggingFunction) => {
  const message = warning.message ?? ''

  if (
    message.includes('setupVue3') ||
    message.includes('setupVanilla') ||
    message.includes('virtual:$histoire-noop') ||
    message.includes('virtual:$histoire-generated-global-setup')
  ) {
    return
  }

  warn(warning)
}

export default defineConfig({
  plugins: [HstVue()],
  setupFile: './src/histoire.setup.ts',
  storyMatch: ['src/**/*.story.vue'],
  tree: {
    groups: [
      { id: 'base', title: 'Base Components' },
      { id: 'home', title: 'Home Sections' },
      { id: 'landing', title: '10-Layer Model' },
      { id: 'tech', title: 'Tech Architecture' },
    ],
  },
  responsivePresets: [
    { label: 'Desktop', width: 1280, height: 900 },
    { label: 'Tablet', width: 768, height: 900 },
    { label: 'Mobile', width: 390, height: 844 },
  ],
  backgroundPresets: [
    { label: 'Canvas', color: '#ffffff' },
    { label: 'Muted', color: '#eef2f7' },
    { label: 'Dark', color: '#0b1220', contrastColor: '#f9fafb' },
  ],
  theme: {
    title: 'Site 10-Layer Check',
    defaultColorScheme: 'light',
    colors: {
      primary: {
        50: '#e8f1ff',
        100: '#d8e2ff',
        200: '#adc6ff',
        300: '#6d9fff',
        400: '#1c69d4',
        500: '#0051ae',
        600: '#004494',
        700: '#003577',
        800: '#001a41',
        900: '#00102b',
      },
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        onwarn: ignoreOptionalSetupExportWarnings,
      },
    },
  },
})
