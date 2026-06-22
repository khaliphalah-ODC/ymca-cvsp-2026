const storageKey = 'ymca_theme'

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(storageKey, theme)
}

export function getSavedTheme() {
  return localStorage.getItem(storageKey) || 'ymca'
}

export function initTheme() {
  applyTheme(getSavedTheme())
}
