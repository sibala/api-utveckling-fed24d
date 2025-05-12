<script setup>
  import Header from '@/components/Header.vue'
  import useAuthStore from '@/stores/useAuthStore';
import { useRouter } from 'vue-router';

  const useAuth = useAuthStore()
  const router = useRouter()


  const loginHandler = () => {
    useAuth.login()
    router.push('/add-todo')
  }

</script>

<template>
  <div class="container">
    <Header title="Login"/>

    <form id="login-form">
      {{ useAuth.isAuthenticated }}
      <button @click.prevent="loginHandler">Login</button> <br />
      <button @click.prevent="useAuth.logout">Logout</button> <br />
      <RouterLink to="/todos">Back to todo list</RouterLink>
    </form>
  </div>
</template>