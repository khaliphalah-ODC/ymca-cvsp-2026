import { computed, ref } from 'vue'
import { isSupabaseConfigured, supabase } from './supabase'

const user = ref(null)
const loading = ref(false)
const error = ref('')

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(user.value))

  async function getUser() {
    if (!isSupabaseConfigured) return null
    loading.value = true
    error.value = ''
    try {
      const { data, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      user.value = data.user || null
      return user.value
    } catch (err) {
      user.value = null
      error.value = err.message || 'Unable to check staff session.'
      return null
    } finally {
      loading.value = false
    }
  }

  async function login(email, password) {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured yet.')
    loading.value = true
    error.value = ''
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) throw loginError
      user.value = data.user
      return data.user
    } catch (err) {
      error.value = err.message || 'Unable to sign in.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    if (!isSupabaseConfigured) return
    loading.value = true
    error.value = ''
    try {
      const { error: logoutError } = await supabase.auth.signOut()
      if (logoutError) throw logoutError
      user.value = null
    } catch (err) {
      error.value = err.message || 'Unable to sign out.'
      throw err
    } finally {
      loading.value = false
    }
  }

  function onAuthChange(callback) {
    if (!isSupabaseConfigured) return () => {}
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
      if (callback) callback(user.value)
    })
    return () => data.subscription.unsubscribe()
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    getUser,
    onAuthChange,
  }
}
