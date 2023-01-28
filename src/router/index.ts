import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
          path: '/recommend',
          component: () => import('@/views/Recommend/index.vue'),
          meta: { title: '推荐' }
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
    }
  ]
})

export default router
