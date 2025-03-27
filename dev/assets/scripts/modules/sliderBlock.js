import { Swiper } from '../../../../node_modules/swiper/swiper-bundle.min.mjs'
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function sliderBlock() {
    const slider = document.querySelector('.slider .swiper')

    if (!slider) return

    const swiper = new Swiper(slider, {
        modules: [Pagination],
        slidesPerView: 'auto',
        spaceBetween: 20,
        autoHeight: true,
        speed: 1000,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function () {
                const bullets = document.querySelectorAll('.swiper-pagination-bullet');
                bullets.forEach((bullet, index) => {
                    bullet.classList.remove('swiper-pagination-bullet-active');
                    if (index === this.realIndex) {
                        bullet.classList.add('swiper-pagination-bullet-active');
                    }
                });
            }
        },
        breakpoints: {
            1281: {
                pagination: false,
                spaceBetween: 0
            }
        }
    })

    if(window.innerWidth > 1280) {
        setTimeout(() => {
            swiper.slideNext();
            setTimeout(() => {
                swiper.slidePrev();
                setTimeout(() => slider.style.opacity = 1, 1000);
            }, 500);
        }, 0);
    }
}

