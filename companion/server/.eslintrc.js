module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['error', 2],
    'vue/html-indent': [
      'error',
      2,
      {
        closeBracket: 0,
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['warn', 'single'],
    'no-trailing-spaces': ['error'],
    'valid-jsdoc': [
      'error',
      {
        requireReturnDescription: false,
        requireParamDescription: false,
      },
    ],
    'eqeqeq': ['error'],
    'curly': ['error'],
    'no-param-reassign': ['error'],
    'no-useless-concat': ['error'],
    'yoda': ['error'],
    'max-depth': ['warn'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
}
