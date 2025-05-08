<script setup>
  import Header from "@/components/Header.vue"
  import { Todo } from "@/models/Todo";
  import { onMounted, ref } from "vue";
  import { RouterLink, useRoute } from "vue-router";
  
  const API_URL = import.meta.env.VITE_API_URL
  const todo = ref(new Todo);
  const route = useRoute()

  onMounted(async () => {
    try {
      const response = await fetch(API_URL + 'todos/' + route.params.id)
      const data = await response.json();
      console.log(data)
      todo.value = data;
    } catch(error) {
      console.log(error)
    }
  })
  
</script>

<template>
  <div>
    <Header title="Todo List"/>

    <section id="todos">
      <article>
        <div>
          <p class="date">{{ todo.created_at }}</p>
          <p>{{ todo.content }}</p>
        </div>

        <div class="view-link">
          <RouterLink to="/todos">Back</RouterLink>
        </div>
      </article>
    </section>
  </div>
</template>
