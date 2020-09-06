import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import banner2 from 'rollup-plugin-banner2'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

// 版权信息配置
const ResolveBanner = () => {
  return `/** 
 * name: ${pkg.name}
 * version: v${pkg.version}
 * author: ${pkg.author}
 */
 `;
}

export default {
  input: 'src/main.ts',
  output: [
    {
      file: `dist/vue-baidu-analytics.js`,
      format: 'umd',
      name: 'baiduAnalytics',
      sourcemap: true
    },
    {
      file: `dist/vue-baidu-analytics.min.js`,
      format: 'umd',
      name: 'baiduAnalytics',
      plugins: [
        terser()
      ],
      sourcemap: true
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
    banner2( ResolveBanner, {
      sourcemap: true
    })
  ]
};
