import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'vue-a11y-dialog',
      fileName: (format) => `vue-a11y-dialog.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: [
        {
          format: 'esm',
          esModule: true,
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        },
        {
          format: 'umd',
          interop: 'esModule',
          exports: 'named',
          sourcemap: false,
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'cjs',
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        }
      ],
    },
  },
})
