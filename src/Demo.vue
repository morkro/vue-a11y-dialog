<template>
  <header>
    <h1>A11yDialog Demo</h1>
  </header>

  <main>
    <p>The following opens because we've assigned a dialog <code>ref</code>:</p>

    <button type="button" data-test-id="dialogRefBtn" @click="openDialog">
      Open dialog via <code>dialogRef</code>
    </button>

    <p>
      The following opens because a11y-dialog uses the
      <code>data-a11y-dialog-show</code> data attribute:
    </p>

    <button
      type="button"
      data-test-id="dataA11yBtn"
      data-a11y-dialog-show="a11y-dialog"
    >
      Open dialog via <code>data-*</code> attribute
    </button>

    <button
      type="button"
      data-test-id="useClosePositionFirst"
      @click="testClosePositionFirst"
    >
      Use <code>closePositionFirst</code>
    </button>
  </main>

  <a11y-dialog
    id="a11y-dialog"
    close-button-label="My close button label"
    :close-button-position="closePosition"
    title-id="uniqueTitleId"
    :role="role"
    @dialog-ref="assignDialogRef"
  >
    <template #closeButtonContent>
      <span>Close</span>
    </template>
    <template #title>
      <span data-test-id="dialogTitle">A11yDialog Demo</span>
    </template>
    <div>
      <p>This is some content</p>
    </div>
  </a11y-dialog>
</template>

<script>
  import { A11yDialog } from '../dist/vue-a11y-dialog.esm'
  export default {
    name: 'DialogDemo',
    components: {
      A11yDialog
    },
    data: () => ({
      dialog: null,
      role: 'dialog',
      closePosition: 'last',
    }),
    methods: {
      openDialog() {
        if (this.dialog) {
          this.dialog.show()
        }
      },
      assignDialogRef(dialog) {
        this.dialog = dialog
      },
      // Tests using close position of first
      testClosePositionFirst() {
        this.closePosition = 'first'
        this.openDialog()
      },
    },
  }
</script>

<style>
  #app {
    margin-block-start: 3rem;
  }
</style>
