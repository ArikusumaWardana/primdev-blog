import Login from '@/views/pages/auth/login.vue'
import Home from '@/views/pages/home.vue'
import AuthTemplates from '@/views/templates/authTemplates.vue'
import AuthorTemplates from '@/views/templates/authorTemplates.vue'
import UserTemplates from '@/views/templates/userTemplates.vue'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: UserTemplates,
    children: [
      {
        path: '/',
        name: 'home-page',
        component: Home,
        meta: {
          title: 'Home'
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AuthorTemplates
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthTemplates,
    children: [
      {
        path: '/auth/login',
        name: 'login-page',
        component: Login,
        meta: {
          title: 'Login'
        }
      }
    ] 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
