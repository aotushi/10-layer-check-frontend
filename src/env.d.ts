/// <reference types="vite/client" />
/// <reference types="@histoire/plugin-vue/components" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_PROBE_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
