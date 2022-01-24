<template>
  <h1>Dialog Test</h1>
  <p>The following opens because we've assigned a dialog <code>ref</code>:</p>
  <button
    type="button"
    data-test-id="dialogRefBtn"
    @click="openDialog"
  >
    Open dialog via dialogRef
  </button>
  <p>The following opens because a11y-dialog uses the <code>data-a11y-dialog-show</code> data attribute:</p>
  <button
    type="button"
    data-test-id="dataA11yBtn"
    data-a11y-dialog-show="a11y-dialog"
  >
    Open the dialog via data attribute
  </button>
  <A11yDialog
    id="a11y-dialog"
    app-root="#app"
    dialog-root="#dialog-root"
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
      <span data-test-id="dialogTitle">A11yDialog Test</span>
    </template>
    <div>
      <p>This is some content</p>
    </div>
  </A11yDialog>
</template>
<script>
  export default {
    name: 'App'
  }
</script>

<script setup>
import A11yDialog from 'vue-a11y-dialog'
console.log('A11yDialog', A11yDialog)
let dialog = null
let role = 'dialog'
let closePosition = 'last'

const openDialog = () => {
  if (dialog) {
    dialog.show()
  }
}

const assignDialogRef = (instance) => {
  dialog = instance
}

</script>
<style>
#app {
  margin-block-start: 3rem;
}
.dialog-container {
  display: flex;
  z-index: 2;
}

.dialog-overlay {
  background-color: rgba(43, 46, 56, 0.9);
  animation: fade-in 200ms both;
}

.dialog-overlay,
.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Crucial—dialog w/not hide visually without this rule */
.dialog-container[aria-hidden='true'] {
  display: none;
}

.dialog-content {
  background-color: rgb(255, 255, 255);
  margin: auto;
  z-index: 2;
  position: relative;
  padding: 1em;
  max-width: 90%;
  width: 600px;
  border-radius: 2px;
}

/* Just some needless styles for fun */
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
