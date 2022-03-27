(function(a,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(a=typeof globalThis!="undefined"?globalThis:a||self,e(a["vue-a11y-dialog"]={},a.Vue))})(this,function(a,e){"use strict";var y=['a[href]:not([tabindex^="-"])','area[href]:not([tabindex^="-"])','input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])','input[type="radio"]:not([disabled]):not([tabindex^="-"])','select:not([disabled]):not([tabindex^="-"])','textarea:not([disabled]):not([tabindex^="-"])','button:not([disabled]):not([tabindex^="-"])','iframe:not([tabindex^="-"])','audio[controls]:not([tabindex^="-"])','video[controls]:not([tabindex^="-"])','[contenteditable]:not([tabindex^="-"])','[tabindex]:not([tabindex^="-"])'],m=9,b=27;function s(t){this._show=this.show.bind(this),this._hide=this.hide.bind(this),this._maintainFocus=this._maintainFocus.bind(this),this._bindKeypress=this._bindKeypress.bind(this),this.$el=t,this.shown=!1,this._id=this.$el.getAttribute("data-a11y-dialog")||this.$el.id,this._previouslyFocused=null,this._listeners={},this.create()}s.prototype.create=function(){return this.$el.setAttribute("aria-hidden",!0),this.$el.setAttribute("aria-modal",!0),this.$el.setAttribute("tabindex",-1),this.$el.hasAttribute("role")||this.$el.setAttribute("role","dialog"),this._openers=d('[data-a11y-dialog-show="'+this._id+'"]'),this._openers.forEach(function(t){t.addEventListener("click",this._show)}.bind(this)),this._closers=d("[data-a11y-dialog-hide]",this.$el).concat(d('[data-a11y-dialog-hide="'+this._id+'"]')),this._closers.forEach(function(t){t.addEventListener("click",this._hide)}.bind(this)),this._fire("create"),this},s.prototype.show=function(t){return this.shown?this:(this._previouslyFocused=document.activeElement,this.$el.removeAttribute("aria-hidden"),this.shown=!0,u(this.$el),document.body.addEventListener("focus",this._maintainFocus,!0),document.addEventListener("keydown",this._bindKeypress),this._fire("show",t),this)},s.prototype.hide=function(t){return this.shown?(this.shown=!1,this.$el.setAttribute("aria-hidden","true"),this._previouslyFocused&&this._previouslyFocused.focus&&this._previouslyFocused.focus(),document.body.removeEventListener("focus",this._maintainFocus,!0),document.removeEventListener("keydown",this._bindKeypress),this._fire("hide",t),this):this},s.prototype.destroy=function(){return this.hide(),this._openers.forEach(function(t){t.removeEventListener("click",this._show)}.bind(this)),this._closers.forEach(function(t){t.removeEventListener("click",this._hide)}.bind(this)),this._fire("destroy"),this._listeners={},this},s.prototype.on=function(t,o){return typeof this._listeners[t]=="undefined"&&(this._listeners[t]=[]),this._listeners[t].push(o),this},s.prototype.off=function(t,o){var i=(this._listeners[t]||[]).indexOf(o);return i>-1&&this._listeners[t].splice(i,1),this},s.prototype._fire=function(t,o){var i=this._listeners[t]||[],n=new CustomEvent(t,{detail:o});this.$el.dispatchEvent(n),i.forEach(function(l){l(this.$el,o)}.bind(this))},s.prototype._bindKeypress=function(t){!this.$el.contains(document.activeElement)||(this.shown&&t.which===b&&this.$el.getAttribute("role")!=="alertdialog"&&(t.preventDefault(),this.hide(t)),this.shown&&t.which===m&&p(this.$el,t))},s.prototype._maintainFocus=function(t){this.shown&&!t.target.closest('[aria-modal="true"]')&&!t.target.closest("[data-a11y-dialog-ignore-focus-trap]")&&u(this.$el)};function g(t){return Array.prototype.slice.call(t)}function d(t,o){return g((o||document).querySelectorAll(t))}function u(t){var o=t.querySelector("[autofocus]")||t;o.focus()}function _(t){return d(y.join(","),t).filter(function(o){return!!(o.offsetWidth||o.offsetHeight||o.getClientRects().length)})}function p(t,o){var i=_(t),n=i.indexOf(document.activeElement);o.shiftKey&&n===0?(i[i.length-1].focus(),o.preventDefault()):!o.shiftKey&&n===i.length-1&&(i[0].focus(),o.preventDefault())}function c(){d("[data-a11y-dialog]").forEach(function(t){new s(t)})}typeof document!="undefined"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):window.requestAnimationFrame?window.requestAnimationFrame(c):window.setTimeout(c,16));var E=(t,o)=>{const i=t.__vccOpts||t;for(const[n,l]of o)i[n]=l;return i};const w={name:"A11yDialog",props:{id:{type:String,required:!0},dialogRoot:{type:String,default:"body",required:!1},classNames:{type:Object,default(){return{container:"dialog-container",document:"dialog-content",overlay:"dialog-overlay",title:"dialog-title",closeButton:"dialog-close"}}},role:{type:String,required:!1,default:"dialog",validator(t){return["dialog","alertdialog"].includes(t)}},titleId:{type:String,default:""},closeButtonLabel:{type:String,default:"Close this dialog window"},closeButtonPosition:{type:String,required:!1,default:"first",validator(t){return["first","last","none"].includes(t)}}},emits:["dialog-ref"],setup(t,{emit:o}){let i;const n=e.ref(null),l=e.computed(()=>t.dialogRoot||"body"),f=e.computed(()=>t.titleId||`${t.id}-title`),r=e.computed(()=>["dialog","alertdialog"].includes(t.role)?t.role:"dialog"),N=async()=>{await e.nextTick(),i=new s(n.value),o("dialog-ref",i)};e.onMounted(()=>{N()});const F=()=>{i.hide()};return e.onUnmounted(()=>{i&&i.destroy(),o("dialog-ref")}),{dialog:i,close:F,portalTarget:l,fullTitleId:f,roleAttribute:r,rootElement:n}}},x=["id","role","aria-labelledby"],A=["data-a11y-dialog-hide"],C=["aria-label"],k=e.createTextVNode(e.toDisplayString("\xD7")),S=["id"],B=["aria-label"],v=e.createTextVNode(e.toDisplayString("\xD7"));function T(t,o,i,n,l,f){return e.openBlock(),e.createBlock(e.Teleport,{to:n.portalTarget},[e.createElementVNode("div",{ref:"rootElement",id:i.id,class:e.normalizeClass(i.classNames.container),role:n.roleAttribute,"aria-hidden":"true","aria-labelledby":n.fullTitleId},[e.createElementVNode("div",{"data-a11y-dialog-hide":i.role==="alertdialog"?void 0:!0,tabIndex:"-1",class:e.normalizeClass(i.classNames.overlay),onClick:o[0]||(o[0]=r=>i.role==="alertdialog"?void 0:n.close)},null,10,A),e.createElementVNode("div",{role:"document",class:e.normalizeClass(i.classNames.document)},[i.closeButtonPosition=="first"?(e.openBlock(),e.createElementBlock("button",{key:0,"data-a11y-dialog-hide":"",type:"button","aria-label":i.closeButtonLabel,class:e.normalizeClass(i.classNames.closeButton),onClick:o[1]||(o[1]=(...r)=>n.close&&n.close(...r))},[e.renderSlot(t.$slots,"closeButtonContent",{},()=>[k])],10,C)):e.createCommentVNode("",!0),e.createElementVNode("p",{id:n.fullTitleId,class:e.normalizeClass(i.classNames.title)},[e.renderSlot(t.$slots,"title")],10,S),e.renderSlot(t.$slots,"default"),i.closeButtonPosition=="last"?(e.openBlock(),e.createElementBlock("button",{key:1,"data-a11y-dialog-hide":"",type:"button","aria-label":i.closeButtonLabel,class:e.normalizeClass(i.classNames.closeButton),onClick:o[2]||(o[2]=(...r)=>n.close&&n.close(...r))},[e.renderSlot(t.$slots,"closeButtonContent",{},()=>[v])],10,B)):e.createCommentVNode("",!0)],2)],10,x)],8,["to"])}var h=E(w,[["render",T]]),D={install:t=>{t.component("a11y-dialog",h)}};a.A11yDialog=h,a.default=D,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module"});
