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
    // Default to dark mode regardless of OS preference — site is designed dark-first
    isDark.value = saved ? saved === 'dark' : true
    applyTheme(isDark.value)
  }

  watch(isDark, (val) => applyTheme(val))

  return { isDark, toggleTheme, initTheme }
}
