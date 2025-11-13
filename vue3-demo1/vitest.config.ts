import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
import vueSetupExtend from "vite-plugin-vue-setup-extend"

export default mergeConfig(
  viteConfig, // 基础配置优先
  defineConfig({
    plugins: [vueSetupExtend()],//vueSetupExtend：这个插件允许在 Vue 3 的 <script setup>语法中为组件命名，便于调试和测试：
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['**/__tests__/**/*.{js,ts,jsx,tsx}', '**/*.{spec,test}.{js,ts,jsx,tsx}'],
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./tests/setup.ts'], // 可选：测试初始化文件
      coverage: {
        reporter: ['text', 'html'],
        exclude: ['e2e/**', '**/node_modules/**']
      }
    },
  })
)