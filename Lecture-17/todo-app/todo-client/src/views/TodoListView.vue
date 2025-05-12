<script setup>
  import Header from "@/components/Header.vue"
  import { onMounted, ref } from "vue";
  import { RouterLink } from "vue-router";
  
  const API_URL = import.meta.env.VITE_API_URL
  const todos = ref([]);
  const searchQuery = ref('');

  onMounted(async () => {
    try {
      const response = await fetch(API_URL + '/todos')
      const data = await response.json();
      console.log(data)
      todos.value = data;
    } catch(error) {
      console.log(error)
    }
  })

  const searchTodo = () => {
    alert('Query: ' + searchQuery.value)
  }

</script>

<template>
  <div>
    <Header title="Todo List"/>

    <div id="add-todo">
      <RouterLink to="/add-todo">Add todo</RouterLink>
    </div>

    <form id="todo-search" @submit.prevent="searchTodo">
      <input type="text" placeholder="Search" v-model="searchQuery" />
      <button>Search</button>
    </form>

    <section id="todos" v-for="todo in todos" :key="todo._id">
      <article>
        <div>
          <p class="date">{{ todo.created_at }}</p>
          <p>{{ todo.content }}</p>
        </div>

        <div class="view-link">
          <RouterLink :to="`/todos/${todo._id}`">View</RouterLink>
        </div>
      </article>
    </section>
  </div>
</template>
