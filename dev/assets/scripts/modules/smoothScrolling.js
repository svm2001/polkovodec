export default function smoothScrolling() {
  const anchors = document.querySelectorAll('[data-smooth-scrolling*="#"]')

  if (!anchors.length) return

  const scrollToSection = blockID => {
    const element = document.querySelector(
      `[data-smooth-scrolling="${blockID}"]`,
    )
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const checkInitialUrl = () => {
    const path = window.location.pathname.slice(1)
    if (path) {
      scrollToSection(path)
    }
  }

  document.addEventListener('click', event => {
    const el = event.target

    if (el.closest('[data-smooth-scrolling*="#"]')) {
      event.preventDefault()
      const anchor = el.closest('[data-smooth-scrolling*="#"]')
      const blockID = anchor.getAttribute('data-smooth-scrolling').substr(1)

      const newUrl = `/${blockID}`
      window.history.pushState({ section: blockID }, '', newUrl)

      scrollToSection(blockID)
    }
  })

  checkInitialUrl()
}
