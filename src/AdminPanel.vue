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
            <!-- Loading State -->
            <div v-if="isLoading" class="flex items-center justify-center py-12">
              <div class="text-center">
                <div
                  class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                ></div>
                <p class="mt-4 text-gray-600">Loading admin data...</p>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12">
              <p class="text-red-600">{{ error }}</p>
              <button
                @click="loadData"
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Retry
              </button>
            </div>

            <!-- Normal Content -->
            <div v-else>
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
                        <p class="text-2xl font-bold text-green-900">
                          {{ stats.completedProjects }}
                        </p>
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
                    @click="openAddProjectModal"
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
  </div>

  <!-- Add Project Modal -->
  <div
    v-if="showAddProjectModal"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click="closeAddProjectModal"
  >
    <div
      class="relative top-10 mx-auto p-6 border w-7xl max-w-[90vw] shadow-lg rounded-lg bg-white"
      @click.stop
    >
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Project</h3>

        <!-- Form Error -->
        <div
          v-if="formError"
          class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {{ formError }}
        </div>

        <form @submit.prevent="submitNewProject" class="space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              v-model="newProject.title"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Short Description</label>
            <input
              type="text"
              v-model="newProject.shortDescription"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief project description"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Platform</label>
            <select
              v-model="newProject.platform"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Platform</option>
              <option value="Website">Web</option>
              <option value="Mobile Application">Mobile</option>
              <option value="Desktop Application">Desktop</option>
              <option value="IoT/Hardware">IoT/Hardware</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Service</label>
            <select
              v-model="newProject.service"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Service</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="MVP Development">MVP Development</option>
              <option value="Innovation for SMEs">Innovation for SMEs</option>
              <option value="IoT Development">IoT Development</option>
              <option value="PitchDeck Design">PitchDeck Design</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Client Name *</label>
            <input
              type="text"
              v-model="newProject.clientName"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Client name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Challenge Statement</label>
            <textarea
              v-model="newProject.challengeStatement"
              rows="3"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What was the main challenge?"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Solution</label>
            <textarea
              v-model="newProject.solution"
              rows="3"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How did you solve it?"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Duration of Project (days)</label
            >
            <input
              type="number"
              v-model="newProject.duration"
              min="1"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="30"
            />
          </div>

          <!-- Features Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div
              v-for="(feature, index) in newProject.features"
              :key="index"
              class="flex gap-2 mb-2"
            >
              <input
                type="text"
                v-model="feature.name"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Feature name"
              />
              <input
                type="text"
                v-model="feature.description"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Feature description"
              />
              <button
                type="button"
                @click="removeFeature(index)"
                :disabled="newProject.features.length === 1"
                class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            </div>
            <button
              type="button"
              @click="addFeature"
              class="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Feature
            </button>
          </div>

          <!-- Tech Stack Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
            <div v-for="(tech, index) in newProject.techStack" :key="index" class="flex gap-2 mb-2">
              <select
                v-model="newProject.techStack[index]"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Technology</option>
                <option value="Javascript">Javascript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="Go">Go</option>
                <option value="C#">C#</option>
                <option value="Ruby">Ruby</option>
                <option value="PHP">PHP</option>
                <option value="Swift">Swift</option>
                <option value="Kotlin">Kotlin</option>
                <option value="Rust">Rust</option>
                <option value="Typescript">Typescript</option>
                <option value="Scala">Scala</option>
                <option value="Elixir">Elixir</option>
                <option value="R">R</option>
                <option value="Assembly">Assembly</option>
                <option value="C">C</option>
                <option value="Clojure">Clojure</option>
                <option value="Erlang">Erlang</option>
                <option value="Fortran">Fortran</option>
                <option value="Haskell">Haskell</option>
                <option value="Lua">Lua</option>
                <option value="Matlab">Matlab</option>
                <option value="Objective-C">Objective-C</option>
                <option value="Perl">Perl</option>
                <option value="Ruby on Rails">Ruby on Rails</option>
                <option value="Sass">Sass</option>
                <option value="Shell">Shell</option>
                <option value="SQL">SQL</option>
                <option value="Less">Less</option>
                <option value="SCSS">SCSS</option>
                <option value="Vue.js">Vue.js</option>
                <option value="React">React</option>
                <option value="Angular">Angular</option>
                <option value="Node.js">Node.js</option>
                <option value="Django">Django</option>
                <option value="Firebase">Firebase</option>
                <option value="MongoDB">MongoDB</option>
                <option value="PostgreSQL">PostgreSQL</option>
                <option value="AWS">AWS</option>
                <option value="Docker">Docker</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
                <option value="Windows">Windows</option>
                <option value="MacOS">MacOS</option>
                <option value="Linux">Linux</option>
                <option value="Adobe Photoshop">Adobe Photoshop</option>
                <option value="Adobe Illustrator">Adobe Illustrator</option>
                <option value="Adobe InDesign">Adobe InDesign</option>
                <option value="Adobe XD">Adobe XD</option>
                <option value="Sketch">Sketch</option>
                <option value="Figma">Figma</option>
                <option value="Adobe Animate">Adobe Animate</option>
                <option value="Adobe After Effects">Adobe After Effects</option>
                <option value="Other">Other</option>
              </select>
              <button
                type="button"
                @click="removeTechStack(index)"
                :disabled="newProject.techStack.length === 1"
                class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            </div>
            <button
              type="button"
              @click="addTechStack"
              class="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Tech Stack
            </button>
          </div>

          <!-- Cover Photo -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Cover Photo</label>
            <input
              type="file"
              @change="handleCoverPhotoChange"
              accept="image/*"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p v-if="newProject.coverPhoto" class="mt-1 text-sm text-gray-500">
              Selected: {{ newProject.coverPhoto.name }}
            </p>
          </div>

          <!-- Additional Images -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(image, index) in 4" :key="index">
                <label class="block text-xs text-gray-600 mb-1">Image {{ index + 1 }}</label>
                <input
                  type="file"
                  @change="handleAdditionalImageChange(index, $event)"
                  accept="image/*"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <p
                  v-if="newProject.additionalImages[index]"
                  class="mt-1 text-xs text-gray-500 truncate"
                >
                  {{ newProject.additionalImages[index]?.name }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeAddProjectModal"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Adding...' : 'Add Project' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'

// TypeScript interfaces
interface Project {
  id: string
  name: string
  client: string
  status: 'Completed' | 'In Progress' | 'Planning'
  date: string
  description?: string
  imageUrl?: string
  serviceId?: string
}

interface Activity {
  id: number
  title: string
  description: string
  time: string
}

interface NavigationItem {
  id: string
  label: string
  icon: () => string
}

interface Settings {
  adminEmail: string
  companyName: string
}

// Icons (simplified - you can replace with proper icon components)
const DashboardIcon = () => '📊'
const ProjectsIcon = () => '📁'
const SettingsIcon = () => '⚙️'

const router = useRouter()
const activeSection = ref('dashboard')
const isLoading = ref(true)
const error = ref<string | null>(null)
const showAddProjectModal = ref(false)

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'projects', label: 'Projects', icon: ProjectsIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

// Reactive data from Firestore
const projects = ref<Project[]>([])
const recentActivity = ref<Activity[]>([])

// New project form data
const newProject = ref({
  title: '',
  shortDescription: '',
  platform: '',
  service: '',
  clientName: '',
  challengeStatement: '',
  solution: '',
  duration: 0,
  features: [{ name: '', description: '' }],
  techStack: [''],
  coverPhoto: null as File | null,
  additionalImages: [null, null, null, null] as (File | null)[],
})

const isSubmitting = ref(false)
const formError = ref<string | null>(null)

// Computed stats based on projects data
const stats = computed(() => {
  const totalProjects = projects.value.length
  const completedProjects = projects.value.filter((p) => p.status === 'Completed').length
  const inProgressProjects = projects.value.filter((p) => p.status === 'In Progress').length

  return {
    totalProjects,
    completedProjects,
    inProgressProjects,
  }
})

// Fetch projects from Firestore
async function fetchProjects() {
  try {
    const q = query(collection(db, 'sampleworks'), orderBy('title', 'asc'))
    const querySnapshot = await getDocs(q)
    const projectsData: Project[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      projectsData.push({
        id: doc.id,
        name: data.title || '',
        client: data.client || 'Unknown Client',
        status: data.status || 'Planning',
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        imageUrl: data.imageUrl,
        serviceId: data.serviceId,
      })
    })

    projects.value = projectsData

    // Generate recent activity based on projects
    recentActivity.value = projectsData.slice(0, 3).map(
      (project, index): Activity => ({
        id: index + 1,
        title: `${project.name} Updated`,
        description: `Project details and images updated`,
        time: `${index + 1} hour${index > 0 ? 's' : ''} ago`,
      }),
    )
  } catch (err) {
    console.error('Error fetching projects:', err)
    error.value = 'Failed to load projects. Please try again later.'
    throw err
  }
}

// Load data on component mount
async function loadData() {
  isLoading.value = true
  error.value = null

  try {
    await fetchProjects()
  } catch (err) {
    console.error('Error loading admin data:', err)
  } finally {
    isLoading.value = false
  }
}

const settings = reactive<Settings>({
  adminEmail: 'admin@inv8solutions.com',
  companyName: 'Inv8 Solutions',
})

const handleLogout = () => {
  // Clear authentication state
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('adminEmail')

  // Redirect to login
  router.push('/admin/login')
}

// Modal and form functions
const openAddProjectModal = () => {
  showAddProjectModal.value = true
  formError.value = null
  // Reset form
  newProject.value = {
    title: '',
    shortDescription: '',
    platform: '',
    service: '',
    clientName: '',
    challengeStatement: '',
    solution: '',
    duration: 0,
    features: [{ name: '', description: '' }],
    techStack: [''],
    coverPhoto: null,
    additionalImages: [null, null, null, null],
  }
}

const closeAddProjectModal = () => {
  showAddProjectModal.value = false
  formError.value = null
}

// Helper functions for dynamic fields
const addFeature = () => {
  newProject.value.features.push({ name: '', description: '' })
}

const removeFeature = (index: number) => {
  if (newProject.value.features.length > 1) {
    newProject.value.features.splice(index, 1)
  }
}

const addTechStack = () => {
  newProject.value.techStack.push('')
}

const removeTechStack = (index: number) => {
  if (newProject.value.techStack.length > 1) {
    newProject.value.techStack.splice(index, 1)
  }
}

const handleCoverPhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    newProject.value.coverPhoto = target.files[0]
  }
}

const handleAdditionalImageChange = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    newProject.value.additionalImages[index] = target.files[0]
  }
}

async function submitNewProject() {
  isSubmitting.value = true
  formError.value = null

  try {
    // Validate required fields
    if (!newProject.value.title.trim() || !newProject.value.clientName.trim()) {
      formError.value = 'Title and Client Name are required fields'
      return
    }

    // Prepare project data
    const projectData = {
      title: newProject.value.title.trim(),
      shortDescription: newProject.value.shortDescription.trim(),
      platform: newProject.value.platform.trim(),
      clientName: newProject.value.clientName.trim(),
      challengeStatement: newProject.value.challengeStatement.trim(),
      solution: newProject.value.solution.trim(),
      duration: newProject.value.duration,
      features: newProject.value.features.filter((f) => f.name.trim() || f.description.trim()),
      techStack: newProject.value.techStack.filter((t) => t.trim()),
      additionalImages: newProject.value.additionalImages.filter((img) => img !== null),
      createdAt: new Date(),
      status: 'Planning',
      date: new Date().toISOString().split('T')[0],
    }

    // Add project to Firestore
    await addDoc(collection(db, 'sampleworks'), projectData)

    // TODO: Handle image uploads to Firebase Storage if needed

    // Refresh projects list
    await fetchProjects()

    // Close modal
    closeAddProjectModal()
  } catch (err) {
    console.error('Error adding project:', err)
    formError.value = 'Failed to add project. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Check authentication on mount and load data
onMounted(async () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (isAuthenticated !== 'true') {
    router.push('/admin/login')
  } else {
    await loadData()
  }
})
</script>
