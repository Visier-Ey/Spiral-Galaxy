<script setup>
import { onMounted, ref } from 'vue'

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
function jumpToRegister() {
  loginPage.value.classList.remove('active')
  registerPage.value.classList.add('active')
}
function jumpToLogin() {
  loginPage.value.classList.add('active')
  registerPage.value.classList.remove('active')
}
function showToggle() {
  loginCard.value.classList.toggle('show')
  box.value.classList.toggle('show')
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
      <div class="first active">
        <h1>Login</h1>
        <div class="input-wrapper">
          <input type="text" placeholder="Username" />
          <div class="line"></div>
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="Password" />
          <div class="line"></div>
        </div>
        <div class="button-wrapper">
          <button>Login</button>
        </div>
        <button class="switch" @click="jumpToRegister">register</button>
      </div>
      <div class="second">
        <h1>Register</h1>
        <div class="input-wrapper">
          <input type="text" placeholder="Username" />
          <div class="line"></div>
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="Password" />
          <div class="line"></div>
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="Password" />
          <div class="line"></div>
        </div>
        <div class="button-wrapper">
          <button>Register</button>
        </div>
        <button class="switch" @click="jumpToLogin">login</button>
      </div>
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

.first,
.second {
  position: absolute;
  opacity: 0;
  width: 50%;
  height: 100%;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.4);
  transform: translateX(20%) translateY(20%);
  transition: all 0.7s ease;
  .input-wrapper {
    position: relative;
    width: 80%;
    margin: 20px auto;
    background: rgba(0, 0, 0, 0.4);
    input {
      width: 100%;
      padding: 10px;
      border: none;
      outline: none;
      background: transparent;
      color: white;
      font-size: 1.2rem;
      margin-bottom: 2px;
    }
    .line {
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #ff7300, #ff0000);
    }
    &::before {
      z-index: -1;
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #ff0000, #ff7300);
    }
  }
  h1 {
    text-align: center;
    color: rgba(232, 86, 8, 0.87);
    font-size: 2rem;
    margin: 40px 0;
  }
  .button-wrapper {
    position: relative;
    width: 80%;
    margin: auto;
    padding: 10px;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.03);
    }
    ::before,
    ::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #ff0000, #ff7300);
      z-index: -1;
      border-radius: 10px;
    }
    ::after {
      filter: blur(10px);
    }
    button {
      width: 100%;
      margin: auto;
      padding: 10px;
      border: none;
      outline: none;
      backdrop-filter: blur(10px);
      color: white;
      font-size: 1.2rem;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .switch {
    width: 90%;
    text-align: end;
    position: relative;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: #ff7300;
    }
  }
}

.active {
  opacity: 1;
  z-index: 1;
  transform: none;
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
