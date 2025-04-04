import gsap from 'gsap';

export default function hero() {

  window.innerWidth > 404 
    ? document.querySelectorAll(".js-motion--mob").forEach(el => el.remove()) 
    : document.querySelectorAll(".js-motion--desk").forEach(el => el.remove())

  const tl = gsap.timeline();

  tl.from(".js-motion > *:not(p)", 1, {
    y: -70,
    opacity: 0,
    ease: "power2.out",
    delay: .5,
    skewY: 0,
    stagger: {
      amount: 1.4
    }
  })
}