module.exports = {
  env: {
    "browser": true,
    "es2021": true,
    "node": true,
    "cypress/globals": true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: [
    "vue",
    "cypress"
  ],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-unused-vars": "error",
    "semi": [2, "always"],
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error"
  }
};