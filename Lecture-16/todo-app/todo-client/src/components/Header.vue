<script setup>
  import logo from "@/assets/logo.svg"
  defineProps({
    title: {
      type: String,
      required: true
    }
  })
  
</script>

<template>
  <header>
    <img class="logo" :src="logo" alt="Vue logo" height="30">
    <h1 class="green">{{ title }}</h1>
  </header>
</template>
