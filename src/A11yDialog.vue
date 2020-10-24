<template>
  <teleport :to="portalTarget">
    <div :id="id" :class="classNames.base" ref="rootElement">
      <div
        data-a11y-dialog-hide
        tabIndex="-1"
        :class="classNames.overlay"
        @click="role === 'alertdialog' ? undefined : close" />

      <component :is="dialogElement"
        :role="roleAttribute"
        :class="classNames.element"
        :aria-labelledby="fullTitleId">
        <div role="document" :class="classNames.document">
          <button
            data-a11y-dialog-hide
            type="button"
            :aria-label="closeButtonLabel"
            @click="close"
            :class="classNames.closeButton">
            <slot name="closeButtonContent">
              {{ '\u00D7' }}
            </slot>
          </button>

          <h1 :id="fullTitleId" :class="classNames.title">
            <slot name="title" />
          </h1>

          <slot />
        </div>
      </component>
    </div>
  </teleport>
</template>

<script>
  import A11yDialog from 'a11y-dialog'

  export default {
    name: 'VueA11yDialog',

    props: {
      id: { type: String, required: true },
      appRoot: { type: [String, Array], required: true },
      dialogRoot: { type: String, required: true },
      classNames: { type: Object, default () { return {} } },
      titleId: { type: String },
      closeButtonLabel: { type: String, default: 'Close this dialog window' },
      disableNative: { type: Boolean, default: false },
      role: { type: String, default: 'dialog' }
    },

    computed: {
      fullTitleId () {
        return this.titleId || this.id + '-title'
      },
      dialogElement () {
        return this.disableNative ? 'div' : 'dialog'
      },
      roleAttribute () {
        return ['dialog', 'alertdialog'].includes(this.role)
          ? this.role
          : 'dialog'
      },
      portalTarget () {
        return this.dialogRoot || this.appRoot
      }
    },

    data () {
      return {
        dialog: null
      }
    },

    methods: {
      close () {
        this.dialog.hide()
      }
    },

    mounted () {
      this.$nextTick(function () {
        this.dialog = new A11yDialog(this.$refs.rootElement, this.appRoot)
        this.$emit('dialog-ref', this.dialog)
      }.bind(this))
    },

    unmounted () {
      if (this.dialog) {
        this.dialog.destroy()
      }

      this.$emit('dialog-ref')
    }
  }
</script>
