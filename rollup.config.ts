import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import banner2 from 'rollup-plugin-banner2'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

// 输出选项
const outputOptions = {
  format: 'umd',
  name: 'baiduAnalytics',
  exports: 'named',
  sourcemap: true
}

export default {
  input: 'src/main.ts',
  output: [
    {
      file: `dist/vue-baidu-analytics.js`,
      ...outputOptions
    },
    {
      file: `dist/vue-baidu-analytics.min.js`,
      plugins: [
        terser()
      ],
      ...outputOptions
    }
  ],
  plugins: [
    resolve({
      browser: true
    }),

    babel({
      babelHelpers: 'bundled'
    }),

    commonjs(),

    json(),

    typescript(),

    banner2(() => `/*!\n * name: ${pkg.name}\n * version: v${pkg.version}\n * author: ${pkg.author}\n */\n`)
  ]
};
