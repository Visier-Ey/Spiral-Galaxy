<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import BasicFooter from '@/components/BasicFooter.vue'
</script>

<template>
  <main>
    <header>
      <NavBar />
    </header>
    <main class="routerView">
      <RouterView />
    </main>
    <footer>
      <BasicFooter />
    </footer>
  </main>
</template>

<style scoped>
header{
  position: fixed;
  z-index: 1000;
}
.routerView{
  display: block;
}
footer{
  display: block;
  height: auto;
  z-index: 100;
}
</style>
