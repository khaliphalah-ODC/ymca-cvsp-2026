<script setup>
import { computed, onMounted, ref } from 'vue'
import AdminMobileNav from '../../components/stitch/AdminMobileNav.vue'
import { useSubmissionStore } from '../../stores/submissionStore'
import { supabase } from '../../utils/supabase'
import { exportSubmissionsCsv, exportSubmissionsDoc, exportSubmissionsPdf } from '../../utils/exportReports'

const store = useSubmissionStore()
const imagePreview = ref(localStorage.getItem('ymca_brand_image') || '')
const imageStatus = ref('')
const uploading = ref(false)
const exportRows = computed(() => store.submissions)

function readLocalPreview(file) {
  const reader = new FileReader()
  reader.onload = () => {
    imagePreview.value = String(reader.result)
    localStorage.setItem('ymca_brand_image', imagePreview.value)
  }
  reader.readAsDataURL(file)
}

async function uploadImage(event) {
  const file = event.target.files?.[0]
  if (!file) return

  uploading.value = true
  imageStatus.value = ''
  readLocalPreview(file)

  try {
    const extension = file.name.split('.').pop() || 'png'
    const path = `settings/ymca-brand-${Date.now()}.${extension}`
    const { error } = await supabase.storage.from('site-assets').upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })
    if (error) throw error

    const { data } = supabase.storage.from('site-assets').getPublicUrl(path)
    imagePreview.value = data.publicUrl
    localStorage.setItem('ymca_brand_image', data.publicUrl)
    imageStatus.value = 'Image uploaded and saved.'
  } catch (err) {
    imageStatus.value = 'Preview saved locally. Create a public Supabase Storage bucket named site-assets to save this online.'
  } finally {
    uploading.value = false
  }
}

onMounted(() => {
  store.fetchSubmissions({ limit: 100 })
})
</script>

<template>
  <div class="text-on-background bg-background min-h-screen">
    <AdminMobileNav />
    <main class="p-xl lg:p-2xl">
      <section class="max-w-5xl mx-auto bg-surface card-shadow rounded-xl border border-outline-variant p-xl mb-lg">
        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-sm">Settings</h1>
        <p class="font-body-md text-body-md text-on-surface-variant mb-lg">Manage program names, staff access, QR locations, and notification rules.</p>
        <RouterLink class="inline-flex items-center gap-xs px-lg py-sm bg-primary text-on-primary rounded-xl font-bold" to="/admin/qr-codes">
          <span class="material-symbols-outlined text-[20px]">qr_code_2</span>
          Manage QR Codes
        </RouterLink>
      </section>

      <section class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-sm">Brand Image Upload</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mb-lg">Upload a YMCA logo or image for admin branding and future public-page use.</p>

          <div class="rounded-xl border border-outline-variant bg-surface-container-low p-lg mb-lg flex items-center justify-center min-h-48">
            <img v-if="imagePreview" class="max-h-40 object-contain" alt="Uploaded YMCA brand preview" :src="imagePreview" />
            <div v-else class="text-center text-on-surface-variant">
              <span class="material-symbols-outlined text-5xl">image</span>
              <p class="font-label-md text-label-md">No image uploaded</p>
            </div>
          </div>

          <label class="inline-flex items-center gap-xs px-lg py-sm bg-primary text-on-primary rounded-xl font-bold cursor-pointer">
            <span class="material-symbols-outlined text-[20px]">upload</span>
            {{ uploading ? 'Uploading...' : 'Choose Image' }}
            <input class="hidden" accept="image/*" type="file" @change="uploadImage" />
          </label>
          <p v-if="imageStatus" class="font-body-md text-body-md text-on-surface-variant mt-md">{{ imageStatus }}</p>
        </article>

        <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-sm">Report Export</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mb-lg">Download the latest submissions for offline review and reporting.</p>

          <div class="space-y-sm">
            <button class="w-full inline-flex items-center justify-center gap-xs px-lg py-sm bg-surface-container-high text-on-surface rounded-xl font-bold" type="button" @click="exportSubmissionsCsv(exportRows)">
              <span class="material-symbols-outlined text-[20px]">table_view</span>
              Export CSV
            </button>
            <button class="w-full inline-flex items-center justify-center gap-xs px-lg py-sm bg-surface-container-high text-on-surface rounded-xl font-bold" type="button" @click="exportSubmissionsPdf(exportRows)">
              <span class="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              Export PDF
            </button>
            <button class="w-full inline-flex items-center justify-center gap-xs px-lg py-sm bg-surface-container-high text-on-surface rounded-xl font-bold" type="button" @click="exportSubmissionsDoc(exportRows)">
              <span class="material-symbols-outlined text-[20px]">description</span>
              Export DOC
            </button>
          </div>
          <p class="font-label-sm text-label-sm text-on-surface-variant mt-md">{{ exportRows.length }} submissions loaded for export.</p>
        </article>
      </section>
    </main>
  </div>
</template>
