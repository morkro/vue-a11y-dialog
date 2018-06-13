# Vue A11yDialog

This is a Vue.js wrapper component for [`a11y-dialog`](https://github.com/edenspiekermann/a11y-dialog).

## Install

```bash
npm install vue-a11y-dialog
```

## Usage

In your `main.js` application file, install the component:

```js
import VueA11yDialog from 'vue-a11y-dialog'

Vue.use(VueA11yDialog)
```

Then use it as follows:

```html
<template>
  <div id="app">
    <!-- ... -->
    <button type="button" @click="openDialog">
      Open dialog
    <button>

    <a11y-dialog id="app-dialog" app-root="#app" @dialog-ref="assignDialogRef">
      <h1 slot="title">Your dialog title</h1>
      <div>
        <p>Your content</p>
      </div>
    </a11y-dialog>
  </div>
</template>
```
```js
export default {
  name: 'YourComponent',

  data: () => ({
    dialog: null
  }),

  methods: {
    openDialog () {
      if (this.dialog) {
        this.dialog.show()
      }
    },

    assignDialogRef (dialog) {
      this.dialog = dialog
    }
  }
}
```

It's important to assign the direct reference to the dialog instance via `@dialog-ref`, otherwise there is no way to call its methods.

Alternatively, you can also import the component directly into your file without installing it first:

```js
import { VueA11yDialog } from 'vue-a11y-dialog'
export default {
  name: 'YourComponent',

  components: {
    'a11y-dialog': VueA11yDialog
  },

  methods: {
    // ...
  }
}
```

### API

> All `a11y-dialog` instance methods are available, see their [docs](https://github.com/edenspiekermann/a11y-dialog#js-api) for more.

## Server-side Rendering

This is a client-only component; `a11y-dialog` won't render anything on the server and wait for your bundle to be executed on the client.
