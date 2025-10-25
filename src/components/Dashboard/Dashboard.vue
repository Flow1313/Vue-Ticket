<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userName }}!</span>
        <button @click="handleLogout" class="btn-logout">
          Logout
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon total">í³Š</div>
        <div class="stat-info">
          <h3>Total Tickets</h3>
          <span class="stat-number">{{ stats.totalTickets }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon open">í´´</div>
        <div class="stat-info">
          <h3>Open Tickets</h3>
          <span class="stat-number">{{ stats.openTickets }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon resolved">í¿¢</div>
        <div class="stat-info">
          <h3>Resolved</h3>
          <span class="stat-number">{{ stats.resolvedTickets }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon progress">í¿¡</div>
        <div class="stat-info">
          <h3>In Progress</h3>
          <span class="stat-number">{{ stats.inProgressTickets }}</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <h2>Quick Actions</h2>
      <div class="action-buttons">
        <button class="btn-primary" @click="$router.push('/tickets')">
          í³‹ Manage Tickets
        </button>
        <button class="btn-secondary" @click="$router.push('/tickets')">
          âž• Create New Ticket
        </button>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="recent-activity">
      <h2>Recent Activity</h2>
      <div class="activity-list">
        <div class="activity-item">
          <span class="activity-text">Ticket #TKT-001 was resolved</span>
          <span class="activity-time">2 hours ago</span>
        </div>
        <div class="activity-item">
          <span class="activity-text">New ticket #TKT-024 created</span>
          <span class="activity-time">4 hours ago</span>
        </div>
        <div class="activity-item">
          <span class="activity-text">Ticket #TKT-018 assigned to you</span>
          <span class="activity-time">1 day ago</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const userName = ref('User')

    // Sample data
    const stats = ref({
      totalTickets: 24,
      openTickets: 8,
      resolvedTickets: 12,
      inProgressTickets: 4
    })

    const handleLogout = () => {
      localStorage.removeItem('ticketapp_session')
      localStorage.removeItem('ticketapp_tickets')
      router.push('/')
    }

    onMounted(() => {
      // Get user name from localStorage
      const session = localStorage.getItem('ticketapp_session')
      if (session) {
        const userData = JSON.parse(session)
        userName.value = userData.name || 'User'
      }
    })

    return {
      userName,
      stats,
      handleLogout
    }
  }
}
</script>

<style scoped>
/* Keep the existing CSS styles - they are fine */
.dashboard-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background-color: var(--gray-100);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--gray-200);
}

.dashboard-header h1 {
  color: var(--gray-900);
  margin: 0;
  font-size: 2.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info span {
  color: var(--gray-600);
  font-weight: 500;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.stat-icon.total { background-color: #e3f2fd; }
.stat-icon.open { background-color: #ffebee; }
.stat-icon.resolved { background-color: #e8f5e8; }
.stat-icon.progress { background-color: #fff3e0; }

.stat-info h3 {
  margin: 0 0 0.5rem 0;
  color: var(--gray-600);
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--gray-900);
}

/* Quick Actions */
.quick-actions {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
}

.quick-actions h2 {
  margin: 0 0 1.5rem 0;
  color: var(--gray-900);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--gray-600);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--gray-700);
  transform: translateY(-1px);
}

/* Recent Activity */
.recent-activity {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}

.recent-activity h2 {
  margin: 0 0 1.5rem 0;
  color: var(--gray-900);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--gray-100);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.activity-text {
  color: var(--gray-900);
  font-weight: 500;
}

.activity-time {
  color: var(--gray-600);
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
