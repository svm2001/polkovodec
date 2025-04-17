import tippy from 'tippy.js'
import { Swiper } from '../../../../node_modules/swiper/swiper-bundle.min.mjs'
import 'swiper/css'
import 'tippy.js/dist/tippy.css'

export const dataCollect = () => {
  const data = document.querySelector('.js-data')

  if (!data) return

  const heightValue = document.querySelector(
    '.configurator__slide-item-title-value',
  )
  const depthValue = document.querySelector('.js-set-depth')
  const verticalTypeValue = document.querySelector('.js-vertical-type')
  const frontDoorValue = document.querySelector('.js-variant-front')
  const backDoorValue = document.querySelector('.js-variant-back')
  const executionValue = document.querySelector('.js-set-execution')
  const colorValue = document.querySelector('.js-set-color')

  const selectedAccessories = document.querySelectorAll(
    '.accessorises__item.selected',
  )
  const selectedCheckboxes = document.querySelectorAll(
    '.accessorises__checkbox-item input[type="checkbox"]:checked',
  )

  const heightDataValue = data.querySelector('.js-data-height-value')
  const depthDataValue = data.querySelector('.js-data-depth-value')
  const verticalTypeDataValue = data.querySelector('.js-data-vertical-type-value')
  const frontDoorDataValue = data.querySelector('.js-front-door-value')
  const backDoorDataValue = data.querySelector('.js-back-door-value')
  const executionDataValue = data.querySelector('.js-data-execution-value')
  const colorDataValue = data.querySelector('.js-data-color-value')

  const heightBlock = data.querySelector('.js-data-height')
  const depthBlock = data.querySelector('.js-data-depth')
  const verticalTypeBlock = data.querySelector('.js-data-vertical-type')
  const doorBlock = data.querySelector('.js-variants')
  const executionBlock = data.querySelector('.js-data-execution')
  const colorBlock = data.querySelector('.js-data-color')
  const accessorisesBlock = data.querySelector('.js-data-accessorises') // общая обертка аксессуаров
  const accessorisesSlider = data.querySelector('.js-data-accessorises-slider') // слайдер аксессуаров
  const accessorisesCheckboxes = data.querySelector(
    '.js-data-accessorises-checkboxes',
  ) // чекбоксы аксессуаров

  if (heightValue) {
    heightBlock.classList.add('visible')
    heightDataValue.textContent = heightValue.textContent
  }

  if (depthValue) {
    depthBlock.classList.add('visible')
    depthDataValue.textContent = depthValue.getAttribute('data-depth')
  }

  if (verticalTypeValue) {
    verticalTypeBlock.classList.add('visible')
    verticalTypeDataValue.textContent = verticalTypeValue.getAttribute('data-vertical-type')
  }

  if (frontDoorValue) {
    doorBlock.classList.add('visible')
    frontDoorDataValue.textContent = frontDoorValue.getAttribute('data-front-door')
  }

  if (backDoorValue) {
    doorBlock.classList.add('visible')
    backDoorDataValue.textContent = backDoorValue.getAttribute('data-back-door')
  }

  if (executionValue) {
    executionBlock.classList.add('visible')
    executionDataValue.textContent = executionValue
      .querySelector('.switch-wrapper')
      .getAttribute('data-switch-selected')
  }

  if (colorValue) {
    colorBlock.classList.add('visible')
    colorDataValue.textContent = colorValue.getAttribute('data-color-end')
  }

  const backBtn = document.querySelector('.js-step-3-2')
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      accessorisesSlider.innerHTML = ''
      accessorisesCheckboxes.innerHTML = ''
    })
  }

  if (selectedAccessories.length > 0 && accessorisesSlider) {
    accessorisesSlider.style.display = 'block'
    accessorisesBlock.classList.add('visible')
    accessorisesSlider.innerHTML = ''

    if (selectedAccessories.length > 2) {
      const controlsWrapper = document.createElement('div')
      controlsWrapper.className = 'accessorises__slider-controls'

      const prevBtn = document.createElement('button')
      const nextBtn = document.createElement('button')
      prevBtn.className =
        'accessorises__slider-btn accessorises__slider-btn--prev'
      nextBtn.className =
        'accessorises__slider-btn accessorises__slider-btn--next'

      controlsWrapper.appendChild(prevBtn)
      controlsWrapper.appendChild(nextBtn)
      accessorisesSlider.appendChild(controlsWrapper)
    }

    const swiperWrapper = document.createElement('div')
    swiperWrapper.className = 'swiper-wrapper'

    selectedAccessories.forEach(accessory => {
      const swiperSlide = document.createElement('div')
      swiperSlide.className = 'swiper-slide'

      const accessoryClone = accessory.cloneNode(true)
      swiperSlide.appendChild(accessoryClone)
      swiperWrapper.appendChild(swiperSlide)
    })
    accessorisesSlider.appendChild(swiperWrapper)

    if (typeof Swiper !== 'undefined') {
      const swiperAcessorises = new Swiper(accessorisesSlider, {
        slidesPerView: 2,
        spaceBetween: 16,
        grabCursor: true,
        navigation: {
          nextEl: '.accessorises__slider-btn--next',
          prevEl: '.accessorises__slider-btn--prev',
        },
        breakpoints: {
          1281: {
            spaceBetween: 20,
          },
        },
      })
    }

    const accessorisesSliderItems = accessorisesSlider.querySelectorAll(
      '.accessorises__item',
    )
    if (accessorisesSliderItems.length > 0) {
      accessorisesSliderItems.forEach(accessorise => {
        const content = accessorise.getAttribute('data-tooltip')
        const trigger = accessorise.querySelector('.accessorises__item-tooltip')
        const placement = trigger.getAttribute('data-tooltip-placement')

        if (trigger && content) {
          tippy(trigger, {
            content,
            placement,
            trigger: window.innerWidth > 1280 ? 'mouseenter' : 'click',
            allowHTML: true,
            interactive: window.innerWidth > 1280 ? true : false,
            animation: 'fade',
            duration: [200, 200],
            appendTo: () => document.body,
          })
        }
      })
    }
  } else {
    accessorisesSlider.style.display = 'none'
  }

  if (selectedCheckboxes.length > 0 && accessorisesCheckboxes) {
    accessorisesCheckboxes.classList.remove('hidden')
    accessorisesBlock.classList.add('visible')
    const checkboxesList = document.createElement('div')
    checkboxesList.className = 'accessorises__checkboxes-list'

    selectedCheckboxes.forEach(checkbox => {
      const checkboxItem = checkbox.closest('.accessorises__checkbox-item')
      const checkboxClone = checkboxItem.cloneNode(true)
      checkboxesList.appendChild(checkboxClone)
      checkboxClone.querySelector('.checkbox').classList.add('disabled')
    })

    accessorisesCheckboxes.innerHTML = ''
    accessorisesCheckboxes.appendChild(checkboxesList)

    const accessorisesCheckboxItems = accessorisesCheckboxes.querySelectorAll(
      '.accessorises__checkbox-item',
    )
    if (accessorisesCheckboxItems.length > 0) {
      accessorisesCheckboxItems.forEach(accessorise => {
        const content = accessorise.getAttribute('data-tooltip')
        const trigger = accessorise.querySelector(
          '.accessorises__checkbox-tooltip',
        )
        const placement = trigger.getAttribute('data-tooltip-placement')

        if (trigger && content) {
          tippy(trigger, {
            content,
            placement,
            allowHTML: true,
            interactive: window.innerWidth > 1280 ? true : false,
            animation: 'fade',
            duration: [200, 200],
            appendTo: () => document.body,
          })
        }
      })
    }
  } else {
    accessorisesCheckboxes.classList.add('hidden')
  }
}
