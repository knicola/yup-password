'use strict'

const { terser } = require('rollup-plugin-terser')

module.exports = {
    input: 'index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        plugins: [
            terser()
        ]
    },
}
