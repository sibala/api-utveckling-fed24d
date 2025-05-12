<script setup>
  import Header from '@/components/Header.vue'
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';

  const API_URL = import.meta.env.VITE_API_URL;
  const router = useRouter()
  const form = reactive({
    content: '',
    done: false
  })
  
  const submit = async () => {
    try {
      await fetch(API_URL + '/todos', {
        method: "POST",
        credentials: 'include', // This enables cookie handling
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      
      router.push('/todos')
    } catch(error) {
      console.log(error)
    }
  }

</script>

<template>
  <div class="container">
    <Header title="Create Todo" />

    <form id="todo-form" @submit.prevent="submit">
      <label for="">Content: </label> <br />
      <input type="text" name="content" v-model="form.content"> <br />

      <div class="form-row">
        <label for="">Done: </label> <br />
        <input type="checkbox" name="done" v-model="form.done"> <br />
      </div>

      <button>Create</button> <br />
      <RouterLink to="/todos">Back</RouterLink>
    </form>
  </div>
</template>