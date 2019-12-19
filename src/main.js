import Vue from 'vue'
import App from './App.vue'
import router from './router'

import baiduAnalytics from '@lib/vue-baidu-analytics'

Vue.use(baiduAnalytics, {
  router: router,
  siteIdList: [
    '7d6465217b1b44018c4557d9e7d804eb',
    '4cacea1098b6c4d16990a04abd93c9a9',
    '5be8daec4f7dd86255ae9320369c7678'
  ],
  debug: true
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
