module.exports = {
  "parser": "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  globals: {
    React: false,
    Component: false,
    COIN_API_KEY: false,
  },
  plugins: ['react', 'babel'],
  rules: {
    'react/jsx-uses-vars': 1,
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'no-console': 0,
    'no-debugger': 0,
    /*semi: [
      'error',
      // "always"
    ],*/
    "babel/semi": [
      'error',
      // "always"
    ]
  },
};
