import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/library',
          component: () => import('@/views/Library/index.vue'),
          meta: { title: '游戏库' }
        },
        {
          path: '/game/:id',
          name: 'game',
          component: () => import('@/views/game/index.vue'),
          meta: { title: '游戏详情' }
        },
        {
          path: '/search',
          component: () => import('@/views/search/index.vue'),
          meta: { title: '搜索' }
        }
      ]
    },
    {
      path: '/404',
      component: () => import('@/views/404/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
})

export default router
