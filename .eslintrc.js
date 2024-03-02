require('@knicola/dev-config/eslint/patch')

module.exports = {
    extends: ['./node_modules/@knicola/dev-config/eslint/node'],
    parserOptions: { tsconfigRootDir: __dirname },
    settings: {
        'import/resolver': {
            typescript: { project: __dirname },
        },
    },
}
