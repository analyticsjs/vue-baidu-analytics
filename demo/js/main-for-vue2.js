/** 
 * 初始化路由
 * routes是来自 js/routes.js 里面的配置
 */
const router = new VueRouter({
  routes,
  linkActiveClass: 'cur',
  linkExactActiveClass: 'cur'
});


/** 
 * 引入统计插件
 */
Vue.use(baiduAnalytics, {
  router: router,
  siteIdList: [
    'aaaaaaaaaaaaaaaaaaa',
    'bbbbbbbbbbbbbbbbbbb',
    'ccccccccccccccccccc'
  ],
  isDebug: true
});


/** 
 * 初始化Vue
 */
const app = new Vue({
  el: '#app',
  router,
  data () {
    return {
      pageUrl: '',
      category: '',
      action: '',
      label: '',
      value: ''
    }
  },
  mounted () {
  },
  methods: {
    pv () {
      this.$pushBAIDU.pv(this.pageUrl);
    },
    event () {
      this.$pushBAIDU.event(
        this.category,
        this.action,
        this.label,
        this.value
      );
    }
  }
});