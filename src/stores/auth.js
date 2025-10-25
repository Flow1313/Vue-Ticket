import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  function login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        user.value = {
          id: '1',
          name: 'Demo User',
          email: email
        }
        localStorage.setItem('ticketapp_session', JSON.stringify(user.value))
        resolve({ success: true })
      }, 1000)
    })
  }

  function signup(name, email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        user.value = {
          id: Date.now().toString(),
          name,
          email
        }
        localStorage.setItem('ticketapp_session', JSON.stringify(user.value))
        resolve({ success: true })
      }, 1000)
    })
  }

  function logout() {
    user.value = null
    localStorage.removeItem('ticketapp_session')
    localStorage.removeItem('ticketapp_tickets')
  }

  function checkAuth() {
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      user.value = JSON.parse(session)
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuth
  }
})