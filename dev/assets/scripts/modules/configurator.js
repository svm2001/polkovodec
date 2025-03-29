import { Swiper } from '../../../../node_modules/swiper/swiper-bundle.min.mjs'
import 'swiper/css'
import { radioClickProcessing } from '../composables/radioClickProcessing'

export default function configurator() {
    const configurator = document.querySelector('.configurator');

    if (!configurator) return;

    // логика слайдера

    const slider = configurator.querySelector('.swiper')
    const stepNumber = configurator.querySelector('.configurator__step-number-current')
    const stepDescription = configurator.querySelector('.configurator__step-description')

    if (!slider) return;

    const swiper = new Swiper(slider, {
        slidesPerView: 1,
        centeredSlides: true,
        speed: 500,
        allowTouchMove: false,
        draggable: false,
        touchRatio: 0,
        spaceBetween: 100,
        on: {
            slideChange: function () {
                const activeSlide = this.slides[this.activeIndex]

                if (activeSlide) {
                    stepNumber.textContent = activeSlide.getAttribute('data-step-number')
                    stepDescription.textContent = activeSlide.getAttribute('data-step-description')
                }
            },
        },
    })

    const initialSlide = swiper.slides[swiper.activeIndex]
    if (initialSlide) {
        stepNumber.textContent = initialSlide.getAttribute('data-step-number')
        stepDescription.textContent = initialSlide.getAttribute('data-step-description')
    }

    const step1To2Btn = configurator.querySelector('.js-step-1-2')
    const step2To1Btn = configurator.querySelector('.js-step-2-1')
    const step2To3Btn = configurator.querySelector('.js-step-2-3')
    const step3To2Btn = configurator.querySelector('.js-step-3-2')

    const validateAndScroll = (elements) => {
        Array.from(elements).forEach(el => el.classList.remove('validation-error'));

        const invalidElements = Array.from(elements)
            .filter(el => el.getAttribute('data-is-next-step') === 'false');

        const errorMessage = configurator.querySelector('.configurator__slide-buttons-error');
        
        if (invalidElements.length === 0) {
            if (errorMessage) errorMessage.classList.remove('visible');
            return true;
        }

        invalidElements.forEach(el => el.classList.add('validation-error'));
        
        if (errorMessage) errorMessage.classList.add('visible');
        
        setTimeout(() => {
            invalidElements[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);

        return false;
    };

    if (step1To2Btn) step1To2Btn.addEventListener('click', () => {
        const validatedElements = document.querySelectorAll('[data-is-next-step]');
        if (validateAndScroll(validatedElements)) swiper.slideNext()
    })
    if (step2To1Btn) step2To1Btn.addEventListener('click', () => swiper.slidePrev())
    if (step2To3Btn) step2To3Btn.addEventListener('click', () => swiper.slideNext())
    if (step3To2Btn) step3To2Btn.addEventListener('click', () => swiper.slidePrev())


    // обработка радиокнопок

    const depth = configurator.querySelector('.js-set-depth')
    const depthRadios = depth.querySelectorAll('input[type="radio"]')
    const frontDoor = configurator.querySelector('.js-variant-front')
    const frontDoorRadios = frontDoor.querySelectorAll('input[type="radio"]')
    const backDoor = configurator.querySelector('.js-variant-back')
    const backDoorRadios = backDoor.querySelectorAll('input[type="radio"]')

    radioClickProcessing({
        blockName: depth,
        radiosArray: depthRadios,
        attributeName: 'data-depth'
    })

    radioClickProcessing({
        blockName: frontDoor,
        radiosArray: frontDoorRadios,
        attributeName: 'data-front-door'
    })

    radioClickProcessing({
        blockName: backDoor,
        radiosArray: backDoorRadios,
        attributeName: 'data-back-door'
    })
}
