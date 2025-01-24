<script setup>
import { defineProps, ref, watch } from 'vue'
const cardItem = ref(null);
const props = defineProps({
  props: {
    title: String,
    content: String,
    active: Boolean,
  },
})
watch(() => props.props.active, (newVal) => {
  if (newVal) {
    cardItem.value.classList.add('active')
  } else {
    cardItem.value.classList.remove('active')
  }
})
</script>

<template>
  <div class="news-card-item" ref="cardItem">
      <header>news!</header>
      <main>{{props.props.content}}</main>
  </div>
</template>

<style scoped>

.news-card-item{
  position: absolute;
  opacity: 0;
  width: 50%;
  height: 100%;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.3);
  transform: translateX(20%) translateY(20%);
  transition: all 0.7s ease;
  overflow: hidden;
}


.news-card-item header{
  width: 100%;
  height: 50px;
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.80), rgba(255, 115, 0, 0.90));
  color: white;
  text-transform: uppercase;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: fantasy;
  box-shadow: 0 0 10px  rgba(255, 0, 0, 0.80);
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.6), /* 较近的辉光 */
    0 0 40px rgba(255, 255, 255, 0.2);
}

.news-card-item main{
  z-index: 100;
  height: 100%;
  padding: 20px 20px 40px;
  color: white;
  font-size: 1.2rem;
  font-family: fangsong;
  overflow: auto;
  scrollbar-color: transparent transparent;
}
.news-card-item footer{
  position: absolute;
  width: 50%;
  background: rgba(0,0,0,0.1);
  padding: 10px 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.news-card-item.active {
  opacity: 1;
  z-index: 1;
  transform: none;
}

</style>
