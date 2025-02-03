<script setup>
import { useUserStore } from '@/stores/user.js'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const nav = ref(null)
function login() {
  router.push('/login')
}
function user() {
  router.push('/user')
}


</script>

<template>
  <nav ref="nav">
    <div class="header">VISIER</div>
    <div class="tool">
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="#">Services</RouterLink>
      <RouterLink to="#">Products</RouterLink>
      <RouterLink to="#">About</RouterLink>
      <RouterLink to="#">Contact</RouterLink>
    </div>
    <div class="user">
      <svg
        width="100px"
        height="35px"
        viewBox="0 0 24 24"
        fill="rgba(255, 115, 0, 0.75)"
        xmlns="http://www.w3.org/2000/svg"
        @click="userStore.isLogin ? user() : login()"
      >
        <path
          d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
        />
      </svg>
      <button v-if="!userStore.isLogin" @click="login">Login</button>
      <div class="logout-box" v-if="userStore.isLogin">
        Hi,{{ userStore.upperCaseName }}
        <button @click="userStore.logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>

nav {
  top: 0;
  left: 0;
  width: 100%;
  opacity: 1;
  height: 70px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  border: none;
  border-top: 1px solid var(--secondary-color-shadow);
  transition: all 0.3s ease;
}
.header {
  z-index: 100;
  overflow: visible;
  font-family: Baskerville Old Face;
  top: 20px;
  left: 20px;
  position: absolute;
  font-size: 5.5rem;
  transform: skewX(-25deg);
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--primary-color));
  background-size: 200%;
  background-clip: text;
  color: transparent;
  animation: infinite 1.5s linear gradient;
  box-shadow: 0 10px 10px var(--secondary-color);
}
.tool {
  position: relative;
  width: 40%;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  a {
    background: none;
    border: none;
    text-decoration: none;
    color: #ff7300;
    font-size: 1.5rem;
    cursor: pointer;
    text-shadow: 2px 2px 5px var(--secondary-color-shadow);
    transition: all 0.3s ease;
    &:hover {
      color: white;
    }
  }
}
.user {
  position: relative;
  width: auto;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  color: white;
  font-size: 1rem;
  & svg {
    transition: all 0.3s ease;
  }
  & svg:hover {
    fill: white;
    cursor: pointer;
  }
  button {
    text-shadow: 0 5px 15px var(--secondary-color-shadow);
    font-size: 1.2rem;
    background: none;
    border: none;
    color: var(--secondary-color);
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: white;
    }
  }
  .logout-box{
    position: relative;
    text-shadow: 0 5px 15px var(--secondary-color-shadow);
    font-size: 1.2rem;
    background: none;
    border: none;
    color: var(--secondary-color);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    button {
      position: absolute;
      top: 2.0rem;
      right: 0;
      height: 0;
      text-shadow: 0 5px 15px var(--secondary-color-shadow);
      font-size: 1.3rem;
      background: none;
      border: none;
      color: var(--secondary-color);
      cursor: pointer;
      transition: all 0.3s ease;
      overflow: hidden;
      &:hover {
        color: white;
      }
    }
    &:hover {
      color: white;
      button {
        height: 2rem;
      }
    }
  }
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
