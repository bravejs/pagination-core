import path from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const libName = 'PaginationCore'
const outputTypes = ['umd', 'esm']

outputTypes.forEach((type) => {
  outputTypes.push(type + '.min')
})

/**
 * @type { import('rollup').RollupOptions }
 */
const options = {
  input: path.join(__dirname, 'src/index.ts'),
  output: outputTypes.map((type) => {
    const plugins = []
    if (type.indexOf('.min') >= 0) {
      plugins.push(terser())
    }
    return {
      file: path.join(__dirname, `dist/index.${type}.js`),
      format: type.split('.')[0],
      name: libName,
      plugins: plugins
    }
  }),
  plugins: [
    typescript({
      tsconfig: path.join(__dirname, 'tsconfig.json')
    })
  ]
}

export default options