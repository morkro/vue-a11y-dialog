import A11yDialog from './A11yDialog'

export { A11yDialog }

export default {
  install: (app) => {
    app.component('a11y-dialog', A11yDialog)
  }
}
