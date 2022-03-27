import { ref, computed, onMounted, onUnmounted, openBlock, createBlock, Teleport, createElementVNode, normalizeClass, createElementBlock, renderSlot, createCommentVNode, nextTick, createTextVNode, toDisplayString } from "vue";
var focusableSelectors = [
  'a[href]:not([tabindex^="-"])',
  'area[href]:not([tabindex^="-"])',
  'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
  'input[type="radio"]:not([disabled]):not([tabindex^="-"])',
  'select:not([disabled]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([tabindex^="-"])',
  'button:not([disabled]):not([tabindex^="-"])',
  'iframe:not([tabindex^="-"])',
  'audio[controls]:not([tabindex^="-"])',
  'video[controls]:not([tabindex^="-"])',
  '[contenteditable]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])'
];
var TAB_KEY = 9;
var ESCAPE_KEY = 27;
function A11yDialog$1(element) {
  this._show = this.show.bind(this);
  this._hide = this.hide.bind(this);
  this._maintainFocus = this._maintainFocus.bind(this);
  this._bindKeypress = this._bindKeypress.bind(this);
  this.$el = element;
  this.shown = false;
  this._id = this.$el.getAttribute("data-a11y-dialog") || this.$el.id;
  this._previouslyFocused = null;
  this._listeners = {};
  this.create();
}
A11yDialog$1.prototype.create = function() {
  this.$el.setAttribute("aria-hidden", true);
  this.$el.setAttribute("aria-modal", true);
  this.$el.setAttribute("tabindex", -1);
  if (!this.$el.hasAttribute("role")) {
    this.$el.setAttribute("role", "dialog");
  }
  this._openers = $$('[data-a11y-dialog-show="' + this._id + '"]');
  this._openers.forEach(function(opener) {
    opener.addEventListener("click", this._show);
  }.bind(this));
  this._closers = $$("[data-a11y-dialog-hide]", this.$el).concat($$('[data-a11y-dialog-hide="' + this._id + '"]'));
  this._closers.forEach(function(closer) {
    closer.addEventListener("click", this._hide);
  }.bind(this));
  this._fire("create");
  return this;
};
A11yDialog$1.prototype.show = function(event) {
  if (this.shown) {
    return this;
  }
  this._previouslyFocused = document.activeElement;
  this.$el.removeAttribute("aria-hidden");
  this.shown = true;
  moveFocusToDialog(this.$el);
  document.body.addEventListener("focus", this._maintainFocus, true);
  document.addEventListener("keydown", this._bindKeypress);
  this._fire("show", event);
  return this;
};
A11yDialog$1.prototype.hide = function(event) {
  if (!this.shown) {
    return this;
  }
  this.shown = false;
  this.$el.setAttribute("aria-hidden", "true");
  if (this._previouslyFocused && this._previouslyFocused.focus) {
    this._previouslyFocused.focus();
  }
  document.body.removeEventListener("focus", this._maintainFocus, true);
  document.removeEventListener("keydown", this._bindKeypress);
  this._fire("hide", event);
  return this;
};
A11yDialog$1.prototype.destroy = function() {
  this.hide();
  this._openers.forEach(function(opener) {
    opener.removeEventListener("click", this._show);
  }.bind(this));
  this._closers.forEach(function(closer) {
    closer.removeEventListener("click", this._hide);
  }.bind(this));
  this._fire("destroy");
  this._listeners = {};
  return this;
};
A11yDialog$1.prototype.on = function(type, handler) {
  if (typeof this._listeners[type] === "undefined") {
    this._listeners[type] = [];
  }
  this._listeners[type].push(handler);
  return this;
};
A11yDialog$1.prototype.off = function(type, handler) {
  var index2 = (this._listeners[type] || []).indexOf(handler);
  if (index2 > -1) {
    this._listeners[type].splice(index2, 1);
  }
  return this;
};
A11yDialog$1.prototype._fire = function(type, event) {
  var listeners = this._listeners[type] || [];
  var domEvent = new CustomEvent(type, { detail: event });
  this.$el.dispatchEvent(domEvent);
  listeners.forEach(function(listener) {
    listener(this.$el, event);
  }.bind(this));
};
A11yDialog$1.prototype._bindKeypress = function(event) {
  if (!this.$el.contains(document.activeElement))
    return;
  if (this.shown && event.which === ESCAPE_KEY && this.$el.getAttribute("role") !== "alertdialog") {
    event.preventDefault();
    this.hide(event);
  }
  if (this.shown && event.which === TAB_KEY) {
    trapTabKey(this.$el, event);
  }
};
A11yDialog$1.prototype._maintainFocus = function(event) {
  if (this.shown && !event.target.closest('[aria-modal="true"]') && !event.target.closest("[data-a11y-dialog-ignore-focus-trap]")) {
    moveFocusToDialog(this.$el);
  }
};
function toArray(collection) {
  return Array.prototype.slice.call(collection);
}
function $$(selector, context) {
  return toArray((context || document).querySelectorAll(selector));
}
function moveFocusToDialog(node) {
  var focused = node.querySelector("[autofocus]") || node;
  focused.focus();
}
function getFocusableChildren(node) {
  return $$(focusableSelectors.join(","), node).filter(function(child) {
    return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
  });
}
function trapTabKey(node, event) {
  var focusableChildren = getFocusableChildren(node);
  var focusedItemIndex = focusableChildren.indexOf(document.activeElement);
  if (event.shiftKey && focusedItemIndex === 0) {
    focusableChildren[focusableChildren.length - 1].focus();
    event.preventDefault();
  } else if (!event.shiftKey && focusedItemIndex === focusableChildren.length - 1) {
    focusableChildren[0].focus();
    event.preventDefault();
  }
}
function instantiateDialogs() {
  $$("[data-a11y-dialog]").forEach(function(node) {
    new A11yDialog$1(node);
  });
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", instantiateDialogs);
  } else {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(instantiateDialogs);
    } else {
      window.setTimeout(instantiateDialogs, 16);
    }
  }
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  name: "A11yDialog",
  props: {
    id: {
      type: String,
      required: true
    },
    dialogRoot: {
      type: String,
      default: "body",
      required: false
    },
    classNames: {
      type: Object,
      default() {
        return {
          container: "dialog-container",
          document: "dialog-content",
          overlay: "dialog-overlay",
          title: "dialog-title",
          closeButton: "dialog-close"
        };
      }
    },
    role: {
      type: String,
      required: false,
      default: "dialog",
      validator(value) {
        return ["dialog", "alertdialog"].includes(value);
      }
    },
    titleId: {
      type: String,
      default: ""
    },
    closeButtonLabel: {
      type: String,
      default: "Close this dialog window"
    },
    closeButtonPosition: {
      type: String,
      required: false,
      default: "first",
      validator(value) {
        return ["first", "last", "none"].includes(value);
      }
    }
  },
  emits: ["dialog-ref"],
  setup(props, { emit }) {
    let dialog;
    const rootElement = ref(null);
    const portalTarget = computed(() => {
      return props.dialogRoot || "body";
    });
    const fullTitleId = computed(() => {
      return props.titleId || `${props.id}-title`;
    });
    const roleAttribute = computed(() => {
      return ["dialog", "alertdialog"].includes(props.role) ? props.role : "dialog";
    });
    const instantiateDialog = async () => {
      await nextTick();
      dialog = new A11yDialog$1(rootElement.value);
      emit("dialog-ref", dialog);
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
      emit("dialog-ref");
    });
    return {
      dialog,
      close,
      portalTarget,
      fullTitleId,
      roleAttribute,
      rootElement
    };
  }
};
const _hoisted_1 = ["id", "role", "aria-labelledby"];
const _hoisted_2 = ["data-a11y-dialog-hide"];
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = /* @__PURE__ */ createTextVNode(/* @__PURE__ */ toDisplayString("\xD7"));
const _hoisted_5 = ["id"];
const _hoisted_6 = ["aria-label"];
const _hoisted_7 = /* @__PURE__ */ createTextVNode(/* @__PURE__ */ toDisplayString("\xD7"));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: $setup.portalTarget }, [
    createElementVNode("div", {
      ref: "rootElement",
      id: $props.id,
      class: normalizeClass($props.classNames.container),
      role: $setup.roleAttribute,
      "aria-hidden": "true",
      "aria-labelledby": $setup.fullTitleId
    }, [
      createElementVNode("div", {
        "data-a11y-dialog-hide": $props.role === "alertdialog" ? void 0 : true,
        tabIndex: "-1",
        class: normalizeClass($props.classNames.overlay),
        onClick: _cache[0] || (_cache[0] = ($event) => $props.role === "alertdialog" ? void 0 : $setup.close)
      }, null, 10, _hoisted_2),
      createElementVNode("div", {
        role: "document",
        class: normalizeClass($props.classNames.document)
      }, [
        $props.closeButtonPosition == "first" ? (openBlock(), createElementBlock("button", {
          key: 0,
          "data-a11y-dialog-hide": "",
          type: "button",
          "aria-label": $props.closeButtonLabel,
          class: normalizeClass($props.classNames.closeButton),
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.close && $setup.close(...args))
        }, [
          renderSlot(_ctx.$slots, "closeButtonContent", {}, () => [
            _hoisted_4
          ])
        ], 10, _hoisted_3)) : createCommentVNode("", true),
        createElementVNode("p", {
          id: $setup.fullTitleId,
          class: normalizeClass($props.classNames.title)
        }, [
          renderSlot(_ctx.$slots, "title")
        ], 10, _hoisted_5),
        renderSlot(_ctx.$slots, "default"),
        $props.closeButtonPosition == "last" ? (openBlock(), createElementBlock("button", {
          key: 1,
          "data-a11y-dialog-hide": "",
          type: "button",
          "aria-label": $props.closeButtonLabel,
          class: normalizeClass($props.classNames.closeButton),
          onClick: _cache[2] || (_cache[2] = (...args) => $setup.close && $setup.close(...args))
        }, [
          renderSlot(_ctx.$slots, "closeButtonContent", {}, () => [
            _hoisted_7
          ])
        ], 10, _hoisted_6)) : createCommentVNode("", true)
      ], 2)
    ], 10, _hoisted_1)
  ], 8, ["to"]);
}
var A11yDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var index = {
  install: (app) => {
    app.component("a11y-dialog", A11yDialog);
  }
};
export { A11yDialog, index as default };
