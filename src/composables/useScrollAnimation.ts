import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollAnimation(threshold: number = 0.1) {
  const observer = ref<IntersectionObserver | null>(null)
  const observedElements = new Set<Element>()

  const initObserver = () => {
    observer.value = new IntersectionObserver(
      (entries) => {
        // Batch DOM updates for better performance
        requestAnimationFrame(() => {
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

    // Batch DOM queries
    requestAnimationFrame(() => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        // Prevent observing the same element twice
        if (!observedElements.has(el)) {
          el.classList.add('before-animate')
          observer.value?.observe(el)
          observedElements.add(el)
        }
      })
    })
  }

  const cleanup = () => {
    if (observer.value) {
      observer.value.disconnect()
      observedElements.clear()
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
