module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    quotes: 'off',
    'no-console': 'off',
    'max-len': 'off',
    indent: 'off',
    'object-curly-spacing': 'off',
    semi: 'off',
    'require-jsdoc': 'off',
    'operator-linebreak': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
}
