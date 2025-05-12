import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoListView from '@/views/TodoListView.vue'
import TodoView from '@/views/TodoView.vue'
import AddTodoView from '@/views/AddTodoView.vue'
import LoginView from '@/views/LoginView.vue'
import useAuthStore from '@/stores/useAuthStore'
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/todos',
      name: 'Todo list',
      component: TodoListView,
    },
    {
      path: '/todos/:id',
      name: 'Todo',
      component: TodoView,
    },
    {
      path: '/add-todo',
      name: 'Add todo',
      component: AddTodoView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    }
  ],
})

const pinia = createPinia()
const useAuth = useAuthStore(pinia);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !useAuth.isAuthenticated) {
    next('/login');
  } else {
    next()
  }
})

export default router
