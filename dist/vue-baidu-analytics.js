/** 
 * name: vue-baidu-analytics
 * version: v2.0.0
 * author: chengpeiquan
 */
 (function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.baiduAnalytics = factory());
}(this, (function () { 'use strict';

  var BAIDU = (function () {
      function BAIDU(siteId, isDebug) {
          if (siteId === void 0) { siteId = ''; }
          if (isDebug === void 0) { isDebug = false; }
          this.siteId = siteId;
          this.isDebug = isDebug;
      }
      BAIDU.prototype.init = function () {
          window._hmt = window._hmt ? window._hmt : [];
          var SCRIPT = document.createElement('script');
          SCRIPT['async'] = true;
          SCRIPT['src'] = "https://hm.baidu.com/hm.js?" + this.siteId;
          document.querySelector('head').appendChild(SCRIPT);
          if (this.isDebug) {
              console.log("[vue-baidu-analytics] siteId load done.\nsiteId:    " + this.siteId);
          }
      };
      BAIDU.prototype.setAccount = function () {
          window._hmt.push(['_setAccount', this.siteId]);
      };
      BAIDU.prototype.trackPageview = function (pageUrl) {
          if (!pageUrl || typeof pageUrl !== 'string') {
              pageUrl = '/';
          }
          if (pageUrl.includes('http')) {
              var PAGE_CUT = pageUrl.split('/');
              var HOST_NAME = PAGE_CUT[0] + "//" + PAGE_CUT[2];
              pageUrl = pageUrl.replace(HOST_NAME, '');
          }
          this.setAccount();
          window._hmt.push(['_trackPageview', pageUrl]);
          if (this.isDebug) {
              console.log("[vue-baidu-analytics] track pv done.\nsiteId:    " + this.siteId + "\npageUrl:   " + pageUrl);
          }
      };
      BAIDU.prototype.trackEvent = function (category, action, label, value) {
          if (typeof category !== 'string' || typeof action !== 'string' || !category || !action) {
              throw new Error('[vue-baidu-analytics] Missing necessary category and operation information, and must be of type string.');
          }
          if (!label || typeof label !== 'string') {
              label = '';
          }
          if (!Number(value)) {
              value = 1;
          }
          this.setAccount();
          window._hmt.push(['_trackEvent', category, action, label, value]);
          if (this.isDebug) {
              console.log("[vue-baidu-analytics] track event done.\nsiteId:   " + this.siteId + "\ncategory: " + category + "\naction:   " + action + "\nlabel:    " + label + "\nvalue:    " + value);
          }
      };
      return BAIDU;
  }());

  var PushBAIDU = (function () {
      function PushBAIDU(siteIdList, isDebug) {
          this.siteIdList = siteIdList;
          this.isDebug = isDebug;
      }
      PushBAIDU.prototype.init = function () {
          var _this = this;
          this.siteIdList.forEach(function (siteId) {
              var SITE = new BAIDU(siteId, _this.isDebug);
              SITE.init();
          });
      };
      PushBAIDU.prototype.pv = function (pageUrl) {
          var _this = this;
          this.siteIdList.forEach(function (siteId) {
              var SITE = new BAIDU(siteId, _this.isDebug);
              SITE.trackPageview(pageUrl);
          });
      };
      PushBAIDU.prototype.event = function (category, action, label, value) {
          var _this = this;
          this.siteIdList.forEach(function (siteId) {
              var SITE = new BAIDU(siteId, _this.isDebug);
              SITE.trackEvent(category, action, label, value);
          });
      };
      return PushBAIDU;
  }());

  var getVueVersion = function (Vue) {
      var version = 2;
      var VUE_VERSION = String(Vue.version);
      if (VUE_VERSION.slice(0, 2) === '2.') {
          version = 2;
      }
      if (VUE_VERSION.slice(0, 2) === '3.') {
          version = 3;
      }
      return version;
  };

  function install(Vue, _a) {
      var router = _a.router, siteIdList = _a.siteIdList, _b = _a.isDebug, isDebug = _b === void 0 ? false : _b;
      if (typeof document === 'undefined' || typeof window === 'undefined') {
          return false;
      }
      if (!router) {
          throw new Error('[vue-baidu-analytics] Must pass a Vue-Router instance to vue-baidu-analytics.');
      }
      if (!siteIdList) {
          throw new Error('[vue-baidu-analytics] Missing tracking domain ID, add at least one of baidu analytics.');
      }
      var pushBAIDU = new PushBAIDU(siteIdList, isDebug);
      var VUE_VERSION = getVueVersion(Vue) || 2;
      if (VUE_VERSION === 2) {
          Vue.prototype.$pushBAIDU = pushBAIDU;
      }
      if (VUE_VERSION === 3) {
          Vue.config.globalProperties.$pushBAIDU = pushBAIDU;
      }
      if (siteIdList) {
          pushBAIDU.init();
      }
      router.afterEach(function (to) {
          var PAGE_PATH_DIR_COUNT = window.location.pathname.split('/').length;
          var PAGE_PATH = window.location.pathname.split('/').slice(0, PAGE_PATH_DIR_COUNT - 1).join('/');
          var PAGE_URL = router.mode === 'hash' ? PAGE_PATH + "/#" + to.fullPath : "" + PAGE_PATH + to.fullPath;
          pushBAIDU.pv(PAGE_URL);
      });
  }

  return install;

})));
//# sourceMappingURL=vue-baidu-analytics.js.map
