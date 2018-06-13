// https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: [
    'plugin:vue/strongly-recommended',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
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
    'indent': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
  }
}
