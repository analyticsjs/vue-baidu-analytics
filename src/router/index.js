import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
    children: [
      {
        path: 'room',
        name: 'room',
        component: () => import(/* webpackChunkName: "subRoom" */ '../views/home.vue')
      }
    ]
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/home.vue')
  }
]

const router = new VueRouter({
  // base: process.env.NODE_ENV === 'production' ? location.pathname.split('/').slice(0, 2).join('/') : '/',
  // mode: 'history',
  linkActiveClass: 'cur',
  linkExactActiveClass: 'cur',
  routes
})

export default router
