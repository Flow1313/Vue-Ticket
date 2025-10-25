<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Sign up for TicketFlow</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            :disabled="loading"
            placeholder="Enter your full name"
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            :disabled="loading"
            placeholder="Enter your email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            :disabled="loading"
            placeholder="Create a password"
          />
        </div>
        
        <button type="submit" class="auth-button" :disabled="loading">
          {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>
      
      <div class="auth-link">
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Signup',
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    
    const router = useRouter()

    const handleSubmit = async () => {
      loading.value = true
      error.value = ''

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // For demo - always succeed
        const userData = {
          id: Date.now().toString(),
          name: name.value,
          email: email.value
        }
        
        localStorage.setItem('ticketapp_session', JSON.stringify(userData))
        
        // Redirect to dashboard
        router.push('/dashboard')
      } catch (err) {
        error.value = 'An error occurred during signup'
      } finally {
        loading.value = false
      }
    }

    return {
      name,
      email,
      password,
      loading,
      error,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* Keep the existing CSS styles */
</style>
