import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../Root.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/imptest',
        component: () => import('../components/ImportTest.vue')
      }
    ]
  },
  {
    path: '/player/:id*',
    meta: { transition: 'slide-left' },
    component: () => import('../components/Player.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
