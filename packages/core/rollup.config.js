import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'
import sourcemaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: pkg.umd,
      format: 'umd',
      name: pkg.name,
    },
  ],
  plugins: [
    autoExternal({ packagePath: 'package.json' }),
    sourcemaps(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: '../../node_modules/**',
    }),
    typescript({ tsconfig: 'tsconfig.json' }),
  ],
}