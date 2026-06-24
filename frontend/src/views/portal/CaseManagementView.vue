<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import AdminLayout from '../../components/stitch/AdminLayout.vue'
import { supabase } from '../../utils/supabase'

const loading = ref(false)
const saving = ref(false)
const error = ref('')
const success = ref('')
const staff = ref([])
const admins = ref([])
const form = reactive({
  user_id: '',
  full_name: '',
  role: 'reviewer',
})
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const adminByUserId = computed(() => {
  const map = new Map()
  admins.value.forEach((admin) => map.set(admin.user_id, admin))
  return map
})

async function loadAccessData() {
  loading.value = true
  error.value = ''
  try {
    const [{ data: staffRows, error: staffError }, { data: adminRows, error: adminError }] = await Promise.all([
      supabase.from('staff').select('id, auth_user_id, full_name, email, role, program_area, is_active').order('full_name'),
      supabase.from('admin_profiles').select('user_id, full_name, role, created_at').order('created_at', { ascending: false }),
    ])
    if (staffError) throw staffError
    if (adminError) throw adminError
    staff.value = staffRows || []
    admins.value = adminRows || []
  } catch (err) {
    console.error('[StaffRoles] load failed', err)
    error.value = err.message || 'Unable to load staff access.'
  } finally {
    loading.value = false
  }
}

async function grantAccess(payload) {
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    if (!payload.user_id) throw new Error('Auth User ID is required.')
    if (!uuidPattern.test(payload.user_id)) throw new Error('Use the full Supabase Auth User ID. It looks like 9df690fd-7a09-4b59-81c4-e0ad299d70ec.')
    const { error: upsertError } = await supabase
      .from('admin_profiles')
      .upsert({
        user_id: payload.user_id,
        full_name: payload.full_name || 'Staff User',
        role: payload.role || 'reviewer',
      }, { onConflict: 'user_id' })
    if (upsertError) throw upsertError
    success.value = `${payload.full_name || 'Staff user'} now has ${payload.role || 'reviewer'} access.`
    form.user_id = ''
    form.full_name = ''
    form.role = 'reviewer'
    await loadAccessData()
  } catch (err) {
    console.error('[StaffRoles] grant failed', err)
    error.value = err.message || 'Unable to grant access.'
  } finally {
    saving.value = false
  }
}

async function removeAccess(userId) {
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    const { error: deleteError } = await supabase.from('admin_profiles').delete().eq('user_id', userId)
    if (deleteError) throw deleteError
    success.value = 'Portal access removed.'
    await loadAccessData()
  } catch (err) {
    console.error('[StaffRoles] remove failed', err)
    error.value = err.message || 'Unable to remove access.'
  } finally {
    saving.value = false
  }
}

onMounted(loadAccessData)
</script>

<template>
  <AdminLayout title="Staff & Roles" subtitle="Grant dashboard access to existing YMCA staff. Use Admin for full access and Reviewer for staff who only review cases.">
      <section class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <article class="lg:col-span-1 bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
          <h2 class="font-headline-md text-headline-md mb-md">Grant Access</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mb-md">Create the person in Supabase Authentication first, then paste their full Auth User ID here.</p>
          <div class="space-y-md">
            <label class="block space-y-sm"><span class="font-label-md text-label-md">Auth User ID</span><input v-model.trim="form.user_id" class="w-full h-11 px-md bg-white border border-outline rounded-lg" placeholder="Supabase Auth UUID" type="text" /></label>
            <label class="block space-y-sm"><span class="font-label-md text-label-md">Name</span><input v-model.trim="form.full_name" class="w-full h-11 px-md bg-white border border-outline rounded-lg" placeholder="Staff name" type="text" /></label>
            <label class="block space-y-sm"><span class="font-label-md text-label-md">Role</span><select v-model="form.role" class="w-full h-11 px-md bg-white border border-outline rounded-lg"><option value="reviewer">Reviewer</option><option value="admin">Admin</option></select></label>
            <button class="w-full px-lg py-md bg-primary text-on-primary rounded-xl font-bold disabled:opacity-70" :disabled="saving" type="button" @click="grantAccess(form)">Save Access</button>
          </div>
          <p v-if="error" class="mt-md bg-error-container text-on-error-container px-md py-sm rounded-xl">{{ error }}</p>
          <p v-if="success" class="mt-md text-primary font-label-md text-label-md">{{ success }}</p>
        </article>

        <section class="lg:col-span-2 bg-surface card-shadow rounded-xl border border-outline-variant overflow-hidden">
          <div class="px-lg py-md border-b border-outline-variant bg-surface-container-low">
            <h2 class="font-headline-md text-headline-md">Staff Records</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead><tr class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low/50"><th class="px-lg py-md">Name</th><th class="px-lg py-md">Email</th><th class="px-lg py-md">Portal Role</th><th class="px-lg py-md text-right">Action</th></tr></thead>
              <tbody class="divide-y divide-outline-variant">
                <tr v-if="loading"><td class="px-lg py-lg" colspan="4">Loading staff...</td></tr>
                <tr v-for="person in staff" v-else :key="person.id">
                  <td class="px-lg py-md"><p class="font-bold">{{ person.full_name }}</p><p class="font-label-sm text-label-sm text-on-surface-variant">{{ person.program_area || person.role }}</p></td>
                  <td class="px-lg py-md">{{ person.email || 'No email' }}</td>
                  <td class="px-lg py-md capitalize">{{ adminByUserId.get(person.auth_user_id)?.role || 'No access' }}</td>
                  <td class="px-lg py-md text-right">
                    <button v-if="person.auth_user_id && !adminByUserId.has(person.auth_user_id)" class="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md" type="button" @click="grantAccess({ user_id: person.auth_user_id, staff_id: person.id, full_name: person.full_name, role: 'reviewer' })">Make Reviewer</button>
                    <button v-else-if="person.auth_user_id && adminByUserId.get(person.auth_user_id)?.role === 'reviewer'" class="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md" type="button" @click="grantAccess({ user_id: person.auth_user_id, staff_id: person.id, full_name: person.full_name, role: 'admin' })">Make Admin</button>
                    <span v-else-if="!person.auth_user_id" class="font-label-sm text-label-sm text-on-surface-variant">No Auth ID</span>
                    <button v-else class="px-md py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md" type="button" @click="removeAccess(person.auth_user_id)">Remove</button>
                  </td>
                </tr>
                <tr v-if="!loading && !staff.length"><td class="px-lg py-lg text-on-surface-variant" colspan="4">No staff records yet. Use the manual form for existing Supabase Auth users.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
  </AdminLayout>
</template>
