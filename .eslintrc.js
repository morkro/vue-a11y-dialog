// https://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    jest: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // custom rules
  rules: {
    'vue/script-indent': 'off',
    'vue/html-indent': 'off',
    'vue/require-default-prop': 'off',
    'vue/max-attributes-per-line': [2, {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'ignores': []
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    'indent': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
  }
}
