import LazyLoad from 'vanilla-lazyload'

export default function lazyLoad() {
  const myLazyLoad = new LazyLoad({
    elements_selector: '.lazy',
    callback_loaded: el => {
      el.classList.add('lazy-loaded')
    },
    callback_error: el => {
      el.classList.add('lazy-error')
      el.setAttribute('data-error', 'true')
      el.src = './images/no-image.svg'
      console.warn(`Ошибка загрузки изображения: ${el.src || 'неизвестный источник'}`)
    }
  })
}
