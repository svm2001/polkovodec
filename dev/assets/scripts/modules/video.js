export default function video() {
  const video = document.querySelector('.js-video')

  if (!video) return

  const btn = video.querySelector('.video__play-btn')
  const closeBtn = video.querySelector('.video__close-btn')
  const poster = video.querySelector('.video__poster')
  const videoEl = video.querySelector('video')
  const containerHide = video.querySelector('.container.container-hide')

  const play = () => {
    btn.classList.add('hide')
    poster.classList.add('hide')
    closeBtn.classList.add('show')
    setTimeout(() => videoEl.play(), 300)
  }

  const stop = () => {
    btn.classList.remove('hide')
    poster.classList.remove('hide')
    closeBtn.classList.remove('show')
    videoEl.pause()
  }

  btn.addEventListener('click', () => play())
  closeBtn.addEventListener('click', () => stop())

  window.addEventListener('resize', () =>
    window.innerWidth < 1441
      ? containerHide.classList.remove('container')
      : containerHide.classList.add('container'),
  )
}
