function normalizeSubmission(row) {
  const context = row.parents || row.children || row.caregivers || {}
  return {
    ticket: row.ticket_ref || '',
    submitter: row.submitter_name || context.full_name || 'Anonymous',
    submitterType: row.submitted_by_type || '',
    program: row.program_name || context.program_name || 'Unknown Program',
    category: row.category || '',
    urgency: row.urgency || '',
    status: row.status || '',
    location: row.location || '',
    message: row.message || '',
    createdAt: row.created_at ? new Date(row.created_at).toLocaleString() : '',
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
  const headers = ['Ticket', 'Submitter', 'Submitter Type', 'Program', 'Category', 'Urgency', 'Status', 'Location', 'Message', 'Created At']
  const csv = [
    headers.map(escapeCsv).join(','),
    ...rows.map((row) => [
      row.ticket,
      row.submitter,
      row.submitterType,
      row.program,
      row.category,
      row.urgency,
      row.status,
      row.location,
      row.message,
      row.createdAt,
    ].map(escapeCsv).join(',')),
  ].join('\n')

  downloadBlob(csv, `ymca-submissions-${Date.now()}.csv`, 'text/csv;charset=utf-8')
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
