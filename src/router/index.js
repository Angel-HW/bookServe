import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue')
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../pages/register/register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/home.vue'),
    children: [
      // 人员管理
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
      // 图书出库
      {
        path: '/bookIn',
        name: 'bookIn',
        component: () => import(/* webpackChunkName: "bookIn" */ '../pages/bookInAndOut/bookIn.vue')
      },
      // 图书出库
      {
        path: '/bookOut',
        name: 'bookOut',
        component: () => import(/* webpackChunkName: "bookOut" */ '../pages/bookInAndOut/bookOut.vue')
      },
      // 图书借阅
      {
        path: '/bookBorrow',
        name: 'bookBorrow',
        component: () => import(/* webpackChunkName: "bookBorrow" */ '../pages/bookBorAndRet/bookBorrow.vue')
      },
      // 图书归还
      {
        path: '/bookReturn',
        name: 'bookReturn',
        component: () => import(/* webpackChunkName: "bookReturn" */ '../pages/bookBorAndRet/bookReturn.vue')
      },
      // 图书借阅查询
      {
        path: '/bookBRSearch',
        name: 'bookBRSearch',
        component: () => import(/* webpackChunkName: "bookBRSearch" */ '../pages/bookBRSearch/bookBRSearch.vue')
      },
      // 测试
      {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '../pages/test.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
