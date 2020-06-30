import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
