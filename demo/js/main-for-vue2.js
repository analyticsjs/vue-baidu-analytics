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
 * @description 自 v2.1.0 版本开始，需要使用 .default 去激活插件
 */
Vue.use(baiduAnalytics.default, {
  router: router,
  siteIdList: [
    'aaaaaaaaaaaaaaaaaaa',
    'bbbbbbbbbbbbbbbbbbb'
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
      value: '',

      // 也可以绑定一个钩子变量去使用
      baidu: baiduAnalytics.usePush()
    }
  },
  mounted () {
    this.baidu.pv('/use-push-api/?from=mounted');
  },
  methods: {
    /**
     * 提交 pv
     * @description 支持两种推送方式
     */
    pv () {
      // 使用默认全局 API
      this.$pushBAIDU.pv(this.pageUrl);

      // 使用钩子 API
      // this.baidu.pv(this.pageUrl);
    },

    /**
     * 提交事件
     * @description 支持两种推送方式
     */
    event () {
      // 使用默认全局 API
      // this.$pushBAIDU.event(
      //   this.category,
      //   this.action,
      //   this.label,
      //   this.value
      // );

      // 使用钩子 API
      this.baidu.event(
        this.category,
        this.action,
        this.label,
        this.value
      );
    }
  }
});
