import BAIDU from '@m/baidu'

/** 
 * 定义推送操作
 */
class PushBAIDU {
  siteIdList: string[];
  isDebug: boolean;

  constructor (siteIdList: string[], isDebug: boolean) {
    this.siteIdList = siteIdList;
    this.isDebug = isDebug;
  }

  /** 
   * 批量部署站点
   */
  init () {
    this.siteIdList.forEach( (siteId: string) => {
      const SITE = new BAIDU(siteId, this.isDebug);
      SITE.init();
    });
  }

  /** 
   * 批量提交pv上报
   */
  pv (pageUrl: string) {
    this.siteIdList.forEach( (siteId: string) => {
      const SITE = new BAIDU(siteId, this.isDebug);
      SITE.trackPageview(pageUrl);
    });
  }

  /** 
   * 批量提交事件上报
   */
  event (category: string, action: string, label: string, value: number) {
    this.siteIdList.forEach( (siteId: string) => {
      const SITE = new BAIDU(siteId, this.isDebug);
      SITE.trackEvent(category, action, label, value);
    });
  }

}

export default PushBAIDU;