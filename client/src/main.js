import Vue from 'vue'
import App from './App.vue'
import './styles/index'
import store from './store'
import router from './router'
import './plugins/element.js'
import './components'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
