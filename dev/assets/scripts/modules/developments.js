export default function developments() {
  const developments = document.querySelector('.developments')

  if (!developments) return

  const items = developments.querySelectorAll('.developments__list-item')

  if (!items) return

  const container = developments.querySelector('.container')

  if (window.innerWidth < 1280) {
    if (container) container.classList.remove('container')

    items.forEach(item => {
      const titleHeight = item.querySelector(
        '.developments__list-item-title',
      ).scrollHeight
      const btnHeight = item.querySelector(
        '.developments__list-item-trigger',
      ).scrollHeight
      const shadow = item.querySelector(
        '.developments__list-item-content-shadow',
      )
      const shadowHeight = titleHeight + btnHeight + 21 + 5

      shadow.style.height = `${shadowHeight}px`
    })
  } else {
    items.forEach(item => {
      const titleHeight = item.querySelector(
        '.developments__list-item-title',
      ).scrollHeight
      const btnHeight = item.querySelector(
        '.developments__list-item-trigger',
      ).scrollHeight
      const shadow = item.querySelector(
        '.developments__list-item-content-shadow',
      )
      const shadowHeight = titleHeight + btnHeight + 21 + 21 + 31

      shadow.style.height = `${shadowHeight}px`
    })
  }
}
