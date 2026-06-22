import { defineStore } from 'pinia'
import { supabase } from '../utils/supabase'

const defaultStats = {
  total_submissions: 0,
  open_cases: 0,
  in_progress: 0,
  resolved: 0,
  critical_issues: 0,
}

const activeStatuses = ['Submitted', 'Under Review', 'In Progress']
const resolvedStatuses = ['Resolved', 'Closed']

function normalizeStatus(status) {
  const map = {
    open: 'Submitted',
    submitted: 'Submitted',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
  }
  return map[String(status || '').toLowerCase()] || status || 'Submitted'
}

const detailSelect = `
  *,
  parents(*),
  children(*),
  caregivers(*),
  staff(*)
`

function logSupabaseError(context, err) {
  console.error(`[submissionStore] ${context}`, {
    message: err?.message,
    details: err?.details,
    hint: err?.hint,
    code: err?.code,
    error: err,
  })
}

function getSubmitterContext(row) {
  return row.parents || row.children || row.caregivers || {}
}

function normalizeSubmission(row) {
  const context = getSubmitterContext(row)
  return {
    ...row,
    status: normalizeStatus(row.status),
    tracking_id: row.tracking_id || row.ticket_ref,
    submitter_name: row.is_anonymous ? 'Anonymous' : context.full_name || 'Anonymous',
    program_name: context.program_name || 'Unknown Program',
  }
}

export const useSubmissionStore = defineStore('submissions', {
  state: () => ({
    submissions: [],
    stats: { ...defaultStats },
    selectedSubmission: null,
    loading: false,
    error: '',
  }),
  getters: {
    recentSubmissions: (state) => state.submissions,
    openCount: (state) => state.stats.open_cases || 0,
    totalCount: (state) => state.stats.total_submissions || 0,
  },
  actions: {
    async logCurrentAdminSession() {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError

        const user = userData?.user || null
        console.info('[submissionStore] Supabase auth user', {
          id: user?.id || null,
          email: user?.email || null,
        })

        if (!user) return null

        const { data: adminProfile, error: profileError } = await supabase
          .from('admin_profiles')
          .select('user_id, full_name, role')
          .eq('user_id', user.id)
          .maybeSingle()

        if (profileError) {
          logSupabaseError('Admin profile lookup failed. This usually means RLS denied the read or the user is not an admin.', profileError)
          return user
        }

        console.info('[submissionStore] Matching admin profile', adminProfile)
        return user
      } catch (err) {
        logSupabaseError('Unable to read current Supabase auth user', err)
        return null
      }
    },

    async fetchStats() {
      this.loading = true
      this.error = ''
      try {
        const { data, error } = await supabase.rpc('get_submission_stats')
        if (error) throw error
        this.stats = data?.[0] || { ...defaultStats }
      } catch (err) {
        logSupabaseError('get_submission_stats RPC failed; falling back to direct submissions query', err)
        const fallbackStats = await this.fetchStatsFallback()
        if (fallbackStats) {
          this.stats = fallbackStats
          this.error = ''
        } else {
          this.error = err.message || 'Unable to load dashboard stats.'
        }
      } finally {
        this.loading = false
      }
    },

    async fetchRecentSubmissions(limit = 10) {
      this.loading = true
      this.error = ''
      try {
        const { data, error } = await supabase.rpc('get_recent_submissions', { limit_count: limit })
        if (error) throw error
        this.submissions = data || []
      } catch (err) {
        logSupabaseError('get_recent_submissions RPC failed; falling back to direct submissions query', err)
        const fallbackRows = await this.fetchRecentSubmissionsFallback(limit)
        if (fallbackRows) {
          this.submissions = fallbackRows
          this.error = ''
        } else {
          this.error = err.message || 'Unable to load recent submissions.'
        }
      } finally {
        this.loading = false
      }
    },

    async fetchStatsFallback() {
      const { data, error } = await supabase
        .from('submissions')
        .select('status, urgency')

      if (error) {
        logSupabaseError('Direct stats fallback query failed', error)
        await this.logCurrentAdminSession()
        return null
      }

      return {
        total_submissions: data.length,
        open_cases: data.filter((row) => activeStatuses.includes(normalizeStatus(row.status))).length,
        in_progress: data.filter((row) => normalizeStatus(row.status) === 'In Progress').length,
        resolved: data.filter((row) => resolvedStatuses.includes(normalizeStatus(row.status))).length,
        critical_issues: data.filter((row) => row.urgency === 'critical' && !resolvedStatuses.includes(normalizeStatus(row.status))).length,
      }
    },

    async fetchRecentSubmissionsFallback(limit = 10) {
      const { data, error } = await supabase
        .from('submissions')
        .select(detailSelect)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        logSupabaseError('Direct recent submissions fallback query failed', error)
        await this.logCurrentAdminSession()
        return null
      }

      return (data || []).map(normalizeSubmission)
    },

    async fetchSubmissions(filters = {}) {
      this.loading = true
      this.error = ''
      try {
        let query = supabase
          .from('submissions')
          .select(detailSelect)
          .order('created_at', { ascending: false })
          .limit(filters.limit || 50)

        if (filters.status) query = query.eq('status', filters.status)
        if (filters.category) query = query.eq('category', filters.category)
        if (filters.urgency) query = query.eq('urgency', filters.urgency)
        if (filters.dateFrom) query = query.gte('created_at', filters.dateFrom)
        if (filters.dateTo) query = query.lte('created_at', filters.dateTo)
        const { data, error } = await query
        if (error) throw error
        this.submissions = (data || []).map(normalizeSubmission)
      } catch (err) {
        logSupabaseError('Unable to load submissions', err)
        await this.logCurrentAdminSession()
        this.error = err.message || 'Unable to load submissions.'
      } finally {
        this.loading = false
      }
    },

    async fetchSubmissionDetail(id) {
      this.loading = true
      this.error = ''
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select(detailSelect)
          .eq('id', id)
          .single()
        if (error) throw error
        this.selectedSubmission = normalizeSubmission(data)
        return this.selectedSubmission
      } catch (err) {
        logSupabaseError('Unable to load submission details', err)
        await this.logCurrentAdminSession()
        this.error = err.message || 'Unable to load submission details.'
        return null
      } finally {
        this.loading = false
      }
    },

    async updateSubmissionStatus(id, status, admin_note = '', assigned_staff_id = null, resolution_notes = '') {
      this.loading = true
      this.error = ''
      try {
        const updates = { status, admin_note, resolution_notes }
        if (assigned_staff_id) updates.assigned_staff_id = assigned_staff_id
        const { data, error } = await supabase
          .from('submissions')
          .update(updates)
          .eq('id', id)
          .select(detailSelect)
          .single()
        if (error) throw error
        const normalizedData = normalizeSubmission(data)
        this.selectedSubmission = normalizedData
        this.submissions = this.submissions.map((item) => (item.id === id ? { ...item, ...normalizedData } : item))
        await this.fetchStats()
        return normalizedData
      } catch (err) {
        logSupabaseError('Unable to update submission', err)
        await this.logCurrentAdminSession()
        this.error = err.message || 'Unable to update submission.'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
