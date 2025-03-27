export default function constructive() {
  const constructive = document.querySelector('.constructive')

  if (!constructive) return

  const constructiveItems = document.querySelectorAll('.constructive__item')
  const constructiveImage = document.querySelector('.constructive__image img')
  const constructiveContainer = document.querySelector('.constructive__image')
  const defaultImage = constructiveContainer.dataset.defaultImage

  let debounceTimeout

  const updateImage = src => (constructiveImage.src = src)

  const handleMouseEnter = event => {
    const item = event.target.closest('.constructive__item')
    if (!item) return

    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      const imageIndex = item.dataset.imageIndex
      updateImage(`./images/constructive/${imageIndex}.webp`)

      constructiveItems.forEach(item => item.classList.remove('active'))
      item.classList.add('active')
    }, 100)
  }

  const handleMouseLeave = () => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      updateImage(defaultImage)
      constructiveItems.forEach(item => item.classList.remove('active'))
    }, 100)
  }

  const constructiveList = document.querySelector('.constructive__list')
  constructiveList.addEventListener('mouseleave', handleMouseLeave)

  const container = document.querySelector('.constructive__list')
  container.addEventListener('mouseenter', (e) => {
    const item = e.target.closest('.constructive__item')
    if (item) {
      const index = Array.from(constructiveItems).indexOf(item)
      if (index !== -1) {
        handleMouseEnter(e)
      }
    }
  }, { passive: true })
}
