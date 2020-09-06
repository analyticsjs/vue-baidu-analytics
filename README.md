vue-baidu-analytics 使用说明
===

基于Vue开发的百度统计插件，可以在 `Vue-CLI脚手架项目` 或者 `引入了Vue相关CDN的普通页面` 上使用，使用本插件的项目需要引入 `Vue Router`。

注意：本插件在 `1.0.0` 版本的部分参数和api现在有所弃用，请按照当前最新文档说明使用新版本，或者安装以前的 `1.0.0` 旧版本使用。

## 功能

* 异步载入百度统计脚本，无需修改入口html

* 支持部署多个站点id，并对应进行数据上报

* 支持自动上报路由切换产生的pv数据（支持 `hash模式` 和 `history模式` 的地址）

* 支持手动提交pv上报

* 支持手动提交事件分析上报

## 预览

demo已开启debug模式，可开启控制台查看上报情况。

点击预览：[vue-baidu-analytics demo](https://chengpeiquan.github.io/vue-baidu-analytics/demo/ "vue-baidu-analytics demo")

## 参数

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
router|是|object|Vue Router，本插件基于路由使用
siteIdList|是|object Array|百度统计的站点id列表，item为站点id<br>只有一个站点需要上报就保留一个item即可
isDebug|否|boolean|是否开启debug模式，默认 `false`<br>开启后会在控制台打印上报信息，**上线前记得关闭**

## 安装

### 通过npm安装

```
npm install vue-baidu-analytics --save-dev
```

### 通过cdn安装

```html
<script src="https://cdn.jsdelivr.net/npm/vue-baidu-analytics/dist/vue-baidu-analytics.min.js"></script>
```

## 使用

通过npm安装的项目，需要先在 `main.js` 里引入插件（通过cdn则无需该步骤）。

```js
import baiduAnalytics from 'vue-baidu-analytics'
```

安装插件后，在 `main.js` 引入以下代码，即可开启自动上报功能，首次访问页面会部署统计代码并提交第一次访问数据上报。

后续在路由切换过程中，也会根据路由的切换提交相应的url信息到友盟统计。

```js
Vue.use(baiduAnalytics, {
  router: router,
  siteIdList: [
    'aaaaaaaaaaaaaaaaaaa',
    'bbbbbbbbbbbbbbbbbbb',
    'ccccccccccccccccccc'
  ],
  isDebug: false
});
```

可在开发环境打开debug模式了解相关的上报情况（上线前记得关闭debug）。

## 方法

插件目前封装了两个常用的api，统一挂载到Vue实例上的 `$pushBAIDU` 去调用。

注：如果配置了多个站点id，会同时上报给所有站点。

### 手动上报页面PV

api名称|功能说明
:-:|-
pv|手动执行PV数据上报

**api参数**

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
pageUrl|否|String|提交上报的url，必须是以 `/` 开头的相对路径<br>如果不填，则会默认提交为域名根目录

**使用示范**

在template里使用

```html
<button @click="$pushBAIDU.pv('/test')">手动上报PV</button>
```

在method里使用

```js
// this是Vue实例
this.$pushBAIDU.pv('/home');
```

### 手动上报事件分析

api名称|功能说明
:-:|-
event|手动执行事件分析数据上报

**api参数**

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
category|是|string|产生该事件的位置名称，比如 `首页banner`
action|是|string|产生该事件的行为描述，比如 `点击`
label|否|string|产生该事件的标签名称，可以用来记录事件子id，比如 `bannerId_123`，默认为空
value|否|number|该事件的分值，默认0

**使用示范**

在template里使用（比如：点击了一个id为123的首页banner）

```html
<button @click="$pushBAIDU.event('首页banner', '点击', 'bannerId_123')">手动上报点击事件</button>
```

在method里使用（比如：点击了一个id为123的首页banner，并设置该事件的价值为1）

```js
// this是Vue实例
this.$pushBAIDU.event('首页banner', '点击', 'bannerId_123', 1);
```