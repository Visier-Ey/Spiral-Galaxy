<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <main>
    <NavBar />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
