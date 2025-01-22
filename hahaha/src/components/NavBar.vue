<script setup>

function login() {
  window.location.href = '/login'
}
function logout() {
  console.log('logout')
}
</script>

<template>
  <nav>
    <div class="header">VISIER</div>
    <div class="tool">
      <button>Home</button>
      <button>Services</button>
      <button>Products</button>
      <button>About</button>
      <button>Contact</button>
    </div>
    <div class="user">
      <svg
        width="80px"
        height="35px"
        viewBox="0 0 24 24"
        fill="rgba(255, 115, 0, 0.75)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <button v-if="true" @click="login">Login</button>
      <button v-if="false" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  border: none;
  border-top: 1px solid rgba(255, 115, 0, 0.75);
}
.header {
  overflow: visible;
  font-family: Baskerville Old Face;
  top: 20px;
  left: 10px;
  position: absolute;
  font-size: 5.5rem;
  transform: skewX(-25deg);
  background: linear-gradient(90deg, #ff0000, #ff7300,#ff0000) ;
  background-size: 200%;
  background-clip: text;
  color: transparent;
  animation: infinite 1.5s linear gradient;
  box-shadow: 0 10px 10px rgba(255, 115, 0, 0.9);
}
.tool {
  position: relative;
  width: 40%;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  button {
    background: none;
    border: none;
    color: #ff7300;
    font-size: 1.5rem;
    cursor: pointer;
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
  button {
    font-size: 1.2rem;
    background: none;
    border: none;
    color: #ff7300;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: white;
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
