// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import './assets/css/chessground.css'
import './assets/css/theme.css'
Vue.use(Buefy)
Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue(); // Global event bus

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
