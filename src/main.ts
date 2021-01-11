import PushBAIDU from '@m/pushBAIDU'
import getVueVersion from '@m/getVueVersion'
import getRouterMode from '@m/getRouterMode'

/** 
 * 定义插件
 */
export default function install (Vue: Vue, { router, siteIdList, isDebug = false }: Partial<Options>) {

  /** 
   * 一些环境和参数的检查
   */
  if ( typeof document === 'undefined' || typeof window === 'undefined' ) {
    return false;
  }

  if ( !router ) {
    throw new Error('[vue-baidu-analytics] Must pass a Vue-Router instance to vue-baidu-analytics.');
  }

  if ( !siteIdList ) {
    throw new Error('[vue-baidu-analytics] Missing tracking domain ID, add at least one of baidu analytics.');
  }

  /** 
   * 挂载推送的方法
   */
  const pushBAIDU: any = new PushBAIDU(siteIdList, isDebug);
  
  // 获取Vue版本（获取失败则默认为2）
  const VUE_VERSION: number = getVueVersion(Vue) || 2;

  // 2.x可以直接挂载到原型上
  if ( VUE_VERSION === 2 ) {
    Vue.prototype.$pushBAIDU = pushBAIDU;
  }

  // 3.x必须使用这个方式来挂载
  if ( VUE_VERSION === 3 ) {
    Vue.config.globalProperties.$pushBAIDU = pushBAIDU;
  }

  /** 
   * 部署站点并初始化
   */
  if ( siteIdList ) {
    pushBAIDU.init();
  }

  /** 
   * 路由切换时执行PV上报
   */
  router.afterEach( (to: To) => {
    // 根据Vue版本获取路由模式
    const ROUTER_MODE: string = getRouterMode(VUE_VERSION, router);
    
    // 获取页面的url信息
    const PAGE_PATH_DIR_COUNT: number = window.location.pathname.split('/').length;
    const PAGE_PATH: string = window.location.pathname.split('/').slice(0, PAGE_PATH_DIR_COUNT - 1).join('/');

    // 根据路由模式生成要上报的链接
    const PAGE_URL: string = ROUTER_MODE === 'hash' ? `${PAGE_PATH}/#${to.fullPath}` : `${PAGE_PATH}${to.fullPath}`;
    
    // 上报数据
    pushBAIDU.pv(PAGE_URL);
  });
}