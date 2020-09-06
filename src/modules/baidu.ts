/** 
 * 定义基础配置
 * 官方文档 https://tongji.baidu.com/open/api/more?p=guide_overview
 */
class BAIDU {
  siteId: string;
  isDebug: boolean;

  constructor (siteId: string = '', isDebug: boolean = false) {
    this.siteId = siteId;
    this.isDebug = isDebug;
  }

  /** 
   * 初始化
   */
  init () {
    window._hmt = window._hmt ? window._hmt : [];
    const SCRIPT = document.createElement('script');
    SCRIPT['async'] = true;
    SCRIPT['src'] = `https://hm.baidu.com/hm.js?${this.siteId}`;
    document.querySelector('head').appendChild(SCRIPT);

    if ( this.isDebug ) {
      console.log(`[vue-baidu-analytics] siteId load done.\nsiteId:    ${this.siteId}`);
    }
  }

  /** 
   * 设置要响应的站点
   */
  setAccount () {
    window._hmt.push(['_setAccount', this.siteId]);
  }

  /** 
   * 提交PV、UV
   */
  trackPageview (pageUrl: string) {
    // 如果页面链接没传或者无效链接，则默认为根域名
    if ( !pageUrl || typeof pageUrl !== 'string' ) {
      pageUrl = '/';
    }

    // 如果页面链接带上了域名，则需要过滤掉
    if ( pageUrl.includes('http') ) {
      const PAGE_CUT = pageUrl.split('/');
      const HOST_NAME = `${PAGE_CUT[0]}//${PAGE_CUT[2]}`;
      pageUrl = pageUrl.replace(HOST_NAME, '');
    }

    // 设置响应id并提交数据
    this.setAccount();
    window._hmt.push(['_trackPageview', pageUrl]);

    if ( this.isDebug ) {
      console.log(`[vue-baidu-analytics] track pv done.\nsiteId:    ${this.siteId}\npageUrl:   ${pageUrl}`);
    }
  }

  /** 
   * 提交点击事件
   */
  trackEvent (category: string, action: string, label: string, value: number) {
    // 前两个是必填项
    if ( typeof category !== 'string' ||  typeof action !== 'string' || !category || !action ) {
      throw new Error('[vue-baidu-analytics] Missing necessary category and operation information, and must be of type string.');
      return false;
    }

    // 重置一些无效的默认值
    if ( !label || typeof label !== 'string'  ) {
      label = '';
    }

    if ( !Number(value) ) {
      value = 1;
    }

    // 设置响应id并提交数据
    this.setAccount();
    window._hmt.push(['_trackEvent', category, action, label, value]);

    if ( this.isDebug ) {
      console.log(`[vue-baidu-analytics] track event done.\nsiteId:   ${this.siteId}\ncategory: ${category}\naction:   ${action}\nlabel:    ${label}\nvalue:    ${value}`);
    }
  }
}

export default BAIDU;