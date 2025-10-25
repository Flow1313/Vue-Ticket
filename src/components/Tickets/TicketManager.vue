<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'TicketManager',
  setup() {
    const tickets = ref([])
    const showCreateForm = ref(false)
    const newTicket = ref({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    })

    // Sample tickets data
    const sampleTickets = [
      {
        id: '1',
        title: 'Login issue',
        description: 'Unable to login to the system',
        status: 'open',
        priority: 'high',
        createdBy: 'Demo User',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Feature request',
        description: 'Add dark mode support to the application',
        status: 'in_progress',
        priority: 'medium',
        createdBy: 'Demo User',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        title: 'Bug fix needed',
        description: 'Dashboard statistics not updating in real-time',
        status: 'closed',
        priority: 'high',
        createdBy: 'Demo User',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ]

    onMounted(() => {
      // Load sample tickets
      tickets.value = sampleTickets
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const createTicket = () => {
      const session = localStorage.getItem('ticketapp_session')
      const userData = session ? JSON.parse(session) : { name: 'User' }
      
      const ticket = {
        id: Date.now().toString(),
        ...newTicket.value,
        createdBy: userData.name,
        createdAt: new Date().toISOString()
      }
      
      tickets.value.unshift(ticket)
      showCreateForm.value = false
      newTicket.value = { title: '', description: '', status: 'open', priority: 'medium' }
    }

    return {
      tickets,
      showCreateForm,
      newTicket,
      formatDate,
      createTicket
    }
  }
}
</script>
