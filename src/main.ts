import PushBAIDU from '@m/pushBAIDU'
import getVueVersion from '@m/getVueVersion'

/**
 * 全局的数据
 */
const __GLOBAL__ = {
  pushBAIDU: {} as PushBAIDU
}

/**
 * 暴露 Hooks
 * @description 解决 Vue 3.0 使用全局变量很麻烦的问题
 * @example
 * import { usePush } from 'vue-baidu-analytics'
 * const baidu = usePush();
 * baidu.pv('/');
 */
export function usePush () {
  // 提交 pv
  function pv (pageUrl: string) {
    return __GLOBAL__.pushBAIDU.pv(pageUrl);
  }

  // 提交事件
  function event (category: string, action: string, label: string, value: number) {
    return __GLOBAL__.pushBAIDU.event(category, action, label, value);
  }

  return {
    pv,
    event
  }
}

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
    throw new Error('[vue-baidu-analytics] Missing tracking domain ID, add at least one of baidu analytics siteId.');
  }

  /**
   * 挂载推送的方法
   */
  const pushBAIDU: PushBAIDU = new PushBAIDU(siteIdList, isDebug);
  __GLOBAL__.pushBAIDU = pushBAIDU;

  /**
   * 挂载全局变量到 Vue 上
   * 获取Vue版本（获取失败则默认为2）
   */
  const VUE_VERSION: number = getVueVersion(Vue) || 2;
  switch (VUE_VERSION) {
    case 2:
      Vue.prototype.$pushBAIDU = pushBAIDU;
      break;
    case 3:
      Vue.config.globalProperties.$pushBAIDU = pushBAIDU;
      break;
  }

  /**
   * 部署站点并初始化
   */
  if ( siteIdList && Array.isArray(siteIdList) ) {
    pushBAIDU.init();
  }

  /**
   * 路由切换时执行PV上报
   */
  router.afterEach( (to: To) => {
    // 获取要上报的链接（当前版本不需要拼接了）
    const PAGE_URL: string = window.location.href;

    // 上报数据
    pushBAIDU.pv(PAGE_URL);
  });
}
