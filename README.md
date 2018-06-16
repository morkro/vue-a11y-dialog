# Vue A11yDialog

This is a Vue.js wrapper component for [`a11y-dialog@5.1.0`](https://github.com/edenspiekermann/a11y-dialog) ([**demo**](https://codesandbox.io/s/rj20wr1kpp)).

-   [Install](#install)
-   [Usage](#usage)
-   [API](#api)
-   [Events](#events)
-   [Slots](#slots)
-   [Server-side Rendering](#server-side-rendering)

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

## API

> All `a11y-dialog` instance methods are available, see their [docs](https://github.com/edenspiekermann/a11y-dialog#js-api) for more.

### `disable-native`
-   **Property**: `disable-native`
-   **Type**: `Boolean`
-   **Default**: `false`
-   **Description**: Per default we're using the native `<dialog>` element. However, if you want to disable that and use a `<div role="dialog">` instead, you can just do that by adding this attribute. This gives you full control (and responsibilites) over styling. Read the [`a11y-dialog` Styling layer documentation](http://edenspiekermann.github.io/a11y-dialog/#styling-layer) for more information.
-   **Usage**:
```html
<a11y-dialog disable-native>
  <!-- ... -->
</a11y-dialog>
```

### `id`
-   **Property**: `id`
-   **Type**: `String`
-   **Required**: `true`
-   **Description**: The unique HTML `id` attribute added to the dialog element, internally used by a11y-dialog to manipulate the dialog.
-   **Usage**:
```html
<a11y-dialog id="main-dialog">
  <!-- ... -->
</a11y-dialog>
```

### `app-root`
-   **Property**: `appRoot`
-   **Type**: `String`, `Array<String>` — CSS Selector string.
-   **Required**: `true`
-   **Description**: The selector(s) `a11y-dialog` needs to disable when the dialog is open.
-   **Usage**:
```html
<a11y-dialog app-root="#app">
  <!-- ... -->
</a11y-dialog>
```

### `class-names`
-   **Property**: `class-names`
-   **Type**: `Object`
-   **Required**: `false`
-   **Default**: `{}`
-   **Description**: Object of classes for each HTML element of the dialog element. Keys are: `base`, `overlay`, `element`, `document`, `title`, `closeButton`. See [a11y-dialog docs](http://edenspiekermann.github.io/a11y-dialog/#expected-dom-structure) for reference.
-   **Usage**:
```html
<a11y-dialog :class-names="{ base: 'base-class', overlay: 'overlay-class' }">
  <!-- ... -->
</a11y-dialog>
```

### `title-id`
-   **Property**: `titleId`
-   **Type**: `String`
-   **Required**: `false`
-   **Default**: Defaults to `id + '-title'`.
-   **Description**: The HTML `id` attribute of the dialog’s title element, used by assistive technologies to provide context and meaning to the dialog window.
-   **Usage**:
```html
<a11y-dialog title-id="main-title">
  <!-- ... -->
</a11y-dialog>
```

### `close-button-label`
-   **Property**: `closeButtonLabel`
-   **Type**: `String`
-   **Required**: `false`
-   **Default**: `'Close this dialog window'`
-   **Description**:  The HTML `aria-label` attribute of the close button, used by assistive technologies to provide extra meaning to the usual cross-mark.
-   **Usage**:
```html
<a11y-dialog close-button-label="Close this super dialog">
  <!-- ... -->
</a11y-dialog>
```

## Events

### `dialog-ref`
-   **Returns**: An `a11y-dialog` instance or `undefined`.
-   **Description**:  This event emits the `a11y-dialog` instance once the component has been initialised. When it gets `destroyed`, the event returns `undefined`. This is needed to call instance methods of the dialog, e.g. `this.dialog.show()`.
-   **Usage**:
```html
<a11y-dialog @dialog-ref="assignDialogRef">
  <!-- ... -->
</a11y-dialog>
```
```js
export default {
  // ...
  methods: {
    assignDialogRef (dialog) {
      this.dialog = dialog
    }
  }
}
```

## Slots

### `title`
-   **Name**: `title`
-   **Default**: `\u00D7` (×)
-   **Description**: The title of the dialog, mandatory in the document to provide context to assistive technology. Could be [hidden with CSS](https://hugogiraudel.com/2016/10/13/css-hide-and-seek/) (while remaining accessible).
-   **Usage**:
```html
<a11y-dialog>
  <h1 slot="title">Your dialog title</h1>
  <!-- ... -->
</a11y-dialog>
```

### `closeButtonContent`
-   **Name**: `closeButtonLabel`
-   **Default**: `\u00D7` (×)
-   **Description**: The string that is the inner HTML of the close button.
-   **Usage**:
```html
<a11y-dialog>
  <span slot="closeButtonContent">Close dialog</span>
  <!-- ... -->
</a11y-dialog>
```

## Server-side Rendering

This is a client-only component; `a11y-dialog` won't render anything on the server and wait for your bundle to be executed on the client.
