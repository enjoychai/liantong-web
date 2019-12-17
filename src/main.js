/**
 * @name 
 * @author SunSeekerX
 * @time 2019-12-16 22:43:06
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-17 01:41:16
 */

 /**
 * @name Import libs
 */
import Vue from 'vue'

/**
 * @name Import Files
 */
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import handleError from '@/utils/HandleError'               // Handle error
import util from '@/utils/Utils' // Common util
import api from '@/apis' // Apis
import VueClipboard  from 'vue-clipboard2'

/**
 * @name Import Files
 */
import '@/utils/Element.js' // Demand element-ui

/**
 * @name Mounted func
 */
Vue.use( VueClipboard )
Vue.prototype.$util = util // Mounted common utils
Vue.prototype.$handleError = handleError                    // Mounted handle error
Vue.prototype.$api = api // Mounted request apis

/**
 * @name Libs config
 */
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
