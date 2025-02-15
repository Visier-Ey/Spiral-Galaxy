<script setup>
import { ref } from 'vue'
const PDL = ref(null)
function show(){
  PDL.value.classList.add('show')
}
function hide(){
  PDL.value.classList.remove('show')
}
defineExpose({
  show,
  hide
})
</script>

<template>
<main>
  <div class="pull-down-list" ref="PDL">

  </div>
</main>
</template>

<style scoped>
.pull-down-list{
  position: absolute;
  left: 0;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}
</style>
