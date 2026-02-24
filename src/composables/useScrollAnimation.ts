import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollAnimation(threshold: number = 0.1) {
  const observer = ref<IntersectionObserver | null>(null)

  const initObserver = () => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('before-animate')
            entry.target.classList.add('animate-fade-in-up')
          } else {
            // Reset animation when element leaves viewport
            entry.target.classList.remove('animate-fade-in-up')
            entry.target.classList.add('before-animate')
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )
  }

  const observeElements = (selector: string) => {
    if (!observer.value) return

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => {
      el.classList.add('before-animate')
      observer.value?.observe(el)
    })
  }

  const cleanup = () => {
    if (observer.value) {
      observer.value.disconnect()
    }
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    observeElements,
    cleanup,
  }
}
