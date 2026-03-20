import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.reveal') {
  let observer: IntersectionObserver

  onMounted(() => {
    observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll(selector)
      .forEach(el => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
