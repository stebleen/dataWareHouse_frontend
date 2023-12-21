import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import HomePage from '../views/HomePage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    //redirect: "/homepage/:selected?",
    component: HomeView,
    props: true,
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: HomePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
