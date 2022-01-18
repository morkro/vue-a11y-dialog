<template>
  <teleport :to="portalTarget">
    <div
      :id="id"
      ref="rootElement"
      :class="classNames.container"
      :role="roleAttribute"
      aria-hidden="true"
      :aria-labelledby="fullTitleId"
    >
      <div
        data-a11y-dialog-hide
        tabIndex="-1"
        :class="classNames.overlay"
        @click="role === 'alertdialog' ? undefined : close"
      />
      <div
        role="document"
        :class="classNames.document"
      >
        <button
          v-if="closeButtonPosition == 'first'"
          data-a11y-dialog-hide
          type="button"
          :aria-label="closeButtonLabel"
          :class="classNames.closeButton"
          @click="close"
        >
          <slot name="closeButtonContent">
            {{ '\u00D7' }}
          </slot>
        </button>
        <p
          :id="fullTitleId"
          :class="classNames.title"
        >
          <slot name="title" />
        </p>
        <slot />
        <button
          v-if="closeButtonPosition == 'last'"
          data-a11y-dialog-hide
          type="button"
          :aria-label="closeButtonLabel"
          :class="classNames.closeButton"
          @click="close"
        >
          <slot name="closeButtonContent">
            {{ '\u00D7' }}
          </slot>
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
  import A11yDialog from 'a11y-dialog';
  import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";

  export default {
    name: 'Vue3A11yDialog',
    props: {
      id: {
        type: String,
        required: true
      },
      appRoot: {
        type: String,
        required: true
      },
      dialogRoot: {
        type: String,
        required: true
      },
      /**
       * Object representing the classes for each HTML element of the dialog
       * element. See: https://a11y-dialog.netlify.app/usage/markup
       */
      classNames: {
        type: Object,
        default () {
          return {
            container: 'dialog-container',
            document: 'dialog-content',
            overlay: 'dialog-overlay',
            title: 'dialog-title',
            closeButton: 'dialog-close',
          };
        },
      },
      role: {
        type: String,
        required: false,
        default: 'dialog',
        validator(value) {
          return ['dialog', 'alertdialog'].includes(value);
        }
      },
      titleId: {
        type: String,
        default: '',
      },
      closeButtonLabel: {
        type: String,
        default: 'Close this dialog window'
      },
      closeButtonPosition: {
        type: String,
        required: false,
        default: 'first',
        validator(value) {
          return ['first', 'last', 'none'].includes(value);
        }
      },
    },
    emits: ['dialogRef'],
    setup(props, { emit }) {
      let dialog;
      const rootElement = ref(null);

      const portalTarget = computed(() => {
        return props.dialogRoot || props.appRoot;
      });

      const fullTitleId = computed(() => {
        return props.titleId || `${props.id}-title`;
      });

      const roleAttribute = computed(() => {
        return ['dialog', 'alertdialog'].includes(props.role)
          ? props.role
          : 'dialog';
      });

      const instantiateDialog = async () => {
        await nextTick();
        dialog = new A11yDialog(rootElement.value, portalTarget.value || props.appRoot);
        emit('dialogRef', dialog);
      };

      onMounted(() => {
        instantiateDialog();
      });

      const close = () => {
        dialog.hide();
      };

      onUnmounted(() => {
        if (dialog) {
          dialog.destroy();
        }
        emit('dialogRef');
      });

      return {
        dialog,
        close,
        portalTarget,
        fullTitleId,
        roleAttribute,
        rootElement,
      };
    },
  };
</script>
