<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-9xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p class="text-lg text-gray-600">Manage your projects, inquiries, and consultations</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <!-- Navigation Sidebar -->
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
                  <span class="h-5 w-5 mr-3">{{ item.icon() }}</span>
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

        <!-- Content Area -->
        <div class="lg:col-span-5">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Error loading data</h3>
                <p class="mt-1 text-sm text-red-700">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Normal Content -->
          <div v-else>
            <!-- Dashboard Section -->
            <div v-if="activeSection === 'dashboard'" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>

              <!-- Stats Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white rounded-lg shadow p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Projects</h3>
                  <p class="text-3xl font-bold text-blue-600">{{ projects.length }}</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Inquiries</h3>
                  <p class="text-3xl font-bold text-green-600">{{ inquiries.length }}</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Calls</h3>
                  <p class="text-3xl font-bold text-purple-600">{{ calls.length }}</p>
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
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
                        Client
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
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ project.clientName }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ project.date }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button @click="openEditProjectModal(project)" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button @click="deleteProject(project)" class="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Inquiries Section -->
            <div v-else-if="activeSection === 'inquiries'" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-900">Inquiries</h2>

              <!-- Inquiries Table -->
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <div class="overflow-x-auto">
                  <table class="w-full min-w-[1200px] divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48"
                        >
                          Name
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64"
                        >
                          Email
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48"
                        >
                          Service
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40"
                        >
                          Status
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32"
                        >
                          Date
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="inquiry in inquiries" :key="inquiry.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-gray-900">{{ inquiry.name }}</div>
                          <div class="text-sm text-gray-500">
                            {{ inquiry.company || 'No company' }}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ inquiry.email }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ inquiry.service }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                            :class="{
                              'bg-green-100 text-green-800': inquiry.status === 'client_secured',
                              'bg-yellow-100 text-yellow-800':
                                inquiry.status === 'new' || inquiry.status === 'in-progress',
                              'bg-blue-100 text-blue-800': inquiry.status === 'client_cancelled',
                            }"
                          >
                            {{
                              inquiry.status === 'client_secured'
                                ? 'Client Secured'
                                : inquiry.status === 'client_cancelled'
                                  ? 'Client Cancelled'
                                  : 'Not Yet'
                            }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatDate(inquiry.createdAt) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            @click="openInquiryModal(inquiry)"
                            class="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </button>
                          <button class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="inquiries.length === 0" class="text-center py-8 text-gray-500">
                  No inquiries found
                </div>
              </div>
            </div>

            <!-- Calls Section -->
            <div v-else-if="activeSection === 'calls'" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-900">Consultation Calls</h2>

              <!-- Calls Table -->
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Time
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="call in calls" :key="call.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ call.name }}</div>
                        <div class="text-sm text-gray-500">{{ call.company || 'No company' }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ call.email }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(new Date(call.selectedDate)) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ call.selectedTime }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                          :class="{
                            'bg-amber-100 text-amber-800': call.status === 'contacted',
                            'bg-gray-100 text-gray-800': call.status !== 'contacted',
                          }"
                        >
                          {{ call.status === 'contacted' ? 'Contacted' : 'Pending' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          @click="openCallModal(call)"
                          class="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </button>
                        <button class="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="calls.length === 0" class="text-center py-8 text-gray-500">
                  No consultation calls booked
                </div>
              </div>
            </div>

            <!-- Settings Section -->
            <div v-else-if="activeSection === 'settings'" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-900">Settings</h2>

              <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Admin Email</label>
                      <input
                        type="email"
                        v-model="settings.adminEmail"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        v-model="settings.companyName"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div class="mt-6">
                    <button
                      @click="saveSettings"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Add New Project</h3>
          <button @click="closeAddProjectModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="addProject">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Project Title *</label>
              <input
                type="text"
                v-model="newProject.title"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project title"
              />
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

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Short Description</label>
              <input
                type="text"
                v-model="newProject.shortDescription"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief project description"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Cover Photo</label>
              <input
                id="add-cover-photo-input"
                type="file"
                @change="onCoverPhotoChange"
                accept="image/*"
                class="sr-only"
              />
              <label
                for="add-cover-photo-input"
                class="mt-1 inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                Choose file
              </label>
              <p v-if="addSelectedFileName" class="mt-1 text-xs text-gray-500">
                Selected: {{ addSelectedFileName }}
              </p>
              <div v-if="isSubmitting && newProject.coverPhoto" class="mt-3">
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>Uploading cover photo...</span>
                  <span>{{ addUploadProgress }}%</span>
                </div>
                <div class="mt-1 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    class="h-full bg-blue-600 transition-all duration-300"
                    :style="{ width: `${addUploadProgress}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Additional Photos</label>
              <input
                id="add-additional-photos-input"
                type="file"
                @change="onAdditionalImagesChange"
                accept="image/*"
                multiple
                class="sr-only"
              />
              <label
                for="add-additional-photos-input"
                class="mt-1 inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                Choose files
              </label>
              <p class="mt-1 text-xs text-gray-500">Used in project image sections (not cover photo)</p>
              <div v-if="addSelectedAdditionalFileNames.length" class="mt-2 space-y-1">
                <p class="text-xs text-gray-500">{{ addSelectedAdditionalFileNames.length }} file(s) selected</p>
                <div
                  v-for="(name, index) in addSelectedAdditionalFileNames"
                  :key="`${name}-${index}`"
                  class="flex items-center justify-between text-xs text-gray-500"
                >
                  <span class="truncate pr-2">• {{ name }}</span>
                  <button
                    type="button"
                    @click="removeSelectedAdditionalImage(index)"
                    class="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div v-if="isSubmitting && newProject.additionalImages.length" class="mt-3">
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>Uploading additional photos...</span>
                  <span>{{ addAdditionalUploadProgress }}%</span>
                </div>
                <div class="mt-1 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    class="h-full bg-blue-600 transition-all duration-300"
                    :style="{ width: `${addAdditionalUploadProgress}%` }"
                  ></div>
                </div>
              </div>
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

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Challenge Statement</label>
              <textarea
                v-model="newProject.challengeStatement"
                rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What was the main challenge?"
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Solution</label>
              <textarea
                v-model="newProject.solution"
                rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="How did you solve it?"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Duration (weeks)</label>
              <input
                type="number"
                v-model="newProject.duration"
                min="1"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project duration"
              />
            </div>

            <div class="md:col-span-2">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-gray-700">Features</label>
                <button
                  type="button"
                  @click="addFeature"
                  class="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Feature
                </button>
              </div>
              <div class="mt-2 space-y-3">
                <div
                  v-for="(feature, index) in newProject.features"
                  :key="`feature-${index}`"
                  class="grid grid-cols-1 md:grid-cols-5 gap-2"
                >
                  <input
                    type="text"
                    v-model="feature.name"
                    class="md:col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Feature name"
                  />
                  <input
                    type="text"
                    v-model="feature.description"
                    class="md:col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    @click="removeFeature(index)"
                    class="md:col-span-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div class="md:col-span-2">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-gray-700">Tech Stack</label>
                <button
                  type="button"
                  @click="addTechStack"
                  class="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Tech
                </button>
              </div>
              <div class="mt-2 space-y-2">
                <div
                  v-for="(tech, index) in newProject.techStack"
                  :key="`tech-${index}`"
                  class="flex gap-2"
                >
                  <input
                    type="text"
                    v-model="newProject.techStack[index]"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Vue, Firebase, Tailwind"
                  />
                  <button
                    type="button"
                    @click="removeTechStack(index)"
                    class="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="formError" class="mt-4 text-red-600 text-sm">
            {{ formError }}
          </div>

          <div class="mt-6 flex justify-end space-x-3">
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
              {{
                isSubmitting
                  ? (newProject.coverPhoto || newProject.additionalImages.length
                      ? `Uploading ${Math.max(addUploadProgress, addAdditionalUploadProgress)}%`
                      : 'Adding...')
                  : 'Add Project'
              }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Project Modal -->
    <div
      v-if="showEditProjectModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="closeEditProjectModal"
    >
      <div
        class="relative top-10 mx-auto p-6 border w-7xl max-w-[90vw] shadow-lg rounded-lg bg-white"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Edit Project</h3>
          <button @click="closeEditProjectModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="updateProject">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Project Title *</label>
              <input
                type="text"
                v-model="editProjectData.title"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project title"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Client Name *</label>
              <input
                type="text"
                v-model="editProjectData.clientName"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Client name"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Short Description</label>
              <input
                type="text"
                v-model="editProjectData.shortDescription"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief project description"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Cover Photo</label>
              <input
                id="edit-cover-photo-input"
                type="file"
                @change="onEditCoverPhotoChange"
                accept="image/*"
                class="sr-only"
              />
              <label
                for="edit-cover-photo-input"
                class="mt-1 inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                Choose file
              </label>
              <p v-if="editSelectedFileName" class="mt-1 text-xs text-gray-500">
                Selected: {{ editSelectedFileName }}
              </p>
              <p class="text-xs text-gray-500 mt-1">Leave blank to keep current image</p>
              <div v-if="editExistingImageUrl && !editProjectData.coverPhoto" class="mt-3">
                <img
                  :src="editExistingImageUrl"
                  alt="Current project cover"
                  class="h-24 w-full rounded-lg border border-gray-200 object-cover"
                />
              </div>
              <div v-if="isEditSubmitting && editProjectData.coverPhoto" class="mt-3">
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>Uploading replacement cover...</span>
                  <span>{{ editUploadProgress }}%</span>
                </div>
                <div class="mt-1 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    class="h-full bg-blue-600 transition-all duration-300"
                    :style="{ width: `${editUploadProgress}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Additional Photos</label>
              <input
                id="edit-additional-photos-input"
                type="file"
                @change="onEditAdditionalImagesChange"
                accept="image/*"
                multiple
                class="sr-only"
              />
              <label
                for="edit-additional-photos-input"
                class="mt-1 inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                Choose files
              </label>
              <p class="mt-1 text-xs text-gray-500">Upload more photos for project image sections</p>
              <div v-if="editSelectedAdditionalFileNames.length" class="mt-2 space-y-1">
                <p class="text-xs text-gray-500">{{ editSelectedAdditionalFileNames.length }} new file(s) selected</p>
                <div
                  v-for="(name, index) in editSelectedAdditionalFileNames"
                  :key="`${name}-${index}`"
                  class="flex items-center justify-between text-xs text-gray-500"
                >
                  <span class="truncate pr-2">• {{ name }}</span>
                  <button
                    type="button"
                    @click="removeEditSelectedAdditionalImage(index)"
                    class="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div v-if="editExistingAdditionalImageUrls.length" class="mt-3 grid grid-cols-2 gap-2">
                <img
                  v-for="(url, index) in editExistingAdditionalImageUrls"
                  :key="`${url}-${index}`"
                  :src="url"
                  :alt="`Existing additional image ${index + 1}`"
                  class="h-20 w-full rounded-lg border border-gray-200 object-cover"
                />
              </div>
              <div v-if="isEditSubmitting && editProjectData.additionalImages.length" class="mt-3">
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>Uploading additional photos...</span>
                  <span>{{ editAdditionalUploadProgress }}%</span>
                </div>
                <div class="mt-1 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    class="h-full bg-blue-600 transition-all duration-300"
                    :style="{ width: `${editAdditionalUploadProgress}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Platform</label>
              <select
                v-model="editProjectData.platform"
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
                v-model="editProjectData.service"
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

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Challenge Statement</label>
              <textarea
                v-model="editProjectData.challengeStatement"
                rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What was the main challenge?"
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Solution</label>
              <textarea
                v-model="editProjectData.solution"
                rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="How did you solve it?"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Duration (weeks)</label>
              <input
                type="number"
                v-model="editProjectData.duration"
                min="1"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project duration"
              />
            </div>

            <div class="md:col-span-2">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-gray-700">Features</label>
                <button
                  type="button"
                  @click="addEditFeature"
                  class="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Feature
                </button>
              </div>
              <div class="mt-2 space-y-3">
                <div
                  v-for="(feature, index) in editProjectData.features"
                  :key="`edit-feature-${index}`"
                  class="grid grid-cols-1 md:grid-cols-5 gap-2"
                >
                  <input
                    type="text"
                    v-model="feature.name"
                    class="md:col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Feature name"
                  />
                  <input
                    type="text"
                    v-model="feature.description"
                    class="md:col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    @click="removeEditFeature(index)"
                    class="md:col-span-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div class="md:col-span-2">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-gray-700">Tech Stack</label>
                <button
                  type="button"
                  @click="addEditTechStack"
                  class="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Tech
                </button>
              </div>
              <div class="mt-2 space-y-2">
                <div
                  v-for="(tech, index) in editProjectData.techStack"
                  :key="`edit-tech-${index}`"
                  class="flex gap-2"
                >
                  <input
                    type="text"
                    v-model="editProjectData.techStack[index]"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Vue, Firebase, Tailwind"
                  />
                  <button
                    type="button"
                    @click="removeEditTechStack(index)"
                    class="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="editFormError" class="mt-4 text-red-600 text-sm">
            {{ editFormError }}
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="closeEditProjectModal"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isEditSubmitting"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{
                isEditSubmitting
                  ? (editProjectData.coverPhoto || editProjectData.additionalImages.length
                      ? `Uploading ${Math.max(editUploadProgress, editAdditionalUploadProgress)}%`
                      : 'Saving...')
                  : 'Save Changes'
              }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Inquiry Details Modal -->
    <div
      v-if="showInquiryModal"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <div
        style="background: white; padding: 20px; border-radius: 8px; max-width: 500px; width: 90%"
      >
        <h3>Inquiry Details</h3>

        <div v-if="selectedInquiry">
          <div style="margin-bottom: 15px">
            <p><strong>Name:</strong> {{ selectedInquiry.name }}</p>
          </div>
          <div style="margin-bottom: 15px">
            <p><strong>Company:</strong> {{ selectedInquiry.company || 'Not provided' }}</p>
          </div>
          <div style="margin-bottom: 15px">
            <p><strong>Email:</strong> {{ selectedInquiry.email }}</p>
          </div>
          <div style="margin-bottom: 15px">
            <p><strong>Service:</strong> {{ selectedInquiry.service }}</p>
          </div>
          <div style="margin-bottom: 15px">
            <p><strong>Budget:</strong> {{ selectedInquiry.budget || 'Not specified' }}</p>
          </div>
          <div style="margin-bottom: 15px">
            <p><strong>Timeline:</strong> {{ selectedInquiry.timeline || 'Not specified' }}</p>
          </div>
          <div style="margin-bottom: 15px">
            <p><strong>Project Details:</strong></p>
            <p
              style="
                white-space: pre-wrap;
                background: #f3f4f6;
                padding: 10px;
                border-radius: 4px;
                margin-top: 5px;
              "
            >
              {{ selectedInquiry.projectDetails }}
            </p>
          </div>
          <div style="margin-bottom: 15px">
            <p>
              <strong>Current Status:</strong>
              <span
                style="
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: bold;
                  margin-left: 5px;
                "
                :style="{
                  background:
                    selectedInquiry.status === 'client_secured'
                      ? '#d1fae5'
                      : selectedInquiry.status === 'client_cancelled'
                        ? '#dbeafe'
                        : '#fef3c7',
                  color:
                    selectedInquiry.status === 'client_secured'
                      ? '#065f46'
                      : selectedInquiry.status === 'client_cancelled'
                        ? '#1e40af'
                        : '#92400e',
                }"
              >
                {{
                  selectedInquiry.status === 'client_secured'
                    ? 'Client Secured'
                    : selectedInquiry.status === 'client_cancelled'
                      ? 'Client Cancelled'
                      : 'Not Yet'
                }}
              </span>
            </p>
          </div>
        </div>

        <div style="margin-top: 15px">
          <button
            @click="updateInquiryStatus('done')"
            class="mr-2 px-2 py-1 bg-green-500 text-white border-none rounded cursor-pointer hover:bg-green-600"
          >
            Client Secured
          </button>
          <button
            @click="updateInquiryStatus('contacted')"
            class="mr-2 px-2 py-1 bg-amber-500 text-white border-none rounded cursor-pointer hover:bg-amber-600"
          >
            Contacted
          </button>
          <button
            @click="updateInquiryStatus('forwarded')"
            class="mr-2 px-2 py-1 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-600"
          >
            Client Cancelled
          </button>
          <button
            @click="closeInquiryModal"
            class="px-2 py-1 bg-gray-500 text-white border-none rounded cursor-pointer hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Call Details Modal -->
    <div
      v-if="showCallModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex items-center justify-center"
    >
      <div class="bg-white p-5 rounded-lg max-w-md w-[90%]">
        <h3 class="text-lg font-semibold mb-4">Call Details</h3>

        <div v-if="selectedCall" class="space-y-4">
          <div>
            <p><strong>Name:</strong> {{ selectedCall.name }}</p>
          </div>
          <div>
            <p><strong>Company:</strong> {{ selectedCall.company || 'Not provided' }}</p>
          </div>
          <div>
            <p><strong>Email:</strong> {{ selectedCall.email }}</p>
          </div>
          <div>
            <p><strong>Date:</strong> {{ formatDate(new Date(selectedCall.selectedDate)) }}</p>
          </div>
          <div>
            <p><strong>Time:</strong> {{ selectedCall.selectedTime }}</p>
          </div>
          <div>
            <p><strong>Call Type:</strong> {{ selectedCall.type || 'Consultation Call' }}</p>
          </div>
          <div>
            <p><strong>Status:</strong> {{ selectedCall.status || 'pending' }}</p>
          </div>
          <div v-if="selectedCall.projectDetails">
            <p><strong>Project Details:</strong></p>
            <p class="whitespace-pre-wrap bg-gray-100 p-2.5 rounded mt-1">
              {{ selectedCall.projectDetails }}
            </p>
          </div>
        </div>

        <div class="mt-4">
          <button
            @click="updateCallStatus('contacted')"
            class="mr-2 px-2 py-1 bg-amber-500 text-white border-none rounded cursor-pointer hover:bg-amber-600"
          >
            Contacted
          </button>
          <button
            @click="closeCallModal"
            class="px-2 py-1 bg-gray-500 text-white border-none rounded cursor-pointer hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, getDoc, query, orderBy, doc, updateDoc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

// TypeScript interfaces
interface Project {
  id: string
  name: string
  clientName: string
  status: 'Completed' | 'In Progress' | 'Planning'
  date: string
  description?: string
  imageUrl?: string
  imagePath?: string
  additionalImageUrls?: string[]
  additionalImagePaths?: string[]
  serviceId?: string
}

interface Activity {
  id: number
  title: string
  description: string
  time: string
}

interface Inquiry {
  id: string
  name: string
  email: string
  company?: string
  service: string
  budget?: string
  timeline?: string
  projectDetails: string
  status: 'new' | 'in-progress' | 'client_secured' | 'client_cancelled' | 'contacted'
  createdAt: Date
}

interface Call {
  id: string
  name: string
  email: string
  company?: string
  selectedDate: string
  selectedTime: string
  projectDetails?: string
  type: string
  status: string
  createdAt: Date
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
const InboxIcon = () => '📧'
const PhoneIcon = () => '📞'
const SettingsIcon = () => '⚙️'

const router = useRouter()
const activeSection = ref('dashboard')
const isLoading = ref(true)
const error = ref<string | null>(null)
const showAddProjectModal = ref(false)
const showInquiryModal = ref(false)
const selectedInquiry = ref<Inquiry | null>(null)
const showCallModal = ref(false)
const selectedCall = ref<Call | null>(null)

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'projects', label: 'Projects', icon: ProjectsIcon },
  { id: 'inquiries', label: 'Inquiries', icon: InboxIcon },
  { id: 'calls', label: 'Calls', icon: PhoneIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

// Reactive data from Firestore
const projects = ref<Project[]>([])
const recentActivity = ref<Activity[]>([])
const inquiries = ref<Inquiry[]>([])
const calls = ref<Call[]>([])

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
  additionalImages: [] as File[],
})

const isSubmitting = ref(false)
const formError = ref<string | null>(null)
const addUploadProgress = ref(0)
const addSelectedFileName = ref('')
const addSelectedAdditionalFileNames = ref<string[]>([])
const addAdditionalUploadProgress = ref(0)

// Edit project state
const showEditProjectModal = ref(false)
const editingProjectId = ref<string | null>(null)
const isEditSubmitting = ref(false)
const editFormError = ref<string | null>(null)
const editUploadProgress = ref(0)
const editSelectedFileName = ref('')
const editExistingImageUrl = ref('')
const editExistingImagePath = ref('')
const editExistingAdditionalImageUrls = ref<string[]>([])
const editExistingAdditionalImagePaths = ref<string[]>([])
const editSelectedAdditionalFileNames = ref<string[]>([])
const editAdditionalUploadProgress = ref(0)
const editProjectData = ref({
  title: '',
  shortDescription: '',
  platform: '',
  service: '',
  clientName: '',
  challengeStatement: '',
  solution: '',
  duration: 0,
  features: [{ name: '', description: '' }] as { name: string; description: string }[],
  techStack: [''] as string[],
  coverPhoto: null as File | null,
  additionalImages: [] as File[],
})

async function uploadProjectImages(
  files: File[],
  projectId: string,
  folder: 'cover' | 'gallery',
  onProgress: (progress: number) => void,
) {
  if (!files.length) {
    onProgress(100)
    return { imageUrls: [] as string[], imagePaths: [] as string[] }
  }

  const totalBytes = files.reduce((sum, file) => sum + (file.size || 0), 0)
  let uploadedBytes = 0
  const imageUrls: string[] = []
  const imagePaths: string[] = []

  for (const [index, file] of files.entries()) {
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const imagePath =
      folder === 'cover'
        ? `sampleworks/${projectId}/cover-${Date.now()}.${fileExtension}`
        : `sampleworks/${projectId}/gallery-${Date.now()}-${index}.${fileExtension}`
    const fileRef = storageRef(storage, imagePath)

    await new Promise<void>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(fileRef, file, {
        contentType: file.type || 'image/jpeg',
      })

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const current = uploadedBytes + snapshot.bytesTransferred
          const progress = totalBytes ? Math.round((current / totalBytes) * 100) : 0
          onProgress(progress)
        },
        (uploadError) => reject(uploadError),
        async () => {
          try {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
            imageUrls.push(imageUrl)
            imagePaths.push(imagePath)
            uploadedBytes += file.size || 0
            const progress = totalBytes ? Math.round((uploadedBytes / totalBytes) * 100) : 100
            onProgress(progress)
            resolve()
          } catch (downloadError) {
            reject(downloadError)
          }
        },
      )
    })
  }

  return { imageUrls, imagePaths }
}

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
        clientName: data.clientName || 'Unknown Client',
        status: data.status || 'Planning',
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        imageUrl: data.imageUrl || data.coverPhoto,
        imagePath: data.imagePath || data.coverPhotoPath,
        additionalImageUrls: Array.isArray(data.additionalImageUrls)
          ? data.additionalImageUrls.filter((item: unknown) => typeof item === 'string')
          : [],
        additionalImagePaths: Array.isArray(data.additionalImagePaths)
          ? data.additionalImagePaths.filter((item: unknown) => typeof item === 'string')
          : [],
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

// Fetch inquiries from Firestore
async function fetchInquiries() {
  try {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    const inquiriesData: Inquiry[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      inquiriesData.push({
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        company: data.company || undefined,
        service: data.service || '',
        budget: data.budget || '',
        timeline: data.timeline || '',
        projectDetails: data.projectDetails || '',
        status: data.status || 'new',
        createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
      })
    })

    inquiries.value = inquiriesData
  } catch (err) {
    console.error('Error fetching inquiries:', err)
    throw err
  }
}

// Fetch calls from Firestore
async function fetchCalls() {
  try {
    const q = query(collection(db, 'calls'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    const callsData: Call[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      callsData.push({
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        company: data.company || undefined,
        selectedDate: data.selectedDate || '',
        selectedTime: data.selectedTime || '',
        projectDetails: data.projectDetails || undefined,
        type: data.type || 'consultation_call',
        status: data.status || 'pending',
        createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
      })
    })

    calls.value = callsData
  } catch (err) {
    console.error('Error fetching calls:', err)
    throw err
  }
}

// Utility functions
const formatDate = (date: Date) => {
  return date.toLocaleDateString()
}

// Inquiry modal functions
const openInquiryModal = (inquiry: Inquiry) => {
  selectedInquiry.value = inquiry
  showInquiryModal.value = true
}

const closeInquiryModal = () => {
  showInquiryModal.value = false
  selectedInquiry.value = null
}

const openCallModal = (call: Call) => {
  selectedCall.value = call
  showCallModal.value = true
}

const closeCallModal = () => {
  showCallModal.value = false
  selectedCall.value = null
}

const updateCallStatus = async (status: 'contacted') => {
  if (!selectedCall.value) return

  try {
    const callRef = doc(db, 'calls', selectedCall.value.id)

    await updateDoc(callRef, {
      status: status,
      updatedAt: new Date(),
    })

    // Update local state with the new status
    const callIndex = calls.value.findIndex((c) => c.id === selectedCall.value?.id)
    if (callIndex !== -1 && calls.value[callIndex]) {
      calls.value[callIndex].status = status
    }

    closeCallModal()
  } catch (err) {
    console.error('Error updating call status:', err)
  }
}

const updateInquiryStatus = async (status: 'done' | 'contacted' | 'forwarded') => {
  if (!selectedInquiry.value) return

  try {
    const inquiryRef = doc(db, 'inquiries', selectedInquiry.value.id)

    // Map button actions to appropriate status values
    let newStatus: 'new' | 'in-progress' | 'client_secured' | 'client_cancelled' | 'contacted'
    if (status === 'done') {
      newStatus = 'client_secured'
    } else if (status === 'contacted') {
      newStatus = 'contacted'
    } else if (status === 'forwarded') {
      newStatus = 'client_cancelled'
    } else {
      return // Invalid status, exit early
    }

    await updateDoc(inquiryRef, {
      status: newStatus,
      updatedAt: new Date(),
    })

    // Update local state with the new status
    const inquiryIndex = inquiries.value.findIndex((i) => i.id === selectedInquiry.value?.id)
    if (inquiryIndex !== -1 && inquiries.value[inquiryIndex]) {
      inquiries.value[inquiryIndex].status = newStatus
    }

    closeInquiryModal()
  } catch (err) {
    console.error('Error updating inquiry status:', err)
  }
}

async function loadData() {
  isLoading.value = true
  error.value = null

  try {
    await Promise.all([fetchProjects(), fetchInquiries(), fetchCalls()])
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
  addUploadProgress.value = 0
  addSelectedFileName.value = ''
  addSelectedAdditionalFileNames.value = []
  addAdditionalUploadProgress.value = 0
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
    additionalImages: [],
  }
}

const closeAddProjectModal = () => {
  showAddProjectModal.value = false
  formError.value = null
  addUploadProgress.value = 0
  addSelectedFileName.value = ''
  addSelectedAdditionalFileNames.value = []
  addAdditionalUploadProgress.value = 0
}

const addProject = async () => {
  formError.value = null

  const payload = newProject.value

  if (!payload.title || !payload.clientName) {
    formError.value = 'Please provide project title and client name.'
    return
  }

  isSubmitting.value = true
  addUploadProgress.value = 0
  addAdditionalUploadProgress.value = 0

  try {
    const docRef = doc(collection(db, 'sampleworks'))
    let imageUrl: string | null = null
    let imagePath: string | null = null
    let additionalImageUrls: string[] = []
    let additionalImagePaths: string[] = []

    if (payload.coverPhoto) {
      const uploadResult = await uploadProjectImages([payload.coverPhoto], docRef.id, 'cover', (progress) => {
        addUploadProgress.value = progress
      })
      imageUrl = uploadResult.imageUrls[0] || null
      imagePath = uploadResult.imagePaths[0] || null
    }

    if (payload.additionalImages.length > 0) {
      const uploadResult = await uploadProjectImages(payload.additionalImages, docRef.id, 'gallery', (progress) => {
        addAdditionalUploadProgress.value = progress
      })
      additionalImageUrls = uploadResult.imageUrls
      additionalImagePaths = uploadResult.imagePaths
    }

    await setDoc(docRef, {
      title: payload.title,
      clientName: payload.clientName,
      description: payload.shortDescription || '',
      platform: payload.platform || '',
      serviceId: payload.service || null,
      challengeStatement: payload.challengeStatement || '',
      solution: payload.solution || '',
      durationWeeks: payload.duration || 0,
      features: payload.features || [],
      techStack: payload.techStack || [],
      imageUrl,
      imagePath,
      coverPhoto: imageUrl,
      coverPhotoPath: imagePath,
      additionalImageUrls,
      additionalImagePaths,
      status: 'Planning',
      date: new Date().toISOString().split('T')[0],
      createdAt: serverTimestamp(),
    })

    // Optimistically update local UI
    projects.value.unshift({
      id: docRef.id,
      name: payload.title || '',
      clientName: payload.clientName || '',
      status: 'Planning',
      date: new Date().toISOString().split('T')[0],
      description: payload.shortDescription || '',
      imageUrl: imageUrl || undefined,
      imagePath: imagePath || undefined,
      additionalImageUrls: additionalImageUrls,
      additionalImagePaths: additionalImagePaths,
    } as Project)

    closeAddProjectModal()
  } catch (err) {
    console.error('Error adding project:', err)
    formError.value = err instanceof Error ? err.message : 'Failed to add project. Please try again.'
  } finally {
    isSubmitting.value = false
    addUploadProgress.value = 0
    addAdditionalUploadProgress.value = 0
  }
}

const onCoverPhotoChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files && target.files[0]
  newProject.value.coverPhoto = file || null
  addSelectedFileName.value = file?.name || ''
}

const onAdditionalImagesChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selectedFiles = target.files ? Array.from(target.files) : []
  const merged = [...newProject.value.additionalImages, ...selectedFiles]
  const uniqueFiles = merged.filter(
    (file, index, self) =>
      index ===
      self.findIndex(
        (item) =>
          item.name === file.name &&
          item.size === file.size &&
          item.lastModified === file.lastModified,
      ),
  )

  newProject.value.additionalImages = uniqueFiles
  addSelectedAdditionalFileNames.value = uniqueFiles.map((file) => file.name)
  target.value = ''
}

const removeSelectedAdditionalImage = (index: number) => {
  if (index < 0 || index >= newProject.value.additionalImages.length) return
  newProject.value.additionalImages.splice(index, 1)
  addSelectedAdditionalFileNames.value = newProject.value.additionalImages.map((file) => file.name)
}

const addFeature = () => {
  newProject.value.features.push({ name: '', description: '' })
}

const removeFeature = (index: number) => {
  if (newProject.value.features.length <= 1) return
  newProject.value.features.splice(index, 1)
}

const addTechStack = () => {
  newProject.value.techStack.push('')
}

const removeTechStack = (index: number) => {
  if (newProject.value.techStack.length <= 1) return
  newProject.value.techStack.splice(index, 1)
}

const deleteProject = async (project: Project) => {
  if (!project || !project.id) return

  const ok = confirm(`Delete project "${project.name}"? This cannot be undone.`)
  if (!ok) return

  try {
    // Attempt to delete storage object (ignore errors)
    try {
      const storagePath = project.imagePath || `sampleworks/${project.id}/cover.jpg`
      const sRef = storageRef(storage, storagePath)
      await deleteObject(sRef)

      if (project.additionalImagePaths?.length) {
        await Promise.all(
          project.additionalImagePaths.map(async (additionalPath) => {
            if (!additionalPath) return
            try {
              await deleteObject(storageRef(storage, additionalPath))
            } catch (additionalError) {
              console.warn('Additional image delete ignored error:', additionalError)
            }
          }),
        )
      }
    } catch (e) {
      console.warn('Storage delete ignored error:', e)
    }

    // Delete Firestore document
    await deleteDoc(doc(db, 'sampleworks', project.id))

    // Remove from local state
    projects.value = projects.value.filter((p) => p.id !== project.id)
  } catch (err) {
    console.error('Error deleting project:', err)
    alert('Failed to delete project. Check console for details.')
  }
}

const openEditProjectModal = async (project: Project) => {
  editingProjectId.value = project.id
  editFormError.value = null
  editUploadProgress.value = 0
  editSelectedFileName.value = ''
  editExistingImageUrl.value = project.imageUrl || ''
  editExistingImagePath.value = project.imagePath || ''
  editExistingAdditionalImageUrls.value = project.additionalImageUrls || []
  editExistingAdditionalImagePaths.value = project.additionalImagePaths || []
  editSelectedAdditionalFileNames.value = []
  editAdditionalUploadProgress.value = 0
  editProjectData.value = {
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
    additionalImages: [],
  }
  showEditProjectModal.value = true
  try {
    const docSnap = await getDoc(doc(db, 'sampleworks', project.id))
    if (docSnap.exists()) {
      const data = docSnap.data()
      editProjectData.value = {
        title: data.title || '',
        shortDescription: data.description || '',
        platform: data.platform || '',
        service: data.serviceId || '',
        clientName: data.clientName || '',
        challengeStatement: data.challengeStatement || '',
        solution: data.solution || '',
        duration: data.durationWeeks || 0,
        features: data.features?.length ? data.features : [{ name: '', description: '' }],
        techStack: data.techStack?.length ? data.techStack : [''],
        coverPhoto: null,
        additionalImages: [],
      }
      editExistingImageUrl.value = data.imageUrl || data.coverPhoto || ''
      editExistingImagePath.value = data.imagePath || data.coverPhotoPath || ''
      editExistingAdditionalImageUrls.value = Array.isArray(data.additionalImageUrls)
        ? data.additionalImageUrls.filter((item: unknown) => typeof item === 'string')
        : []
      editExistingAdditionalImagePaths.value = Array.isArray(data.additionalImagePaths)
        ? data.additionalImagePaths.filter((item: unknown) => typeof item === 'string')
        : []
    }
  } catch (err) {
    console.error('Error fetching project for edit:', err)
    editFormError.value = err instanceof Error ? err.message : 'Failed to load project data.'
  }
}

const closeEditProjectModal = () => {
  showEditProjectModal.value = false
  editingProjectId.value = null
  editFormError.value = null
  editUploadProgress.value = 0
  editSelectedFileName.value = ''
  editExistingImageUrl.value = ''
  editExistingImagePath.value = ''
  editExistingAdditionalImageUrls.value = []
  editExistingAdditionalImagePaths.value = []
  editSelectedAdditionalFileNames.value = []
  editAdditionalUploadProgress.value = 0
}

const updateProject = async () => {
  editFormError.value = null
  const payload = editProjectData.value

  if (!payload.title || !payload.clientName) {
    editFormError.value = 'Please provide project title and client name.'
    return
  }

  if (!editingProjectId.value) return
  isEditSubmitting.value = true
  editUploadProgress.value = 0
  editAdditionalUploadProgress.value = 0

  try {
    const docRef = doc(db, 'sampleworks', editingProjectId.value)
    let imageUrl: string | undefined
    let imagePath: string | undefined
    let additionalImageUrls: string[] = []
    let additionalImagePaths: string[] = []

    if (payload.coverPhoto) {
      const uploadResult = await uploadProjectImages([payload.coverPhoto], editingProjectId.value, 'cover', (progress) => {
        editUploadProgress.value = progress
      })
      imageUrl = uploadResult.imageUrls[0]
      imagePath = uploadResult.imagePaths[0]
    }

    if (payload.additionalImages.length > 0) {
      const uploadResult = await uploadProjectImages(payload.additionalImages, editingProjectId.value, 'gallery', (progress) => {
        editAdditionalUploadProgress.value = progress
      })
      additionalImageUrls = uploadResult.imageUrls
      additionalImagePaths = uploadResult.imagePaths
    }

    const updateData: Record<string, unknown> = {
      title: payload.title,
      clientName: payload.clientName,
      description: payload.shortDescription || '',
      platform: payload.platform || '',
      serviceId: payload.service || null,
      challengeStatement: payload.challengeStatement || '',
      solution: payload.solution || '',
      durationWeeks: payload.duration || 0,
      features: payload.features || [],
      techStack: payload.techStack || [],
      updatedAt: serverTimestamp(),
    }

    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl
      updateData.imagePath = imagePath
      updateData.coverPhoto = imageUrl
      updateData.coverPhotoPath = imagePath
    }

    if (additionalImageUrls.length > 0) {
      const mergedUrls = [...editExistingAdditionalImageUrls.value, ...additionalImageUrls]
      const mergedPaths = [...editExistingAdditionalImagePaths.value, ...additionalImagePaths]
      updateData.additionalImageUrls = mergedUrls
      updateData.additionalImagePaths = mergedPaths
    }

    await updateDoc(docRef, updateData)

    if (imagePath && editExistingImagePath.value && editExistingImagePath.value !== imagePath) {
      try {
        await deleteObject(storageRef(storage, editExistingImagePath.value))
      } catch (storageError) {
        console.warn('Previous image delete ignored error:', storageError)
      }
    }

    const idx = projects.value.findIndex((p) => p.id === editingProjectId.value)
    if (idx !== -1) {
      const existing = projects.value[idx]!
      projects.value[idx] = {
        ...existing,
        name: payload.title,
        clientName: payload.clientName,
        description: payload.shortDescription,
        ...(imageUrl !== undefined ? { imageUrl, imagePath } : {}),
        ...(additionalImageUrls.length > 0
          ? {
              additionalImageUrls: [...editExistingAdditionalImageUrls.value, ...additionalImageUrls],
              additionalImagePaths: [...editExistingAdditionalImagePaths.value, ...additionalImagePaths],
            }
          : {}),
      }
    }

    closeEditProjectModal()
  } catch (err) {
    console.error('Error updating project:', err)
    editFormError.value = err instanceof Error ? err.message : 'Failed to update project. Please try again.'
  } finally {
    isEditSubmitting.value = false
    editUploadProgress.value = 0
    editAdditionalUploadProgress.value = 0
  }
}

const onEditCoverPhotoChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files && target.files[0]
  editProjectData.value.coverPhoto = file || null
  editSelectedFileName.value = file?.name || ''
}

const onEditAdditionalImagesChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selectedFiles = target.files ? Array.from(target.files) : []
  const merged = [...editProjectData.value.additionalImages, ...selectedFiles]
  const uniqueFiles = merged.filter(
    (file, index, self) =>
      index ===
      self.findIndex(
        (item) =>
          item.name === file.name &&
          item.size === file.size &&
          item.lastModified === file.lastModified,
      ),
  )

  editProjectData.value.additionalImages = uniqueFiles
  editSelectedAdditionalFileNames.value = uniqueFiles.map((file) => file.name)
  target.value = ''
}

const removeEditSelectedAdditionalImage = (index: number) => {
  if (index < 0 || index >= editProjectData.value.additionalImages.length) return
  editProjectData.value.additionalImages.splice(index, 1)
  editSelectedAdditionalFileNames.value = editProjectData.value.additionalImages.map((file) => file.name)
}

const addEditFeature = () => {
  editProjectData.value.features.push({ name: '', description: '' })
}

const removeEditFeature = (index: number) => {
  if (editProjectData.value.features.length <= 1) return
  editProjectData.value.features.splice(index, 1)
}

const addEditTechStack = () => {
  editProjectData.value.techStack.push('')
}

const removeEditTechStack = (index: number) => {
  if (editProjectData.value.techStack.length <= 1) return
  editProjectData.value.techStack.splice(index, 1)
}

const saveSettings = () => {
  // TODO: Implement settings save functionality
  console.log('Settings saved:', settings)
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
