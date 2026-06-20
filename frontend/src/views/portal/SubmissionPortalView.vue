<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isSupabaseConfigured, supabase } from '../../utils/supabase'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  submitted_by_type: 'parent',
  is_anonymous: false,
  full_name: '',
  phone: '',
  email: '',
  number_of_children_in_program: 1,
  child_context: '',
  age_group: '',
  program_group: '',
  follow_up_preference: false,
  supervision_role: '',
  program_name: 'Basketball Academy',
  type: 'complaint',
  category: 'program',
  urgency: 'medium',
  message: '',
})

const hasQrLocation = computed(() => Boolean(route.query.location))
const location = computed(() => route.query.location || '')
const stepNumber = computed(() => form.is_anonymous ? '3' : '4')

async function submitFeedback() {
  loading.value = true
  error.value = ''
  try {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured yet.')

    const payload = {
      p_submitted_by_type: form.submitted_by_type,
      p_is_anonymous: form.is_anonymous,
      p_parent: {
        full_name: form.is_anonymous ? null : form.full_name,
        phone: form.is_anonymous ? null : form.phone,
        email: form.is_anonymous ? null : form.email,
        number_of_children_in_program: form.number_of_children_in_program,
        program_name: form.program_name,
        child_context: form.child_context,
      },
      p_child: {
        full_name: form.is_anonymous ? null : form.full_name,
        age_group: form.age_group,
        program_group: form.program_group,
        program_name: form.program_name,
        follow_up_preference: form.follow_up_preference,
      },
      p_caregiver: {
        full_name: form.is_anonymous ? null : form.full_name,
        phone: form.is_anonymous ? null : form.phone,
        email: form.is_anonymous ? null : form.email,
        program_name: form.program_name,
        supervision_role: form.supervision_role,
      },
      p_type: form.type,
      p_category: form.category,
      p_urgency: form.urgency,
      p_message: form.message,
      p_location: String(location.value),
    }

    const { data, error: rpcError } = await supabase.rpc('submit_program_feedback', payload)
    if (rpcError) throw rpcError
    router.push(`/success/${data?.[0]?.ticket_ref || 'YMCA-00001'}`)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-background text-on-surface font-body-md min-h-screen pb-20">
    <header class="w-full bg-white card-shadow h-20 flex items-center px-md lg:px-xl sticky top-0 z-50">
      <div class="max-w-container-max-width mx-auto w-full flex justify-between items-center">
        <RouterLink class="flex items-center gap-sm" to="/">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-white" style="font-variation-settings: 'FILL' 1;">diversity_1</span>
          </div>
          <h1 class="font-headline-md text-headline-md font-bold text-primary tracking-tight">Montserrado YMCA</h1>
        </RouterLink>
        <div class="flex items-center gap-xs px-sm py-1 bg-secondary-container rounded-full text-on-secondary-container">
          <span class="material-symbols-outlined text-sm">lock</span>
          <span class="font-label-sm text-label-sm">Private Portal</span>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-margin-mobile md:px-0 py-xl">
      <div class="mb-xl">
        <div v-if="hasQrLocation" class="inline-flex items-center gap-xs bg-tertiary-container text-white px-md py-1 rounded-full mb-md">
          <span class="material-symbols-outlined text-[18px]">location_on</span>
          <span class="font-label-md text-label-md">Location: {{ location }}</span>
        </div>
        <h2 class="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-sm leading-tight">YMCA Complaint & Suggestion System</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Help us improve our vocational and youth development programs. Your feedback ensures a safe and empowering environment for everyone in Montserrado County.
        </p>
      </div>

      <section v-if="!hasQrLocation" class="bg-white rounded-xl p-lg card-shadow border border-outline-variant/30">
        <div class="flex flex-col md:flex-row md:items-center gap-lg">
          <div class="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-4xl">qr_code_scanner</span>
          </div>
          <div class="flex-1">
            <h3 class="font-headline-md text-headline-md mb-xs">QR code required</h3>
            <p class="font-body-md text-body-md text-on-surface-variant">
              This private feedback form opens from a YMCA location QR code. Please scan the QR code posted by staff at your program area.
            </p>
          </div>
          <RouterLink class="inline-flex items-center justify-center gap-xs px-lg py-sm bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity" to="/admin/qr-codes">
            <span class="material-symbols-outlined text-[20px]">lock</span>
            Staff QR Page
          </RouterLink>
        </div>
      </section>

      <form v-else class="space-y-xl" @submit.prevent="submitFeedback">
        <section class="bg-white rounded-xl p-lg card-shadow border border-outline-variant/30">
          <h3 class="font-headline-md text-headline-md mb-lg flex items-center gap-sm">
            <span class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-sm">1</span>
            I am a:
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
            <label v-for="option in [['parent','family_restroom','Parent'],['child','child_care','Child / Youth'],['caregiver','supervised_user_circle','Caregiver']]" :key="option[0]" class="cursor-pointer group">
              <input v-model="form.submitted_by_type" class="hidden peer" name="user_type" type="radio" :value="option[0]"/>
              <div class="h-full p-md rounded-xl border-2 border-outline-variant bg-surface transition-all peer-checked:border-primary peer-checked:bg-primary-fixed flex flex-col items-center text-center gap-sm">
                <span class="material-symbols-outlined text-3xl text-secondary peer-checked:text-primary">{{ option[1] }}</span>
                <span class="font-label-md text-label-md text-on-surface">{{ option[2] }}</span>
              </div>
            </label>
          </div>
        </section>

        <section class="bg-white rounded-xl p-lg card-shadow border border-outline-variant/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-sm">
              <span class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-sm">2</span>
              <h3 class="font-headline-md text-headline-md">Submit Anonymously?</h3>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="form.is_anonymous" class="sr-only peer" type="checkbox"/>
              <div class="w-14 h-8 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <p class="mt-sm text-on-surface-variant font-body-md italic pl-10">We will respect your privacy if you choose to remain anonymous.</p>
        </section>

        <section v-if="!form.is_anonymous" class="bg-white rounded-xl p-lg card-shadow border border-outline-variant/30 transition-all">
          <h3 class="font-headline-md text-headline-md mb-lg flex items-center gap-sm">
            <span class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-sm">3</span>
            Submitter Info
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <label class="space-y-sm"><span class="font-label-md text-label-md block">Full Name</span><input v-model.trim="form.full_name" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0" placeholder="Enter your name" type="text"/></label>
            <label class="space-y-sm"><span class="font-label-md text-label-md block">Phone Number</span><input v-model.trim="form.phone" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0" placeholder="+231 00-000-000" type="tel"/></label>
            <label class="space-y-sm md:col-span-2"><span class="font-label-md text-label-md block">Email Address</span><input v-model.trim="form.email" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0" placeholder="email@example.com" type="email"/></label>
          </div>
        </section>

        <section class="bg-white rounded-xl p-lg card-shadow border border-outline-variant/30">
          <h3 class="font-headline-md text-headline-md mb-lg flex items-center gap-sm">
            <span class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-sm">{{ stepNumber }}</span>
            Program & Feedback Details
          </h3>
          <div class="space-y-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <label class="space-y-sm"><span class="font-label-md text-label-md block">Program Selection</span><select v-model="form.program_name" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0 appearance-none"><option>Basketball Academy</option><option>Computer Literacy</option><option>Vocational Training</option><option>Youth Leadership Circle</option><option>Other</option></select></label>
              <label class="space-y-sm"><span class="font-label-md text-label-md block">Category</span><select v-model="form.category" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0 appearance-none"><option value="staff">Staff Professionalism</option><option value="safety">Safety & Security</option><option value="facilities">Facilities & Equipment</option><option value="program">Program Quality</option><option value="other">General Suggestion</option></select></label>
            </div>

            <div v-if="form.submitted_by_type === 'parent'" class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <label class="space-y-sm"><span class="font-label-md text-label-md block">Children in Program</span><input v-model.number="form.number_of_children_in_program" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0" min="1" type="number"/></label>
              <label class="space-y-sm"><span class="font-label-md text-label-md block">Child Context</span><input v-model.trim="form.child_context" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0" placeholder="Age/group or note"/></label>
            </div>
            <div v-if="form.submitted_by_type === 'child'" class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <label class="space-y-sm"><span class="font-label-md text-label-md block">Age Group</span><input v-model.trim="form.age_group" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0" placeholder="Ages 13-19"/></label>
              <label class="flex items-center gap-sm mt-8"><input v-model="form.follow_up_preference" type="checkbox"/> <span class="font-label-md text-label-md">I would like a trusted adult to follow up</span></label>
            </div>
            <label v-if="form.submitted_by_type === 'caregiver'" class="space-y-sm block"><span class="font-label-md text-label-md block">Supervision Role</span><input v-model.trim="form.supervision_role" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0" placeholder="Program caregiver, coach, supervisor"/></label>

            <div class="space-y-sm">
              <label class="font-label-md text-label-md block">Complaint or Suggestion</label>
              <div class="flex flex-wrap gap-md">
                <label class="flex-1 min-w-[140px] cursor-pointer"><input v-model="form.type" class="hidden peer" name="type" type="radio" value="complaint"/><div class="px-md py-3 rounded-xl border border-outline bg-white text-center transition-all peer-checked:border-primary peer-checked:bg-primary-fixed font-label-md">Complaint</div></label>
                <label class="flex-1 min-w-[140px] cursor-pointer"><input v-model="form.type" class="hidden peer" name="type" type="radio" value="suggestion"/><div class="px-md py-3 rounded-xl border border-outline bg-white text-center transition-all peer-checked:border-tertiary peer-checked:bg-tertiary-fixed font-label-md">Suggestion</div></label>
              </div>
            </div>

            <div class="space-y-sm">
              <label class="font-label-md text-label-md block">Urgency Level</label>
              <div class="flex flex-wrap gap-md">
                <label v-for="urgency in [['low','Low'],['medium','Medium'],['high','High'],['critical','Critical']]" :key="urgency[1]" class="flex-1 min-w-[100px] cursor-pointer">
                  <input v-model="form.urgency" class="hidden peer" name="urgency" type="radio" :value="urgency[0]"/>
                  <div class="px-md py-3 rounded-xl border border-outline bg-white text-center transition-all peer-checked:border-primary peer-checked:bg-primary-fixed font-label-md">{{ urgency[1] }}</div>
                </label>
              </div>
            </div>
            <label class="space-y-sm block"><span class="font-label-md text-label-md block">Your Message</span><textarea v-model.trim="form.message" class="w-full p-md bg-white border border-outline rounded-xl focus:ring-0 resize-none" minlength="10" placeholder="Please describe your experience or suggestion in detail..." required rows="5"></textarea></label>
          </div>
        </section>

        <p v-if="error" class="bg-error-container text-on-error-container px-md py-sm rounded-xl">{{ error }}</p>

        <div class="pt-lg">
          <button class="w-full md:w-auto px-2xl py-lg bg-primary text-white font-headline-md rounded-xl hover:bg-primary-container transition-all shadow-lg active:scale-95 flex items-center justify-center gap-sm disabled:opacity-70" :disabled="loading" type="submit">
            {{ loading ? 'Submitting...' : 'Submit Feedback' }}
            <span class="material-symbols-outlined">{{ loading ? 'sync' : 'send' }}</span>
          </button>
          <p class="text-on-surface-variant font-label-sm text-center md:text-left mt-md flex items-center gap-xs justify-center md:justify-start">
            <span class="material-symbols-outlined text-[14px]">shield_person</span>
            Your data is handled securely following YMCA privacy guidelines.
          </p>
        </div>
      </form>
    </main>
  </div>
</template>
