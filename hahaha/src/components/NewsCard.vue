<script setup>
import { onMounted, ref } from 'vue'
import NewsCardItem from '@/components/NewsCardItem.vue'
const loginPage = ref(null)
const registerPage = ref(null)
const loginCard = ref(null)
const box = ref(null)
onMounted(() => {
  loginPage.value = document.querySelector('.first')
  registerPage.value = document.querySelector('.second')
  loginCard.value = document.querySelector('.news-card')
  box.value = document.querySelector('.box')
})

function showToggle() {
  loginCard.value.classList.toggle('show')
  box.value.classList.toggle('show')
}

const news =[
  {
    title: 'news1',
    content: 'content1'
  },
  {
    title: 'news2',
    content: 'content2'
  },
  {
    title: 'news3',
    content: 'content3'
  }
]
const NewsItems= ref();
const NewsDotsItems= ref();
onMounted(()=>{
  NewsItems.value = document.querySelectorAll('.news-card-item')
  NewsDotsItems.value = document.querySelectorAll('.dot')
})
function changeActive(index){
  NewsItems.value.forEach((item, i)=>{
    if(i === index){
      item.classList.add('active')
    }else{
      item.classList.remove('active')
    }
  })
  NewsDotsItems.value.forEach((item, i)=>{
    if(i === index){
      item.classList.add('active')
    }else{
      item.classList.remove('active')
    }
  })
}
</script>

<template>
  <main>
    <div class="box" @click="showToggle">
      <svg
        t="1737293295273"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1475"
        width="200"
        height="200"
      >
        <path
          d="M326.5536 852.5824c110.3872-112.0256 219.3408-223.3344 329.3184-333.6192 13.824-13.9264 16.0768-20.8896 0.8192-35.9424-105.472-104.2432-209.6128-209.7152-314.6752-314.1632-11.264-11.264-14.7456-17.6128-0.8192-29.5936 19.5584-16.7936 37.0688-36.0448 54.784-54.784 7.3728-7.7824 11.776-10.0352 20.8896-0.9216C551.936 219.4432 687.4112 354.816 823.0912 489.984c8.192 8.192 8.704 12.6976 0.2048 21.1968A149528.7808 149528.7808 0 0 0 419.84 913.7152c-8.6016 8.6016-13.5168 10.4448-23.3472 1.1264-23.552-22.4256-48.5376-43.4176-69.9392-62.2592z"
          p-id="1476"
        ></path>
      </svg>
    </div>
    <div class="news-card">
      <news-card-item v-for="(item, index) in news" :key="index" :props="item" />
      <footer>
        <ul>
          <li class="dot" v-for="(_,index) in news" :key="index" @click="changeActive(index)"></li>
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


ul li[class='dot'] {
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
