/**
 * 导入需要用到的组件
 */
const { createRouter, createWebHashHistory } = VueRouter;
const { createApp, getCurrentInstance, ref } = Vue;
const { usePush } = baiduAnalytics;


/**
 * 初始化路由
 * routes是来自 js/routes.js 里面的配置
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'cur',
  linkExactActiveClass: 'cur'
});


/**
 * 创建实例
 */
const app = {
  setup () {
    /**
     * 新的推荐方式
     * @description 创建一个钩子变量去使用，更适合于 TypeScript 项目
     */
    const baidu = usePush();

    /**
     * 原来的方式
     * @description 用代理组件去操作，对 TS 项目不够友好
     */
    // const { proxy } = getCurrentInstance();

    // 初始化要用到的数据
    const pageUrl = ref('');
    const category = ref('');
    const action = ref('');
    const label = ref('');
    const value = ref('');

    /**
     * 提交 pv
     * @description 支持两种推送方式
     */
    const pv = () => {
      // 通过钩子去操作
      baidu.pv(pageUrl.value);

      // 通过代理组件去操作
      // proxy.$pushBAIDU.pv(pageUrl.value);
    }

    /**
     * 提交事件
     * @description 支持两种推送方式
     */
    const event = () => {
      // 通过钩子去操作
      baidu.event(
        category.value,
        action.value,
        label.value,
        value.value
      );

      // 通过代理组件去操作
      // proxy.$pushBAIDU.event(
      //   category.value,
      //   action.value,
      //   label.value,
      //   value.value
      // );
    }

    // Vue 3.0 需要把模板要用到的东西 return 出去
    return {
      // 数据
      pageUrl,
      category,
      action,
      label,
      value,

      // 方法
      pv,
      event
    }
  }
};


/**
 * 初始化Vue
 */
createApp(app)
  // 启动路由
  .use(router)

  // 启动插件
  .use(baiduAnalytics.default, {
    router: router,
    siteIdList: [
      'aaaaaaaaaaaaaaaaaaa',
      'bbbbbbbbbbbbbbbbbbb'
    ],
    isDebug: true
  })

  // 挂载到节点上
  .mount('#app');
