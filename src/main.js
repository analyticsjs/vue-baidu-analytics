import Vue from 'vue'
import App from './App.vue'
import router from './router'

import baiduAnalytics from '@lib/vue-baidu-analytics'

Vue.use(baiduAnalytics, {
  router: router,
  siteIdList: [
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    'cccccccccccccccccccccccccccccccc'
  ],
  debug: true
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
