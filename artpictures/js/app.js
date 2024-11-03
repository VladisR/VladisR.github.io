'use strict';

/* ^^^
* Viewport Height Correction
*
* @link https://www.npmjs.com/package/postcss-viewport-height-correction
* ========================================================================== */
function setViewportProperty() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}
window.addEventListener('resize', setViewportProperty);
setViewportProperty(); // Call the fuction for initialisation

/* ^^^
* Полифил для NodeList.forEach(), на случай если забыл про IE 11
*
* @link https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
* ========================================================================== */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

/* ^^^
* JQUERY Actions
* ========================================================================== */
$(function () {
  $.exists = function (selector) {
    return $(selector).length > 0;
  };
  var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  if (isMobile == true) {
    $('body.app').addClass('is-mobile');
  }
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    if (isMobile == true) {
      $('body.app').addClass('is-mobile');
    }
  });
  function disableHtmlScroll() {
    if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
      $('body').addClass('overflow-hidden');
    } else {
      $('body').removeClass('overflow-hidden');
      $(document.documentElement).addClass('overflow-hidden');
    }
  }
  function enableHtmlScroll() {
    $('body').removeClass('overflow-hidden');
    $(document.documentElement).removeClass('overflow-hidden');
  }
  $('input[type="tel"]').mask("+7 (999) 999-99-99");
  $('.js-menu-toggle').on('click', function (evt) {
    evt.preventDefault();
    $(this).toggleClass('is-active');
    $('.js-menu-actions').stop().slideToggle(250);
    $('.header').toggleClass('menu-opened');
    if ($('.header').hasClass('menu-opened')) {
      disableHtmlScroll();
    } else {
      enableHtmlScroll();
    }
  });
  $('.header').on('click', function (evt) {
    if ($(evt.target).closest('.header__content, .js-menu-actions').length) return;
    $('.header').removeClass('menu-opened');
    $('.js-menu-toggle').removeClass('is-active');
    $('.js-menu-actions').stop().slideUp(250);
    enableHtmlScroll();
  });
  var advantagesDelay = 0;
  $('.advantages__item').each(function () {
    $(this).attr('data-aos-delay', +advantagesDelay);
    advantagesDelay += 100;
  });
  ;
  (function () {
    $('.js-modal-trigger').on('click', function (evt) {
      evt.preventDefault();
      var $this = $(this);
      if ($this.hasClass('js-close')) {
        $this.closest('.b-modal').removeClass('opened');
        closingForm();
      } else {
        var url = $this.attr('href').replace('#', '');
        $('.b-modal').filter('[data-modal=' + url + ']').addClass('opened');
        disableHtmlScroll();
        addGutter();
      }
    });
    $('.b-modal').on('click tap', function (event) {
      if ($(event.target).closest('.b-modal__container').length) return;
      $(this).removeClass('opened');
      closingForm();
    });
    $(document).on('keydown', function (evt) {
      if (evt.keyCode == 27) {
        $('.b-modal').removeClass('opened');
        closingForm();
      }
    });
    function addGutter() {
      if (!isMobile) {
        $(document.documentElement).css({
          'padding-right': 17
        });
      }
    }
    function removeGutter() {
      if (!isMobile) {
        $(document.documentElement).css({
          'padding-right': 0
        });
      }
    }
    function closingForm() {
      setTimeout(function () {
        enableHtmlScroll();
        removeGutter();
      }, 500);
    }
  })();
  $('.categor-call').on('click', function () {
    $('.js-sidebar').addClass('is-opened');
  });
  $('.content-box__sidebar-close').on('click', function () {
    $(this).closest('.js-sidebar').removeClass('is-opened');
  });
  $(document).on('scroll', function () {
    $('.categories .b-title').each(function () {
      if ($(this).offset().top - 50 - $(document).scrollTop() <= 0) {
        $(this).addClass('sddsdsd');
        $('.b-title--catalog').text($(this).text());
      }
    });
  });
  $('.categories li').each(function () {
    if ($(this).children('ul').length) {
      $(this).addClass('has-child');
      $(this).find('>a').append('<span class="m-tgl">');
    }
  });
  $('.m-tgl').on('click', function (evt) {
    evt.preventDefault();
    $(this).closest('li').toggleClass('is-opened').find('>ul').stop().slideToggle(100);
  });
  var contactsDelay = 0;
  $('.contacts__item').each(function () {
    $(this).attr('data-aos-delay', +contactsDelay);
    contactsDelay += 100;
  });
  var sidebar;
  if ($('.content-box__sidebar-scroll').length) {
    setTimeout(function () {
      sidebar = new StickySidebar('.js-sidebar', {
        containerSelector: '.content-box__container',
        innerWrapperSelector: '.content-box__sidebar-container',
        topSpacing: 83,
        bottomSpacing: 20,
        minWidth: 993
      });
    }, 100);
  }
  if ($('.fixed-cart-icon-wrapper').length > 0) {
    $(document).on('scroll', function () {
      if ($('.fixed-cart-icon-wrapper').offset().top - $(window).height() - $(document).scrollTop() + 150 <= 0) {
        $('.fixed-cart-icon-wrapper').addClass('absolute');
      } else {
        $('.fixed-cart-icon-wrapper').removeClass('absolute');
      }
    });
  }
  $('.intro').addClass('loadet');
  $('.js-menu').on('click', function () {
    $('.mobile-sidebar').toggleClass('opened');
    if ($('.mobile-sidebar').hasClass('opened')) {
      disableHtmlScroll();
    } else {
      enableHtmlScroll();
    }
  });
  function disableHtmlScroll() {
    if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
      $('body').addClass('overflow-hidden');
    } else {
      $('body').removeClass('overflow-hidden');
      $(document.documentElement).addClass('overflow-hidden');
    }
  }
  function enableHtmlScroll() {
    $('body').removeClass('overflow-hidden');
    $(document.documentElement).removeClass('overflow-hidden');
  }

  // $('.mobile-sidebar').on('click tap', function (event) {

  //     if ($(event.target).closest('.mobile-sidebar__container').length) return;

  //     $('.mobile-sidebar').removeClass('opened')

  //     enableHtmlScroll();

  // });

  $('.js-courier').on('click', function () {
    $('.d-map').removeClass('is-visible').addClass('is-hidden');
    $('.d-contacts').removeClass('is-hidden').addClass('is-visible');
  });
  $('.js-office').on('click', function () {
    $('.d-map').removeClass('is-hidden').addClass('is-visible');
    $('.d-contacts').removeClass('is-visible').addClass('is-hidden');
  });
  if ($('.order select').length) {
    $('.order select').selectWoo({
      minimumResultsForSearch: -1
    });
  }
  (function (window) {
    'use strict';

    function enableScrollBehaviorPolyfill() {
      window.removeEventListener('scroll', enableScrollBehaviorPolyfill);
      if (!'scrollBehavior' in document.documentElement.style) {
        var script = document.createElement('script');
        script.setAttribute('async', true);
        script.setAttribute('src', site_defers.smoothscroll);
        document.body.appendChild(script);
      }
    }
    window.addEventListener('scroll', enableScrollBehaviorPolyfill);
    var btn = document.getElementById('back_to');
    var classes = {
      visible: 'page-scroller--visible',
      inMemory: 'page-scroller--in-memory'
    };
    var tmpY = 0;
    var viewY = 100;
    var inMemory = false;

    /**
       * Native scrollTo with callback
       * @param offset - offset to scroll to
       * @param callback - callback function
       */

    function scrollTo(offset, callback) {
      var fixedOffset = offset.toFixed();
      var onScroll = function onScroll() {
        if (window.pageYOffset.toFixed() === fixedOffset) {
          window.removeEventListener('scroll', onScroll);
          callback();
        }
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
    function resetScroll() {
      setTimeout(function () {
        if (window.pageYOffset > viewY) {
          btn.classList.add(classes.visible);
        } else if (!btn.classList.contains(classes.inMemory)) {
          btn.classList.remove(classes.visible);
        }
      }, 100);
      if (!inMemory) {
        tmpY = 0;
        btn.classList.remove(classes.inMemory);
      }
      inMemory = false;
    }
    function addResetScroll() {
      window.addEventListener('scroll', resetScroll);
    }
    function removeResetScroll() {
      window.removeEventListener('scroll', resetScroll);
    }
    addResetScroll();
    var onClick = function onClick() {
      removeResetScroll();
      if (window.pageYOffset > 0 && tmpY === 0) {
        inMemory = true;
        tmpY = window.pageYOffset;
        btn.classList.add(classes.inMemory);
        scrollTo(0, function () {
          addResetScroll();
        });
      } else {
        btn.classList.remove(classes.inMemory);
        scrollTo(tmpY, function () {
          tmpY = 0;
          addResetScroll();
        });
      }
    };
    btn.addEventListener('click', onClick);
  })(window);
  $('.js-add-to-cart').on('click', function (evt) {
    evt.preventDefault();
    if ($('.popup-cart').hasClass('is-opened')) {
      console.log(11112222);
      return;
    }
    showCartPopup();
  });
  $('.popup-cart__close').on('click', function () {
    closeCartPopup();
  });
  function showCartPopup() {
    $('.popup-cart').addClass('is-opened');
    setTimeout(function () {
      $('.popup-cart').removeClass('is-opened');
    }, 5000);
  }
  function closeCartPopup() {
    $('.popup-cart').removeClass('is-opened');
  }
  $('.js-accordion-title').on('click', function () {
    $(this).toggleClass('is-active').next('.js-accordion-body').stop().slideToggle(250);
  });
  var productSlider = $('.js-product-slider');
  if (productSlider.length) {
    productSlider.each(function () {
      var pagination = $(this).closest('.product-slider').find('.swiper-pagination');
      var slider = new Swiper(this, {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: false,
        speed: 800,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false
        },
        pagination: {
          el: pagination[0],
          clickable: true
        },
        breakpoints: {
          0: {
            slidesPerGroup: 1,
            slidesPerView: 2,
            spaceBetween: 10
          },
          768: {
            slidesPerGroup: 1,
            slidesPerView: 3,
            spaceBetween: 20
          },
          1200: {
            slidesPerGroup: 1,
            slidesPerView: 3,
            spaceBetween: 40
          }
        }
      });
      slider.on('slideChange', function () {
        $('.product-slider .swiper-pagination-bullet-active').prevAll().addClass('activated');
        $('.product-slider .swiper-pagination-bullet-active').nextAll().removeClass('activated');
        $('.product-slider .swiper-pagination-bullet-active').removeClass('activated');
      });
    });
  }
  var productsDelay = 0;
  $('.product-slider .product-item').each(function () {
    $(this).css({
      'animation-delay': productsDelay + 'ms'
    });
    productsDelay += 100;
  });
  var productGalleryThumbs = new Swiper(".js-product-gallery-thumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        slidesPerGroup: 1,
        slidesPerView: 4,
        spaceBetween: 14
      },
      768: {
        slidesPerGroup: 1,
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
  var productGallery = new Swiper(".js-product-gallery", {
    spaceBetween: 14,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    thumbs: {
      swiper: productGalleryThumbs
    }
  });
  if ($('.product select').length) {
    $('.product select').selectWoo({
      minimumResultsForSearch: -1
    });
  }
  $('.js-sorting-trigger').on('click', function () {
    $(this).closest('.sorting').toggleClass('is-opened');
  });
  $(document).on('click', function (evt) {
    if ($(evt.target).closest('.sorting').length) return;
    $('.sorting').removeClass('is-opened');
  });
  var stepsDelay = 0;
  $('.steps__item').each(function () {
    $(this).attr('data-aos-delay', +stepsDelay);
    stepsDelay += 200;
  });
  $('.views__item.is-active').on('click', function (evt) {
    evt.preventDefault();
  });
});
setTimeout(function () {
  AOS.init({
    once: true,
    disable: 'mobile'
  });
}, 100);