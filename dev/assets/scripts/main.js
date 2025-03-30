import lazyLoad from './modules/lazyload'
import modal from './modules/modal'
import validate from './modules/validate'
import phoneMask from './modules/phoneMask'
import constructive from './modules/constructive'
import header from './modules/header'
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
import lazyBlocks from './modules/lazy-blocks'
import video from './modules/video'
// import preloader from 'preloader-js';

export default function main() {
  lazyBlocks()
  lazyLoad()
  modal()
  header()
  validate()
  phoneMask()
  constructive()
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
  video()

  // setTimeout(() => {
  //     preloader.hide()
  // }, 500)
}
