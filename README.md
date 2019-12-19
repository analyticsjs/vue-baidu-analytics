vue-baidu-analytics 使用说明
===

基于Vue-CLI 3.0开发的百度统计插件，支持自动上报切换路由产生的流量数据，同时对官方api进行了二次封装，简化了手动上报数据的操作。

本插件支持部署多个站点id并对应上报数据（需求背景：比如部门A和部门B合作的项目，两个部门都要加上自己的统计代码算入自己的业绩流量池…）。

## 功能

* 异步载入百度统计脚本，无需修改入口html

* 支持部署多个站点id，并对应进行数据上报

* 支持自动上报路由切换产生的pv数据（支持hash模式和history模式）

* 支持手动提交pv上报

* 支持手动提交事件分析上报

## 参数

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
router|是|JSON Object|Vue Router，本插件基于路由使用
siteIdList|是|Array|百度统计的站点id列表，item为站点id<br>只有一个站点需要上报就保留一个item即可
debug|否|Boolean|是否开启debug模式，默认false<br>开启后会在控制台打印上报信息，上线前记得关闭

## 安装

在npm上安装

>npm i vue-baidu-analytics

然后在 main.js 里引入插件。

```javascript
import baiduAnalytics from 'vue-baidu-analytics'
```

## 使用

安装插件后，在 main.js 引入以下代码，即可开启自动上报功能，首次访问页面会部署统计代码并提交第一次访问数据上报。

后续在路由切换过程中，也会根据路由的切换提交相应的url信息到百度统计。

```javascript
Vue.use(baiduAnalytics, {
  router: router,
  siteIdList: [
    'your siteid',
    'your another siteid',
    'your one more siteid',
    '…'
  ],
  debug: false
});
```

可在开发环境打开debug模式了解相关的上报情况（上线前记得关闭debug）。

## api

插件目前封装了两个常用的api，可在组件里调用。

注：如果配置了多个站点id，会同时上报给所有站点。

### 手动上报PV

api名称|功能说明
:-:|-
$trackBaiduPv|手动执行PV数据上报

#### api参数

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
url|否|String|提交上报的url，必须是以"/"（斜杠）开头的相对路径<br>如果不填，则会默认提交为域名根目录

详细的参数使用要求请查看官方文档：

>https://tongji.baidu.com/open/api/more?p=guide_trackPageview

注：原本url是必填，插件处理了一个默认值，所以变成选填。

#### 使用示范

在template里使用

```html
<button @click="$trackBaiduPv('/test')">手动上报PV</button>
```

在method里使用

```javascript
this.$trackBaiduPv('/test');
```

### 手动上报事件分析

api名称|功能说明
:-:|-
$trackBaiduEvent|手动执行事件分析数据上报

#### api参数

参数|是否必填|参数类型|参数说明
:-:|:-:|:-:|-
category|是|String|事件名称
action|是|String|交互动作
opt_label|否|String|事件信息，默认为空
opt_value|否|Number|事件价值，默认1

详细的参数使用要求请查看官方文档

>https://tongji.baidu.com/open/api/more?p=guide_trackEvent

#### 使用示范

在template里使用

```html
<button @click="$trackBaiduEvent('act_vote', 'click', 'works', 1)">手动上报分析事件</button>
```

在method里使用

```javascript
this.$trackBaiduEvent('act_vote', 'click', 'works', 1);
```
