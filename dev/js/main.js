import { initDevice } from './libs/device.js';
import { initModal } from './libs/hystmodal.min.js';
import { initSmoothScroll } from './libs/smoothScroll.min.js';

document.addEventListener('DOMContentLoaded', () => {
  initDevice();
  initModal();
  initSmoothScroll();
});
