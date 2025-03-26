import * as noUiSlider from 'nouislider'

export default function range() {
  const ranges = document.querySelectorAll('[data-range="range"]')

  if (!ranges.length) return

  ranges.forEach(item => {
    const range = item.querySelector('[data-range="range-line"]'),
      start = +range.getAttribute('data-range-start'),
      end = +range.getAttribute('data-range-end'),
      min = +range.getAttribute('data-range-min'),
      max = +range.getAttribute('data-range-max'),
      valueMin = item.querySelector('[data-range="value-min"]'),
      valueMax = item.querySelector('[data-range="value-max"]')

    noUiSlider.create(range, {
      start: [start, end],
      connect: true,
      range: {
        min: min,
        max: max,
      },
    })

    range.noUiSlider.on('update', (values, handle) => {
      if (handle) {
        valueMax.innerHTML = `${Math.round(values[handle])} м<sup>2</sup>`
      } else {
        valueMin.innerHTML = `${Math.round(values[handle])} м<sup>2</sup>`
      }
    })
  })
}
