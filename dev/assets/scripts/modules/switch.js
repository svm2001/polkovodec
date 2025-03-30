export default function switcher() {
  const switchers = document.querySelectorAll('.switch-wrapper')

  if (!switchers.length) return

  switchers.forEach(item => {
    const buttons = item.querySelectorAll('.button--switch')

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.dataset.switchValue
        if (button.classList.contains('active')) return

        buttons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')
        item.dataset.switchSelected = value
      })
    })
  })
}
