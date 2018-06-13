import A11yDialog from './A11yDialog'

export { A11yDialog }

export default {
  install (Vue) {
    Vue.component('a11y-dialog', A11yDialog)
  }
}
