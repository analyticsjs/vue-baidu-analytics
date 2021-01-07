/** 
 * 定义路由信息
 */
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