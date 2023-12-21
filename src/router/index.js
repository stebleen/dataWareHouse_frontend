import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import SideBar from '../views/SideBar.vue'

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage,
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    component: SideBar,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
