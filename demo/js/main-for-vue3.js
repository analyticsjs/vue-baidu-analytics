const { createRouter, createWebHashHistory } = VueRouter;
const { createApp } = Vue;

// 定义路由信息
const routes = [
  {
    path: '/',
    redirect: '/page1'
  },
  {
    path: '/page1',
    component: {
      template: '<div class="view">当前是 <strong>Page1</strong> 的路由</div>'
    }
  },
  {
    path: '/page2',
    component: {
      template: '<div class="view">当前是 <strong>Page2</strong> 的路由</div>'
    }
  },
  {
    path: '/page3',
    component: {
      template: '<div class="view">当前是 <strong>Page3</strong> 的路由</div>'
    }
  }
];

// 初始化路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'cur',
  linkExactActiveClass: 'cur'
});

// 初始化Vue
createApp({})
  .use(router)
  .use(baiduAnalytics, {
    router: router,
    siteIdList: [
      '8dca8e2532df48ea7f1b15c714588691'
    ],
    isDebug: true
  })
  .mount('#app');

// // 初始化Vue
// const app = new Vue({
//   el: '#app',
//   router,
//   data () {
//     return {
//       pageUrl: '',
//       category: '',
//       action: '',
//       label: '',
//       value: ''
//     }
//   },
//   mounted () {
//   },
//   methods: {
//     pv () {
//       // this.$pushBAIDU.pv(this.pageUrl);
//       console.log(baiduAnalytics.pushBAIDU);
//     },
//     event () {
//       this.$pushBAIDU.event(this.category, this.action, this.label, this.value);
//     }
//   }
// });