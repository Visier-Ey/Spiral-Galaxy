import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      redirect:'/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
        },
      ],
    },
  ],
})

export default router
