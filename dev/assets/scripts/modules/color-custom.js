import { ralColors } from '../data/ral.colors';
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

export default function colorCustom() {
    const colorsCustom = document.querySelector('.colorsCustom');
    const colorMain = document.querySelector('.js-set-color');


    if(!colorsCustom && !colorMain) return;

    const btn = colorsCustom.querySelector('.colorsCustom__color');
    const colorSelect = document.querySelector('.colorsCustom__block');
    const closeBtn = document.querySelector('.colorsCustom__block-close');
    const confirmBtn = document.querySelector('.colorsCustom__block-confirm');
    const paintedBlock = colorsCustom.querySelector('.colorsCustom__color-inner-wrapper');
    const ralInput = colorsCustom.querySelector('.colorsCustom__block-input-field');
    const validationField = colorsCustom.querySelector('.colorsCustom__block-input-validation');
    const selectedColor = colorsCustom.querySelector('.colorsCustom__color-selected-value');
    
    const handleColorConfirm = () => {
        const inputValue = ralInput.value.trim();
        const foundColor = ralColors.find(color => color.ral === parseInt(inputValue));
        
        if (foundColor) {
            colorMain.setAttribute('data-is-next-step', true)
            colorMain.setAttribute('data-color-end', `RAL ${foundColor.ral}`)

            btn.classList.add('painted');
            paintedBlock.style.backgroundColor = foundColor.hex;
            colorSelect.classList.remove('visible');
            validationField.classList.remove('error');
            selectedColor.textContent = `ral ${inputValue}`;
            colorsCustom.setAttribute('data-custom-color', foundColor.ral)

            if(window.innerWidth <= 1280) {
                document.querySelector('body').classList.remove('lock');
                enablePageScroll(document.querySelector('body'));
            }

            // фиксированные цвета
            const fixedActiveColor = document.querySelector('.colorDefault__item.active');
            const fixedColorBlock = document.querySelector('.colorDefault');

            if(fixedActiveColor) fixedActiveColor.classList.remove('active');
            if(fixedColorBlock) {
                fixedColorBlock.setAttribute('data-default-color-selected', '');
                fixedColorBlock.setAttribute('data-color-default-name-selected', '');
            }

            colorSelect.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        } else {
            colorMain.setAttribute('data-is-next-step', false)
            colorMain.setAttribute('data-color-end', '')

            btn.classList.remove('painted');
            paintedBlock.style.backgroundColor = 'transparent';
            validationField.classList.add('error');
            selectedColor.textContent = 'ral 0000';
            
            ralInput.value === '' 
                ? validationField.textContent = 'Укажите цвет'
                : validationField.textContent = 'Цвет не найден';
        }
    };
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        colorSelect.classList.toggle('visible');

        if(window.innerWidth <= 1280) {
            document.querySelector('body').classList.add('lock');
            disablePageScroll(document.querySelector('body'));
        }
    });

    closeBtn.addEventListener('click', (e) => {
        colorSelect.classList.remove('visible'); 

        if(window.innerWidth <= 1280) {
            document.querySelector('body').classList.remove('lock');
            enablePageScroll(document.querySelector('body'));
        }
    });

    confirmBtn.addEventListener('click', handleColorConfirm);

    ralInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleColorConfirm();
        }
    });

    document.addEventListener('click', (e) => {
        if (!colorSelect.contains(e.target) && !btn.contains(e.target)) {
            colorSelect.classList.remove('visible');

            if(window.innerWidth <= 1280) {
                document.querySelector('body').classList.remove('lock');
                enablePageScroll(document.querySelector('body'));
            }
        }
    });

    if(window.innerWidth <= 1280) document.body.appendChild(colorSelect);
}
