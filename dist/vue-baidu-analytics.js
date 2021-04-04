/*!
 * name: vue-baidu-analytics
 * version: v2.1.0
 * author: chengpeiquan
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.baiduAnalytics = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __spreadArray(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

      return to;
    }

    /**
     * 定义基础配置
     * 官方文档 https://tongji.baidu.com/open/api/more?p=guide_overview
     */
    var BAIDU = /** @class */ (function () {
        function BAIDU(siteId, isDebug) {
            if (siteId === void 0) { siteId = ''; }
            if (isDebug === void 0) { isDebug = false; }
            this.siteId = siteId;
            this.isDebug = isDebug;
        }
        /**
         * 初始化
         */
        BAIDU.prototype.init = function () {
            var _a;
            window._hmt = window._hmt ? window._hmt : [];
            var SCRIPT = document.createElement('script');
            SCRIPT['async'] = true;
            SCRIPT['src'] = "https://hm.baidu.com/hm.js?" + this.siteId;
            (_a = document.querySelector('head')) === null || _a === void 0 ? void 0 : _a.appendChild(SCRIPT);
            if (this.isDebug) {
                console.log("[vue-baidu-analytics] siteId load done.\nsiteId:    " + this.siteId);
            }
        };
        /**
         * 设置要响应的站点
         */
        BAIDU.prototype.setAccount = function () {
            window._hmt.push(['_setAccount', this.siteId]);
        };
        /**
         * 提交PV、UV
         */
        BAIDU.prototype.trackPageview = function (pageUrl) {
            // 如果页面链接没传或者无效链接，则默认为根域名
            if (!pageUrl || typeof pageUrl !== 'string') {
                pageUrl = '/';
            }
            // 如果页面链接带上了域名，则需要过滤掉
            if (pageUrl.includes('http')) {
                var PAGE_CUT = pageUrl.split('/');
                var HOST_NAME = PAGE_CUT[0] + "//" + PAGE_CUT[2];
                pageUrl = pageUrl.replace(HOST_NAME, '');
            }
            // 设置响应 id 并提交数据
            this.setAccount();
            window._hmt.push(['_trackPageview', pageUrl]);
            if (this.isDebug) {
                console.log("[vue-baidu-analytics] track pv done.\nsiteId:    " + this.siteId + "\npageUrl:   " + pageUrl);
            }
        };
        /**
         * 提交点击事件
         */
        BAIDU.prototype.trackEvent = function (category, action, label, value) {
            // 前两个是必填项
            if (typeof category !== 'string' || typeof action !== 'string' || !category || !action) {
                throw new Error('[vue-baidu-analytics] Missing necessary category and operation information, and must be of type string.');
            }
            // 重置一些无效的默认值
            if (!label || typeof label !== 'string') {
                label = '';
            }
            if (!Number(value)) {
                value = 1;
            }
            // 设置响应id并提交数据
            this.setAccount();
            window._hmt.push(['_trackEvent', category, action, label, value]);
            if (this.isDebug) {
                console.log("[vue-baidu-analytics] track event done.\nsiteId:   " + this.siteId + "\ncategory: " + category + "\naction:   " + action + "\nlabel:    " + label + "\nvalue:    " + value);
            }
        };
        return BAIDU;
    }());

    /**
     * 定义推送操作
     */
    var PushBAIDU = /** @class */ (function () {
        function PushBAIDU(siteIdList, isDebug) {
            this.siteIdList = __spreadArray([], siteIdList);
            this.isDebug = isDebug;
        }
        /**
         * 批量部署站点
         */
        PushBAIDU.prototype.init = function () {
            var _this = this;
            this.siteIdList.forEach(function (siteId) {
                var SITE = new BAIDU(siteId, _this.isDebug);
                SITE.init();
            });
        };
        /**
         * 批量提交pv上报
         */
        PushBAIDU.prototype.pv = function (pageUrl) {
            var _this = this;
            this.siteIdList.forEach(function (siteId) {
                var SITE = new BAIDU(siteId, _this.isDebug);
                SITE.trackPageview(pageUrl);
            });
        };
        /**
         * 批量提交事件上报
         */
        PushBAIDU.prototype.event = function (category, action, label, value) {
            var _this = this;
            this.siteIdList.forEach(function (siteId) {
                var SITE = new BAIDU(siteId, _this.isDebug);
                SITE.trackEvent(category, action, label, value);
            });
        };
        return PushBAIDU;
    }());

    /**
     * 获取Vue的版本
     * @return 2=Vue2.x, 3=Vue3.x
     */
    var getVueVersion = function (Vue) {
        var version = 2;
        // 获取Vue的版本号
        var VUE_VERSION = String(Vue.version);
        // Vue 2.x
        if (VUE_VERSION.slice(0, 2) === '2.') {
            version = 2;
        }
        // Vue 3.x
        if (VUE_VERSION.slice(0, 2) === '3.') {
            version = 3;
        }
        return version;
    };

    /**
     * 全局的数据
     */
    var __GLOBAL__ = {
        pushBAIDU: {}
    };
    /**
     * 暴露 Hooks
     * @description 解决 Vue 3.0 使用全局变量很麻烦的问题
     * @example
     * import { usePush } from 'vue-baidu-analytics'
     * const baidu = usePush();
     * baidu.pv('/');
     */
    function usePush() {
        // 提交 pv
        function pv(pageUrl) {
            return __GLOBAL__.pushBAIDU.pv(pageUrl);
        }
        // 提交事件
        function event(category, action, label, value) {
            return __GLOBAL__.pushBAIDU.event(category, action, label, value);
        }
        return {
            pv: pv,
            event: event
        };
    }
    /**
     * 定义插件
     */
    function install(Vue, _a) {
        var router = _a.router, siteIdList = _a.siteIdList, _b = _a.isDebug, isDebug = _b === void 0 ? false : _b;
        /**
         * 一些环境和参数的检查
         */
        if (typeof document === 'undefined' || typeof window === 'undefined') {
            return false;
        }
        if (!router) {
            throw new Error('[vue-baidu-analytics] Must pass a Vue-Router instance to vue-baidu-analytics.');
        }
        if (!siteIdList) {
            throw new Error('[vue-baidu-analytics] Missing tracking domain ID, add at least one of baidu analytics siteId.');
        }
        /**
         * 挂载推送的方法
         */
        var pushBAIDU = new PushBAIDU(siteIdList, isDebug);
        __GLOBAL__.pushBAIDU = pushBAIDU;
        /**
         * 挂载全局变量到 Vue 上
         * 获取Vue版本（获取失败则默认为2）
         */
        var VUE_VERSION = getVueVersion(Vue) || 2;
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
        if (siteIdList && Array.isArray(siteIdList)) {
            pushBAIDU.init();
        }
        /**
         * 路由切换时执行PV上报
         */
        router.afterEach(function (to) {
            // 获取要上报的链接（当前版本不需要拼接了）
            var PAGE_URL = window.location.href;
            // 上报数据
            pushBAIDU.pv(PAGE_URL);
        });
    }

    exports.default = install;
    exports.usePush = usePush;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue-baidu-analytics.js.map
