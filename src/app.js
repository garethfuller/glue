import Vue from 'vue';
import App from './App.vue';
import Glue from '../dist/glue.ssr';
import router from './router'
import './plugins'

Vue.use(Glue);

import './assets/css/tailwind.css';
import './assets/css/main.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
