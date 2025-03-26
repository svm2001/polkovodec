export default function select() {
  const mains = document.querySelectorAll('[data-select="main"]')

  if (!mains.length) return

  const removeActive = elems => {
    elems.forEach(main => main.classList.remove('active'))
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-select="main"]')) {
      mains.forEach(main => {
        if (main !== event.target.closest('[data-select="main"]'))
          main.classList.remove('active')
      })

      const select = event.target.closest('[data-select="main"]'),
        value = select.querySelector('[data-select="value"]'),
        listItems = select.querySelectorAll('li')

      if (event.target.closest('[data-select="head"]')) {
        select.classList.toggle('active')
      }

      if (event.target.closest('li')) {
        const listItem = event.target.closest('li')

        if (!listItem.classList.contains('active')) {
          removeActive(listItems)
          value.textContent = listItem.textContent
          select.setAttribute('data-select-value', listItem.textContent)
          listItem.classList.add('active')
          select.classList.remove('active')
        }
      }
    } else {
      removeActive(mains)
    }
  })
}
