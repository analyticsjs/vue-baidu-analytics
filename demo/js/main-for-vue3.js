/** 
 * 导入需要用到的组件
 */
const { createRouter, createWebHashHistory } = VueRouter;
const { createApp, defineComponent, getCurrentInstance, ref } = Vue;


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
    // 插件要用到的一个代理组件
    const { proxy } = getCurrentInstance();

    // 初始化要用到的数据
    const pageUrl = ref('');
    const category = ref('');
    const action = ref('');
    const label = ref('');
    const value = ref('');

    // 提交pv的操作
    const pv = () => {
      proxy.$pushBAIDU.pv(pageUrl.value);
    }

    // 提交事件的操作
    const event = () => {
      proxy.$pushBAIDU.event(
        category.value,
        action.value,
        label.value,
        value.value
      );
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
  .use(baiduAnalytics, {
    router: router,
    siteIdList: [
      'aaaaaaaaaaaaaaaaaaa',
      'bbbbbbbbbbbbbbbbbbb',
      'ccccccccccccccccccc'
    ],
    isDebug: true
  })
  
  // 挂载到节点上
  .mount('#app');