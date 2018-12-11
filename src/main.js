import Vue from 'vue';
import App from './App.vue';
import Glue from './build';

import './assets/css/tailwind.css';

Vue.config.productionTip = false;

Vue.use(Glue);

new Vue({
  render: h => h(App),
}).$mount('#app');
