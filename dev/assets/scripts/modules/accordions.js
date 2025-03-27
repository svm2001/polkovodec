export default function accordions() {
  const accordions = document.querySelectorAll('.accordion')

  if (!accordions) return

  const openAccordion = accordion => {
    const content = accordion.querySelector('.accordion__content')
    accordion.classList.add('accordion__active')
    content.style.maxHeight = content.scrollHeight + 16 + 'px'
  }

  const closeAccordion = accordion => {
    const content = accordion.querySelector('.accordion__content')
    accordion.classList.remove('accordion__active')
    content.style.maxHeight = null
  }

  accordions.forEach(accordion => {
    const intro = accordion.querySelector('.accordion__intro')
    const content = accordion.querySelector('.accordion__content')

    intro.onclick = () => {
      if (content.style.maxHeight) {
        closeAccordion(accordion)
      } else {
        accordions.forEach(accordion => closeAccordion(accordion))
        openAccordion(accordion)
      }
    }
  })
}
