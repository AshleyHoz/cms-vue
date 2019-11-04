import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './plugins/element.js'
import './plugins/axios.js'

Vue.config.productionTip = false

// vue实例内部
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
