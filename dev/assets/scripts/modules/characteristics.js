export default function characteristics() {
  const items = document.querySelectorAll('.characteristics__item')
  const images = document.querySelectorAll('.characteristics__poster img.poster')
  const container = document.querySelector('.characteristics__items')
  const mobAccordions = document.querySelectorAll('.characteristics__accordions .accordion')
  const isDesktopRes = window.innerWidth > 1280

  const displayImages = (index = 0) => {
    images.forEach(img => {
      img.style.opacity = '0'
      img.style.transform = 'rotateY(90deg)'
      img.classList.remove('active')
    })
    images[index].style.opacity = '1'
    images[index].style.transform = 'rotateY(0)'
    images[index].classList.add('active')
  }

  const handleIconTransform = (icon, textHeight, reset = false) => icon.style.transform = reset
    ? 'translateY(0px)'
    : `translateY(${textHeight}px)`

  const desktop = () => {
    if (mobAccordions) mobAccordions.forEach(accordion => accordion.remove())
    
    items.forEach((item, index) => {
      const text = item.querySelector('.characteristics__item-text')
      const icon = item.querySelector('.characteristics__item-icon')
      const isLastItem = index === items.length - 1

      item.addEventListener('mouseenter', () => {
        if (!isLastItem) handleIconTransform(icon, text.offsetHeight)
        displayImages(index)
      })

      item.addEventListener('mouseleave', () => !isLastItem
        ? handleIconTransform(icon, 0, true)
        : '')
    })
  }

  const mobile = () => {
    if (items) items.forEach(item => item.remove())
    mobAccordions.forEach((item, index) => item.addEventListener('mouseenter', () => displayImages(index)))
  }

  displayImages()
  isDesktopRes ? desktop() : mobile()
  container.addEventListener('mouseleave', () => displayImages())
}