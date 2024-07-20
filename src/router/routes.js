import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/pages/auth/login.vue'
import Register from '@/views/pages/auth/register.vue'
import Home from '@/views/pages/home.vue'
import BlogList from '@/views/pages/blogList.vue'
import Search from '@/views/pages/search.vue'
import Blog from '@/views/pages/blog.vue'
import Dashboard from '@/views/pages/author/dashboard.vue'
import createBlog from '@/views/pages/author/createBlog.vue'
import updateBlog from '@/views/pages/author/updateBlog.vue'
import AuthTemplates from '@/views/templates/authTemplates.vue'
import AuthorTemplates from '@/views/templates/authorTemplates.vue'
import UserTemplates from '@/views/templates/userTemplates.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: UserTemplates,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home-page',
        component: Home,
        meta: {
          title: 'Home'
        }
      },
      {
        path: '/blog-list',
        name: 'blog-list',
        component: BlogList,
        meta: {
          title: 'Blog List'
        }
      },
      {
        path: '/search',
        name: 'search',
        component: Search,
        meta: {
          title: 'Search'
        }
      },
      {
        path: '/blog/:slug',
        name: 'blog',
        component: Blog,
        props: true,
        meta: {
          title: 'Blog'
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AuthorTemplates,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'dashboard-page',
        component: Dashboard,
        meta: {
          title: 'Dashboard'
        }
      },
      {
        path: 'blog/create',
        name: 'create-blog',
        component: createBlog,
        meta: {
          title: 'Create Blog'
        }
      },
      {
        path: 'blog/update/:slug',
        name: 'update-blog',
        component: updateBlog,
        meta: {
          title: 'Update Blog'
        }
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthTemplates,
    meta: {
      requiresGuest: true
    },
    children: [
      {
        path: 'login',
        name: 'login-page',
        component: Login,
        meta: {
          title: 'Login'
        }
      },
      {
        path: 'register',
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

router.afterEach(() => {
  window.scrollTo(0, 0);
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    alert('Login first!');
    next('/auth/login');
  } else if (to.matched.some(record => record.meta.requiresGuest) && user) {
    next('/dashboard');
  } else {
    next();
  }

  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' | Primdev Blog';
  }
});

export default router;
