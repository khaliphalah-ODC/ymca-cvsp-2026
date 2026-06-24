<script setup>
import { computed, onMounted, ref } from 'vue'
import AdminLayout from '../../components/stitch/AdminLayout.vue'
import { useSubmissionStore } from '../../stores/submissionStore'
import { supabase } from '../../utils/supabase'
import { exportSubmissionsCsv, exportSubmissionsDoc, exportSubmissionsExcel, exportSubmissionsPdf } from '../../utils/exportReports'

const store = useSubmissionStore()
const exportRows = computed(() => store.submissions)
const user = ref(null)
const profile = ref({ full_name: '', email: '', avatar_url: '', role: 'reviewer' })
const avatarFile = ref(null)
const avatarPreview = ref('')
const profileStatus = ref('')
const avatarStatus = ref('')
const passwordStatus = ref('')
const savingProfile = ref(false)
const uploadingAvatar = ref(false)
const changingPassword = ref(false)
const passwordForm = ref({ current: '', next: '', confirm: '' })

const passwordStrength = computed(() => {
  const value = passwordForm.value.next
  let score = 0
  if (value.length >= 8) score += 1
  if (/[A-Z]/.test(value)) score += 1
  if (/[a-z]/.test(value)) score += 1
  if (/\d/.test(value)) score += 1
  if (/[^A-Za-z0-9]/.test(value)) score += 1
  return score
})

async function loadProfile() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    profileStatus.value = error.message
    return
  }
  user.value = data.user
  profile.value.email = data.user?.email || ''

  const { data: adminProfile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('full_name, avatar_url, role')
    .eq('user_id', data.user.id)
    .maybeSingle()

  if (!profileError && adminProfile) {
    profile.value.full_name = adminProfile.full_name || ''
    profile.value.avatar_url = adminProfile.avatar_url || ''
    profile.value.role = adminProfile.role || 'reviewer'
    avatarPreview.value = adminProfile.avatar_url || ''
  }
}

function selectAvatar(event) {
  const file = event.target.files?.[0]
  avatarStatus.value = ''
  if (!file) return
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    avatarStatus.value = 'Use a JPG, PNG, or WebP image.'
    return
  }
  if (file.size > 2 * 1024 * 1024) {
    avatarStatus.value = 'Avatar must be 2 MB or smaller.'
    return
  }
  avatarFile.value = file
  avatarPreview.value = URL.createObjectURL(file)
}

async function saveProfile() {
  savingProfile.value = true
  profileStatus.value = ''
  try {
    const { error } = await supabase
      .from('admin_profiles')
      .upsert({
        user_id: user.value.id,
        full_name: profile.value.full_name,
        role: profile.value.role || 'reviewer',
      }, { onConflict: 'user_id' })
    if (error) throw error

    profileStatus.value = 'Profile saved.'
  } catch (err) {
    console.error('[Settings] profile save failed', err)
    profileStatus.value = err.message || 'Unable to save profile.'
  } finally {
    savingProfile.value = false
  }
}

async function uploadAvatar() {
  if (!avatarFile.value) {
    avatarStatus.value = 'Choose an image before saving.'
    return
  }
  uploadingAvatar.value = true
  avatarStatus.value = ''
  try {
    const extension = avatarFile.value.name.split('.').pop() || 'jpg'
    const path = `avatars/${user.value.id}.${extension}`
    const { error } = await supabase.storage.from('site-assets').upload(path, avatarFile.value, {
      cacheControl: '3600',
      upsert: true,
    })
    if (error) throw error
    const { data } = supabase.storage.from('site-assets').getPublicUrl(path)
    profile.value.avatar_url = data.publicUrl
    avatarPreview.value = data.publicUrl

    const { error: updateError } = await supabase
      .from('admin_profiles')
      .update({ avatar_url: data.publicUrl })
      .eq('user_id', user.value.id)
    if (updateError) throw updateError
    avatarStatus.value = 'Avatar uploaded.'
  } catch (err) {
    console.error('[Settings] avatar upload failed', err)
    avatarStatus.value = err.message || 'Unable to upload avatar.'
  } finally {
    uploadingAvatar.value = false
  }
}

async function changePassword() {
  passwordStatus.value = ''
  if (passwordStrength.value < 4) {
    passwordStatus.value = 'Choose a stronger password.'
    return
  }
  if (passwordForm.value.next !== passwordForm.value.confirm) {
    passwordStatus.value = 'New passwords do not match.'
    return
  }

  changingPassword.value = true
  try {
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.value.email,
      password: passwordForm.value.current,
    })
    if (verifyError) throw verifyError

    const { error } = await supabase.auth.updateUser({ password: passwordForm.value.next })
    if (error) throw error
    passwordForm.value = { current: '', next: '', confirm: '' }
    passwordStatus.value = 'Password updated.'
  } catch (err) {
    console.error('[Settings] password change failed', err)
    passwordStatus.value = err.message || 'Unable to change password.'
  } finally {
    changingPassword.value = false
  }
}

onMounted(() => {
  loadProfile()
  store.fetchSubmissions({ limit: 100 })
})
</script>

<template>
  <AdminLayout title="Settings" subtitle="Manage admin profile, avatar, password, reports, and QR code tools.">
      <section class="max-w-5xl mx-auto bg-surface card-shadow rounded-xl border border-outline-variant p-xl mb-lg">
        <RouterLink class="inline-flex items-center gap-xs px-lg py-sm bg-primary text-on-primary rounded-xl font-bold" to="/admin/qr-codes">
          <span class="material-symbols-outlined text-[20px]">qr_code_2</span>
          Manage QR Codes
        </RouterLink>
      </section>

      <section class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-md">Profile</h2>
          <div class="space-y-md">
            <label class="block space-y-sm"><span class="font-label-md text-label-md">Name</span><input v-model.trim="profile.full_name" class="w-full h-11 px-md bg-white border border-outline rounded-lg" type="text" /></label>
            <label class="block space-y-sm"><span class="font-label-md text-label-md">Login Email</span><input v-model.trim="profile.email" class="w-full h-11 px-md bg-surface-container-low border border-outline rounded-lg text-on-surface-variant" readonly type="email" /></label>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Email changes are handled from Supabase Auth so staff do not get locked out by mistake.</p>
            <button class="px-lg py-sm bg-primary text-on-primary rounded-xl font-bold disabled:opacity-70" :disabled="savingProfile" type="button" @click="saveProfile">{{ savingProfile ? 'Saving...' : 'Save Profile' }}</button>
            <p v-if="profileStatus" class="font-body-md text-body-md text-on-surface-variant">{{ profileStatus }}</p>
          </div>
        </article>

        <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-md">Avatar</h2>
          <div class="flex items-center gap-lg">
            <div class="w-28 h-28 rounded-full border border-outline-variant bg-surface-container-low overflow-hidden grid place-items-center">
              <img v-if="avatarPreview" class="w-full h-full object-cover" alt="Admin avatar preview" :src="avatarPreview" />
              <span v-else class="material-symbols-outlined text-5xl text-primary">account_circle</span>
            </div>
            <div class="space-y-sm">
              <label class="inline-flex items-center gap-xs px-lg py-sm bg-surface-container-high text-on-surface rounded-xl font-bold cursor-pointer">
                <span class="material-symbols-outlined text-[20px]">image</span>
                Choose Image
                <input class="hidden" accept="image/jpeg,image/png,image/webp" type="file" @change="selectAvatar" />
              </label>
              <button class="block px-lg py-sm bg-primary text-on-primary rounded-xl font-bold disabled:opacity-70" :disabled="uploadingAvatar" type="button" @click="uploadAvatar">{{ uploadingAvatar ? 'Uploading...' : 'Save Avatar' }}</button>
            </div>
          </div>
          <p v-if="avatarStatus" class="font-body-md text-body-md text-on-surface-variant mt-md">{{ avatarStatus }}</p>
        </article>

        <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-md">Password</h2>
          <div class="space-y-md">
            <input v-model="passwordForm.current" class="w-full h-11 px-md bg-white border border-outline rounded-lg" placeholder="Current password" type="password" />
            <input v-model="passwordForm.next" class="w-full h-11 px-md bg-white border border-outline rounded-lg" placeholder="New password" type="password" />
            <input v-model="passwordForm.confirm" class="w-full h-11 px-md bg-white border border-outline rounded-lg" placeholder="Confirm password" type="password" />
            <div class="h-2 rounded-full bg-surface-container-high overflow-hidden"><div class="h-full bg-primary transition-all" :style="{ width: `${passwordStrength * 20}%` }"></div></div>
            <button class="px-lg py-sm bg-primary text-on-primary rounded-xl font-bold disabled:opacity-70" :disabled="changingPassword" type="button" @click="changePassword">{{ changingPassword ? 'Updating...' : 'Change Password' }}</button>
            <p v-if="passwordStatus" class="font-body-md text-body-md text-on-surface-variant">{{ passwordStatus }}</p>
          </div>
        </article>

        <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-sm">General Report Export</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mb-lg">Download all loaded complaints and suggestions with submitter contact details.</p>
          <div class="space-y-sm">
            <button class="w-full inline-flex items-center justify-center gap-xs px-lg py-sm bg-primary text-on-primary rounded-xl font-bold" type="button" @click="exportSubmissionsExcel(exportRows)"><span class="material-symbols-outlined text-[20px]">dataset</span>Export Excel</button>
            <button class="w-full inline-flex items-center justify-center gap-xs px-lg py-sm bg-surface-container-high text-on-surface rounded-xl font-bold" type="button" @click="exportSubmissionsCsv(exportRows)"><span class="material-symbols-outlined text-[20px]">table_view</span>Export CSV</button>
            <button class="w-full inline-flex items-center justify-center gap-xs px-lg py-sm bg-surface-container-high text-on-surface rounded-xl font-bold" type="button" @click="exportSubmissionsPdf(exportRows)"><span class="material-symbols-outlined text-[20px]">picture_as_pdf</span>Export PDF</button>
            <button class="w-full inline-flex items-center justify-center gap-xs px-lg py-sm bg-surface-container-high text-on-surface rounded-xl font-bold" type="button" @click="exportSubmissionsDoc(exportRows)"><span class="material-symbols-outlined text-[20px]">description</span>Export DOC</button>
          </div>
          <p class="font-label-sm text-label-sm text-on-surface-variant mt-md">{{ exportRows.length }} submissions loaded for export.</p>
        </article>
      </section>
  </AdminLayout>
</template>
