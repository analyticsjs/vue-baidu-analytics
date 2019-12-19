'use strict';

class analytics {
  #siteId;
  #isDebug;

  constructor (siteId, isDebug) {
    this.#siteId = siteId;
    this.#isDebug = isDebug;
  }

  _loadScript () {
    window._hmt = window._hmt ? window._hmt : [];
    const SCRIPT = document.createElement('script');
    SCRIPT['async'] = true;
    SCRIPT['src'] = `https://hm.baidu.com/hm.js?${this.#siteId}`;
    document.querySelector('head').appendChild(SCRIPT);

    if ( this.#isDebug ) {
      console.log(`[vue-baidu-analytics] siteId load done.\nsiteId:   ${this.#siteId}`);
    }
  }

  _setAccount () {
    window._hmt.push(['_setAccount', this.#siteId]);
  }

  _trackPageview (url) {
    if ( typeof url !== 'string' || !url ) {
      url = '/';
    }

    this._setAccount();
    window._hmt.push(['_trackPageview', url]);

    if ( this.#isDebug ) {
      console.log(`[vue-baidu-analytics] track pv done.\nsiteId:   ${this.#siteId}\nurl:      ${url}`);
    }
  }

  _trackEvent (category, action, opt_label, opt_value) {
    if ( typeof category !== 'string' ||  typeof action !== 'string' || !category || !action ) {
      throw new Error('[vue-baidu-analytics] Missing necessary category and operation information, and must be of type string.');
      return false;
    }

    if ( typeof opt_label !== 'string' || !opt_label ) {
      opt_label = '';
    }

    if ( typeof opt_value !== 'number' || !opt_value ) {
      opt_value = 0;
    }

    this._setAccount();
    window._hmt.push(['_trackEvent', category, action, opt_label, opt_value]);

    if ( this.#isDebug ) {
      console.log(`[vue-baidu-analytics] track event done.\nsiteId:      ${this.#siteId}\ncategory:    ${category}\naction:      ${action}\nopt_label:   ${opt_label}\nopt_value:   ${opt_value}`);
    }
  }
}

export default function install (Vue, options = {}) {

  if ( typeof document === 'undefined' || typeof window === 'undefined' ) {
    return false;
  }

  const { router, siteIdList, debug } = options;

  if ( !router ) {
    throw new Error('[vue-baidu-analytics] Must pass a Vue-Router instance to vue-baidu-analytics.');
  }

  if ( !siteIdList ) {
    throw new Error('[vue-baidu-analytics] Missing tracking domain ID, add at least one of baidu analytics.');
  }

  let isDebug = false;
  if ( debug === true ) {
    isDebug = true;
  }

  if ( siteIdList ) {
    siteIdList.forEach( siteId => {
      const SITE = new analytics(siteId, isDebug);
      SITE._loadScript();
    });
  }

  router.afterEach( to => {

    const REPORT_PATH_DIR_COUNT = window.location.pathname.split('/').length;
    const REPORT_PATH = window.location.pathname.split('/').slice(0, REPORT_PATH_DIR_COUNT - 1).join('/');
    const REPORT_URL = router.mode === 'hash' ? `${REPORT_PATH}/#${to.fullPath}` : `${REPORT_PATH}${to.fullPath}`;

    siteIdList.forEach( siteId => {
      const SITE = new analytics(siteId, isDebug);
      SITE._trackPageview(REPORT_URL);
    });
  });

  Vue.prototype.$trackBaiduPv = (url) => {
    siteIdList.forEach( siteId => {
      const SITE = new analytics(siteId, isDebug);
      SITE._trackPageview(url);
    });
  }

  Vue.prototype.$trackBaiduEvent = (category, action, opt_label, opt_value) => {
    siteIdList.forEach( siteId => {
      const SITE = new analytics(siteId, isDebug);
      SITE._trackEvent(category, action, opt_label, opt_value);
    });
  }
}
