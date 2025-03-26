export default function smoothView(btn, el, startHeight = 0) {
  if (!btn) return
  if (!el) return

  const add = () => {
    btn.classList.add('not-active')
    el.classList.add('not-active')
  }

  const remove = () => {
    btn.classList.remove('not-active')
    el.classList.remove('not-active')
  }

  let heightEl = el.offsetHeight

  if (!el.classList.contains('active')) {
    add()
    el.style.height = `${startHeight}px`
  } else {
    el.style.height = `${heightEl}px`
  }

  if (startHeight > 0) {
    if (heightEl < startHeight) {
      remove()
      el.style.height = `${heightEl}px`
    }
  }

  const update = () => {
    el.style.height = 'auto'
    setTimeout(() => {
      heightEl = el.offsetHeight
      el.style.height = `${heightEl}px`
    }, 100)
  }

  btn.addEventListener('click', () => {
    if (el.classList.contains('not-active')) {
      remove()
      el.style.height = `${heightEl}px`
    } else {
      add()
      el.style.height = `${startHeight}px`
    }
  })

  let observer = new MutationObserver(mutationRecords => {
    update()
  })

  observer.observe(el, {
    childList: true,
    subtree: true,
    characterDataOldValue: true,
  })
}
