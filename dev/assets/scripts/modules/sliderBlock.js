import { Swiper } from '../../../../node_modules/swiper/swiper-bundle.min.mjs'
import { Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function sliderBlock() {
  const slider = document.querySelector('.slider .swiper')
  const nextBtn = document.querySelector('.slider__controls-btn--next')
  const prevBtn = document.querySelector('.slider__controls-btn--prev')

  if (!slider) return

  const swiper = new Swiper(slider, {
    modules: [Pagination, EffectCoverflow],
    effect: 'coverflow',
    grabCursor: false,
    slidesPerView: 1,
    slidesPerGroup: 1,
    centeredSlides: true,
    draggable: false,
    speed: 1000,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    coverflowEffect: {
      rotate: 70,
      stretch: -100,
      depth: 500,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      slideChange: function () {
        if(window.innerWidth < 1281) {
          const bullets = document.querySelectorAll('.swiper-pagination-bullet')
          bullets.forEach((bullet, index) => {
            bullet.classList.remove('swiper-pagination-bullet-active')
            if (index === this.realIndex) {
              bullet.classList.add('swiper-pagination-bullet-active')
            }
          })
        }
      },
    },
    breakpoints: {
      1281: {
        pagination: false,
        spaceBetween: 210,
        allowTouchMove: false,
        autoHeight: true,
        draggable: false,
        touchRatio: 0,
        slidesPerView: 1,
        centeredSlides: false,
        coverflowEffect: {
          rotate: 0,
          stretch: -1000,
          depth: 2000,
          slideShadows: false,
        },
      },
    },
  })

  // Обработчики для кнопок навигации
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      swiper.slideNext()
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      swiper.slidePrev()
    })
  }
}
