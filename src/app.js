import Vue from 'vue';
import App from './App.vue';
import Glue from './plugin';

import './assets/css/tailwind.css';

Vue.config.productionTip = false;

Vue.use(Glue);

new Vue({
  render: h => h(App),
}).$mount('#app');
