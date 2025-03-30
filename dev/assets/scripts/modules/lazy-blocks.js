export default function lazyBlocks() {
  const lazyElements = document.querySelectorAll('.lazy-load')
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target
          element.classList.add('lazy-loaded')
          observer.unobserve(element)
        }
      })
    },
    {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
    },
  )

  lazyElements.forEach(element => observer.observe(element))
}
