import { ref, readonly } from 'vue'

export type Lang = 'en' | 'fil'

const lang = ref<Lang>((localStorage.getItem('inv8-lang') as Lang) ?? 'en')

export function useLanguage() {
  function setLang(l: Lang) {
    lang.value = l
    localStorage.setItem('inv8-lang', l)
    document.documentElement.setAttribute('lang', l === 'fil' ? 'fil' : 'en')
  }

  function toggle() {
    setLang(lang.value === 'en' ? 'fil' : 'en')
  }

  /** Pick the right string based on active language */
  function t(en: string, fil: string): string {
    return lang.value === 'fil' ? fil : en
  }

  return { lang: readonly(lang), setLang, toggle, t }
}
