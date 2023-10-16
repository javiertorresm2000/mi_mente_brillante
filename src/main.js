// FILE: main.js

import { createApp } from 'vue'
import { Quasar, Notify,LocalStorage } from 'quasar'
import quasarLang from 'quasar/lang/es'
import quasarIconSet from 'quasar/icon-set/fontawesome-v5'
import router from './routes/routes.js'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import App from './App.vue'
// Import Quasar css
import 'quasar/src/css/index.sass'

//pinia
import { createPinia } from 'pinia'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'




// Assumes your root component is App.vue
// and placed in same folder as main.js


const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {Notify, LocalStorage}, // import Quasar plugins and add here
  lang: quasarLang,
  iconSet: quasarIconSet,
})
myApp.use(createPinia())
myApp.use(router)
myApp.use(autoAnimatePlugin)


// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
