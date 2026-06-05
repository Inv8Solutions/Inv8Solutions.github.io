<template>
  <div class="space-y-5">
    <!-- Sub-nav tabs -->
    <div class="flex gap-1 rounded-xl bg-gray-100 p-1 w-fit">
      <button
        v-for="tab in tabs" :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all"
        :class="activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
      >
        <i :class="tab.icon" class="text-xs" />
        {{ tab.label }}
        <span v-if="tab.badge && tab.badge > 0" class="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center h-48">
      <div class="h-7 w-7 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
    </div>

    <template v-else>

      <!-- ── PIPELINE ─────────────────────────────────────────── -->
      <div v-if="activeTab === 'pipeline'" class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span><strong class="text-gray-900">{{ openDeals.length }}</strong> open deals</span>
            <span><strong class="text-gray-900">₱{{ fmt(pipelineValue) }}</strong> pipeline</span>
            <span><strong class="text-green-600">₱{{ fmt(closedWonValue) }}</strong> closed won</span>
          </div>
          <button @click="openDealModal()" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Deal
          </button>
        </div>

        <!-- Kanban -->
        <div class="flex gap-3 overflow-x-auto pb-2">
          <div v-for="stage in PIPELINE_STAGES" :key="stage.id" class="flex-shrink-0 w-60">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider" :class="stage.color">{{ stage.label }}</span>
              <span class="text-xs text-gray-400">{{ dealsByStage(stage.id).length }}</span>
            </div>
            <div class="space-y-2 min-h-16">
              <div
                v-for="deal in dealsByStage(stage.id)" :key="deal.id"
                @click="openDealModal(deal)"
                class="cursor-pointer rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <p class="text-sm font-bold text-gray-900 truncate">{{ deal.name }}</p>
                <p class="text-xs text-gray-400 truncate mt-0.5">{{ deal.company }}</p>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-sm font-black text-gray-800">₱{{ fmt(deal.value) }}</span>
                  <span class="text-[10px] font-semibold rounded-full px-2 py-0.5" :class="priorityColor(deal.priority)">{{ deal.priority }}</span>
                </div>
                <div class="mt-2 flex items-center gap-1.5">
                  <div class="h-1.5 flex-1 rounded-full bg-gray-100">
                    <div class="h-1.5 rounded-full bg-blue-500 transition-all" :style="{ width: deal.probability + '%' }"></div>
                  </div>
                  <span class="text-[10px] text-gray-400">{{ deal.probability }}%</span>
                </div>
                <p v-if="deal.expected_close" class="mt-2 text-[10px] text-gray-400">Close: {{ fmtDate(deal.expected_close) }}</p>
              </div>
              <div v-if="!dealsByStage(stage.id).length" class="rounded-xl border border-dashed border-gray-200 p-4 text-center text-xs text-gray-300">Empty</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── CONTACTS ─────────────────────────────────────────── -->
      <div v-else-if="activeTab === 'contacts'" class="space-y-4">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <input v-model="contactSearch" placeholder="Search contacts…" class="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56" />
            <select v-model="contactTypeFilter" class="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All types</option>
              <option v-for="t in CONTACT_TYPES" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <button @click="openContactModal()" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Contact
          </button>
        </div>
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table class="min-w-full divide-y divide-gray-100 text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Company</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Type</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Stage</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Follow-up</th>
                <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="c in filteredContacts" :key="c.id" class="hover:bg-gray-50/60">
                <td class="px-4 py-3">
                  <p class="font-semibold text-gray-900">{{ c.first_name }} {{ c.last_name }}</p>
                  <p class="text-xs text-gray-400">{{ c.email }}</p>
                </td>
                <td class="px-4 py-3 text-gray-600">{{ c.company || '—' }}</td>
                <td class="px-4 py-3">
                  <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" :class="contactTypeColor(c.contact_type)">{{ c.contact_type }}</span>
                </td>
                <td class="px-4 py-3 text-xs text-gray-500">{{ c.pipeline_stage }}</td>
                <td class="px-4 py-3 text-xs" :class="isOverdue(c.next_follow_up) ? 'text-red-500 font-semibold' : 'text-gray-400'">
                  {{ c.next_follow_up ? fmtDate(c.next_follow_up) : '—' }}
                </td>
                <td class="px-4 py-3 text-right">
                  <button @click="openContactModal(c)" class="mr-3 text-xs font-semibold text-blue-600 hover:text-blue-800">Edit</button>
                  <button @click="deleteContact(c)" class="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr v-if="!filteredContacts.length"><td colspan="6" class="px-4 py-8 text-center text-sm text-gray-400">No contacts found</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ── COMPANIES ────────────────────────────────────────── -->
      <div v-else-if="activeTab === 'companies'" class="space-y-4">
        <div class="flex items-center justify-between">
          <input v-model="companySearch" placeholder="Search companies…" class="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56" />
          <button @click="openCompanyModal()" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Company
          </button>
        </div>
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table class="min-w-full divide-y divide-gray-100 text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Company</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Industry</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Revenue</th>
                <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="co in filteredCompanies" :key="co.id" class="hover:bg-gray-50/60">
                <td class="px-4 py-3">
                  <p class="font-semibold text-gray-900">{{ co.name }}</p>
                  <p class="text-xs text-gray-400">{{ co.city }}</p>
                </td>
                <td class="px-4 py-3 text-gray-600">{{ co.industry || '—' }}</td>
                <td class="px-4 py-3">
                  <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" :class="companyStatusColor(co.status)">{{ co.status }}</span>
                </td>
                <td class="px-4 py-3 font-semibold text-gray-800">₱{{ fmt(co.total_revenue) }}</td>
                <td class="px-4 py-3 text-right">
                  <button @click="openCompanyModal(co)" class="mr-3 text-xs font-semibold text-blue-600 hover:text-blue-800">Edit</button>
                  <button @click="deleteCompany(co)" class="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr v-if="!filteredCompanies.length"><td colspan="5" class="px-4 py-8 text-center text-sm text-gray-400">No companies found</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ── ACTIVITIES ───────────────────────────────────────── -->
      <div v-else-if="activeTab === 'activities'" class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500">{{ activities.length }} activities logged</p>
          <button @click="openActivityModal()" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            Log Activity
          </button>
        </div>
        <div class="space-y-2">
          <div v-for="act in activities" :key="act.id" class="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" :class="activityTypeColor(act.type).bg">
              <i :class="[activityTypeColor(act.type).icon, activityTypeColor(act.type).text, 'text-sm']" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <p class="font-semibold text-gray-900 text-sm">{{ act.subject }}</p>
                <span class="shrink-0 text-xs text-gray-400">{{ fmtDate(act.date) }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-0.5">{{ act.contact }} · {{ act.type }} · <span class="capitalize">{{ act.outcome || 'Logged' }}</span></p>
              <p v-if="act.next_action" class="mt-1 text-xs text-blue-600">→ {{ act.next_action }}</p>
            </div>
            <button @click="deleteActivity(act)" class="shrink-0 text-xs text-red-400 hover:text-red-600">✕</button>
          </div>
          <div v-if="!activities.length" class="rounded-xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">No activities logged yet</div>
        </div>
      </div>

      <!-- ── TASKS ────────────────────────────────────────────── -->
      <div v-else-if="activeTab === 'tasks'" class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <select v-model="taskStatusFilter" class="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button @click="openTaskModal()" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Task
          </button>
        </div>
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table class="min-w-full divide-y divide-gray-100 text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="w-8 px-4 py-3"></th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Task</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Priority</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Due Date</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="task in filteredTasks" :key="task.id" class="hover:bg-gray-50/60" :class="task.status === 'Completed' ? 'opacity-50' : ''">
                <td class="px-4 py-3">
                  <button @click="toggleTaskComplete(task)" class="flex h-5 w-5 items-center justify-center rounded border-2 transition-colors" :class="task.status === 'Completed' ? 'border-green-500 bg-green-500' : 'border-gray-300 hover:border-blue-500'">
                    <svg v-if="task.status === 'Completed'" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </button>
                </td>
                <td class="px-4 py-3">
                  <p class="font-semibold text-gray-900" :class="task.status === 'Completed' ? 'line-through' : ''">{{ task.title }}</p>
                  <p class="text-xs text-gray-400">{{ task.contact }} · {{ task.type }}</p>
                </td>
                <td class="px-4 py-3">
                  <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" :class="priorityColor(task.priority)">{{ task.priority }}</span>
                </td>
                <td class="px-4 py-3 text-xs" :class="isOverdue(task.due_date) && task.status !== 'Completed' ? 'text-red-500 font-semibold' : 'text-gray-500'">
                  {{ task.due_date ? fmtDate(task.due_date) : '—' }}
                </td>
                <td class="px-4 py-3">
                  <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" :class="taskStatusColor(task.status)">{{ task.status }}</span>
                </td>
                <td class="px-4 py-3 text-right">
                  <button @click="openTaskModal(task)" class="mr-3 text-xs font-semibold text-blue-600 hover:text-blue-800">Edit</button>
                  <button @click="deleteTask(task)" class="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr v-if="!filteredTasks.length"><td colspan="6" class="px-4 py-8 text-center text-sm text-gray-400">No tasks found</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </template>
  </div>

  <!-- ── DEAL MODAL ─────────────────────────────────────────────── -->
  <Teleport to="body">
    <div v-if="showDealModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="closeDealModal">
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 class="text-base font-bold text-gray-900">{{ editingDealId ? 'Edit Deal' : 'New Deal' }}</h2>
          <button @click="closeDealModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="saveDeal" class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Deal Name *</label>
              <input v-model="dealForm.name" required class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Company</label>
              <input v-model="dealForm.company" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Contact</label>
              <input v-model="dealForm.contact" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Value (₱)</label>
              <input v-model.number="dealForm.value" type="number" min="0" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Probability (%)</label>
              <input v-model.number="dealForm.probability" type="number" min="0" max="100" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Stage</label>
              <select v-model="dealForm.stage" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="s in PIPELINE_STAGES" :key="s.id" :value="s.id">{{ s.label }}</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Priority</label>
              <select v-model="dealForm.priority" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Service Type</label>
              <input v-model="dealForm.service_type" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Expected Close</label>
              <input v-model="dealForm.expected_close" type="date" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
              <textarea v-model="dealForm.notes" rows="2" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
          </div>
          <div v-if="modalError" class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{{ modalError }}</div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeDealModal" class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="isSaving" class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              {{ isSaving ? 'Saving…' : (editingDealId ? 'Save Changes' : 'Add Deal') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── CONTACT MODAL ──────────────────────────────────────── -->
    <div v-if="showContactModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="closeContactModal">
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 class="text-base font-bold text-gray-900">{{ editingContactId ? 'Edit Contact' : 'New Contact' }}</h2>
          <button @click="closeContactModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="saveContact" class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">First Name *</label>
              <input v-model="contactForm.first_name" required class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Last Name</label>
              <input v-model="contactForm.last_name" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Email</label>
              <input v-model="contactForm.email" type="email" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Phone</label>
              <input v-model="contactForm.phone" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Company</label>
              <input v-model="contactForm.company" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Title / Role</label>
              <input v-model="contactForm.title" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Contact Type</label>
              <select v-model="contactForm.contact_type" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="t in CONTACT_TYPES" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Pipeline Stage</label>
              <select v-model="contactForm.pipeline_stage" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="s in PIPELINE_STAGES" :key="s.id" :value="s.id">{{ s.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Lead Source</label>
              <select v-model="contactForm.lead_source" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">—</option>
                <option v-for="s in LEAD_SOURCES" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">City</label>
              <input v-model="contactForm.city" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Next Follow-Up</label>
              <input v-model="contactForm.next_follow_up" type="date" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Lifetime Value (₱)</label>
              <input v-model.number="contactForm.lifetime_value" type="number" min="0" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
              <textarea v-model="contactForm.notes" rows="2" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
          </div>
          <div v-if="modalError" class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{{ modalError }}</div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeContactModal" class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="isSaving" class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              {{ isSaving ? 'Saving…' : (editingContactId ? 'Save Changes' : 'Add Contact') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── COMPANY MODAL ──────────────────────────────────────── -->
    <div v-if="showCompanyModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="closeCompanyModal">
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 class="text-base font-bold text-gray-900">{{ editingCompanyId ? 'Edit Company' : 'New Company' }}</h2>
          <button @click="closeCompanyModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="saveCompany" class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Company Name *</label>
              <input v-model="companyForm.name" required class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Industry</label>
              <select v-model="companyForm.industry" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">—</option>
                <option v-for="i in INDUSTRIES" :key="i" :value="i">{{ i }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Status</label>
              <select v-model="companyForm.status" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="s in ['Lead','Prospect','Client','Inactive']" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Email</label>
              <input v-model="companyForm.email" type="email" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Phone</label>
              <input v-model="companyForm.phone" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">City</label>
              <input v-model="companyForm.city" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Company Size</label>
              <select v-model="companyForm.company_size" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">—</option>
                <option v-for="s in ['1-10','11-50','51-200','201-500','500+']" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Website</label>
              <input v-model="companyForm.website" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
              <textarea v-model="companyForm.notes" rows="2" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
          </div>
          <div v-if="modalError" class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{{ modalError }}</div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeCompanyModal" class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="isSaving" class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              {{ isSaving ? 'Saving…' : (editingCompanyId ? 'Save Changes' : 'Add Company') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── ACTIVITY MODAL ─────────────────────────────────────── -->
    <div v-if="showActivityModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="closeActivityModal">
      <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 class="text-base font-bold text-gray-900">Log Activity</h2>
          <button @click="closeActivityModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="saveActivity" class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Subject *</label>
              <input v-model="activityForm.subject" required class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Type</label>
              <select v-model="activityForm.type" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="t in ACTIVITY_TYPES" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Direction</label>
              <select v-model="activityForm.direction" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Outbound">Outbound</option>
                <option value="Inbound">Inbound</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Contact</label>
              <input v-model="activityForm.contact" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Date</label>
              <input v-model="activityForm.date" type="date" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Outcome</label>
              <select v-model="activityForm.outcome" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="o in OUTCOMES" :key="o" :value="o">{{ o }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Duration (min)</label>
              <input v-model.number="activityForm.duration_min" type="number" min="0" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Next Action</label>
              <input v-model="activityForm.next_action" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
              <textarea v-model="activityForm.notes" rows="2" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
          </div>
          <div v-if="modalError" class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{{ modalError }}</div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeActivityModal" class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="isSaving" class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              {{ isSaving ? 'Saving…' : 'Log Activity' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── TASK MODAL ─────────────────────────────────────────── -->
    <div v-if="showTaskModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="closeTaskModal">
      <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 class="text-base font-bold text-gray-900">{{ editingTaskId ? 'Edit Task' : 'New Task' }}</h2>
          <button @click="closeTaskModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="saveTask" class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Task Title *</label>
              <input v-model="taskForm.title" required class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Type</label>
              <select v-model="taskForm.type" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="t in TASK_TYPES" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Priority</label>
              <select v-model="taskForm.priority" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Due Date</label>
              <input v-model="taskForm.due_date" type="date" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Status</label>
              <select v-model="taskForm.status" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="s in ['Open','In Progress','Completed','Cancelled']" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Contact</label>
              <input v-model="taskForm.contact" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Assigned To</label>
              <input v-model="taskForm.assigned_to" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
              <textarea v-model="taskForm.notes" rows="2" class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
          </div>
          <div v-if="modalError" class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{{ modalError }}</div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeTaskModal" class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="isSaving" class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              {{ isSaving ? 'Saving…' : (editingTaskId ? 'Save Changes' : 'Add Task') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { db } from '@/firebase'
import {
  collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy, where, getDoc
} from 'firebase/firestore'

// ── Types ───────────────────────────────────────────────────────
interface CRMDeal {
  id: string; name: string; company: string; contact: string
  service_type: string; value: number; stage: string; probability: number
  expected_close: string; priority: string; notes: string
  source_inquiry_id?: string; created_at: string
}
interface CRMContact {
  id: string; first_name: string; last_name: string; email: string; phone: string
  company: string; title: string; contact_type: string; pipeline_stage: string
  lead_source: string; city: string; next_follow_up: string; lifetime_value: number
  notes: string; source_inquiry_id?: string; created_at: string
}
interface CRMCompany {
  id: string; name: string; industry: string; email: string; phone: string
  city: string; company_size: string; status: string; website: string
  total_revenue: number; notes: string; created_at: string
}
interface CRMActivity {
  id: string; date: string; type: string; direction: string; contact: string
  subject: string; duration_min: number; outcome: string; next_action: string
  logged_by: string; notes: string; source_call_id?: string; created_at: string
}
interface CRMTask {
  id: string; title: string; type: string; priority: string; due_date: string
  status: string; contact: string; assigned_to: string; notes: string
  source_inquiry_id?: string; created_at: string
}

// ── Props/Emits ─────────────────────────────────────────────────
const props = defineProps<{
  pendingInquiries?: Array<{ id: string; name: string; email: string; company?: string; service: string; createdAt: Date }>
  pendingCalls?: Array<{ id: string; name: string; email: string; company?: string; selectedDate: string; selectedTime: string; createdAt: Date }>
}>()

// ── Constants ───────────────────────────────────────────────────
const PIPELINE_STAGES = [
  { id: 'Lead',          label: 'Lead',          color: 'text-gray-500' },
  { id: 'Qualified',     label: 'Qualified',     color: 'text-blue-600' },
  { id: 'Discovery',     label: 'Discovery',     color: 'text-indigo-600' },
  { id: 'Proposal Sent', label: 'Proposal Sent', color: 'text-purple-600' },
  { id: 'Negotiation',   label: 'Negotiation',   color: 'text-amber-600' },
  { id: 'Closed Won',    label: 'Closed Won',    color: 'text-green-600' },
]
const CONTACT_TYPES  = ['Lead','Prospect','Client','Partner','Churned']
const LEAD_SOURCES   = ['Referral','LinkedIn','Facebook','Website','Event','Cold Outreach']
const INDUSTRIES     = ['F&B','Healthcare','Retail','Tech/Startup','Education','Agriculture','Services','Real Estate']
const ACTIVITY_TYPES = ['Call','Email','Meeting','WhatsApp','LinkedIn','Demo']
const TASK_TYPES     = ['Follow-Up','Proposal','Meeting','Document','Admin','Demo','Call']
const PRIORITIES     = ['Low','Medium','High','Critical']
const OUTCOMES       = ['Sent','Interested','Positive','In Progress','No reply yet','Satisfied','Not Interested']

// ── State ───────────────────────────────────────────────────────
const activeTab     = ref('pipeline')
const isLoading     = ref(true)

const deals     = ref<CRMDeal[]>([])
const contacts  = ref<CRMContact[]>([])
const companies = ref<CRMCompany[]>([])
const activities = ref<CRMActivity[]>([])
const tasks     = ref<CRMTask[]>([])

const contactSearch     = ref('')
const contactTypeFilter = ref('')
const companySearch     = ref('')
const taskStatusFilter  = ref('')

const isSaving   = ref(false)
const modalError = ref<string|null>(null)

// Modal state
const showDealModal    = ref(false)
const showContactModal = ref(false)
const showCompanyModal = ref(false)
const showActivityModal = ref(false)
const showTaskModal    = ref(false)

const editingDealId    = ref<string|null>(null)
const editingContactId = ref<string|null>(null)
const editingCompanyId = ref<string|null>(null)
const editingTaskId    = ref<string|null>(null)

const emptyDeal = () => ({ name:'', company:'', contact:'', service_type:'', value:0, probability:20, stage:'Lead', priority:'Medium', expected_close:'', notes:'' })
const emptyContact = () => ({ first_name:'', last_name:'', email:'', phone:'', company:'', title:'', contact_type:'Lead', pipeline_stage:'Lead', lead_source:'', city:'Baguio City', next_follow_up:'', lifetime_value:0, notes:'' })
const emptyCompany = () => ({ name:'', industry:'', email:'', phone:'', city:'Baguio City', company_size:'', status:'Lead', website:'', notes:'' })
const emptyActivity = () => ({ subject:'', type:'Call', direction:'Outbound', contact:'', date: new Date().toISOString().split('T')[0], outcome:'', duration_min:0, next_action:'', notes:'' })
const emptyTask = () => ({ title:'', type:'Follow-Up', priority:'Medium', due_date:'', status:'Open', contact:'', assigned_to:'Rey', notes:'' })

const dealForm     = ref(emptyDeal())
const contactForm  = ref(emptyContact())
const companyForm  = ref(emptyCompany())
const activityForm = ref(emptyActivity())
const taskForm     = ref(emptyTask())

// ── Computed ────────────────────────────────────────────────────
const openDeals = computed(() => deals.value.filter(d => d.stage !== 'Closed Lost'))
const pipelineValue  = computed(() => openDeals.value.filter(d => d.stage !== 'Closed Won').reduce((s, d) => s + (d.value * d.probability / 100), 0))
const closedWonValue = computed(() => deals.value.filter(d => d.stage === 'Closed Won').reduce((s, d) => s + d.value, 0))

const overdueTasks = computed(() => tasks.value.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled' && isOverdue(t.due_date)).length)

const tabs = computed(() => [
  { id: 'pipeline',   label: 'Pipeline',   icon: 'fa-solid fa-chart-kanban' },
  { id: 'contacts',   label: 'Contacts',   icon: 'fa-solid fa-user-group' },
  { id: 'companies',  label: 'Companies',  icon: 'fa-solid fa-building' },
  { id: 'activities', label: 'Activities', icon: 'fa-solid fa-timeline' },
  { id: 'tasks',      label: 'Tasks',      icon: 'fa-solid fa-list-check', badge: overdueTasks.value },
])

const filteredContacts = computed(() => {
  let list = contacts.value
  if (contactTypeFilter.value) list = list.filter(c => c.contact_type === contactTypeFilter.value)
  if (contactSearch.value) {
    const q = contactSearch.value.toLowerCase()
    list = list.filter(c =>
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q)
    )
  }
  return list
})

const filteredCompanies = computed(() => {
  if (!companySearch.value) return companies.value
  const q = companySearch.value.toLowerCase()
  return companies.value.filter(c => c.name.toLowerCase().includes(q) || c.industry?.toLowerCase().includes(q))
})

const filteredTasks = computed(() => {
  let list = [...tasks.value].sort((a, b) => {
    if (!a.due_date) return 1
    if (!b.due_date) return -1
    return a.due_date.localeCompare(b.due_date)
  })
  if (taskStatusFilter.value) list = list.filter(t => t.status === taskStatusFilter.value)
  return list
})

// ── Helpers ─────────────────────────────────────────────────────
function fmt(n: number) {
  if (!n) return '0'
  return n.toLocaleString('en-PH', { maximumFractionDigits: 0 })
}
function fmtDate(d: string) {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date.getTime())) return d
  return date.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
}
function isOverdue(d?: string) {
  if (!d) return false
  return new Date(d) < new Date(new Date().toDateString())
}
function dealsByStage(stage: string) {
  return deals.value.filter(d => d.stage === stage)
}
function priorityColor(p: string) {
  return p === 'Critical' ? 'bg-red-100 text-red-700'
    : p === 'High' ? 'bg-orange-100 text-orange-700'
    : p === 'Medium' ? 'bg-yellow-100 text-yellow-700'
    : 'bg-gray-100 text-gray-500'
}
function contactTypeColor(t: string) {
  return t === 'Client'  ? 'bg-green-100 text-green-700'
    : t === 'Prospect'   ? 'bg-blue-100 text-blue-700'
    : t === 'Partner'    ? 'bg-purple-100 text-purple-700'
    : t === 'Churned'    ? 'bg-gray-100 text-gray-500'
    : 'bg-amber-100 text-amber-700'
}
function companyStatusColor(s: string) {
  return s === 'Client'   ? 'bg-green-100 text-green-700'
    : s === 'Prospect'    ? 'bg-blue-100 text-blue-700'
    : s === 'Inactive'    ? 'bg-gray-100 text-gray-500'
    : 'bg-amber-100 text-amber-700'
}
function taskStatusColor(s: string) {
  return s === 'Completed'   ? 'bg-green-100 text-green-700'
    : s === 'In Progress'    ? 'bg-blue-100 text-blue-700'
    : s === 'Cancelled'      ? 'bg-gray-100 text-gray-500'
    : 'bg-amber-100 text-amber-700'
}
function activityTypeColor(type: string) {
  const map: Record<string, { bg: string; icon: string; text: string }> = {
    Call:     { bg:'bg-green-50',  icon:'fa-solid fa-phone',     text:'text-green-600' },
    Email:    { bg:'bg-blue-50',   icon:'fa-solid fa-envelope',  text:'text-blue-600' },
    Meeting:  { bg:'bg-purple-50', icon:'fa-solid fa-users',     text:'text-purple-600' },
    WhatsApp: { bg:'bg-emerald-50',icon:'fa-brands fa-whatsapp', text:'text-emerald-600' },
    LinkedIn: { bg:'bg-sky-50',    icon:'fa-brands fa-linkedin', text:'text-sky-600' },
    Demo:     { bg:'bg-amber-50',  icon:'fa-solid fa-display',   text:'text-amber-600' },
  }
  return map[type] ?? { bg:'bg-gray-50', icon:'fa-solid fa-bolt', text:'text-gray-600' }
}

// ── Data fetching ────────────────────────────────────────────────
async function loadAll() {
  isLoading.value = true
  try {
    await Promise.all([loadDeals(), loadContacts(), loadCompanies(), loadActivities(), loadTasks()])
  } finally { isLoading.value = false }
}
async function loadDeals() {
  const snap = await getDocs(query(collection(db, 'crm_deals'), orderBy('created_at', 'desc')))
  deals.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as CRMDeal))
}
async function loadContacts() {
  const snap = await getDocs(query(collection(db, 'crm_contacts'), orderBy('created_at', 'desc')))
  contacts.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as CRMContact))
}
async function loadCompanies() {
  const snap = await getDocs(query(collection(db, 'crm_companies'), orderBy('created_at', 'desc')))
  companies.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as CRMCompany))
}
async function loadActivities() {
  const snap = await getDocs(query(collection(db, 'crm_activities'), orderBy('created_at', 'desc')))
  activities.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as CRMActivity))
}
async function loadTasks() {
  const snap = await getDocs(query(collection(db, 'crm_tasks'), orderBy('created_at', 'desc')))
  tasks.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as CRMTask))
}

// ── Automation: process new inquiries → CRM contact + deal + task ─
async function autoProcessInquiry(inq: { id: string; name: string; email: string; company?: string; service: string; createdAt: Date }) {
  // Check if already processed
  const existing = await getDocs(query(collection(db, 'crm_contacts'), where('source_inquiry_id', '==', inq.id)))
  if (!existing.empty) return

  const now = new Date().toISOString()
  const nameParts = inq.name.trim().split(' ')
  const firstName = nameParts[0] ?? inq.name
  const lastName  = nameParts.slice(1).join(' ')

  // Create contact
  const contactRef = await addDoc(collection(db, 'crm_contacts'), {
    first_name: firstName, last_name: lastName,
    email: inq.email, phone: '', company: inq.company || '',
    title: '', contact_type: 'Lead', pipeline_stage: 'Lead',
    lead_source: 'Website', city: 'Baguio City',
    next_follow_up: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    lifetime_value: 0, notes: `Inquiry: ${inq.service}`,
    source_inquiry_id: inq.id, created_at: now,
  })

  // Create deal
  await addDoc(collection(db, 'crm_deals'), {
    name: `${inq.company || inq.name} – ${inq.service}`,
    company: inq.company || '', contact: inq.name,
    service_type: inq.service, value: 0, stage: 'Lead',
    probability: 10, priority: 'Medium', expected_close: '',
    notes: '', source_inquiry_id: inq.id, created_at: now,
  })

  // Create follow-up task
  await addDoc(collection(db, 'crm_tasks'), {
    title: `Follow up with ${inq.name}`,
    type: 'Follow-Up', priority: 'High',
    due_date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    status: 'Open', contact: inq.name, assigned_to: 'Rey',
    notes: `New inquiry: ${inq.service}`, source_inquiry_id: inq.id,
    created_at: now,
  })
}

// ── Automation: process new call → CRM activity ──────────────────
async function autoProcessCall(call: { id: string; name: string; email: string; company?: string; selectedDate: string; selectedTime: string; createdAt: Date }) {
  const existing = await getDocs(query(collection(db, 'crm_activities'), where('source_call_id', '==', call.id)))
  if (!existing.empty) return

  await addDoc(collection(db, 'crm_activities'), {
    date: call.selectedDate, type: 'Call', direction: 'Inbound',
    contact: call.name, subject: `Consultation call – ${call.company || call.name}`,
    duration_min: 30, outcome: 'In Progress',
    next_action: 'Follow up after call', logged_by: 'System',
    notes: `Scheduled: ${call.selectedDate} at ${call.selectedTime}`,
    source_call_id: call.id, created_at: new Date().toISOString(),
  })
}

// ── Watch for new inquiries/calls from parent ────────────────────
watch(() => props.pendingInquiries, async (inquiries) => {
  if (!inquiries?.length) return
  for (const inq of inquiries) await autoProcessInquiry(inq)
  await Promise.all([loadContacts(), loadDeals(), loadTasks()])
}, { deep: true })

watch(() => props.pendingCalls, async (calls) => {
  if (!calls?.length) return
  for (const call of calls) await autoProcessCall(call)
  await loadActivities()
}, { deep: true })

// ── Public method for parent to sync deal stage ──────────────────
async function markDealWon(inquiryId: string) {
  const snap = await getDocs(query(collection(db, 'crm_deals'), where('source_inquiry_id', '==', inquiryId)))
  for (const d of snap.docs) {
    await updateDoc(doc(db, 'crm_deals', d.id), { stage: 'Closed Won', probability: 100 })
  }
  await loadDeals()
}
defineExpose({ markDealWon, autoProcessInquiry, autoProcessCall })

// ── Deal CRUD ────────────────────────────────────────────────────
function openDealModal(deal?: CRMDeal) {
  modalError.value = null
  if (deal) {
    editingDealId.value = deal.id
    dealForm.value = { name:deal.name, company:deal.company, contact:deal.contact, service_type:deal.service_type, value:deal.value, probability:deal.probability, stage:deal.stage, priority:deal.priority, expected_close:deal.expected_close, notes:deal.notes }
  } else {
    editingDealId.value = null
    dealForm.value = emptyDeal()
  }
  showDealModal.value = true
}
function closeDealModal() { showDealModal.value = false; editingDealId.value = null }

async function saveDeal() {
  modalError.value = null; isSaving.value = true
  try {
    const data = { ...dealForm.value, updated_at: new Date().toISOString() }
    if (editingDealId.value) {
      await updateDoc(doc(db, 'crm_deals', editingDealId.value), data)
    } else {
      await addDoc(collection(db, 'crm_deals'), { ...data, created_at: new Date().toISOString() })
    }
    await loadDeals(); closeDealModal()
  } catch (e) { modalError.value = 'Failed to save deal.' } finally { isSaving.value = false }
}

async function deleteDeal(deal: CRMDeal) {
  if (!confirm(`Delete "${deal.name}"?`)) return
  await deleteDoc(doc(db, 'crm_deals', deal.id))
  deals.value = deals.value.filter(d => d.id !== deal.id)
}

// ── Contact CRUD ─────────────────────────────────────────────────
function openContactModal(contact?: CRMContact) {
  modalError.value = null
  if (contact) {
    editingContactId.value = contact.id
    contactForm.value = { first_name:contact.first_name, last_name:contact.last_name, email:contact.email, phone:contact.phone, company:contact.company, title:contact.title, contact_type:contact.contact_type, pipeline_stage:contact.pipeline_stage, lead_source:contact.lead_source, city:contact.city, next_follow_up:contact.next_follow_up, lifetime_value:contact.lifetime_value, notes:contact.notes }
  } else {
    editingContactId.value = null
    contactForm.value = emptyContact()
  }
  showContactModal.value = true
}
function closeContactModal() { showContactModal.value = false; editingContactId.value = null }

async function saveContact() {
  modalError.value = null; isSaving.value = true
  try {
    const data = { ...contactForm.value, updated_at: new Date().toISOString() }
    if (editingContactId.value) {
      await updateDoc(doc(db, 'crm_contacts', editingContactId.value), data)
    } else {
      await addDoc(collection(db, 'crm_contacts'), { ...data, created_at: new Date().toISOString() })
    }
    await loadContacts(); closeContactModal()
  } catch (e) { modalError.value = 'Failed to save contact.' } finally { isSaving.value = false }
}

async function deleteContact(contact: CRMContact) {
  if (!confirm(`Delete ${contact.first_name} ${contact.last_name}?`)) return
  await deleteDoc(doc(db, 'crm_contacts', contact.id))
  contacts.value = contacts.value.filter(c => c.id !== contact.id)
}

// ── Company CRUD ─────────────────────────────────────────────────
function openCompanyModal(company?: CRMCompany) {
  modalError.value = null
  if (company) {
    editingCompanyId.value = company.id
    companyForm.value = { name:company.name, industry:company.industry, email:company.email, phone:company.phone, city:company.city, company_size:company.company_size, status:company.status, website:company.website, notes:company.notes }
  } else {
    editingCompanyId.value = null
    companyForm.value = emptyCompany()
  }
  showCompanyModal.value = true
}
function closeCompanyModal() { showCompanyModal.value = false; editingCompanyId.value = null }

async function saveCompany() {
  modalError.value = null; isSaving.value = true
  try {
    const data = { ...companyForm.value, total_revenue: 0, updated_at: new Date().toISOString() }
    if (editingCompanyId.value) {
      await updateDoc(doc(db, 'crm_companies', editingCompanyId.value), data)
    } else {
      await addDoc(collection(db, 'crm_companies'), { ...data, created_at: new Date().toISOString() })
    }
    await loadCompanies(); closeCompanyModal()
  } catch (e) { modalError.value = 'Failed to save company.' } finally { isSaving.value = false }
}

async function deleteCompany(company: CRMCompany) {
  if (!confirm(`Delete "${company.name}"?`)) return
  await deleteDoc(doc(db, 'crm_companies', company.id))
  companies.value = companies.value.filter(c => c.id !== company.id)
}

// ── Activity CRUD ─────────────────────────────────────────────────
function openActivityModal() {
  modalError.value = null; activityForm.value = emptyActivity(); showActivityModal.value = true
}
function closeActivityModal() { showActivityModal.value = false }

async function saveActivity() {
  modalError.value = null; isSaving.value = true
  try {
    await addDoc(collection(db, 'crm_activities'), { ...activityForm.value, logged_by: 'Rey', created_at: new Date().toISOString() })
    await loadActivities(); closeActivityModal()
  } catch (e) { modalError.value = 'Failed to log activity.' } finally { isSaving.value = false }
}

async function deleteActivity(act: CRMActivity) {
  if (!confirm('Delete this activity?')) return
  await deleteDoc(doc(db, 'crm_activities', act.id))
  activities.value = activities.value.filter(a => a.id !== act.id)
}

// ── Task CRUD ────────────────────────────────────────────────────
function openTaskModal(task?: CRMTask) {
  modalError.value = null
  if (task) {
    editingTaskId.value = task.id
    taskForm.value = { title:task.title, type:task.type, priority:task.priority, due_date:task.due_date, status:task.status, contact:task.contact, assigned_to:task.assigned_to, notes:task.notes }
  } else {
    editingTaskId.value = null; taskForm.value = emptyTask()
  }
  showTaskModal.value = true
}
function closeTaskModal() { showTaskModal.value = false; editingTaskId.value = null }

async function saveTask() {
  modalError.value = null; isSaving.value = true
  try {
    const data = { ...taskForm.value, updated_at: new Date().toISOString() }
    if (editingTaskId.value) {
      await updateDoc(doc(db, 'crm_tasks', editingTaskId.value), data)
    } else {
      await addDoc(collection(db, 'crm_tasks'), { ...data, created_at: new Date().toISOString() })
    }
    await loadTasks(); closeTaskModal()
  } catch (e) { modalError.value = 'Failed to save task.' } finally { isSaving.value = false }
}

async function deleteTask(task: CRMTask) {
  if (!confirm(`Delete "${task.title}"?`)) return
  await deleteDoc(doc(db, 'crm_tasks', task.id))
  tasks.value = tasks.value.filter(t => t.id !== task.id)
}

async function toggleTaskComplete(task: CRMTask) {
  const newStatus = task.status === 'Completed' ? 'Open' : 'Completed'
  await updateDoc(doc(db, 'crm_tasks', task.id), {
    status: newStatus,
    completed_date: newStatus === 'Completed' ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  })
  const idx = tasks.value.findIndex(t => t.id === task.id)
  if (idx !== -1 && tasks.value[idx]) tasks.value[idx]!.status = newStatus
}

onMounted(loadAll)
</script>
