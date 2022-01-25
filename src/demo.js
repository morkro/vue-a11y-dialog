import { createApp } from 'vue'
import Demo from './Demo.vue'
import A11yDialog from '../dist/vue-a11y-dialog.esm.js'
import './demo.css'

createApp(Demo).use(A11yDialog).mount('#app')
