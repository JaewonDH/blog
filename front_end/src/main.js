import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import i18n from './language/language'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({  
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
