import { ref, watch, onMounted } from 'vue'

const isDark = ref(true)

export function useTheme() {
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const initTheme = () => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = saved ? saved === 'dark' : prefersDark
    applyTheme(isDark.value)
  }

  watch(isDark, (val) => applyTheme(val))

  return { isDark, toggleTheme, initTheme }
}
