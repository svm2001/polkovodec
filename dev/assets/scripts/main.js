import lazyLoad from './modules/lazyload'
import modal from './modules/modal'
import header from './modules/header.js'
import validate from './modules/validate.js'
import phoneMask from './modules/phoneMask.js'
import constructive from './modules/constructive.js'
import initHeader from './modules/header'
import initConstructive from './modules/constructive'
import sliderBlock from './modules/sliderBlock'
import characteristics from './modules/characteristics'
import accordions from './modules/accordions'
import smoothScrolling from './modules/smoothScrolling'
import developments from './modules/developments'
import configurator from './modules/configurator'
import range from './modules/range'
import switcher from './modules/switch'
import colorDefault from './modules/color-default'
import colorCustom from './modules/color-custom'
// import preloader from 'preloader-js';

export default function main() {
  lazyLoad()
  modal()
  header()
  validate()
  phoneMask()
  constructive()
  initHeader()
  initConstructive()
  sliderBlock()
  characteristics()
  accordions()
  smoothScrolling()
  developments()
  configurator()
  range()
  switcher()
  colorDefault()
  colorCustom()

  // setTimeout(() => {
  //     preloader.hide()
  // }, 500)
}

document.addEventListener('DOMContentLoaded', () => {
  const lazyElements = document.querySelectorAll('.lazy-load');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.add('lazy-loaded');
        observer.unobserve(element);
      }
    });
  }, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  });

  lazyElements.forEach(element => {
    observer.observe(element);
  });

})
