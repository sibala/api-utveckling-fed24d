import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoListView from '@/views/TodoListView.vue'
import TodoView from '@/views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/todos',
      name: 'todo list',
      component: TodoListView,
    },
    {
      path: '/todos/:id',
      name: 'todo',
      component: TodoView,
    }
  ],
})

export default router
