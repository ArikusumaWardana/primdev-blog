import Login from '@/views/pages/auth/login.vue'
import Register from '@/views/pages/auth/register.vue'
import Home from '@/views/pages/home.vue'
import Blog from '@/views/pages/blog.vue'
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
      },
      {
        path: '/blog',
        name: 'blog-page',
        component: Blog,
        meta: {
          title: 'Blog'
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
    meta: {
      isAuth: false
    },
    children: [
      {
        path: '/auth/login',
        name: 'login-page',
        component: Login,
        meta: {
          title: 'Login'
        }
      },
      {
        path: '/auth/register',
        name: 'register-page',
        component: Register,
        meta: {
          title: 'Register'
        }
      }
    ] 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuth)) {
    let user = localStorage.getItem('token')
    // console.log(user);
    if (!user) {
      next('auth/login');
    } 
  }
  next()
});


export default router
