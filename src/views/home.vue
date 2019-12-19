<template>
  <div class="main">
    <p>导航会自动上报数据</p>
    <nav class="nav">
      <router-link class="item" :to="item.url" v-for="item in navList" exact>{{ item.text }}</router-link>
    </nav>
    <p>按钮可手动上报数据</p>
    <div class="buttons">
      <button @click="$trackBaiduPv('/test')">手动上报PV</button>
      <button @click="$trackBaiduEvent('act_vote', 'click', 'works', 1)">手动上报分析事件</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          url: '/home',
          text: '首页'
        },
        {
          url: '/home?id=123456',
          text: '单个query'
        },
        {
          url: '/home?id=123456&name=张三&age=18',
          text: '多个query'
        },
        {
          url: '/user/123456',
          text: '带params'
        },
        {
          url: '/user/123456?id=123456',
          text: '带params和query'
        }
      ]
    }
  }
};
</script>

<style lang="stylus" scoped>
.nav
  display flex
  .item
    display flex
    justify-content center
    align-items center
    width 20%
    height 100px
    color #333
    background-color #eee
    text-decoration none
    cursor pointer
    &:hover, &.cur
      color #fff
      background-color #999
.buttons
  display flex
  button
    font-size 16px
    cursor pointer
    padding 20px
    margin-right 20px
</style>
