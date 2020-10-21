import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import http from './http'
import api from './api/index'

// import Blob from './excel/Blob.js'
// import Export2Excel from './excel/Export2Excel.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
