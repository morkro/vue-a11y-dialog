import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/vue-a11y-dialog.js',
    exports: 'named',
    format: 'umd',
    name: 'VueA11yDialog',
    sourcemap: false
  },
  plugins: [
    resolve({
      extensions: ['.vue', '.js']
    }),
    commonjs(),
    vue({
      template: { isProduction: true },
      css: true
    }),
    babel({
      include: ['node_modules/a11y-dialog']
    }),
    minify({ comments: false })
  ]
}
