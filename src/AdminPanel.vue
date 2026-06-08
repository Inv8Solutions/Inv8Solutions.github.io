<template>
  <div class="flex h-screen overflow-hidden font-sans" style="background:#f0f2f8">

    <!-- ── Sidebar ─────────────────────────────────────────────── -->
    <aside class="flex w-64 shrink-0 flex-col bg-white border-r border-gray-100 shadow-sm">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-6 py-6">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-200">
          <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 text-white" stroke="currentColor" stroke-width="2.5">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-black text-gray-900 tracking-tight leading-none">inv8 Studio</p>
          <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Admin Panel</p>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto px-4 pb-4 space-y-0.5">
        <p class="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Main</p>
        <template v-for="item in navItems" :key="item.id">
          <p v-if="item.id === 'crm'" class="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">CRM</p>
          <p v-if="item.id === 'settings'" class="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">System</p>
          <button
            @click="activeSection = item.id"
            class="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150"
            :class="activeSection === item.id
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'"
          >
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors"
              :class="activeSection === item.id ? 'bg-white/20' : 'bg-gray-100'">
              <i :class="item.icon" class="text-xs" aria-hidden="true"
                :style="activeSection === item.id ? 'color:white' : ''"></i>
            </span>
            {{ item.label }}
            <span
              v-if="item.badge && item.badge > 0"
              class="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold"
              :class="activeSection === item.id ? 'bg-white text-blue-600' : 'bg-red-500 text-white'"
            >{{ item.badge }}</span>
          </button>
        </template>
      </nav>

      <!-- Logout -->
      <div class="border-t border-gray-100 p-4">
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </span>
          Log Out
        </button>
      </div>
    </aside>

    <!-- ── Main ───────────────────────────────────────────────── -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top bar -->
      <header class="flex h-16 shrink-0 items-center justify-between bg-white border-b border-gray-100 px-8 shadow-sm">
        <div>
          <h1 class="text-base font-black text-gray-900">{{ currentSectionLabel }}</h1>
          <p class="text-xs text-gray-400 mt-0.5">{{ today }}</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Notification bell -->
          <button class="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition">
            <i class="fa-solid fa-bell text-sm"></i>
            <span v-if="newInquiriesCount > 0" class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">{{ newInquiriesCount }}</span>
          </button>
          <!-- Avatar -->
          <div class="flex items-center gap-2.5 rounded-xl bg-gray-50 px-3 py-1.5">
            <div class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-[11px] font-black text-white shadow-sm">A</div>
            <div class="text-right">
              <p class="text-xs font-bold text-gray-800 leading-none">Admin</p>
              <p class="text-[10px] text-gray-400 leading-none mt-0.5">inv8 Studio</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-8">

        <!-- Loading -->
        <div v-if="isLoading" class="flex items-center justify-center h-64">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ error }}</div>

        <!-- ── DASHBOARD ──────────────────────────────────────── -->
        <div v-else-if="activeSection === 'dashboard'" class="space-y-6">
          <!-- Stat cards -->
          <div class="grid grid-cols-2 gap-5 lg:grid-cols-4">
            <div v-for="stat in dashboardStats" :key="stat.label"
              class="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-widest text-gray-400">{{ stat.label }}</p>
                  <p class="mt-3 text-4xl font-black text-gray-900">{{ stat.value }}</p>
                  <p class="mt-1.5 text-xs font-medium text-gray-400">{{ stat.sub }}</p>
                </div>
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-sm" :class="stat.iconBg">
                  <i :class="[stat.icon, stat.iconColor, 'text-base']" aria-hidden="true"></i>
                </div>
              </div>
              <div class="absolute bottom-0 left-0 h-1 w-full rounded-b-2xl" :class="stat.accentBar"></div>
            </div>
          </div>

          <!-- CRM snapshot -->
          <div class="rounded-2xl bg-white shadow-sm border border-gray-100">
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div class="flex items-center gap-2.5">
                <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-200">
                  <i class="fa-solid fa-diagram-project text-[11px] text-white"></i>
                </span>
                <div>
                  <p class="text-sm font-black text-gray-900 leading-none">CRM Pipeline</p>
                  <p class="text-[10px] text-gray-400 mt-0.5">Live sales overview</p>
                </div>
              </div>
              <button @click="activeSection = 'crm'" class="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-100 transition">Open CRM →</button>
            </div>
            <div class="grid grid-cols-3 divide-x divide-gray-100 lg:grid-cols-6">
              <div v-for="(m, i) in [
                { label:'Active Deals', val: crmStats.activeDeals,  color:'text-blue-600' },
                { label:'Pipeline',     val: '₱' + (crmStats.pipeline >= 1000 ? (crmStats.pipeline/1000).toFixed(0)+'k' : crmStats.pipeline), color:'text-gray-900' },
                { label:'Closed Won',   val: '₱' + (crmStats.closedWon >= 1000 ? (crmStats.closedWon/1000).toFixed(0)+'k' : crmStats.closedWon), color:'text-emerald-600' },
                { label:'Win Rate',     val: crmStats.winRate + '%', color:'text-violet-600' },
                { label:'Open Tasks',   val: crmStats.openTasks,    color:'text-amber-600' },
                { label:'Overdue',      val: crmStats.overdueTasks, color: crmStats.overdueTasks > 0 ? 'text-red-500' : 'text-gray-300' },
              ]" :key="i" class="px-5 py-4">
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">{{ m.label }}</p>
                <p class="mt-2 text-2xl font-black" :class="m.color">{{ m.val }}</p>
              </div>
            </div>
          </div>

          <!-- Bottom grid: recent inquiries + upcoming calls -->
          <div class="grid gap-5 lg:grid-cols-2">
            <!-- Recent Inquiries -->
            <div class="rounded-2xl bg-white shadow-sm border border-gray-100">
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50">
                    <i class="fa-solid fa-envelope text-xs text-amber-500"></i>
                  </span>
                  <p class="text-sm font-black text-gray-900">Recent Inquiries</p>
                </div>
                <button @click="activeSection = 'inquiries'" class="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 transition">View all →</button>
              </div>
              <ul class="divide-y divide-gray-50">
                <li v-for="inq in inquiries.slice(0, 5)" :key="inq.id" class="flex items-center justify-between gap-3 px-6 py-3.5 hover:bg-gray-50/60 transition">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-[11px] font-black text-white">
                      {{ inq.name.charAt(0).toUpperCase() }}
                    </div>
                    <div class="min-w-0">
                      <p class="truncate text-sm font-semibold text-gray-900">{{ inq.name }}</p>
                      <p class="truncate text-xs text-gray-400">{{ inq.service }}</p>
                    </div>
                  </div>
                  <span class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    :class="inq.status === 'client_secured' ? 'bg-emerald-50 text-emerald-600'
                      : inq.status === 'client_cancelled' ? 'bg-gray-100 text-gray-400'
                      : inq.status === 'contacted' ? 'bg-amber-50 text-amber-600'
                      : 'bg-blue-50 text-blue-600'">
                    {{ inq.status === 'client_secured' ? 'Secured' : inq.status === 'client_cancelled' ? 'Cancelled' : inq.status === 'contacted' ? 'Contacted' : 'New' }}
                  </span>
                </li>
                <li v-if="!inquiries.length" class="px-6 py-10 text-center text-sm text-gray-400">No inquiries yet</li>
              </ul>
            </div>

            <!-- Upcoming Calls -->
            <div class="rounded-2xl bg-white shadow-sm border border-gray-100">
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                    <i class="fa-solid fa-phone text-xs text-emerald-500"></i>
                  </span>
                  <p class="text-sm font-black text-gray-900">Scheduled Calls</p>
                </div>
                <button @click="activeSection = 'calls'" class="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 transition">View all →</button>
              </div>
              <ul class="divide-y divide-gray-50">
                <li v-for="call in calls.slice(0, 5)" :key="call.id" class="flex items-center justify-between gap-3 px-6 py-3.5 hover:bg-gray-50/60 transition">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[11px] font-black text-white">
                      {{ (call.name || '?').charAt(0).toUpperCase() }}
                    </div>
                    <div class="min-w-0">
                      <p class="truncate text-sm font-semibold text-gray-900">{{ call.name }}</p>
                      <p class="text-xs text-gray-400">{{ call.selectedDate }} · {{ call.selectedTime }}</p>
                    </div>
                  </div>
                  <span class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    :class="call.status === 'contacted' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'">
                    {{ call.status === 'contacted' ? 'Contacted' : 'Pending' }}
                  </span>
                </li>
                <li v-if="!calls.length" class="px-6 py-10 text-center text-sm text-gray-400">No calls scheduled</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ── WORKS ──────────────────────────────────────────── -->
        <div v-else-if="activeSection === 'projects'" class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">{{ projects.length }} project{{ projects.length !== 1 ? 's' : '' }}</p>
            <button @click="openAddProjectModal" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
              Add Project
            </button>
          </div>

          <div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table class="min-w-full divide-y divide-gray-100">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Project</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Client</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Service</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Cover</th>
                  <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50/50">
                  <td class="px-5 py-3">
                    <p class="text-sm font-semibold text-gray-900">{{ project.name }}</p>
                    <p class="text-xs text-gray-400">{{ project.date }}</p>
                  </td>
                  <td class="px-5 py-3 text-sm text-gray-600">{{ project.clientName }}</td>
                  <td class="px-5 py-3">
                    <span v-if="project.serviceId" class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">{{ project.serviceId }}</span>
                    <span v-else class="text-xs text-gray-400">—</span>
                  </td>
                  <td class="px-5 py-3">
                    <img v-if="project.imageUrl" :src="project.imageUrl" class="h-10 w-16 rounded-lg object-cover border border-gray-200" />
                    <span v-else class="text-xs text-gray-400">No image</span>
                  </td>
                  <td class="px-5 py-3 text-right">
                    <button @click="openEditProjectModal(project)" class="mr-3 text-xs font-semibold text-blue-600 hover:text-blue-800">Edit</button>
                    <button @click="deleteProject(project)" class="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
                <tr v-if="!projects.length">
                  <td colspan="5" class="px-5 py-12 text-center text-sm text-gray-400">No projects yet. Add your first one.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── BLOG POSTS ─────────────────────────────────────── -->
        <div v-else-if="activeSection === 'blog'" class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">{{ blogPosts.length }} post{{ blogPosts.length !== 1 ? 's' : '' }}</p>
            <button @click="openAddBlogModal" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
              New Post
            </button>
          </div>

          <div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table class="min-w-full divide-y divide-gray-100">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Title</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Category</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Author</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Date</th>
                  <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="post in blogPosts" :key="post.id" class="hover:bg-gray-50/50">
                  <td class="px-5 py-3">
                    <p class="text-sm font-semibold text-gray-900">{{ post.title }}</p>
                    <p class="text-xs text-gray-400">/blog/{{ post.slug }}</p>
                  </td>
                  <td class="px-5 py-3">
                    <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" :class="post.categoryColor || 'bg-gray-100 text-gray-600'">{{ post.category }}</span>
                  </td>
                  <td class="px-5 py-3 text-sm text-gray-600">{{ post.author }}</td>
                  <td class="px-5 py-3 text-xs text-gray-400">{{ post.date }}</td>
                  <td class="px-5 py-3 text-right">
                    <button @click="openEditBlog(post)" class="mr-3 text-xs font-semibold text-blue-600 hover:text-blue-800">Edit</button>
                    <button @click="deleteBlogPost(post)" class="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
                <tr v-if="!blogPosts.length">
                  <td colspan="5" class="px-5 py-12 text-center text-sm text-gray-400">No blog posts yet. Write your first one.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── INQUIRIES ──────────────────────────────────────── -->
        <div v-else-if="activeSection === 'inquiries'" class="space-y-4">
          <p class="text-sm text-gray-500">{{ inquiries.length }} total · {{ newInquiriesCount }} new</p>

          <div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-100">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</th>
                    <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Service</th>
                    <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Budget</th>
                    <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                    <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Date</th>
                    <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="inq in inquiries" :key="inq.id" class="hover:bg-gray-50/50">
                    <td class="px-5 py-3">
                      <p class="text-sm font-semibold text-gray-900">{{ inq.name }}</p>
                      <p class="text-xs text-gray-400">{{ inq.email }}</p>
                      <p v-if="inq.company" class="text-xs text-gray-400">{{ inq.company }}</p>
                    </td>
                    <td class="px-5 py-3 text-sm text-gray-600">{{ inq.service }}</td>
                    <td class="px-5 py-3 text-xs text-gray-500">{{ inq.budget || '—' }}</td>
                    <td class="px-5 py-3">
                      <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                        :class="inq.status === 'client_secured' ? 'bg-green-100 text-green-700'
                          : inq.status === 'client_cancelled' ? 'bg-gray-100 text-gray-500'
                          : inq.status === 'contacted' ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'">
                        {{ inq.status === 'client_secured' ? 'Secured' : inq.status === 'client_cancelled' ? 'Cancelled' : inq.status === 'contacted' ? 'Contacted' : 'New' }}
                      </span>
                    </td>
                    <td class="px-5 py-3 text-xs text-gray-400">{{ formatDate(inq.createdAt) }}</td>
                    <td class="px-5 py-3 text-right">
                      <button @click="openInquiryModal(inq)" class="text-xs font-semibold text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                  <tr v-if="!inquiries.length">
                    <td colspan="6" class="px-5 py-12 text-center text-sm text-gray-400">No inquiries yet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ── CALLS ──────────────────────────────────────────── -->
        <div v-else-if="activeSection === 'calls'" class="space-y-4">
          <p class="text-sm text-gray-500">{{ calls.length }} scheduled</p>

          <div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table class="min-w-full divide-y divide-gray-100">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Scheduled</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Notes</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                  <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="call in calls" :key="call.id" class="hover:bg-gray-50/50">
                  <td class="px-5 py-3">
                    <p class="text-sm font-semibold text-gray-900">{{ call.name }}</p>
                    <p class="text-xs text-gray-400">{{ call.email }}</p>
                  </td>
                  <td class="px-5 py-3">
                    <p class="text-sm text-gray-700">{{ call.selectedDate }}</p>
                    <p class="text-xs text-gray-400">{{ call.selectedTime }}</p>
                  </td>
                  <td class="px-5 py-3 max-w-xs">
                    <p class="truncate text-xs text-gray-500">{{ call.projectDetails || '—' }}</p>
                  </td>
                  <td class="px-5 py-3">
                    <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                      :class="call.status === 'contacted' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'">
                      {{ call.status === 'contacted' ? 'Contacted' : 'Pending' }}
                    </span>
                  </td>
                  <td class="px-5 py-3 text-right">
                    <button @click="openCallModal(call)" class="text-xs font-semibold text-blue-600 hover:text-blue-800">View</button>
                  </td>
                </tr>
                <tr v-if="!calls.length">
                  <td colspan="5" class="px-5 py-12 text-center text-sm text-gray-400">No calls scheduled.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── GALLERY ────────────────────────────────────────── -->
        <div v-else-if="activeSection === 'gallery'" class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">{{ galleryPhotos.length }} photos</p>
            <label class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
              Upload Photos
              <input type="file" multiple accept="image/*" class="hidden" @change="handleGalleryUpload" :disabled="galleryUploading" />
            </label>
          </div>

          <div v-if="galleryError" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2">
            <svg class="h-4 w-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>{{ galleryError }}</span>
          </div>

          <div v-if="galleryUploading" class="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div class="flex items-center justify-between text-sm text-blue-700">
              <span>Uploading…</span><span>{{ galleryUploadProgress }}%</span>
            </div>
            <div class="mt-2 h-1.5 rounded-full bg-blue-100">
              <div class="h-1.5 rounded-full bg-blue-600 transition-all" :style="`width: ${galleryUploadProgress}%`"></div>
            </div>
          </div>

          <div v-if="galleryPhotos.length" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div v-for="photo in galleryPhotos" :key="photo.id" class="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <img :src="photo.url" :alt="photo.caption || ''" class="h-full w-full object-cover" loading="lazy" />
              <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                <button @click="deleteGalleryPhoto(photo)" class="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700">Delete</button>
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 px-2.5 py-2">
                <input v-model="photo.caption" @blur="updateGalleryCaption(photo)" placeholder="Add caption…" class="w-full bg-transparent text-xs text-white placeholder-white/60 focus:outline-none" />
              </div>
            </div>
          </div>

          <div v-else-if="!galleryUploading" class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
            <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <p class="mt-3 text-sm font-medium">No photos yet</p>
            <p class="mt-1 text-xs">Upload photos to display in the About page gallery</p>
          </div>
        </div>

        <!-- ── BID APPLICATIONS ──────────────────────────────── -->
        <div v-else-if="activeSection === 'bid'" class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">{{ bidApplications.length }} application{{ bidApplications.length !== 1 ? 's' : '' }}</p>
            <button @click="loadBidApplications" class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition">
              <i class="fa-solid fa-rotate-right text-[10px]"></i> Refresh
            </button>
          </div>

          <div v-if="bidApplications.length" class="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table class="min-w-full divide-y divide-gray-100 text-sm">
              <thead class="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <tr>
                  <th class="px-5 py-3 text-left">Name</th>
                  <th class="px-5 py-3 text-left">Business</th>
                  <th class="px-5 py-3 text-left">Type</th>
                  <th class="px-5 py-3 text-left">Team Size</th>
                  <th class="px-5 py-3 text-left">Decision Maker</th>
                  <th class="px-5 py-3 text-left">Contact</th>
                  <th class="px-5 py-3 text-left">Submitted</th>
                  <th class="px-5 py-3 text-left">Details</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="app in bidApplications"
                  :key="app.id"
                  class="hover:bg-gray-50/50 transition cursor-pointer"
                  @click="openBidModal(app)"
                >
                  <td class="px-5 py-3 font-semibold text-gray-800">{{ app.name }}</td>
                  <td class="px-5 py-3 text-gray-600">{{ app.businessName }}</td>
                  <td class="px-5 py-3 text-gray-500">{{ app.businessType }}</td>
                  <td class="px-5 py-3 text-gray-500">{{ app.teamSize }}</td>
                  <td class="px-5 py-3">
                    <span
                      class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      :class="app.isDecisionMaker === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                    >
                      <i :class="app.isDecisionMaker === 'yes' ? 'fa-solid fa-check' : 'fa-solid fa-xmark'" class="text-[10px]"></i>
                      {{ app.isDecisionMaker === 'yes' ? 'Yes' : 'No' }}
                    </span>
                  </td>
                  <td class="px-5 py-3 text-blue-600">{{ app.contact }}</td>
                  <td class="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">{{ app.submittedAtFormatted }}</td>
                  <td class="px-5 py-3">
                    <button class="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-100 transition">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-gray-400">
            <i class="fa-solid fa-inbox text-3xl"></i>
            <p class="mt-3 text-sm font-medium">No applications yet</p>
            <p class="mt-1 text-xs">Submissions from the BID page will appear here</p>
          </div>
        </div>

        <!-- ── CRM ──────────────────────────────────────────────── -->
        <CRMPanel
          v-else-if="activeSection === 'crm'"
          ref="crmPanel"
          :pending-inquiries="newInquiries"
          :pending-calls="newCalls"
        />

        <!-- ── SETTINGS ───────────────────────────────────────── -->
        <div v-else-if="activeSection === 'settings'" class="max-w-lg space-y-5">
          <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h2 class="text-sm font-bold text-gray-900">General</h2>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Admin Email</label>
              <input type="email" v-model="settings.adminEmail" class="input-field" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Company Name</label>
              <input type="text" v-model="settings.companyName" class="input-field" />
            </div>
            <button @click="saveSettings" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">Save Settings</button>
          </div>

          <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
            <h2 class="text-sm font-bold text-gray-900">Login Credentials</h2>
            <p class="text-xs text-gray-400">Credentials are currently set in code. Update them in <code class="rounded bg-gray-100 px-1 py-0.5 text-gray-600">AdminLogin.vue</code>.</p>
          </div>
        </div>

      </main>
    </div>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- MODALS                                                   -->
    <!-- ═══════════════════════════════════════════════════════ -->

    <!-- Inquiry Detail Modal -->
    <Teleport to="body">
      <div v-if="showInquiryModal" class="modal-backdrop" @click.self="closeInquiryModal">
        <div class="modal-box max-w-lg">
          <div class="modal-header">
            <h3 class="modal-title">Inquiry Details</h3>
            <button @click="closeInquiryModal" class="modal-close-btn">✕</button>
          </div>
          <div v-if="selectedInquiry" class="space-y-3 text-sm">
            <div class="grid grid-cols-2 gap-3">
              <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">{{ selectedInquiry.name }}</span></div>
              <div class="detail-row"><span class="detail-label">Company</span><span class="detail-value">{{ selectedInquiry.company || '—' }}</span></div>
              <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value break-all">{{ selectedInquiry.email }}</span></div>
              <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">{{ selectedInquiry.service }}</span></div>
              <div class="detail-row"><span class="detail-label">Budget</span><span class="detail-value">{{ selectedInquiry.budget || '—' }}</span></div>
              <div class="detail-row"><span class="detail-label">Timeline</span><span class="detail-value">{{ selectedInquiry.timeline || '—' }}</span></div>
            </div>
            <div class="detail-row">
              <span class="detail-label">Project Details</span>
              <p class="mt-1 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs text-gray-700 border border-gray-200">{{ selectedInquiry.projectDetails || '—' }}</p>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status</span>
              <span class="mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase"
                :class="selectedInquiry.status === 'client_secured' ? 'bg-green-100 text-green-700'
                  : selectedInquiry.status === 'client_cancelled' ? 'bg-gray-100 text-gray-600'
                  : selectedInquiry.status === 'contacted' ? 'bg-amber-100 text-amber-700'
                  : 'bg-blue-100 text-blue-700'">
                {{ selectedInquiry.status === 'client_secured' ? 'Client Secured' : selectedInquiry.status === 'client_cancelled' ? 'Cancelled' : selectedInquiry.status === 'contacted' ? 'Contacted' : 'New' }}
              </span>
            </div>
          </div>
          <div class="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
            <button @click="updateInquiryStatus('done')" class="btn-sm bg-green-600 text-white hover:bg-green-700">✓ Client Secured</button>
            <button @click="updateInquiryStatus('contacted')" class="btn-sm bg-amber-500 text-white hover:bg-amber-600">Contacted</button>
            <button @click="updateInquiryStatus('forwarded')" class="btn-sm bg-gray-500 text-white hover:bg-gray-600">Cancelled</button>
            <button @click="closeInquiryModal" class="btn-sm ml-auto border border-gray-300 text-gray-600 hover:bg-gray-50">Close</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Call Detail Modal -->
    <Teleport to="body">
      <div v-if="showCallModal" class="modal-backdrop" @click.self="closeCallModal">
        <div class="modal-box max-w-lg">
          <div class="modal-header">
            <h3 class="modal-title">Call Details</h3>
            <button @click="closeCallModal" class="modal-close-btn">✕</button>
          </div>
          <div v-if="selectedCall" class="space-y-3 text-sm">
            <div class="grid grid-cols-2 gap-3">
              <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">{{ selectedCall.name }}</span></div>
              <div class="detail-row"><span class="detail-label">Company</span><span class="detail-value">{{ selectedCall.company || '—' }}</span></div>
              <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value break-all">{{ selectedCall.email }}</span></div>
              <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">{{ selectedCall.selectedDate }}</span></div>
              <div class="detail-row"><span class="detail-label">Time</span><span class="detail-value">{{ selectedCall.selectedTime }}</span></div>
              <div class="detail-row"><span class="detail-label">Status</span>
                <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                  :class="selectedCall.status === 'contacted' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'">
                  {{ selectedCall.status === 'contacted' ? 'Contacted' : 'Pending' }}
                </span>
              </div>
            </div>
            <div v-if="selectedCall.projectDetails" class="detail-row">
              <span class="detail-label">Notes</span>
              <p class="mt-1 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs text-gray-700 border border-gray-200">{{ selectedCall.projectDetails }}</p>
            </div>
          </div>
          <div class="mt-5 flex gap-2 border-t border-gray-100 pt-4">
            <button @click="updateCallStatus('contacted')" class="btn-sm bg-amber-500 text-white hover:bg-amber-600">Mark Contacted</button>
            <button @click="closeCallModal" class="btn-sm ml-auto border border-gray-300 text-gray-600 hover:bg-gray-50">Close</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- BID Application Detail Modal -->
    <Teleport to="body">
      <div v-if="showBidModal" class="modal-backdrop" @click.self="closeBidModal">
        <div class="modal-box max-w-lg">
          <div class="modal-header">
            <h3 class="modal-title">BID Application</h3>
            <button @click="closeBidModal" class="modal-close-btn">✕</button>
          </div>
          <div v-if="selectedBid" class="space-y-3 text-sm">
            <div class="grid grid-cols-2 gap-3">
              <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">{{ selectedBid.name }}</span></div>
              <div class="detail-row"><span class="detail-label">Business</span><span class="detail-value">{{ selectedBid.businessName }}</span></div>
              <div class="detail-row"><span class="detail-label">Business Type</span><span class="detail-value">{{ selectedBid.businessType }}</span></div>
              <div class="detail-row"><span class="detail-label">Team Size</span><span class="detail-value">{{ selectedBid.teamSize }}</span></div>
              <div class="detail-row"><span class="detail-label">Decision Maker</span>
                <span class="mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold"
                  :class="selectedBid.isDecisionMaker === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'">
                  {{ selectedBid.isDecisionMaker === 'yes' ? 'Yes' : 'No' }}
                </span>
              </div>
              <div class="detail-row"><span class="detail-label">Contact</span><span class="detail-value break-all text-blue-600">{{ selectedBid.contact }}</span></div>
            </div>
            <div class="detail-row">
              <span class="detail-label">What they wish ran smoother</span>
              <p class="mt-1 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs text-gray-700 border border-gray-200">{{ selectedBid.painPoint }}</p>
            </div>
            <p class="text-xs text-gray-400">Submitted {{ selectedBid.submittedAtFormatted }}</p>
          </div>
          <div class="mt-5 flex gap-2 border-t border-gray-100 pt-4">
            <button @click="closeBidModal" class="btn-sm ml-auto border border-gray-300 text-gray-600 hover:bg-gray-50">Close</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Blog Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showAddBlogModal || showEditBlogModal" class="modal-backdrop" @click.self="closeBlogModal">
        <div class="modal-box max-w-2xl">
          <div class="modal-header">
            <h3 class="modal-title">{{ showEditBlogModal ? 'Edit Post' : 'New Blog Post' }}</h3>
            <button @click="closeBlogModal" class="modal-close-btn">✕</button>
          </div>
          <form @submit.prevent="showEditBlogModal ? updateBlogPost() : addBlogPost()" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="form-label">Title *</label>
                <input v-model="blogForm.title" type="text" required class="input-field" placeholder="Post title" />
              </div>
              <div>
                <label class="form-label">Slug *</label>
                <input v-model="blogForm.slug" type="text" required class="input-field font-mono text-xs" placeholder="url-friendly-slug" />
              </div>
              <div>
                <label class="form-label">Category</label>
                <select v-model="blogForm.category" class="input-field">
                  <option v-for="cat in blogCategories" :key="cat.value" :value="cat.value">{{ cat.value }}</option>
                </select>
              </div>
              <div class="col-span-2">
                <label class="form-label">Excerpt</label>
                <textarea v-model="blogForm.excerpt" rows="2" class="input-field resize-none" placeholder="Short summary shown in blog listing"></textarea>
              </div>
              <div>
                <label class="form-label">Cover Image</label>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    class="input-field"
                    :value="blogCoverDisplayName"
                    placeholder="Choose a cover image..."
                    readonly
                  />
                  <button
                    type="button"
                    class="btn-sm border border-gray-300 text-gray-600 hover:bg-gray-50"
                    @click="triggerBlogCoverSelect"
                  >
                    Browse
                  </button>
                </div>
                <input
                  ref="blogCoverInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onBlogCoverChange"
                />
                <div v-if="blogCoverDisplayUrl" class="mt-2 overflow-hidden rounded-lg border border-gray-200">
                  <img :src="blogCoverDisplayUrl" alt="Blog cover preview" class="h-28 w-full object-cover" />
                </div>
                <button
                  v-if="blogCoverDisplayUrl"
                  type="button"
                  class="btn-sm mt-2 border border-gray-300 text-gray-600 hover:bg-gray-50"
                  @click="clearBlogCover"
                >
                  Remove cover
                </button>
              </div>
              <div>
                <label class="form-label">Read Time (minutes)</label>
                <input v-model="blogForm.readTime" type="number" min="1" class="input-field" placeholder="5" />
              </div>
              <div>
                <label class="form-label">Author</label>
                <input v-model="blogForm.author" type="text" class="input-field" />
              </div>
              <div>
                <label class="form-label">Author Role (inv8 Studio)</label>
                <select v-model="blogForm.authorRole" class="input-field">
                  <option value="" disabled>Select role</option>
                  <option v-for="role in authorRoles" :key="role" :value="role">{{ role }}</option>
                </select>
              </div>
              <div>
                <label class="form-label">Date</label>
                <input v-model="blogForm.date" type="date" class="input-field" />
              </div>
              <div class="col-span-2">
                <label class="form-label">Content</label>
                <div
                  ref="blogContentEl"
                  class="html-editor"
                  contenteditable="true"
                  data-placeholder="Paste or type HTML here..."
                  @input="onBlogContentInput"
                ></div>
                <p class="mt-2 text-[11px] text-gray-400">
                  This editor accepts raw HTML. Pasted HTML will render with formatting.
                </p>
              </div>
            </div>
            <p v-if="blogFormError" class="text-xs text-red-600">{{ blogFormError }}</p>
            <div class="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button type="button" @click="closeBlogModal" class="btn-sm border border-gray-300 text-gray-600 hover:bg-gray-50">Cancel</button>
              <button type="submit" :disabled="isBlogSubmitting" class="btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                {{ isBlogSubmitting ? 'Saving…' : (showEditBlogModal ? 'Save Changes' : 'Publish Post') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Add Project Modal -->
    <Teleport to="body">
      <div v-if="showAddProjectModal" class="modal-backdrop" @click.self="closeAddProjectModal">
        <div class="modal-box max-w-3xl">
          <div class="modal-header">
            <h3 class="modal-title">Add New Project</h3>
            <button @click="closeAddProjectModal" class="modal-close-btn">✕</button>
          </div>
          <form @submit.prevent="addProject" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Project Title *</label>
                <input type="text" v-model="newProject.title" required class="input-field" placeholder="Project title" />
              </div>
              <div>
                <label class="form-label">Client Name *</label>
                <input type="text" v-model="newProject.clientName" required class="input-field" placeholder="Client name" />
              </div>
              <div class="col-span-2">
                <label class="form-label">Short Description</label>
                <input type="text" v-model="newProject.shortDescription" class="input-field" placeholder="Brief description shown on works cards" />
              </div>
              <div>
                <label class="form-label">Category</label>
                <select v-model="newProject.service" class="input-field" @change="newProject.platform = ''">
                  <option value="">Select Category</option>
                  <option value="Founders & Startups">Founders &amp; Startups</option>
                  <option value="Organizations & LGUs">Organizations &amp; LGUs</option>
                  <option value="MSMEs & Social Enterprises">MSMEs &amp; Social Enterprises</option>
                </select>
              </div>
              <div>
                <label class="form-label">Specific Service</label>
                <select v-model="newProject.platform" class="input-field" :disabled="!newProject.service">
                  <option value="">Select Service</option>
                  <template v-if="newProject.service === 'Founders & Startups'">
                    <option>MVP Development</option>
                    <option>Product Design (UI/UX)</option>
                    <option>Web and Mobile App Design</option>
                    <option>Pitch Deck Design</option>
                    <option>Landing Page</option>
                  </template>
                  <template v-else-if="newProject.service === 'Organizations & LGUs'">
                    <option>Incubation Program Design</option>
                    <option>Innovation Workshops and Facilitation</option>
                    <option>Startup Competition Design</option>
                    <option>Capacity Building</option>
                    <option>Program Documentation and Reporting</option>
                  </template>
                  <template v-else-if="newProject.service === 'MSMEs & Social Enterprises'">
                    <option>Business Innovation Discovery</option>
                    <option>Website Redesign</option>
                    <option>Digital Presence Setup</option>
                    <option>Business Model Design</option>
                    <option>Pitch and Proposal Design</option>
                  </template>
                </select>
              </div>
              <div>
                <label class="form-label">Cover Photo</label>
                <input id="add-cover" type="file" @change="onCoverPhotoChange" accept="image/*" class="sr-only" />
                <label for="add-cover" class="file-btn">{{ addSelectedFileName || 'Choose file' }}</label>
                <div v-if="isSubmitting && newProject.coverPhoto" class="mt-2 progress-bar-wrap">
                  <div class="progress-bar" :style="`width:${addUploadProgress}%`"></div>
                </div>
              </div>
              <div>
                <label class="form-label">Additional Photos</label>
                <input id="add-extra" type="file" @change="onAdditionalImagesChange" accept="image/*" multiple class="sr-only" />
                <label for="add-extra" class="file-btn">Add more images</label>
                <p v-if="addSelectedAdditionalFileNames.length" class="mt-1 text-xs text-gray-500">{{ addSelectedAdditionalFileNames.length }} file(s) selected</p>
              </div>
              <div class="col-span-2">
                <label class="form-label">Challenge Statement</label>
                <textarea v-model="newProject.challengeStatement" rows="2" class="input-field resize-none" placeholder="What was the main challenge?"></textarea>
              </div>
              <div class="col-span-2">
                <label class="form-label">Solution</label>
                <textarea v-model="newProject.solution" rows="2" class="input-field resize-none" placeholder="How was it solved?"></textarea>
              </div>
              <div>
                <label class="form-label">Duration (weeks)</label>
                <input type="number" v-model="newProject.duration" min="1" class="input-field" />
              </div>
              <div class="col-span-2">
                <div class="flex items-center justify-between mb-2">
                  <label class="form-label mb-0">Features</label>
                  <button type="button" @click="addFeature" class="text-xs text-blue-600 hover:text-blue-700 font-semibold">+ Add</button>
                </div>
                <div class="space-y-2">
                  <div v-for="(feat, i) in newProject.features" :key="i" class="flex gap-2">
                    <input type="text" v-model="feat.name" class="input-field" placeholder="Feature name" />
                    <input type="text" v-model="feat.description" class="input-field" placeholder="Description" />
                    <button type="button" @click="removeFeature(i)" class="shrink-0 text-xs text-red-500">✕</button>
                  </div>
                </div>
              </div>
              <div class="col-span-2">
                <div class="flex items-center justify-between mb-2">
                  <label class="form-label mb-0">Tech Stack</label>
                  <button type="button" @click="addTechStack" class="text-xs text-blue-600 hover:text-blue-700 font-semibold">+ Add</button>
                </div>
                <div class="space-y-2">
                  <div v-for="(_, i) in newProject.techStack" :key="i" class="flex gap-2">
                    <input type="text" v-model="newProject.techStack[i]" class="input-field" placeholder="e.g. Vue, Firebase, Tailwind" />
                    <button type="button" @click="removeTechStack(i)" class="shrink-0 text-xs text-red-500">✕</button>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="formError" class="text-xs text-red-600">{{ formError }}</p>
            <div class="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button type="button" @click="closeAddProjectModal" class="btn-sm border border-gray-300 text-gray-600 hover:bg-gray-50">Cancel</button>
              <button type="submit" :disabled="isSubmitting" class="btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                {{ isSubmitting ? `Uploading ${Math.max(addUploadProgress, addAdditionalUploadProgress)}%` : 'Add Project' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Edit Project Modal -->
    <Teleport to="body">
      <div v-if="showEditProjectModal" class="modal-backdrop" @click.self="closeEditProjectModal">
        <div class="modal-box max-w-3xl">
          <div class="modal-header">
            <h3 class="modal-title">Edit Project</h3>
            <button @click="closeEditProjectModal" class="modal-close-btn">✕</button>
          </div>
          <form @submit.prevent="updateProject" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Project Title *</label>
                <input type="text" v-model="editProjectData.title" required class="input-field" />
              </div>
              <div>
                <label class="form-label">Client Name *</label>
                <input type="text" v-model="editProjectData.clientName" required class="input-field" />
              </div>
              <div class="col-span-2">
                <label class="form-label">Short Description</label>
                <input type="text" v-model="editProjectData.shortDescription" class="input-field" />
              </div>
              <div>
                <label class="form-label">Category</label>
                <select v-model="editProjectData.service" class="input-field" @change="editProjectData.platform = ''">
                  <option value="">Select Category</option>
                  <option value="Founders & Startups">Founders &amp; Startups</option>
                  <option value="Organizations & LGUs">Organizations &amp; LGUs</option>
                  <option value="MSMEs & Social Enterprises">MSMEs &amp; Social Enterprises</option>
                </select>
              </div>
              <div>
                <label class="form-label">Specific Service</label>
                <select v-model="editProjectData.platform" class="input-field" :disabled="!editProjectData.service">
                  <option value="">Select Service</option>
                  <template v-if="editProjectData.service === 'Founders & Startups'">
                    <option>MVP Development</option>
                    <option>Product Design (UI/UX)</option>
                    <option>Web and Mobile App Design</option>
                    <option>Pitch Deck Design</option>
                    <option>Landing Page</option>
                  </template>
                  <template v-else-if="editProjectData.service === 'Organizations & LGUs'">
                    <option>Incubation Program Design</option>
                    <option>Innovation Workshops and Facilitation</option>
                    <option>Startup Competition Design</option>
                    <option>Capacity Building</option>
                    <option>Program Documentation and Reporting</option>
                  </template>
                  <template v-else-if="editProjectData.service === 'MSMEs & Social Enterprises'">
                    <option>Business Innovation Discovery</option>
                    <option>Website Redesign</option>
                    <option>Digital Presence Setup</option>
                    <option>Business Model Design</option>
                    <option>Pitch and Proposal Design</option>
                  </template>
                </select>
              </div>
              <div>
                <label class="form-label">Cover Photo</label>
                <input id="edit-cover" type="file" @change="onEditCoverPhotoChange" accept="image/*" class="sr-only" />
                <label for="edit-cover" class="file-btn">{{ editSelectedFileName || 'Replace image' }}</label>
                <img v-if="editExistingImageUrl && !editProjectData.coverPhoto" :src="editExistingImageUrl" class="mt-2 h-16 w-full rounded-lg object-cover border border-gray-200" />
              </div>
              <div>
                <label class="form-label">Additional Photos</label>
                <input id="edit-extra" type="file" @change="onEditAdditionalImagesChange" accept="image/*" multiple class="sr-only" />
                <label for="edit-extra" class="file-btn">Add more images</label>
                <p v-if="editSelectedAdditionalFileNames.length" class="mt-1 text-xs text-gray-500">{{ editSelectedAdditionalFileNames.length }} new file(s)</p>
                <div v-if="editExistingAdditionalImageUrls.length" class="mt-2 grid grid-cols-3 gap-1">
                  <img v-for="(url, i) in editExistingAdditionalImageUrls" :key="i" :src="url" class="h-12 rounded-lg object-cover border border-gray-200" />
                </div>
              </div>
              <div class="col-span-2">
                <label class="form-label">Challenge Statement</label>
                <textarea v-model="editProjectData.challengeStatement" rows="2" class="input-field resize-none"></textarea>
              </div>
              <div class="col-span-2">
                <label class="form-label">Solution</label>
                <textarea v-model="editProjectData.solution" rows="2" class="input-field resize-none"></textarea>
              </div>
              <div>
                <label class="form-label">Duration (weeks)</label>
                <input type="number" v-model="editProjectData.duration" min="1" class="input-field" />
              </div>
              <div class="col-span-2">
                <div class="flex items-center justify-between mb-2">
                  <label class="form-label mb-0">Features</label>
                  <button type="button" @click="addEditFeature" class="text-xs text-blue-600 font-semibold">+ Add</button>
                </div>
                <div class="space-y-2">
                  <div v-for="(feat, i) in editProjectData.features" :key="i" class="flex gap-2">
                    <input type="text" v-model="feat.name" class="input-field" placeholder="Feature name" />
                    <input type="text" v-model="feat.description" class="input-field" placeholder="Description" />
                    <button type="button" @click="removeEditFeature(i)" class="shrink-0 text-xs text-red-500">✕</button>
                  </div>
                </div>
              </div>
              <div class="col-span-2">
                <div class="flex items-center justify-between mb-2">
                  <label class="form-label mb-0">Tech Stack</label>
                  <button type="button" @click="addEditTechStack" class="text-xs text-blue-600 font-semibold">+ Add</button>
                </div>
                <div class="space-y-2">
                  <div v-for="(_, i) in editProjectData.techStack" :key="i" class="flex gap-2">
                    <input type="text" v-model="editProjectData.techStack[i]" class="input-field" placeholder="e.g. Vue, Firebase" />
                    <button type="button" @click="removeEditTechStack(i)" class="shrink-0 text-xs text-red-500">✕</button>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="editFormError" class="text-xs text-red-600">{{ editFormError }}</p>
            <div class="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button type="button" @click="closeEditProjectModal" class="btn-sm border border-gray-300 text-gray-600 hover:bg-gray-50">Cancel</button>
              <button type="submit" :disabled="isEditSubmitting" class="btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                {{ isEditSubmitting ? `Uploading ${Math.max(editUploadProgress, editAdditionalUploadProgress)}%` : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import CRMPanel from '@/components/CRM/CRMPanel.vue'
import { db, storage, auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { collection, getDocs, query, orderBy, addDoc, doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

// ── Types ───────────────────────────────────────────────────────
interface Project { id: string; name: string; clientName: string; status: string; date: string; description?: string; imageUrl?: string; coverPhoto?: string | null; imagePath?: string; additionalImageUrls?: string[]; additionalImagePaths?: string[]; serviceId?: string }
interface Inquiry { id: string; name: string; email: string; company?: string; service: string; budget?: string; timeline?: string; projectDetails: string; status: 'new'|'in-progress'|'client_secured'|'client_cancelled'|'contacted'; createdAt: Date }
interface Call { id: string; name: string; email: string; company?: string; selectedDate: string; selectedTime: string; projectDetails?: string; type: string; status: string; createdAt: Date }
interface GalleryPhoto { id: string; url: string; caption?: string; storagePath: string; order: number }
interface BlogPost { id: string; title: string; slug: string; category: string; categoryColor: string; excerpt: string; content: string; coverImage: string; author: string; authorRole: string; date: string; readTime: number }
interface BlogPostForm { title: string; slug: string; category: string; categoryColor: string; excerpt: string; content: string; coverImage: string; author: string; authorRole: string; date: string; readTime: string }
interface Settings { adminEmail: string; companyName: string }

interface BlogPostDoc {
  title?: string
  slug?: string
  category?: string
  category_color?: string
  excerpt?: string
  content?: string
  cover_image?: string
  author?: string
  author_role?: string
  date?: string
  read_time?: number | string
}

interface GalleryDoc {
  url?: string
  caption?: string
  storage_path?: string
  order?: number
}

interface SampleWorkDoc {
  title?: string
  client_name?: string
  status?: string
  date?: string
  description?: string
  short_desc?: string
  coverPhoto?: string
  image_url?: string
  image_path?: string
  additional_image_urls?: string[]
  additional_image_paths?: string[]
  service_id?: string
  platform?: string
  challenge_statement?: string
  solution?: string
  duration_weeks?: number
  features?: Array<{ name?: string; description?: string }>
  tech_stack?: string[]
}

interface InquiryDoc {
  name?: string
  email?: string
  company?: string
  service?: string
  budget?: string
  timeline?: string
  project_details?: string
  status?: string
  created_at?: string
}

interface CallDoc {
  name?: string
  email?: string
  company?: string
  selected_date?: string
  selected_time?: string
  project_details?: string
  type?: string
  status?: string
  created_at?: string
}

// ── State ───────────────────────────────────────────────────────
const router = useRouter()
const activeSection = ref('dashboard')
const isLoading = ref(true)
const error = ref<string | null>(null)

const projects = ref<Project[]>([])
const inquiries = ref<Inquiry[]>([])
const calls = ref<Call[]>([])
const galleryPhotos = ref<GalleryPhoto[]>([])
const blogPosts = ref<BlogPost[]>([])

// ── BID Applications ──────────────────────────────────────────
type BidApplication = {
  id: string
  name: string
  businessName: string
  businessType: string
  teamSize: string
  painPoint: string
  isDecisionMaker: 'yes' | 'no' | string
  contact: string
  submittedAt: { toDate?: () => Date } | null
  submittedAtFormatted: string
}
const bidApplications = ref<BidApplication[]>([])
const selectedBid = ref<BidApplication | null>(null)
const showBidModal = ref(false)

function openBidModal(app: BidApplication) { selectedBid.value = app; showBidModal.value = true }
function closeBidModal() { showBidModal.value = false; selectedBid.value = null }

async function loadBidApplications() {
  try {
    const q = query(collection(db, 'bid_applications'), orderBy('submittedAt', 'desc'))
    const snap = await getDocs(q)
    bidApplications.value = snap.docs.map(d => {
      const data = d.data()
      const ts = data.submittedAt
      const date = ts?.toDate ? ts.toDate() : null
      return {
        id: d.id,
        name: data.name ?? '',
        businessName: data.businessName ?? '',
        businessType: data.businessType ?? '',
        teamSize: data.teamSize ?? '',
        painPoint: data.painPoint ?? '',
        isDecisionMaker: data.isDecisionMaker ?? '',
        contact: data.contact ?? '',
        submittedAt: ts ?? null,
        submittedAtFormatted: date ? date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : '—',
      }
    })
  } catch (e) { console.error('[loadBidApplications]', e) }
}

// CRM dashboard stats
const crmStats = reactive({ pipeline: 0, closedWon: 0, activeDeals: 0, openTasks: 0, overdueTasks: 0, winRate: 0 })

const settings = reactive<Settings>({ adminEmail: 'admin@inv8solutions.com', companyName: 'Inv8 Studio' })

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof Error && err.message) return err.message
  if (typeof err === 'string' && err.trim()) return err
  if (err && typeof err === 'object' && 'error_description' in err) {
    const desc = (err as { error_description?: unknown }).error_description
    if (typeof desc === 'string' && desc.trim()) return desc
  }
  try {
    const serialized = JSON.stringify(err)
    if (serialized && serialized !== '{}') return serialized
  } catch {
    // ignore JSON serialization issues
  }
  return fallback
}

// ── Blog ────────────────────────────────────────────────────────
const showAddBlogModal = ref(false)
const showEditBlogModal = ref(false)
const selectedBlogId = ref<string | null>(null)
const isBlogSubmitting = ref(false)
const blogFormError = ref<string | null>(null)

const blogCategories = [
  { value: 'Startup Insights',        color: 'bg-blue-100 text-blue-700' },
  { value: 'Digital Transformation',  color: 'bg-green-100 text-green-700' },
  { value: 'UI/UX Insights',          color: 'bg-purple-100 text-purple-700' },
  { value: 'Case Study',              color: 'bg-yellow-100 text-yellow-700' },
  { value: 'Inv8 Updates',            color: 'bg-red-100 text-red-700' },
]

const authorRoles = ['Founder', 'Co-Founder', 'Developer', 'Member']

const emptyBlogForm = (): BlogPostForm => ({
  title: '', slug: '', category: 'Startup Insights',
  categoryColor: 'bg-blue-100 text-blue-700',
  excerpt: '', content: '', coverImage: '',
  author: '', authorRole: '',
  date: '',
  readTime: '',
})
const blogForm = ref(emptyBlogForm())

const blogCoverFile = ref<File | null>(null)
const blogCoverInput = ref<HTMLInputElement | null>(null)
const blogCoverPreviewUrl = ref('')
let blogCoverPreviewObjectUrl: string | null = null

const blogCoverDisplayUrl = computed(() => blogCoverPreviewUrl.value || blogForm.value.coverImage || '')
const blogCoverDisplayName = computed(() => {
  if (blogCoverFile.value?.name) return blogCoverFile.value.name
  if (blogForm.value.coverImage) return blogForm.value.coverImage
  return ''
})

const blogContentEl = ref<HTMLElement | null>(null)

function normalizeDateForInput(raw?: string): string {
  if (!raw) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toISOString().split('T')[0] || ''
}

function setBlogContentHtml(html: string) {
  if (blogContentEl.value) {
    blogContentEl.value.innerHTML = html || ''
  }
}

function onBlogContentInput(e: Event) {
  // Use the root editor element to capture the full HTML
  if (blogContentEl.value) {
    blogForm.value.content = blogContentEl.value.innerHTML
  } else {
    const target = e.target as HTMLElement
    blogForm.value.content = target.innerHTML || ''
  }
}

function normalizeHtmlContent(content: string) {
  if (!content) return ''
  if (content.includes('&lt;') && content.includes('&gt;')) {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = content
    return textarea.value
  }
  return content
}

function setBlogCoverPreview(file: File | null, existingUrl = '') {
  if (blogCoverPreviewObjectUrl) {
    URL.revokeObjectURL(blogCoverPreviewObjectUrl)
    blogCoverPreviewObjectUrl = null
  }
  if (file) {
    blogCoverPreviewObjectUrl = URL.createObjectURL(file)
    blogCoverPreviewUrl.value = blogCoverPreviewObjectUrl
  } else {
    blogCoverPreviewUrl.value = existingUrl
  }
}

function onBlogCoverChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] || null
  blogCoverFile.value = file
  setBlogCoverPreview(file, blogForm.value.coverImage)
}

function triggerBlogCoverSelect() {
  blogCoverInput.value?.click()
}

function clearBlogCover() {
  blogCoverFile.value = null
  if (blogCoverInput.value) blogCoverInput.value.value = ''
  blogForm.value.coverImage = ''
  setBlogCoverPreview(null, '')
}

async function uploadBlogCoverImage(file: File, blogId: string) {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `blogposts/${blogId}/cover.${ext}`
  const sref = storageRef(storage, path)
  await uploadBytes(sref, file)
  return getDownloadURL(sref)
}

async function ensureBlogStorageFolder(blogId: string) {
  const placeholderRef = storageRef(storage, `blogposts/${blogId}/.keep`)
  const blob = new Blob([''])
  await uploadBytes(placeholderRef, blob)
}

watch(() => blogForm.value.title, (t) => {
  if (!selectedBlogId.value)
    blogForm.value.slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
})
watch(() => blogForm.value.category, (cat) => {
  const found = blogCategories.find(c => c.value === cat)
  if (found) blogForm.value.categoryColor = found.color
})

async function fetchBlogPosts() {
  try {
    const q = query(collection(db, 'blogposts'), orderBy('created_at', 'desc'))
    const snap = await getDocs(q)
    blogPosts.value = snap.docs.map(d => {
      const data = d.data() as BlogPostDoc
      const readTimeRaw = data.read_time
      const readTime = typeof readTimeRaw === 'number'
        ? readTimeRaw
        : Number.parseInt(String(readTimeRaw ?? ''), 10) || 0

      return {
        id: d.id,
        title: data.title || '',
        slug: data.slug || '',
        category: data.category || '',
        categoryColor: data.category_color || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        coverImage: data.cover_image || '',
        author: data.author || '',
        authorRole: data.author_role || '',
        date: data.date || '',
        readTime,
      }
    })
  } catch (e) { console.warn('[fetchBlogPosts] ', e) }
}

async function addBlogPost() {
  if (!blogForm.value.title || !blogForm.value.slug) { blogFormError.value = 'Title and slug are required'; return }
  isBlogSubmitting.value = true; blogFormError.value = null
  try {
    const slugId = blogForm.value.slug.trim()
    if (!slugId) { blogFormError.value = 'Slug is required'; return }
    const readTimeValue = Number.parseInt(blogForm.value.readTime, 10)
    const normalizedReadTime = Number.isFinite(readTimeValue) ? readTimeValue : 0
    const normalizedContent = normalizeHtmlContent(blogForm.value.content)
    blogForm.value.content = normalizedContent

    const docRef = doc(db, 'blogposts', slugId)
    const existing = await getDoc(docRef)
    if (existing.exists()) { blogFormError.value = 'Slug already exists. Please choose another.'; return }

    await setDoc(docRef, {
      title: blogForm.value.title,
      slug: slugId,
      category: blogForm.value.category,
      category_color: blogForm.value.categoryColor,
      excerpt: blogForm.value.excerpt,
      content: normalizedContent,
      cover_image: blogForm.value.coverImage,
      author: blogForm.value.author,
      author_role: blogForm.value.authorRole,
      date: blogForm.value.date,
      read_time: normalizedReadTime,
      created_at: new Date().toISOString(),
    })
    let coverImageUrl = blogForm.value.coverImage
    if (!blogCoverFile.value) {
      await ensureBlogStorageFolder(slugId)
    }
    if (blogCoverFile.value) {
      coverImageUrl = await uploadBlogCoverImage(blogCoverFile.value, slugId)
      await updateDoc(doc(db, 'blogposts', slugId), {
        cover_image: coverImageUrl,
        updated_at: new Date().toISOString(),
      })
    }
    blogPosts.value.unshift({
      id: slugId,
      ...blogForm.value,
      slug: slugId,
      coverImage: coverImageUrl,
      readTime: normalizedReadTime,
    })
    closeBlogModal()
  } catch { blogFormError.value = 'Failed to save post' } finally { isBlogSubmitting.value = false }
}

async function updateBlogPost() {
  if (!blogForm.value.title || !selectedBlogId.value) { blogFormError.value = 'Title is required'; return }
  isBlogSubmitting.value = true; blogFormError.value = null
  try {
    const slugId = (blogForm.value.slug || '').trim()
    if (!slugId) { blogFormError.value = 'Slug is required'; return }
    const readTimeValue = Number.parseInt(blogForm.value.readTime, 10)
    const normalizedReadTime = Number.isFinite(readTimeValue) ? readTimeValue : 0
    const normalizedContent = normalizeHtmlContent(blogForm.value.content)
    blogForm.value.content = normalizedContent
    let coverImageUrl = blogForm.value.coverImage
    if (blogCoverFile.value) {
      coverImageUrl = await uploadBlogCoverImage(blogCoverFile.value, slugId)
    }

    const payload = {
      title: blogForm.value.title,
      slug: slugId,
      category: blogForm.value.category,
      category_color: blogForm.value.categoryColor,
      excerpt: blogForm.value.excerpt,
      content: normalizedContent,
      cover_image: coverImageUrl,
      author: blogForm.value.author,
      author_role: blogForm.value.authorRole,
      date: blogForm.value.date,
      read_time: normalizedReadTime,
      updated_at: new Date().toISOString(),
    }

    if (slugId !== selectedBlogId.value) {
      const newRef = doc(db, 'blogposts', slugId)
      const exists = await getDoc(newRef)
      if (exists.exists()) { blogFormError.value = 'Slug already exists. Please choose another.'; return }

      const oldRef = doc(db, 'blogposts', selectedBlogId.value)
      const oldSnap = await getDoc(oldRef)
      const createdAt = oldSnap.exists() ? oldSnap.data().created_at : new Date().toISOString()

      await setDoc(newRef, { ...payload, created_at: createdAt })
      await deleteDoc(oldRef)

      const idx = blogPosts.value.findIndex(p => p.id === selectedBlogId.value)
      if (idx !== -1) {
        blogPosts.value[idx] = { ...blogPosts.value[idx]!, ...blogForm.value, id: slugId, slug: slugId, coverImage: coverImageUrl, readTime: normalizedReadTime }
      }
      selectedBlogId.value = slugId
      closeBlogModal()
      return
    }

    await updateDoc(doc(db, 'blogposts', selectedBlogId.value), payload)
    const idx = blogPosts.value.findIndex(p => p.id === selectedBlogId.value)
    if (idx !== -1) blogPosts.value[idx] = { ...blogPosts.value[idx]!, ...blogForm.value, slug: slugId, coverImage: coverImageUrl, readTime: normalizedReadTime }
    closeBlogModal()
  } catch { blogFormError.value = 'Failed to update post' } finally { isBlogSubmitting.value = false }
}

async function deleteBlogPost(post: BlogPost) {
  if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
  try {
    await deleteDoc(doc(db, 'blogposts', post.id))
    blogPosts.value = blogPosts.value.filter(p => p.id !== post.id)
  } catch (e) { console.error('[deleteBlogPost]', e) }
}

async function openAddBlogModal() {
  blogForm.value = emptyBlogForm()
  blogFormError.value = null
  blogCoverFile.value = null
  setBlogCoverPreview(null, '')
  showAddBlogModal.value = true
  await nextTick()
  setBlogContentHtml(blogForm.value.content)
}
async function openEditBlog(post: BlogPost) {
  selectedBlogId.value = post.id
  blogForm.value = { ...post, readTime: post.readTime ? String(post.readTime) : '', date: normalizeDateForInput(post.date) }
  blogFormError.value = null
  blogCoverFile.value = null
  setBlogCoverPreview(null, post.coverImage || '')
  showEditBlogModal.value = true
  await nextTick()
  setBlogContentHtml(blogForm.value.content)
}
function closeBlogModal() {
  showAddBlogModal.value = false
  showEditBlogModal.value = false
  selectedBlogId.value = null
  blogCoverFile.value = null
  setBlogCoverPreview(null, '')
  setBlogContentHtml('')
  blogForm.value = emptyBlogForm()
}

// ── Gallery ─────────────────────────────────────────────────────
const galleryUploading = ref(false)
const galleryUploadProgress = ref(0)
const galleryError = ref('')

async function loadGalleryPhotos() {
  try {
    const q = query(collection(db, 'community_gallery'), orderBy('order', 'asc'))
    const snap = await getDocs(q)
    galleryPhotos.value = snap.docs.map(d => {
      const data = d.data() as GalleryDoc
      return { id: d.id, url: data.url ?? '', caption: data.caption ?? '', storagePath: data.storage_path ?? '', order: data.order ?? 0 }
    })
  } catch (e) { console.error('[Gallery] load error:', e); galleryError.value = `Failed to load gallery: ${String(e)}` }
}

async function handleGalleryUpload(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files || [])
  if (!files.length) return
  galleryUploading.value = true; galleryUploadProgress.value = 0; galleryError.value = ''
  const base = Date.now(); let done = 0
  for (const file of files) {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `community-gallery/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    try {
      const sref = storageRef(storage, path)
      await uploadBytes(sref, file)
      const publicUrl = await getDownloadURL(sref)
      await addDoc(collection(db, 'community_gallery'), { url: publicUrl, storage_path: path, caption: '', order: base + done, created_at: new Date().toISOString() })
    } catch (err) {
      console.error('[Gallery] upload error:', err)
      galleryError.value = `Storage upload failed: ${getErrorMessage(err, 'Unknown error')}`
      galleryUploading.value = false; input.value = ''
      return
    }
    done++
    galleryUploadProgress.value = Math.round((done / files.length) * 100)
  }
  await loadGalleryPhotos()
  galleryUploading.value = false; galleryUploadProgress.value = 0; input.value = ''
}

async function deleteGalleryPhoto(photo: GalleryPhoto) {
  if (!confirm('Delete this photo?')) return
  try {
    if (photo.storagePath) {
      const sref = storageRef(storage, photo.storagePath)
      await deleteObject(sref)
    }
    await deleteDoc(doc(db, 'community_gallery', photo.id))
    galleryPhotos.value = galleryPhotos.value.filter(p => p.id !== photo.id)
  } catch (e) { console.error('[deleteGalleryPhoto]', e) }
}

async function updateGalleryCaption(photo: GalleryPhoto) {
  try { await updateDoc(doc(db, 'community_gallery', photo.id), { caption: photo.caption || '' }) } catch (e) { console.error('[updateGalleryCaption]', e) }
}

// ── Projects ────────────────────────────────────────────────────
const showAddProjectModal = ref(false)
const showEditProjectModal = ref(false)
const isSubmitting = ref(false)
const formError = ref<string | null>(null)
const addUploadProgress = ref(0)
const addSelectedFileName = ref('')
const addSelectedAdditionalFileNames = ref<string[]>([])
const addAdditionalUploadProgress = ref(0)

const newProject = ref({ title:'', shortDescription:'', platform:'', service:'', clientName:'', challengeStatement:'', solution:'', duration:0, features:[{name:'',description:''}], techStack:[''], coverPhoto:null as File|null, additionalImages:[] as File[] })

const editingProjectId = ref<string|null>(null)
const isEditSubmitting = ref(false)
const editFormError = ref<string|null>(null)
const editUploadProgress = ref(0)
const editSelectedFileName = ref('')
const editExistingImageUrl = ref('')
const editExistingImagePath = ref('')
const editExistingAdditionalImageUrls = ref<string[]>([])
const editExistingAdditionalImagePaths = ref<string[]>([])
const editSelectedAdditionalFileNames = ref<string[]>([])
const editAdditionalUploadProgress = ref(0)
const editProjectData = ref({ title:'', shortDescription:'', platform:'', service:'', clientName:'', challengeStatement:'', solution:'', duration:0, features:[{name:'',description:''}] as {name:string;description:string}[], techStack:[''] as string[], coverPhoto:null as File|null, additionalImages:[] as File[] })

async function uploadProjectImages(files: File[], projectId: string, folder: 'cover'|'gallery', onProgress: (p:number)=>void) {
  if (!files.length) { onProgress(100); return { imageUrls:[] as string[], imagePaths:[] as string[] } }
  const imageUrls: string[] = []; const imagePaths: string[] = []
  for (const [i, file] of files.entries()) {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    // Use deterministic cover filename so we can derive it from document id when needed
    const path = folder === 'cover'
      ? `sampleworks/${projectId}/cover.${ext}`
      : `sampleworks/${projectId}/gallery-${i}.${ext}`
    try {
      const sref = storageRef(storage, path)
      await uploadBytes(sref, file)
      const publicUrl = await getDownloadURL(sref)
      imageUrls.push(publicUrl); imagePaths.push(path)
    } catch (err) { console.error('[uploadProjectImages] upload error', err); continue }
    onProgress(Math.round(((i + 1) / files.length) * 100))
  }
  return { imageUrls, imagePaths }
}

async function fetchProjects() {
  try {
    const q = query(collection(db, 'sampleworks'), orderBy('title', 'asc'))
    const snap = await getDocs(q)
    projects.value = snap.docs.map(d => {
      const data = d.data() as SampleWorkDoc
      return {
        id: d.id,
        name: data.title || '',
        clientName: data.client_name || 'Unknown',
        status: data.status || 'Planning',
        date: data.date || '',
        description: data.description || '',
        imageUrl: data.image_url,
        coverPhoto: data.coverPhoto || data.image_url || null,
        imagePath: data.image_path,
        additionalImageUrls: Array.isArray(data.additional_image_urls) ? data.additional_image_urls : [],
        additionalImagePaths: Array.isArray(data.additional_image_paths) ? data.additional_image_paths : [],
        serviceId: data.service_id,
      } as Project
    })
  } catch (e) { console.error('[fetchProjects]', e) }
}

async function fetchInquiries() {
  try {
    const q = query(collection(db, 'inquiries'), orderBy('created_at', 'desc'))
    const snap = await getDocs(q)
    inquiries.value = snap.docs.map(d => {
      const data = d.data() as InquiryDoc
      const statusRaw = typeof data.status === 'string' ? data.status : 'new'
      const validStatuses: Inquiry['status'][] = ['new','in-progress','client_secured','client_cancelled','contacted']
      const status = validStatuses.includes(statusRaw as Inquiry['status'])
        ? (statusRaw as Inquiry['status'])
        : 'new'
      return {
        id: d.id,
        name: data.name || '',
        email: data.email || '',
        company: data.company,
        service: data.service || '',
        budget: data.budget || '',
        timeline: data.timeline || '',
        projectDetails: data.project_details || '',
        status,
        createdAt: data.created_at ? new Date(data.created_at) : new Date(),
      }
    })
  } catch (e) { console.error('[fetchInquiries]', e) }
}

async function fetchCalls() {
  try {
    const q = query(collection(db, 'calls'), orderBy('created_at', 'desc'))
    const snap = await getDocs(q)
    calls.value = snap.docs.map(d => {
      const data = d.data() as CallDoc
      return {
        id: d.id,
        name: data.name || '',
        email: data.email || '',
        company: data.company,
        selectedDate: data.selected_date || '',
        selectedTime: data.selected_time || '',
        projectDetails: data.project_details,
        type: data.type || 'consultation_call',
        status: data.status || 'pending',
        createdAt: data.created_at ? new Date(data.created_at) : new Date(),
      }
    })
  } catch (e) { console.error('[fetchCalls]', e) }
}

async function loadCRMStats() {
  try {
    const [dealsSnap, tasksSnap] = await Promise.all([
      getDocs(collection(db, 'crm_deals')),
      getDocs(collection(db, 'crm_tasks')),
    ])
    const deals = dealsSnap.docs.map(d => d.data())
    const tasks = tasksSnap.docs.map(d => d.data())
    const today = new Date().toDateString()
    const open = deals.filter((d: any) => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost')
    const won  = deals.filter((d: any) => d.stage === 'Closed Won')
    crmStats.activeDeals  = open.length
    crmStats.pipeline     = open.reduce((s: number, d: any) => s + ((d.value ?? 0) * (d.probability ?? 10) / 100), 0)
    crmStats.closedWon    = won.reduce((s: number, d: any) => s + (d.value ?? 0), 0)
    crmStats.winRate      = deals.length ? Math.round(won.length / deals.length * 100) : 0
    crmStats.openTasks    = tasks.filter((t: any) => t.status === 'Open' || t.status === 'In Progress').length
    crmStats.overdueTasks = tasks.filter((t: any) => t.status !== 'Completed' && t.status !== 'Cancelled' && t.due_date && new Date(t.due_date) < new Date(today)).length
    overdueCrmTasks.value = crmStats.overdueTasks
  } catch { /* CRM collections may not exist yet */ }
}

async function loadData() {
  isLoading.value = true; error.value = null
  try { await Promise.all([fetchProjects(), fetchInquiries(), fetchCalls(), loadGalleryPhotos(), fetchBlogPosts(), loadCRMStats(), loadBidApplications()]) }
  catch (e) { console.error(e) } finally { isLoading.value = false }
}

// ── CRM panel ref ───────────────────────────────────────────────
const crmPanel = ref<InstanceType<typeof CRMPanel> | null>(null)

// ── Computed ────────────────────────────────────────────────────
const newInquiriesCount = computed(() => inquiries.value.filter(i => i.status === 'new').length)
const newInquiries = computed(() => inquiries.value.filter(i => i.status === 'new'))
const newCalls     = computed(() => calls.value.filter(c => c.status === 'pending'))
const overdueCrmTasks = ref(0)

const today = computed(() => new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' }))

const currentSectionLabel = computed(() => navItems.value.find((n: {id:string}) => n.id === activeSection.value)?.label ?? 'Admin')

const dashboardStats = computed(() => [
  { label:'Total Works',   value:projects.value.length,    sub:'In portfolio',        icon:'fa-solid fa-folder',          iconBg:'bg-blue-50',   iconColor:'text-blue-500',   accentBar:'bg-blue-500' },
  { label:'Blog Posts',    value:blogPosts.value.length,   sub:'Published',           icon:'fa-solid fa-pen-to-square',   iconBg:'bg-violet-50', iconColor:'text-violet-500', accentBar:'bg-violet-500' },
  { label:'New Inquiries', value:newInquiriesCount.value,  sub:'Awaiting response',   icon:'fa-solid fa-envelope',        iconBg:'bg-amber-50',  iconColor:'text-amber-500',  accentBar:'bg-amber-500' },
  { label:'Calls Booked',  value:calls.value.length,       sub:'Total consultations', icon:'fa-solid fa-phone',           iconBg:'bg-emerald-50',iconColor:'text-emerald-500',accentBar:'bg-emerald-500' },
])

const navItems = computed(() => [
  { id:'dashboard', label:'Dashboard', icon:'fa-solid fa-table-cells-large' },
  { id:'projects',  label:'Works',     icon:'fa-solid fa-folder' },
  { id:'blog',      label:'Blog Posts',icon:'fa-solid fa-pen-to-square' },
  { id:'inquiries', label:'Inquiries', icon:'fa-solid fa-envelope', badge: newInquiriesCount.value },
  { id:'calls',     label:'Calls',     icon:'fa-solid fa-phone' },
  { id:'gallery',   label:'Gallery',   icon:'fa-solid fa-image' },
  { id:'bid',        label:'BID Applications', icon:'fa-solid fa-store', badge: bidApplications.value.length || undefined },
  { id:'crm',       label:'CRM',       icon:'fa-solid fa-diagram-project', badge: overdueCrmTasks.value },
  { id:'settings',  label:'Settings',  icon:'fa-solid fa-gear' },
])

// ── Inquiry modal ───────────────────────────────────────────────
const showInquiryModal = ref(false)
const selectedInquiry = ref<Inquiry|null>(null)

function openInquiryModal(inq: Inquiry) { selectedInquiry.value = inq; showInquiryModal.value = true }
function closeInquiryModal() { showInquiryModal.value = false; selectedInquiry.value = null }

async function updateInquiryStatus(status: 'done'|'contacted'|'forwarded') {
  if (!selectedInquiry.value) return
  const map = { done:'client_secured', contacted:'contacted', forwarded:'client_cancelled' } as const
  const newStatus = map[status]
  try { await updateDoc(doc(db, 'inquiries', selectedInquiry.value.id), { status: newStatus, updated_at: new Date().toISOString() }) } catch (e) { console.error('[updateInquiryStatus]', e) }
  const idx = inquiries.value.findIndex(i => i.id === selectedInquiry.value?.id)
  if (idx !== -1 && inquiries.value[idx]) inquiries.value[idx]!.status = newStatus
  if (status === 'done' && selectedInquiry.value?.id) {
    crmPanel.value?.markDealWon(selectedInquiry.value.id)
  }
  closeInquiryModal()
}

// ── Call modal ──────────────────────────────────────────────────
const showCallModal = ref(false)
const selectedCall = ref<Call|null>(null)

function openCallModal(call: Call) { selectedCall.value = call; showCallModal.value = true }
function closeCallModal() { showCallModal.value = false; selectedCall.value = null }

async function updateCallStatus(status: 'contacted') {
  if (!selectedCall.value) return
  try { await updateDoc(doc(db, 'calls', selectedCall.value.id), { status, updated_at: new Date().toISOString() }) } catch (e) { console.error('[updateCallStatus]', e) }
  const idx = calls.value.findIndex(c => c.id === selectedCall.value?.id)
  if (idx !== -1 && calls.value[idx]) calls.value[idx]!.status = status
  closeCallModal()
}

// ── Project CRUD ────────────────────────────────────────────────
function openAddProjectModal() {
  showAddProjectModal.value = true; formError.value = null
  newProject.value = { title:'', shortDescription:'', platform:'', service:'', clientName:'', challengeStatement:'', solution:'', duration:0, features:[{name:'',description:''}], techStack:[''], coverPhoto:null, additionalImages:[] }
  addUploadProgress.value = 0; addSelectedFileName.value = ''; addSelectedAdditionalFileNames.value = []
}
function closeAddProjectModal() { showAddProjectModal.value = false; formError.value = null }

async function addProject() {
  formError.value = null
  if (!newProject.value.title || !newProject.value.clientName) { formError.value = 'Project title and client name are required.'; return }
  isSubmitting.value = true
  try {
    // create the project doc first so we have a stable id to store files under
    const docRef = await addDoc(collection(db, 'sampleworks'), {
      title: newProject.value.title,
      client_name: newProject.value.clientName,
      short_desc: newProject.value.shortDescription || '',
      description: newProject.value.shortDescription || '',
      platform: newProject.value.platform || '',
      service_id: newProject.value.service || null,
      challenge_statement: newProject.value.challengeStatement || '',
      solution: newProject.value.solution || '',
      duration_weeks: newProject.value.duration || 0,
      features: newProject.value.features || [],
      tech_stack: newProject.value.techStack || [],
      status: 'Planning',
      date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    })
    const projectId = docRef.id
    let imageUrl: string|null = null; let imagePath: string|null = null
    let additionalImageUrls: string[] = []; let additionalImagePaths: string[] = []
    if (newProject.value.coverPhoto) {
      const r = await uploadProjectImages([newProject.value.coverPhoto], projectId, 'cover', p => { addUploadProgress.value = p })
      imageUrl = r.imageUrls[0] || null; imagePath = r.imagePaths[0] || null
    }
    if (newProject.value.additionalImages.length) {
      const r = await uploadProjectImages(newProject.value.additionalImages, projectId, 'gallery', p => { addAdditionalUploadProgress.value = p })
      additionalImageUrls = r.imageUrls; additionalImagePaths = r.imagePaths
    }
    // update the project doc with image references (include coverPhoto for easy lookup)
    await updateDoc(doc(db, 'sampleworks', projectId), { image_url: imageUrl, image_path: imagePath, coverPhoto: imageUrl || null, additional_image_urls: additionalImageUrls, additional_image_paths: additionalImagePaths, updated_at: new Date().toISOString() })
    projects.value.unshift({ id: projectId, name: newProject.value.title, clientName: newProject.value.clientName, status: 'Planning', date: new Date().toISOString().split('T')[0], description: newProject.value.shortDescription || '', imageUrl: imageUrl || undefined, coverPhoto: imageUrl || undefined, imagePath: imagePath || undefined, additionalImageUrls, additionalImagePaths } as Project)
    closeAddProjectModal()
  } catch (e) { formError.value = getErrorMessage(e, 'Failed to add project.') }
  finally { isSubmitting.value = false }
}

function onCoverPhotoChange(e: Event) { const f = (e.target as HTMLInputElement).files?.[0]; newProject.value.coverPhoto = f||null; addSelectedFileName.value = f?.name||'' }
function onAdditionalImagesChange(e: Event) { const files = Array.from((e.target as HTMLInputElement).files||[]); newProject.value.additionalImages = [...newProject.value.additionalImages, ...files]; addSelectedAdditionalFileNames.value = newProject.value.additionalImages.map(f=>f.name); (e.target as HTMLInputElement).value='' }
function addFeature() { newProject.value.features.push({name:'',description:''}) }
function removeFeature(i: number) { if (newProject.value.features.length>1) newProject.value.features.splice(i,1) }
function addTechStack() { newProject.value.techStack.push('') }
function removeTechStack(i: number) { if (newProject.value.techStack.length>1) newProject.value.techStack.splice(i,1) }

async function deleteProject(project: Project) {
  if (!confirm(`Delete "${project.name}"?`)) return
  try {
    const toRemove: string[] = []
    if (project.imagePath) toRemove.push(project.imagePath)
    if (project.additionalImagePaths?.length) toRemove.push(...project.additionalImagePaths)
    for (const path of toRemove) {
      try { await deleteObject(storageRef(storage, path)) } catch (e) { console.warn('[deleteProject] deleteObject', e) }
    }
    await deleteDoc(doc(db, 'sampleworks', project.id))
    projects.value = projects.value.filter(p => p.id !== project.id)
  } catch { alert('Failed to delete project.') }
}

async function openEditProjectModal(project: Project) {
  editingProjectId.value = project.id; editFormError.value = null
  editExistingImageUrl.value = project.imageUrl||''; editExistingImagePath.value = project.imagePath||''
  editExistingAdditionalImageUrls.value = project.additionalImageUrls||[]; editExistingAdditionalImagePaths.value = project.additionalImagePaths||[]
  editSelectedAdditionalFileNames.value = []; editSelectedFileName.value = ''
  editProjectData.value = { title:'', shortDescription:'', platform:'', service:'', clientName:'', challengeStatement:'', solution:'', duration:0, features:[{name:'',description:''}], techStack:[''], coverPhoto:null, additionalImages:[] }
  showEditProjectModal.value = true
  try {
    const d = await getDoc(doc(db, 'sampleworks', project.id))
    if (d.exists()) {
      const data = d.data() as SampleWorkDoc
      const rawFeatures = Array.isArray(data.features) ? data.features : []
      const normalizedFeatures = rawFeatures.length
        ? rawFeatures.map((feature) => ({
            name: typeof feature?.name === 'string' ? feature.name : '',
            description: typeof feature?.description === 'string' ? feature.description : '',
          }))
        : [{ name:'', description:'' }]
      editProjectData.value = { title: data.title||'', shortDescription: data.description||data.short_desc||'', platform: data.platform||'', service: data.service_id||'', clientName: data.client_name||'', challengeStatement: data.challenge_statement||'', solution: data.solution||'', duration: data.duration_weeks||0, features: normalizedFeatures, techStack: data.tech_stack?.length?data.tech_stack:[''], coverPhoto: null, additionalImages: [] }
      editExistingImageUrl.value = data.coverPhoto||data.image_url||''; editExistingImagePath.value = data.image_path||''
      editExistingAdditionalImageUrls.value = Array.isArray(data.additional_image_urls)?data.additional_image_urls.filter((x:unknown)=>typeof x==='string'):[]
      editExistingAdditionalImagePaths.value = Array.isArray(data.additional_image_paths)?data.additional_image_paths.filter((x:unknown)=>typeof x==='string'):[]
    }
  } catch { editFormError.value = 'Failed to load project data.' }
}

function closeEditProjectModal() { showEditProjectModal.value = false; editingProjectId.value = null }

async function updateProject() {
  if (!editProjectData.value.title || !editProjectData.value.clientName || !editingProjectId.value) { editFormError.value = 'Title and client name are required.'; return }
  isEditSubmitting.value = true
  try {
    let imageUrl: string|undefined; let imagePath: string|undefined
    let additionalImageUrls: string[] = []; let additionalImagePaths: string[] = []
    if (editProjectData.value.coverPhoto) {
      const r = await uploadProjectImages([editProjectData.value.coverPhoto], editingProjectId.value, 'cover', p => { editUploadProgress.value = p })
      imageUrl = r.imageUrls[0]; imagePath = r.imagePaths[0]
    }
    if (editProjectData.value.additionalImages.length) {
      const r = await uploadProjectImages(editProjectData.value.additionalImages, editingProjectId.value, 'gallery', p => { editAdditionalUploadProgress.value = p })
      additionalImageUrls = r.imageUrls; additionalImagePaths = r.imagePaths
    }
    const update: Record<string,unknown> = { title: editProjectData.value.title, client_name: editProjectData.value.clientName, short_desc: editProjectData.value.shortDescription||'', description: editProjectData.value.shortDescription||'', platform: editProjectData.value.platform||'', service_id: editProjectData.value.service||null, challenge_statement: editProjectData.value.challengeStatement||'', solution: editProjectData.value.solution||'', duration_weeks: editProjectData.value.duration||0, features: editProjectData.value.features||[], tech_stack: editProjectData.value.techStack||[], updated_at: new Date().toISOString() }
    if (imageUrl) { update.image_url = imageUrl; update.image_path = imagePath; update.coverPhoto = imageUrl }
    if (additionalImageUrls.length) { update.additional_image_urls = [...editExistingAdditionalImageUrls.value, ...additionalImageUrls]; update.additional_image_paths = [...editExistingAdditionalImagePaths.value, ...additionalImagePaths] }
    await updateDoc(doc(db, 'sampleworks', editingProjectId.value), update)
    const idx = projects.value.findIndex(p => p.id === editingProjectId.value)
    if (idx !== -1 && projects.value[idx]) {
      projects.value[idx] = { ...projects.value[idx]!, name:editProjectData.value.title, clientName:editProjectData.value.clientName, description:editProjectData.value.shortDescription, ...(imageUrl ? {imageUrl,coverPhoto:imageUrl,imagePath} : {}), ...(additionalImageUrls.length ? {additionalImageUrls:[...editExistingAdditionalImageUrls.value,...additionalImageUrls],additionalImagePaths:[...editExistingAdditionalImagePaths.value,...additionalImagePaths]} : {}) }
    }
    closeEditProjectModal()
  } catch (e) { editFormError.value = e instanceof Error ? e.message : 'Failed to update.' }
  finally { isEditSubmitting.value = false }
}

function onEditCoverPhotoChange(e: Event) { const f = (e.target as HTMLInputElement).files?.[0]; editProjectData.value.coverPhoto = f||null; editSelectedFileName.value = f?.name||'' }
function onEditAdditionalImagesChange(e: Event) { const files = Array.from((e.target as HTMLInputElement).files||[]); editProjectData.value.additionalImages = [...editProjectData.value.additionalImages, ...files]; editSelectedAdditionalFileNames.value = editProjectData.value.additionalImages.map(f=>f.name); (e.target as HTMLInputElement).value='' }
function addEditFeature() { editProjectData.value.features.push({name:'',description:''}) }
function removeEditFeature(i: number) { if (editProjectData.value.features.length>1) editProjectData.value.features.splice(i,1) }
function addEditTechStack() { editProjectData.value.techStack.push('') }
function removeEditTechStack(i: number) { if (editProjectData.value.techStack.length>1) editProjectData.value.techStack.splice(i,1) }

// ── Misc ────────────────────────────────────────────────────────
const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })

async function handleLogout() { await signOut(auth); localStorage.removeItem('isAuthenticated'); localStorage.removeItem('adminEmail'); router.push('/admin/login') }
function saveSettings() { console.log('Settings saved:', settings) }

onMounted(async () => {
  if (localStorage.getItem('isAuthenticated') !== 'true') { router.push('/admin/login'); return }
  await loadData()
})

onBeforeUnmount(() => {
  if (blogCoverPreviewObjectUrl) {
    URL.revokeObjectURL(blogCoverPreviewObjectUrl)
    blogCoverPreviewObjectUrl = null
  }
})
</script>

<style scoped>
.input-field {
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.input-field::placeholder { color: #9ca3af; }
.input-field:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }

.form-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
}

.file-btn {
  display: inline-flex;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background: #fff;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
  transition: background 0.15s;
}
.file-btn:hover { background: #f9fafb; }

.progress-bar-wrap {
  height: 0.375rem;
  overflow: hidden;
  border-radius: 9999px;
  background: #e5e7eb;
}
.progress-bar {
  height: 0.375rem;
  border-radius: 9999px;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  padding: 1rem;
}
.modal-box {
  position: relative;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 1rem;
  background: #fff;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
.modal-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}
.modal-close-btn {
  color: #9ca3af;
  font-size: 1.125rem;
  line-height: 1;
  transition: color 0.15s;
  background: none;
  border: none;
  cursor: pointer;
}
.modal-close-btn:hover { color: #4b5563; }

.detail-row { display: flex; flex-direction: column; gap: 0.125rem; }
.detail-label { font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; }
.detail-value { font-size: 0.875rem; color: #1f2937; }

.btn-sm {
  display: inline-flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
  border: none;
}

.html-editor {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: #fff;
  min-height: 240px;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #111827;
}
.html-editor:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
.html-editor:empty:before {
  content: attr(data-placeholder);
  color: #9ca3af;
}
.html-editor p {
  margin: 0 0 0.75rem;
  line-height: 1.6;
}
.html-editor h2 {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem;
}
.html-editor h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0.9rem 0 0.45rem;
}
.html-editor ul,
.html-editor ol {
  margin: 0 0 0.75rem 1.25rem;
  padding: 0;
}
.html-editor li {
  margin: 0.2rem 0;
}
.html-editor blockquote {
  border-left: 3px solid #e5e7eb;
  padding-left: 0.75rem;
  color: #6b7280;
  margin: 0 0 0.75rem;
}
</style>
