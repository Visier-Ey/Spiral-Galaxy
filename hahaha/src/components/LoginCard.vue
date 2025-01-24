<script setup>
import {  ref } from 'vue'
import {useUserStore} from '@/stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const loginPage = ref(null)
const registerPage = ref(null)
const loginCard = ref(null)
const account = ref('')
const password = ref('')
const confirmPassword = ref('')
const loginWarning = ref(null)
const registerWarning = ref(null)
function jumpToRegister() {
  loginPage.value.classList.remove('active')
  registerPage.value.classList.add('active')
}
function jumpToLogin() {
  loginPage.value.classList.add('active')
  registerPage.value.classList.remove('active')
}

function login() {
  // error check
  console.log('login')
  console.log(account.value)
  const accountValue = account.value.trim()
  const passwordValue = password.value.trim()
  if (!accountValue || !passwordValue) {
    loginWarning.value.innerText = 'Please fill in the form'
    return
  }
  //TODO: login logic here ,All the account pass
  console.log(accountValue)
  userStore.login(accountValue)
  router.push('/home')
}
function register() {
  // error check
  const accountValue = account.value.trim()
  const passwordValue = password.value.trim()
  const confirmPasswordValue = confirmPassword.value.trim()
  if (!accountValue || !passwordValue || !confirmPasswordValue) {
    registerWarning.value.innerText = 'Please fill in the form'
    return
  }
  if (passwordValue !== confirmPasswordValue) {
    registerWarning.value.innerText = 'Password does not match'
    return
  }
  //TODO: register logic here, All the account pass
  console.log('simulating register,all the account pass')
}
</script>

<template>
  <main>
    <div class="login-card" ref="loginCard">
      <div class="login active" ref="loginPage">
        <h1>Login</h1>
        <div class="input-wrapper">
          <input type="text" placeholder="Username" v-model="account"/>
          <div class="line"></div>
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="Password" v-model="password"/>
          <div class="line"></div>
        </div>
        <span class="warning" ref="loginWarning"></span>
        <div class="button-wrapper">
          <button @click="login">Login</button>
        </div>
        <button class="switch" @click="jumpToRegister">register</button>
      </div>
      <div class="register" ref="registerPage">
        <h1>Register</h1>
        <div class="input-wrapper">
          <input type="text" placeholder="Username" v-model="account"/>
          <div class="line"></div>
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="Password" v-model="password"/>
          <div class="line"></div>
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="Password" v-model="confirmPassword"/>
          <div class="line"></div>
        </div>
        <span class="warning" ref="registerWarning"></span>
        <div class="button-wrapper">
          <button @click="register">Register</button>
        </div>
        <button class="switch" @click="jumpToLogin">login</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  background: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.login-card {
  overflow: hidden;
  position: relative;
  top: 40px;
  width: 1000px;
  padding: 20px;
  height: 600px;
  margin: 50px auto;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 1.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card:hover {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}

.login,
.register {
  position: absolute;
  opacity: 0;
  width: 70%;
  height: 100%;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateX(20%) translateY(20%);
  transition: all 0.7s ease;
  .input-wrapper {
    position: relative;
    width: 80%;
    margin: 20px auto;
    background: rgba(255, 255, 255, 0.4);
    input {
      width: 100%;
      padding: 10px;
      border: none;
      outline: none;
      background: transparent;
      color: black;
      font-size: 1.2rem;
      margin-bottom: 2px;
    }
    .line {
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #ff7300, #ff0000, white);
      background-size: 200%;
    }
    input:focus + .line{
      animation: gradient 0.7s linear;
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
    color: #ff7300;
    font-size: 2rem;
    margin: 40px 0;
  }
  .button-wrapper {
    position: relative;
    width: 80%;
    margin: 50px auto;
    padding: 10px;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.03);
    }
    button {
      position: relative;
      z-index: 1;
      width: 100%;
      margin: auto;
      padding: 10px;
      border: none;
      outline: none;
      background: linear-gradient(90deg, #ff0000 40%, #ff7300 60%, #ff0000);
      background-size: 200%;
      color: white;
      font-size: 1.2rem;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        animation: gradient 1s linear infinite;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #ff0000, #ff7300, #ff0000);
        background-size: 200%;
        z-index: -1;
        border-radius: 10px;
        filter: blur(20px);
      }
    }
  }
  .switch {
    width: 90%;
    text-align: end;
    position: relative;
    background: transparent;
    border: none;
    outline: none;
    color: black;
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

.warning {
  position: relative;
  left: 10%;
  margin: 10px auto;
  color: red;
  font-size: 1.0rem;
  text-align: center;
}

@keyframes gradient {
  0% {
    background-position: 200% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
