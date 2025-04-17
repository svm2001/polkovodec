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
      updateImage(`./images/constructive/${imageIndex}`)

      constructiveItems.forEach(item => item.classList.remove('active'))
      item.classList.add('active')
    }, 0)
  }

  const handleMouseLeave = () => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      updateImage(defaultImage)
      constructiveItems.forEach(item => item.classList.remove('active'))
      console.log(1);
      
    }, 0)
  }

  const constructiveList = document.querySelectorAll('.constructive__list')
  constructiveList.forEach(list => {
    list.addEventListener('mouseleave', handleMouseLeave)
  })
  constructiveItems.forEach(item =>
    item.addEventListener('mouseenter', handleMouseEnter),
  )
}
