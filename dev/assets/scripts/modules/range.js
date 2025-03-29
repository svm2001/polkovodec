export default function range() {
    const ranges = document.querySelectorAll('.range')
    
    if (!ranges.length) return

    ranges.forEach(range => {
        const buttons = range.querySelectorAll('.range__points-item')
        let selectedValue = Number(range.getAttribute('data-range-selected'))
        const prefix = range.getAttribute('data-range-prefix') || ''
        const heightRangeContainer = document.querySelector('.configurator__slide-item-title-value')

        const updateHeightContainer = (value) => heightRangeContainer 
          ? heightRangeContainer.textContent = `${value}${prefix}` 
          : ''

        buttons.forEach(button => {
            const value = Number(button.getAttribute('data-range-value'))
            if (value === selectedValue) {
                button.classList.add('selected')
                updateHeightContainer(value)
            }
        })

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = Number(button.getAttribute('data-range-value'))
                
                if (value === selectedValue) return

                buttons.forEach(btn => btn.classList.remove('selected'))
                button.classList.add('selected')
                range.setAttribute('data-range-selected', value)
                selectedValue = value
                updateHeightContainer(value)
            })
        })
    })
}
