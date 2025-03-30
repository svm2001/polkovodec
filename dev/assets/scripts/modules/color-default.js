export default function colorDefault() {
    const colorDefault = document.querySelector('.colorDefault')
    const colorMain = document.querySelector('.js-set-color');

    if (!colorDefault && !colorMain) return

    const colorItems = colorDefault.querySelectorAll('.colorDefault__item')

    colorItems.forEach(item => {
        const color = item.getAttribute('data-default-color')
        const colorName = item.getAttribute('data-color-default-name')
        item.style.setProperty('--color', color)

        item.addEventListener('click', () => {
            colorMain.setAttribute('data-is-next-step', true)
            colorMain.setAttribute('data-color-end', colorName)

            colorItems.forEach(el => el.classList.remove('active'))
            item.classList.add('active')
            colorDefault.setAttribute('data-default-color-selected', color)
            colorDefault.setAttribute('data-color-default-name-selected', colorName)

            // кастомный цвет
            const custom = document.querySelector('.colorsCustom');
            const customColor = document.querySelector('.colorsCustom__color.painted');
            const customColorBlock = document.querySelector('.colorsCustom__color-inner-wrapper');
            const customColorSelectedValue = document.querySelector('.colorsCustom__color-selected-value');


            if (custom) custom.setAttribute('data-custom-color', '');
            if (customColor) customColor.classList.remove('painted');
            if (customColorBlock) customColorBlock.style.backgroundColor = 'transparent';
            if (customColorSelectedValue) customColorSelectedValue.textContent = 'ral 0000';
        })
    })
}