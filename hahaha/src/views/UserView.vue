<script setup>
import {useUserStore} from '@/stores/user.js'

const userStore = useUserStore()


</script>

<template>
  <main>
    <div class="user-card">
      <header>{{userStore.user.name}}</header>
      <main class="userInfo">
        <div class="input-wrapper">
          <label for="name">Name</label>
          <input type="text" v-model="userStore.user.name" />
        </div>
        <div class="input-wrapper">
          <label for="email">Email</label>
          <input type="email" v-model="userStore.user.email" />
        </div>
        <div class="input-wrapper">
          <label for="phone">Phone</label>
          <input type="text" v-model="userStore.user.phone" />
        </div>
        <div class="input-wrapper">
          <label for="website">Website</label>
          <input type="text" v-model="userStore.user.website" />
        </div>
        <button @click="userStore.saveUserInfo()">Save</button>
      </main>
    </div>
  </main>
</template>

<style scoped>
main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  header{
    width: 80%;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .user-card{
    width: 80%;
    border-left: 2px solid #ccc;
    border-right: 2px solid #ccc;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
  }
}
.userInfo{
  overflow-y: auto;
  width: 80%;
  border-top: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .input-wrapper{
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    label{
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    input{
      padding: 0.5rem;
      font-size: 1.5rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
    }
  }
  button{
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #ff7300;
    &:hover{
      background: white;
      color: #ff7300;
    }
  }
}
</style>
