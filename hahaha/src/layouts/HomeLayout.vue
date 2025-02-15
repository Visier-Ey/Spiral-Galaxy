<script setup>
import { ref } from 'vue'

const edge = ref(null)
window.addEventListener('scroll', () => {
  const scroll = window.scrollY
  if (scroll > 50) {
    edge.value.style.borderLeft = 'var(--primary-theme) 1000px solid'
  }else{
    edge.value.style.borderLeft = 'rgba(255, 255, 255, 0.4) 1000px solid'
  }
})
</script>

<template>
<main>
  <div class="edge" ref="edge"></div>
  <div class="wrapper">
    <div class="constraint">

    </div>
  </div>
</main>
</template>

<style scoped>
main {
  display: block;
  position: relative;
  top: -20px;
  width: 100%;
  height: auto;
}
.edge{
  position: absolute;
  top: -130px;
  left: 0;
  width: 0;
  height: 0;
  backdrop-filter: blur(10px);
  border-left: rgba(255, 255, 255, 0.4) 1000px solid;
  border-bottom: var(--primary-theme) 100px solid;
  border-right: transparent 100px solid;
  border-top: transparent 100px solid;
  transition: all 0.3s ease;
}
.wrapper{
  top: 50px;
  position: relative;
  width: 100%;
  height: 3100px;
  background: var(--primary-theme);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.constraint{
  margin-top: auto;
  width: 80%;
  height: 98%;
  border-left: 1px solid var(--secondary-theme);
  border-right: 1px solid var(--secondary-theme);
}
</style>
