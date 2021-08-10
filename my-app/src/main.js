import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'

import VueResource from 'vue-resource';
Vue.use(VueResource);

/* Auth plugin */
import Zipkin from './zipkin'
Vue.use(Zipkin)

Vue.config.productionTip = false

Vue.config.errorHandler = function(err, vm, info) {
  // console.log(`My Error: ${err.toString()}\nInfo: ${info}\n Error Stack: ${err.stack}\n`);
  localStorage.errorName = err.toString();
  localStorage.errorType = info.toString();
  localStorage.errorStack = err.stack.toString();
  const response = fetch(`/api/error`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
                            error: err.toString(), 
                            information: info,
                            stack: err.stack
                         })
  })
  return response.json();
}

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);
