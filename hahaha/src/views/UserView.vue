<script setup>
import {useUserStore} from '@/stores/user.js'
import { ref } from 'vue';

const userStore = useUserStore()
const userName = ref(userStore.user.name)
const userEmail = ref(userStore.user.email)
const userPhone = ref(userStore.user.phone)
const userWebsite = ref(userStore.user.website)
function saveUserInfo(){
  userStore.saveUserInfo({
    name: userName.value,
    email: userEmail.value,
    phone: userPhone.value,
    website: userWebsite.value
  })
}
</script>

<template>
  <main>
    <div class="user-card">
      <header>{{userStore.user.name}}</header>
      <main class="userInfo">
        <div class="input-wrapper">
          <label for="name">Name</label>
          <input type="text" v-model="userName" />
        </div>
        <div class="input-wrapper">
          <label for="email">Email</label>
          <input type="email" v-model="userEmail" />
        </div>
        <div class="input-wrapper">
          <label for="phone">Phone</label>
          <input type="text" v-model="userPhone" />
        </div>
        <div class="input-wrapper">
          <label for="website">Website</label>
          <input type="text" v-model="userWebsite" />
        </div>
        <button @click="saveUserInfo">Save</button>
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
