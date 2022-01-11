import Vue3A11yDialog from './Vue3A11yDialog.vue'

export { Vue3A11yDialog }

export default {
  install: (app) => {
    app.component('a11y-dialog', Vue3A11yDialog)
  }
}