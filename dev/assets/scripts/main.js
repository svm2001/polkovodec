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
  // setTimeout(() => {
  //     preloader.hide()
  // }, 500)

  // SmoothScroll({
  //     animationTime : 500,
  //     stepSize : 100,
  //     accelerationDelta : 300,
  //     accelerationMax : 2,
  //     keyboardSupport : true,
  //     arrowScroll : 50,
  //     pulseAlgorithm : false,
  //     pulseScale : 4,
  //     pulseNormalize : 1,
  //     touchpadSupport : true,
  // })
}

document.addEventListener('DOMContentLoaded', () => {
  main()
})
