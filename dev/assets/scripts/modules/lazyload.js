import LazyLoad from 'vanilla-lazyload'

export default function lazyLoad() {
  const myLazyLoad = new LazyLoad({
    elements_selector: '.lazy',
    callback_loaded: (el) => {
      el.classList.add('lazy-loaded')
    }
  })
}
