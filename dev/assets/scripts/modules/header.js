import { disablePageScroll, enablePageScroll } from 'scroll-lock'

export default function header() {
  const header = document.querySelector('header')
  const headerLinks = document.querySelectorAll('.header__link')
  const burgerLinks = document.querySelectorAll('.burger__link')
  const burgerForm = document.querySelector('.burger__form')
  const burgerLinksWrapper = document.querySelector('.burger__nav')
  const burger = document.querySelector('.burger')
  const burgerOpen = document.querySelector('.header__burger-init')
  const burgerClose = document.querySelector('.burger__close')
  const burgerFormBtn = document.querySelector('.burger__btn')

  if (!header) return

  const checkScroll = () =>
    window.scrollY > 5
      ? header.classList.add('scrollable')
      : header.classList.remove('scrollable')

  const setActiveLink = clickedLink => {
    headerLinks.forEach(link => link.classList.remove('active'))
    burgerLinks.forEach(link => link.classList.remove('active'))

    clickedLink.classList.add('active')

    const href = clickedLink.getAttribute('href')
    if (href) {
      const correspondingLink = clickedLink.classList.contains('header__link')
        ? document.querySelector(`.burger__link[href="${href}"]`)
        : document.querySelector(`.header__link[href="${href}"]`)
      if (correspondingLink) {
        correspondingLink.classList.add('active')
      }
    }
  }

  const handleHeaderLinkClick = e => {
    e.preventDefault()
    const clickedLink = e.target.closest('.header__link')
    setActiveLink(clickedLink)
    if (burger.classList.contains('active')) {
      burger.classList.remove('active')
      enablePageScroll(header)
    }
  }

  document.addEventListener(
    'click',
    e => {
      if (e.target.closest('.header__link')) {
        handleHeaderLinkClick(e)
      }
    },
    { passive: false },
  )

  burgerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const clickedLink = e.target.closest('.burger__link')
      setActiveLink(clickedLink)
      if (burger.classList.contains('active')) burger.classList.remove('active')
      enablePageScroll(header)
    })
  })

  const clearForm = () => {
    burgerFormBtn.style.display = 'block'
    burgerLinksWrapper.style.display = 'flex'
    burgerForm.style.display = 'none'
    burgerForm.querySelector('.form__body').classList.remove('hidden')
    burgerForm.querySelector('form').style.display = 'block'
    burgerForm.querySelector('.form__success').style.display = 'none'
    burgerForm.querySelector('.form__error').style.display = 'none'
    burgerForm.querySelectorAll('input').forEach(input => (input.value = ''))
  }

  if (window.innerWidth <= 1280) {
    burgerOpen.addEventListener('click', () => {
      burger.classList.add('active')
      disablePageScroll(header)
    })

    burgerClose.addEventListener('click', () => {
      burger.classList.remove('active')
      setTimeout(() => clearForm(), 1000)
      enablePageScroll(header)
    })

    burgerFormBtn.addEventListener('click', () => {
      burgerFormBtn.style.display = 'none'
      burgerLinksWrapper.style.display = 'none'
      burgerForm.style.display = 'block'
    })
  }

  window.addEventListener('scroll', checkScroll, { passive: true })
  checkScroll()
}
