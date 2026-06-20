import { defineStore } from 'pinia'
import { supabase } from '../utils/supabase'

const defaultStats = {
  total_submissions: 0,
  open_cases: 0,
  in_progress: 0,
  resolved: 0,
  critical_issues: 0,
}

const detailSelect = `
  *,
  parents(*),
  children(*),
  caregivers(*),
  staff(*)
`

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
    async fetchStats() {
      this.loading = true
      this.error = ''
      try {
        const { data, error } = await supabase.rpc('get_submission_stats')
        if (error) throw error
        this.stats = data?.[0] || { ...defaultStats }
      } catch (err) {
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

      if (error) return null

      return {
        total_submissions: data.length,
        open_cases: data.filter((row) => row.status === 'open').length,
        in_progress: data.filter((row) => row.status === 'in_progress').length,
        resolved: data.filter((row) => row.status === 'resolved').length,
        critical_issues: data.filter((row) => row.urgency === 'critical' && row.status !== 'resolved').length,
      }
    },

    async fetchRecentSubmissionsFallback(limit = 10) {
      const { data, error } = await supabase
        .from('submissions')
        .select(detailSelect)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) return null

      return (data || []).map((row) => {
        const context = row.parents || row.children || row.caregivers || {}
        return {
          ...row,
          submitter_name: row.is_anonymous ? 'Anonymous' : context.full_name || 'Anonymous',
          program_name: context.program_name || 'Unknown Program',
        }
      })
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
        this.submissions = data || []
      } catch (err) {
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
        this.selectedSubmission = data
        return data
      } catch (err) {
        this.error = err.message || 'Unable to load submission details.'
        return null
      } finally {
        this.loading = false
      }
    },

    async updateSubmissionStatus(id, status, admin_note = '', assigned_staff_id = null) {
      this.loading = true
      this.error = ''
      try {
        const updates = { status, admin_note }
        if (assigned_staff_id) updates.assigned_staff_id = assigned_staff_id
        const { data, error } = await supabase
          .from('submissions')
          .update(updates)
          .eq('id', id)
          .select(detailSelect)
          .single()
        if (error) throw error
        this.selectedSubmission = data
        this.submissions = this.submissions.map((item) => (item.id === id ? { ...item, ...data } : item))
        await this.fetchStats()
        return data
      } catch (err) {
        this.error = err.message || 'Unable to update submission.'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
