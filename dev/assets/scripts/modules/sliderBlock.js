import { Swiper } from '../../../../node_modules/swiper/swiper-bundle.min.mjs'
import { Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function sliderBlock() {
  const slider = document.querySelector('.slider .swiper')

  if (!slider) return

  const swiper = new Swiper(slider, {
    modules: [Pagination, EffectCoverflow],
    effect: 'coverflow',
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    speed: 1000,
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
        const bullets = document.querySelectorAll('.swiper-pagination-bullet')
        bullets.forEach((bullet, index) => {
          bullet.classList.remove('swiper-pagination-bullet-active')
          if (index === this.realIndex) {
            bullet.classList.add('swiper-pagination-bullet-active')
          }
        })
      },
    },
    breakpoints: {
      1281: {
        pagination: false,
        spaceBetween: 0,
        coverflowEffect: {
          rotate: 0,
          stretch: -1000,
          depth: 2000,
          slideShadows: false,
        },
      },
    },
  })
}
