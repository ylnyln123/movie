import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { Notification } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'movie-list' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    { path: '/users/login', alias: '/login', name: 'login', component: () => import('../views/user/login.vue') },
    { path: '/users/register', alias: '/register', name: 'register', component: () => import('../views/user/register.vue') },
    {
      path: '/movies',
      component: () => import('../views/layout/movie'),
      children: [
        { path: 'create', name: 'movie-create', alias: 'edit', component: () => import('../views/movie/create'), meta: { auth: true } },
        {
          path: 'delete',
          name: 'movie-delete',
          component: () => import('../views/movie/create'),
          meta: {
            auth: true
          }
        },
        { path: 'detail/:id', name: 'movie-detail', component: () => import('../views/movie/detail') },
        { path: 'list', name: 'movie-list', component: () => import('../views/movie/list') },
        { path: 'player/:id', name: 'movie-player', component: () => import('../views/movie/player') }
      ]
    },
    { path: '*', redirect: { name: 'movie-list' } }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((router) => router.meta.auth)) {
    if (store.state.user.id === 3) {
      next()
    } else {
      Notification({
        title: '提示',
        type: 'warning',
        message: '对不起你没有访问权限'
      })
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
  }
  next()
})
// const router = new VueRouter({
//   routes
// })

export default router
