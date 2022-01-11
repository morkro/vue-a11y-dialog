<template>
  <div id="dialog-root"></div>
  <h1>Dialog Test</h1>
  <p>The following opens because we've assigned a dialog <code>ref</code>:</p>
  <button type="button" data-test-id="dialogRefBtn" @click="openDialog">Open dialog via dialogRef</button>
  <p>The following opens because a11y-dialog uses the <code>data-a11y-dialog-show</code> data attribute:</p>
  <button type="button" data-test-id="dataA11yBtn" data-a11y-dialog-show="a11y-dialog">
    Open the dialog via data attribute
  </button>
  <button type="button" data-test-id="useAlertDialogRole" @click="testAlertDialogRole">
    Use useAlertDialogRole
  </button>
  <button type="button" data-test-id="useClosePositionFirst" @click="testClosePositionFirst">
    Use closePositionFirst
  </button>
  <Vue3A11yDialog
    id="a11y-dialog"
    appRoot="#app"
    dialogRoot="#dialog-root"
    closeButtonLabel="My close button label"
    :closeButtonPosition="closePosition"
    @dialog-ref="assignDialogRef"
    titleId="uniqueTitleId"
    :role="role"
  >
    <template v-slot:closeButtonContent>
      <span>Close</span>
    </template>
    <template v-slot:title>
      <span data-test-id="dialogTitle">A11yDialog Test</span>
    </template>
    <div>
      <p>This is some content</p>
    </div>
  </Vue3A11yDialog>
</template>

<script>
import Vue3A11yDialog from './Vue3A11yDialog.vue'
const classNames = {
  container: 'dialog-container',
}
export default {
  name: "DialogApp",
  components: {
    Vue3A11yDialog,
  },
  data: () => ({
    dialog: null,
    role: 'dialog',
    closePosition: 'last',
  }),
  methods: {
    openDialog() {
      if (this.dialog) {
        this.dialog.show();
      }
    },
    assignDialogRef(dialog) {
      this.dialog = dialog;
    },
    
    // Tests using alertdialog role and opening modal
    testAlertDialogRole() {
      this.role = 'alertdialog';
      this.openDialog();
    },
    
    // Tests using close position of first
    testClosePositionFirst() {
      this.closePosition = 'first';
      this.openDialog();
    }
  }
}
</script>
<style>
#app {
  margin-block-start: 3rem;
}
</style>
