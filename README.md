# Vue A11yDialog [![Build Status](https://travis-ci.org/morkro/vue-a11y-dialog.svg?branch=master)](https://travis-ci.org/morkro/vue-a11y-dialog)

This is a Vue.js wrapper component for [`a11y-dialog@7.3.0`](https://github.com/KittyGiraudel/a11y-dialog)

**Vue 3**

This version comes with Vue 3 support and removes the dependency to. If you still need to support Vue 2, you can stay on version [`0.5.2`](https://github.com/morkro/vue-a11y-dialog/tree/0.5.2).

- [Install](#install)
- [Usage](#usage)
  - [Multiple dialogs](#multiple-dialogs)
- [API](#api)
- [Events](#events)
- [Slots](#slots)
- [Server-side Rendering](#server-side-rendering)

## Install

```bash
npm install vue-a11y-dialog
```

## Usage

In your `main.js` application file, install the component:

### Vue 3

```js
import { createApp } from 'vue'
import VueA11yDialog from 'vue-a11y-dialog'
import App from './App.vue'

createApp(App).use(VueA11yDialog).mount('#app')
```

Then use it as follows:

```html
<template>
  <div id="app">
    <!-- ... -->
    <button type="button" @click="openDialog">
      Open dialog
    </button>

    <a11y-dialog
      id="app-dialog"
      app-root="#app"
      dialog-root="#dialog-root"
      @dialog-ref="assignDialogRef"
    >
      <template v-slot:title>
        <span>Your dialog title</span>
      </template>
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
    openDialog() {
      if (this.dialog) {
        this.dialog.show()
      }
    },

    assignDialogRef(dialog) {
      this.dialog = dialog
    }
  }
}
```

In your `index.html`, add a container where your dialog will be rendered into.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <div id="dialog-root"></div>
  </body>
</html>
```

It's important to assign the direct reference to the dialog instance via `@dialog-ref`, otherwise there is no way to call its methods.

Alternatively, you can also import the component directly into your file without installing it first:

```js
import { A11yDialog } from 'vue-a11y-dialog'
export default {
  name: 'YourComponent',

  components: {
    'a11y-dialog': A11yDialog
  },

  methods: {
    // ...
  }
}
```

### Multiple dialogs

It's possible to use multiple dialogs in the same component, just make sure to assign the different `dialog` instances separately.

In your `<template>`:

```html
<template>
  <div id="app">
    <!-- First dialog -->
    <a11y-dialog
      id="first-dialog"
      app-root="#app"
      dialog-root="#dialog-root"
      @dialog-ref="dialog => assignDialogRef('first', dialog)"
    >
      <template v-slot:title>
        <span>First dialog title</span>
      </template>
      <div>
        <p>Your content</p>
      </div>
    </a11y-dialog>

    <!-- Second dialog -->
    <a11y-dialog
      id="second-dialog"
      app-root="#app"
      dialog-root="#dialog-root"
      @dialog-ref="dialog => assignDialogRef('second', dialog)"
    >
      <template v-slot:title>
        <span>Second dialog title</span>
      </template>
      <div>
        <p>Your content</p>
      </div>
    </a11y-dialog>
  </div>
</template>
```

In your `<script>`:

```js
import { A11yDialog } from 'vue-a11y-dialog';
export default {
  name: 'YourComponent',

  data: () => ({
    dialogs: {}
  }),

  methods: {
    assignDialogRef(type, dialog) {
      this.dialogs[type] = dialog
    }
  }
}
```

## API

> The `a11y-dialog` documentation is [here](https://a11y-dialog.netlify.app/)

### `id`

- **Property**: `id`
- **Type**: `String`
- **Required**: `true`
- **Description**: The unique HTML `id` attribute added to the dialog element, internally used by a11y-dialog to manipulate the dialog.
- **Usage**:

```html
<a11y-dialog id="main-dialog">
  <!-- ... -->
</a11y-dialog>
```

### `app-root`

- **Property**: `app-root`
- **Type**: `String`, `Array<String>` — CSS Selector string.
- **Required**: `true`
- **Description**: The selector(s) `a11y-dialog` needs to disable when the dialog is open.
- **Usage**:

```html
<a11y-dialog app-root="#app">
  <!-- ... -->
</a11y-dialog>
```

### `dialog-root`

- **Property**: `dialog-root`
- **Type**: `String` — CSS Selector string.
- **Required**: `true`
- **Description**: The container for the dialog to be rendered into.
- **Usage**:

```html
<a11y-dialog dialog-root="#dialog-root">
  <!-- ... -->
</a11y-dialog>
```

### `class-names`

- **Property**: `class-names`
- **Type**: `Object`
- **Required**: `false`
- **Default**: `{}`
- **Description**: Object of classes for each HTML element of the dialog element. Keys are: `base`, `overlay`, `document`, `title`, `closeButton`. See [a11y-dialog docs](http://edenspiekermann.github.io/a11y-dialog/#expected-dom-structure) for reference.
- **Usage**:

```html
<a11y-dialog :class-names="{ base: 'base-class', overlay: 'overlay-class' }">
  <!-- ... -->
</a11y-dialog>
```

### `title-id`

- **Property**: `title-id`
- **Type**: `String`
- **Required**: `false`
- **Default**: Defaults to `id + '-title'`.
- **Description**: The HTML `id` attribute of the dialog’s title element, used by assistive technologies to provide context and meaning to the dialog window.
- **Usage**:

```html
<a11y-dialog title-id="main-title">
  <!-- ... -->
</a11y-dialog>
```

### `close-button-label`

- **Property**: `close-button-label`
- **Type**: `String`
- **Required**: `false`
- **Default**: `'Close this dialog window'`
- **Description**: The HTML `aria-label` attribute of the close button, used by assistive technologies to provide extra meaning to the usual cross-mark.
- **Usage**:

```html
<a11y-dialog close-button-label="Close this super dialog">
  <!-- ... -->
</a11y-dialog>
```

### `role`

- **Property**: `role`
- **Type**: `String`
- **Required**: `false`
- **Default**: `dialog`
- **Description**: The `role` attribute of the dialog element, either `dialog` (default) or `alertdialog` to make it a modal (preventing closing on click outside of <kbd>ESC</kbd> key).
- **Usage**:

```html
<a11y-dialog role="alertdialog">
  <!-- ... -->
</a11y-dialog>
```

## Events

### `dialog-ref`

- **Returns**: An `a11y-dialog` instance or `undefined`.
- **Description**: This event emits the `a11y-dialog` instance once the component has been initialised. When it gets `destroyed`, the event returns `undefined`. This is needed to call instance methods of the dialog, e.g. `this.dialog.show()`.
- **Usage**:

```html
<a11y-dialog @dialog-ref="assignDialogRef">
  <!-- ... -->
</a11y-dialog>
```

```js
export default {
  // ...
  methods: {
    assignDialogRef(dialog) {
      this.dialog = dialog
    }
  }
}
```

## Slots

### `title`

- **Name**: `title`
- **Description**: The title of the dialog, mandatory in the document to provide context to assistive technology. Could be [hidden with CSS](https://hugogiraudel.com/2016/10/13/css-hide-and-seek/) (while remaining accessible).
- **Usage**:

```html
<a11y-dialog>
  <template v-slot:title>
    <span>Your dialog title</span>
  </template>
  <!-- ... -->
</a11y-dialog>
```

### `closeButtonContent`

- **Name**: `closeButtonLabel`
- **Default**: `\u00D7` (×)
- **Description**: The string that is the inner HTML of the close button.
- **Usage**:

```html
<a11y-dialog>
  <template v-slot:closeButtonContent>
    <span>Close dialog</span>
  </template>
  <!-- ... -->
</a11y-dialog>
```


### `closeButtonPosition`

- **Name**: `closeButtonPosition`
- **Default**: `first`
- **Description**: One of `first`, `last`, or `none`
- **Usage**:

```html
<a11y-dialog closeButtonPosition="last">
  <template v-slot:closeButtonContent>
    <span>Close dialog</span>
  </template>
  <!-- ... -->
</a11y-dialog>
```

## Server-side Rendering

This is a client-only component; `a11y-dialog` won't render anything on the server and wait for your bundle to be executed on the client.