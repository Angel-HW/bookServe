import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/home.vue'),
    children: [
      // 管理人员管理
      {
        path: '/adminInfo',
        name: 'adminInfo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminInfo" */ '../pages/adminInfo/admin-info.vue')
      },
      // 图书采购
      {
        path: '/bookPurchar',
        name: 'bookPurchar',
        component: () => import(/* webpackChunkName: "bookPurchar" */ '../pages/bookPurchar/bookPurchar.vue')
      },
      // 图书查询
      {
        path: '/bookSearch',
        name: 'bookSearch',
        component: () => import(/* webpackChunkName: "bookSearch" */ '../pages/bookSearch/bookSearch.vue')
      },
      // 图书出入库
      {
        path: '/bookInOut',
        name: 'bookInOut',
        component: () => import(/* webpackChunkName: "bookInOut" */ '../pages/bookInAndOut/bookInAndOut.vue')
      },
      // 借还图书
      {
        path: '/bookBorAndRet',
        name: 'bookBorAndRet',
        component: () => import(/* webpackChunkName: "bookBorAndRet" */ '../pages/bookBorAndRet/book-borrow-return.vue')
      },
      // 图书借还查询
      {
        path: '/bookBRSearch',
        name: 'bookBRSearch',
        component: () => import(/* webpackChunkName: "bookBRSearch" */ '../pages/bookBRSearch/bookBRSearch.vue')
      },
      // 用户信息
      {
        path: '/adminInfo',
        name: 'adminInfo',
        component: () => import(/* webpackChunkName: "adminInfo" */ '../pages/adminInfo/admin-info.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
