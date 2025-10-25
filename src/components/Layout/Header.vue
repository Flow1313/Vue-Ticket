<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>TicketFlow</h1>
        </router-link>
        
        <nav class="nav">
          <router-link v-if="!isAuthenticated" to="/login">
            Login
          </router-link>
          <router-link v-if="!isAuthenticated" to="/signup" class="btn-primary">
            Sign Up
          </router-link>
          
          <template v-if="isAuthenticated">
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/tickets">Tickets</router-link>
            <span class="welcome-text">Welcome, {{ userName }}</span>
            <button @click="handleLogout" class="btn-logout">
              Logout
            </button>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    const isAuthenticated = ref(false)
    const userName = ref('')

    const checkAuth = () => {
      const session = localStorage.getItem('ticketapp_session')
      if (session) {
        isAuthenticated.value = true
        const userData = JSON.parse(session)
        userName.value = userData.name
      } else {
        isAuthenticated.value = false
        userName.value = ''
      }
    }

    const handleLogout = () => {
      localStorage.removeItem('ticketapp_session')
      localStorage.removeItem('ticketapp_tickets')
      isAuthenticated.value = false
      userName.value = ''
      router.push('/')
    }

    // Check auth status on component mount
    onMounted(() => {
      checkAuth()
      // Listen for storage changes (in case of logout from other tabs)
      window.addEventListener('storage', checkAuth)
    })

    onUnmounted(() => {
      window.removeEventListener('storage', checkAuth)
    })

    return {
      isAuthenticated,
      userName,
      handleLogout
    }
  }
}
</script>

<style scoped>
.header {
  background: white;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  position: relative;
}

.logo h1 {
  color: var(--primary-color);
  margin: 0;
  font-size: 1.8rem;
  text-decoration: none;
}

.logo:hover {
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: absolute;
  right: 0;
}

.nav a {
  color: var(--gray-800);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav a:hover {
  color: var(--primary-color);
}

.welcome-text {
  color: var(--gray-600);
  font-weight: 500;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
}

.btn-logout {
  background: none;
  border: 1px solid var(--danger-color);
  color: var(--danger-color);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-logout:hover {
  background-color: var(--danger-color);
  color: white;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
  }
  
  .nav {
    position: static;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .welcome-text {
    display: none;
  }
}
</style>
