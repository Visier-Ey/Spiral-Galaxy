<script setup>
import { onMounted, ref } from 'vue'
import NewsCardItem from '@/components/NewsCardItem.vue'
const newsCard = ref(null)
const box = ref(null)
const news =ref([
  {
    title: 'news！',
    content: 'Much of the world\'s attention, however, has been focused on Trump\'s economic policy, in particular, his threat to impose draconian tariffs on many countries, including China. While Trump clearly indicated in his address that tariffs would be a cornerstone of his policy and announced plans to set up an External Revenue Service to oversee them, he did not provide specifics.',
    active: false
  },
  {
    title: 'news2',
    content: 'content2',
    active: false
  },
  {
    title: 'news3',
    content: 'content3',
    active: false
  }
])
const NewsDotsItems= ref();

onMounted(() => {
  NewsDotsItems.value = document.querySelectorAll('.dot')
  news.value[0].active = true
  NewsDotsItems.value[0].classList.add('active')
})
function showToggle() {
  newsCard.value.classList.toggle('show')
  box.value.classList.toggle('show')
}

function lastOneActive() {
  let index = news.value.findIndex((item) => item.active)
  news.value[index].active = false
  NewsDotsItems.value[index].classList.remove('active')
  if (index === 0) {
    news.value[news.value.length - 1].active = true
    NewsDotsItems.value[news.value.length - 1].classList.add('active')
  } else {
    news.value[index - 1].active = true
    NewsDotsItems.value[index - 1].classList.add('active')
  }
}
function nextOneActive() {
  let index = news.value.findIndex((item) => item.active)
  news.value[index].active = false
  NewsDotsItems.value[index].classList.remove('active')
  if (index === news.value.length - 1) {
    news.value[0].active = true
    NewsDotsItems.value[0].classList.add('active')
  } else {
    news.value[index + 1].active = true
    NewsDotsItems.value[index + 1].classList.add('active')
  }
}
</script>

<template>
  <main>
    <div class="box" ref="box" @click="showToggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="currentColor" d="M6.325 12.85q-.225-.15-.337-.375T5.874 12t.113-.475t.337-.375l8.15-5.175q.125-.075.263-.112T15 5.825q.4 0 .7.288t.3.712v10.35q0 .425-.3.713t-.7.287q-.125 0-.262-.038t-.263-.112zM14 15.35v-6.7L8.75 12z"/></svg></div>
    <div class="news-card" ref="newsCard">
      <button class="lastOne" @click="lastOneActive">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg>
      </button>
      <news-card-item v-for="(item, index) in news" :key="index" :props="item" />
      <button class="nextOne" @click="nextOneActive">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg>
      </button>
      <footer>
        <ul>
          <li class="dot" v-for="(_,index) in news" :key="index"></li>
        </ul>
      </footer>
    </div>
  </main>
</template>

<style scoped>
main {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: visible;
}

.news-card {
  overflow: hidden;
  width: 0;
  height: 500px;
  padding: 0;
  margin: 50px auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.news-card:hover {
  background: rgba(255, 255, 255, 0.2);
}

.news-card footer{
  position: absolute;
  width: 50%;
  background: rgba(0,0,0,0.1);
  padding: 10px 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  z-index: 100;
}

.dot {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.49);
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &.active{
    background: white;
  }
}

.lastOne,
.nextOne {
  position: absolute;
  width: 6%;
  height: 16%;
  top: 42%;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #ff7300;
  }
  svg {
    width: 100%;
    height: 100%;
    transform: scale(1.5);
  }
}
.lastOne{
  left: 15%;
}
.nextOne{
  right: 15%;
  transform: scale(-1);
}

.box {
  position: absolute;
  left: -110px;
  width: 90px;
  height: 90px;
  background: linear-gradient(90deg, #ff0000, #ff7300);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  svg {
    fill: white;
    transform: scale(1.3);
  }
  &::after,
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #ff0000, #ff7300);
    z-index: -1;
    border-radius: 50%;
  }
  &::after {
    filter: blur(10px);
  }
}
.news-card.show {
  width: 700px;
  padding: 20px;
}
.box.show {
  transform: scale(-1);
}
</style>
