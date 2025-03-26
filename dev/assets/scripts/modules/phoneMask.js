import IMask from 'imask'

export default function phoneMask() {
  const mask = (dataValue, options) => {
    const elements = document.querySelectorAll(
      `[data-input-mask="${dataValue}"]`,
    )

    if (!elements.length) return

    elements.forEach(el => {
      let input = null

      if (el.hasAttribute('type')) {
        input = el
      } else {
        input = el.querySelector('input')
      }

      if (input) {
        IMask(input, options)
      }
    })
  }

  mask('phone', {
    mask: '+{7} (000) 000-00-00',
  })
}
