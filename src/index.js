import Vue3A11yDialog from './Vue3A11yDialog.vue';

export { Vue3A11yDialog };

export default {
  install: (app) => {
    app.component('A11yDialog', Vue3A11yDialog);
  }
};