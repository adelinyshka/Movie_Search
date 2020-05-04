module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['airbnb-base'],
    plugins: [
        'babel',
        'import',
        'prettier',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'no-plusplus': 'off',
        'max-len': ['error', 100, 2, { ignoreUrls: true, }],
        'no-console': 'error',
        'no-alert': 'error',
        'prettier/prettier': ['error'],
    },
};