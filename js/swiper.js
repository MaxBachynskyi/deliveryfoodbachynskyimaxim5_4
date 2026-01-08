document.addEventListener('DOMContentLoaded', () => {
  const promoSwiper = new Swiper('.promo-swiper', {
    loop: true,
    speed: 800,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});
