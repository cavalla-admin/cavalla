import Carousel from "../node_modules/bootstrap/js/src/carousel.js";

const carousel = document.querySelector('.carousel');
const slide = new Carousel(carousel, {
  interval: 2000,
  wrap: false,
})