<template>
  <header>
    <h1>A11yDialog Alert Dialog</h1>
  </header>

  <main>
    <button type="button" data-test-id="dialogRefBtn" @click="openDialog">
      Open dialog via <code>dialogRef</code>
    </button>
  </main>

  <a11y-dialog
    id="a11y-dialog"
    close-button-label="My close button"
    title-id="uniqueTitleId"
    :role="role"
    @dialog-ref="assignDialogRef"
  >
    <template #title>
      <span>Alert dialog</span>
    </template>
    <div>
      <p>This is some content</p>
    </div>
  </a11y-dialog>
</template>

<script>
  import { A11yDialog } from '../../dist/vue-a11y-dialog.esm'
  export default {
    name: 'AlertDialog',
    components: {
      A11yDialog
    },
    data: () => ({
      dialog: null,
      role: 'alertdialog',
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
    },
  }
</script>
