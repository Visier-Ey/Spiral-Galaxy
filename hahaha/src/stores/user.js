import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: '',
    age: 0,
    email: '',
    website: '',
    phone: ''
  })
  const isLogin = ref(false)
  const upperCaseName = computed(() => user.value.name.toUpperCase())
  function login(newName) {
    user.value.name = newName
    isLogin.value = true
  }
  function logout() {
    user.value.name = ''
    isLogin.value = false
  }
  function updateUserInfo(newInfo) {
    Object.assign(user.value, newInfo)
  }
  function clearUserInfo() {
    Object.keys(user.value).forEach(key => {
      user.value[key] = ''
    })
  }
  function saveUserInfo() {
    console.log('save user info')
  }
  return { user, upperCaseName, login, logout, isLogin, updateUserInfo, clearUserInfo, saveUserInfo }
})
