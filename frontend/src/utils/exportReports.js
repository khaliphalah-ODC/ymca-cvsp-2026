function normalizeSubmission(row) {
  const context = row.parents || row.children || row.caregivers || {}
  return {
    ticket: row.ticket_ref || '',
    trackingId: row.tracking_id || row.ticket_ref || '',
    type: row.type || '',
    submitter: row.submitter_name || context.full_name || 'Anonymous',
    submitterType: row.submitted_by_type || '',
    phone: context.phone || '',
    email: context.email || '',
    childContext: context.child_context || '',
    ageGroup: context.age_group || '',
    programGroup: context.program_group || '',
    supervisionRole: context.supervision_role || '',
    program: row.program_name || context.program_name || 'Unknown Program',
    category: row.category || '',
    urgency: row.urgency || '',
    status: row.status || '',
    location: row.location || '',
    message: row.message || '',
    updateNote: row.resolution_notes || '',
    createdAt: row.created_at ? new Date(row.created_at).toLocaleString() : '',
    updatedAt: row.updated_at ? new Date(row.updated_at).toLocaleString() : '',
  }
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function escapeCsv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function exportSubmissionsCsv(submissions) {
  const rows = submissions.map(normalizeSubmission)
  const headers = ['Ticket', 'Tracking ID', 'Type', 'Submitter', 'Submitter Type', 'Phone', 'Email', 'Program', 'Program Group', 'Age Group', 'Child Context', 'Supervision Role', 'Category', 'Urgency', 'Status', 'Location', 'Message', 'Update Note', 'Created At', 'Updated At']
  const csv = [
    headers.map(escapeCsv).join(','),
    ...rows.map((row) => [
      row.ticket,
      row.trackingId,
      row.type,
      row.submitter,
      row.submitterType,
      row.phone,
      row.email,
      row.program,
      row.programGroup,
      row.ageGroup,
      row.childContext,
      row.supervisionRole,
      row.category,
      row.urgency,
      row.status,
      row.location,
      row.message,
      row.updateNote,
      row.createdAt,
      row.updatedAt,
    ].map(escapeCsv).join(',')),
  ].join('\n')

  downloadBlob(csv, `ymca-submissions-${Date.now()}.csv`, 'text/csv;charset=utf-8')
}

export function exportSubmissionsExcel(submissions, filename = `ymca-submissions-${Date.now()}.xls`) {
  const rows = submissions.map(normalizeSubmission)
  const headers = ['Ticket', 'Tracking ID', 'Type', 'Submitter', 'Submitter Type', 'Phone', 'Email', 'Program', 'Program Group', 'Age Group', 'Child Context', 'Supervision Role', 'Category', 'Urgency', 'Status', 'Location', 'Message', 'Update Note', 'Created At', 'Updated At']
  const html = `
    <html>
      <head><meta charset="utf-8"><title>YMCA Submission Spreadsheet</title></head>
      <body>
        <table border="1">
          <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${escapeHtml(row.ticket)}</td>
                <td>${escapeHtml(row.trackingId)}</td>
                <td>${escapeHtml(row.type)}</td>
                <td>${escapeHtml(row.submitter)}</td>
                <td>${escapeHtml(row.submitterType)}</td>
                <td>${escapeHtml(row.phone)}</td>
                <td>${escapeHtml(row.email)}</td>
                <td>${escapeHtml(row.program)}</td>
                <td>${escapeHtml(row.programGroup)}</td>
                <td>${escapeHtml(row.ageGroup)}</td>
                <td>${escapeHtml(row.childContext)}</td>
                <td>${escapeHtml(row.supervisionRole)}</td>
                <td>${escapeHtml(row.category)}</td>
                <td>${escapeHtml(row.urgency)}</td>
                <td>${escapeHtml(row.status)}</td>
                <td>${escapeHtml(row.location)}</td>
                <td>${escapeHtml(row.message)}</td>
                <td>${escapeHtml(row.updateNote)}</td>
                <td>${escapeHtml(row.createdAt)}</td>
                <td>${escapeHtml(row.updatedAt)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `
  downloadBlob(html, filename, 'application/vnd.ms-excel;charset=utf-8')
}

export function exportSubmissionExcel(submission) {
  const row = normalizeSubmission(submission)
  const html = `
    <html>
      <head><meta charset="utf-8"><title>${escapeHtml(row.ticket)} Report</title></head>
      <body>
        <h1>YMCA Individual Submission Report</h1>
        <table border="1">
          <tbody>
            ${Object.entries(row).map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `
  downloadBlob(html, `ymca-${row.trackingId || row.ticket || Date.now()}.xls`, 'application/vnd.ms-excel;charset=utf-8')
}

export function exportSubmissionsDoc(submissions) {
  const rows = submissions.map(normalizeSubmission)
  const html = `
    <html>
      <head><meta charset="utf-8"><title>YMCA Submission Report</title></head>
      <body>
        <h1>YMCA Complaint & Suggestion Report</h1>
        <p>Generated ${new Date().toLocaleString()}</p>
        <table border="1" cellspacing="0" cellpadding="6">
          <thead>
            <tr><th>Ticket</th><th>Submitter</th><th>Program</th><th>Urgency</th><th>Status</th><th>Message</th><th>Created</th></tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${escapeHtml(row.ticket)}</td>
                <td>${escapeHtml(row.submitter)}</td>
                <td>${escapeHtml(row.program)}</td>
                <td>${escapeHtml(row.urgency)}</td>
                <td>${escapeHtml(row.status)}</td>
                <td>${escapeHtml(row.message)}</td>
                <td>${escapeHtml(row.createdAt)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `
  downloadBlob(html, `ymca-submissions-${Date.now()}.doc`, 'application/msword;charset=utf-8')
}

export function exportSubmissionsPdf(submissions) {
  const rows = submissions.map(normalizeSubmission)
  const printWindow = window.open('', '_blank', 'noopener,noreferrer')
  if (!printWindow) return
  printWindow.document.write(`
    <html>
      <head>
        <title>YMCA Submission Report</title>
        <style>
          body { font-family: Arial, sans-serif; color: #1f1a1a; padding: 24px; }
          h1 { color: #b20112; margin-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #ddd; padding: 8px; vertical-align: top; text-align: left; }
          th { background: #f7eeee; }
        </style>
      </head>
      <body>
        <h1>YMCA Complaint & Suggestion Report</h1>
        <p>Generated ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr><th>Ticket</th><th>Submitter</th><th>Program</th><th>Urgency</th><th>Status</th><th>Message</th><th>Created</th></tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${escapeHtml(row.ticket)}</td>
                <td>${escapeHtml(row.submitter)}</td>
                <td>${escapeHtml(row.program)}</td>
                <td>${escapeHtml(row.urgency)}</td>
                <td>${escapeHtml(row.status)}</td>
                <td>${escapeHtml(row.message)}</td>
                <td>${escapeHtml(row.createdAt)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `)
  printWindow.document.close()
}
