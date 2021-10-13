import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
export default [
    {
        input: './src/index.ts',
        output: [
            // cjs(commonjs)
            {
                format: 'cjs',
                file: pkg.main
            },
            // esm
            {
                format: 'es',
                file: pkg.module
            }
        ],

        plugins: [typescript()]
    },
    {
        input: './src/index.ts',
        output: [{ file: pkg.types, format: 'es' }],
        plugins: [dts()]
    }
]
