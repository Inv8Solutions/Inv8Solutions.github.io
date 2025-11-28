<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">Inv8 Solutions</h1>
        <p class="mt-2 text-lg text-gray-600">Admin Panel</p>
      </div>

      <!-- Admin Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>

            <nav class="space-y-2">
              <button
                v-for="item in navigationItems"
                :key="item.id"
                @click="activeSection = item.id"
                class="w-full text-left px-4 py-3 rounded-lg transition-colors"
                :class="{
                  'bg-blue-50 text-blue-700 border-l-4 border-blue-700': activeSection === item.id,
                  'text-gray-700 hover:bg-gray-50': activeSection !== item.id,
                }"
              >
                <div class="flex items-center">
                  <component :is="item.icon" class="h-5 w-5 mr-3" />
                  {{ item.label }}
                </div>
              </button>
            </nav>

            <!-- Logout Button -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <button
                @click="handleLogout"
                class="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-xl p-6">
            <!-- Dashboard Section -->
            <div v-if="activeSection === 'dashboard'" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>

              <!-- Stats Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-8 w-8 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-blue-600">Total Projects</p>
                      <p class="text-2xl font-bold text-blue-900">{{ stats.totalProjects }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 rounded-lg p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-green-600">Completed</p>
                      <p class="text-2xl font-bold text-green-900">{{ stats.completedProjects }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-yellow-50 rounded-lg p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-8 w-8 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-yellow-600">In Progress</p>
                      <p class="text-2xl font-bold text-yellow-900">
                        {{ stats.inProgressProjects }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="mt-8">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div class="space-y-3">
                  <div
                    v-for="activity in recentActivity"
                    :key="activity.id"
                    class="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="flex-shrink-0">
                      <div
                        class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center"
                      >
                        <svg
                          class="h-4 w-4 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4 flex-1">
                      <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                      <p class="text-sm text-gray-500">{{ activity.description }}</p>
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ activity.time }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Projects Section -->
            <div v-else-if="activeSection === 'projects'" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-900">Projects</h2>
                <button
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Project
                </button>
              </div>

              <!-- Projects Table -->
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Project
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="project in projects" :key="project.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ project.name }}</div>
                        <div class="text-sm text-gray-500">{{ project.client }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="getStatusClass(project.status)"
                        >
                          {{ project.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ project.date }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button class="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Settings Section -->
            <div v-else-if="activeSection === 'settings'" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-900">Settings</h2>

              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Account Settings</h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Admin Email</label>
                      <input
                        type="email"
                        v-model="settings.adminEmail"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        v-model="settings.companyName"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div class="pt-6">
                  <button
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Icons (simplified - you can replace with proper icon components)
const DashboardIcon = () => '📊'
const ProjectsIcon = () => '📁'
const SettingsIcon = () => '⚙️'

const router = useRouter()
const activeSection = ref('dashboard')

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'projects', label: 'Projects', icon: ProjectsIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

const stats = reactive({
  totalProjects: 12,
  completedProjects: 8,
  inProgressProjects: 4,
})

const recentActivity = [
  {
    id: 1,
    title: 'Forensic Lens Updated',
    description: 'Project details and images updated',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'New Project Added',
    description: 'Mobile Banking App project created',
    time: '1 day ago',
  },
  {
    id: 3,
    title: 'Client Meeting',
    description: 'Meeting with ABC Corp completed',
    time: '3 days ago',
  },
]

const projects = [
  {
    id: 1,
    name: 'Forensic Lens',
    client: 'Forensics Institute',
    status: 'Completed',
    date: '2024-01-15',
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    client: 'Tech Bank',
    status: 'In Progress',
    date: '2024-01-20',
  },
  {
    id: 3,
    name: 'E-commerce Platform',
    client: 'Retail Store',
    status: 'Planning',
    date: '2024-01-25',
  },
]

const settings = reactive({
  adminEmail: 'admin@inv8solutions.com',
  companyName: 'Inv8 Solutions',
})

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800'
    case 'Planning':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const handleLogout = () => {
  // Clear authentication state
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('adminEmail')

  // Redirect to login
  router.push('/admin/login')
}

// Check authentication on mount
onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (isAuthenticated !== 'true') {
    router.push('/admin/login')
  }
})
</script>
