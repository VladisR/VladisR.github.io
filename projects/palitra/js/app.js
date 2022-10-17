'use strict';
/* ^^^
* Viewport Height Correction
*
* @link https://www.npmjs.com/package/postcss-viewport-height-correction
* ========================================================================== */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    $('.mobile-sidebar').removeClass('opened');
    enableHtmlScroll();
    addWide();
    advantageSlider();
    ourWorksSlider();
    productSlider();
    partnersSlider();
  });
  $('input[type="tel"]').mask("+7(999) 999-99-99");

  function addWide() {
    setTimeout(function () {
      var indent = $('.js-wide-parent').offset().left;

      if ($(window).width() >= 992) {
        $('.js-wide').css({
          'margin-left': -indent,
          'margin-right': -indent,
          'padding-left': indent,
          'padding-right': indent
        });
      }
    });
  }

  addWide();
  var advSlider;
  var aSliders = $('.js-advantages-slider');
  var dstrArray = [];

  function advantageSlider() {
    if (aSliders.length) {
      if ($(window).width() >= 992) {
        if (typeof advSlider == 'undefined') {
          aSliders.each(function (i, el) {
            var swrp = $(this);
            var swrpPrt = $(this).parent();
            var swrpWrp = $(this).find('.advantages__in2');
            var items = swrp.find($('.advantages__item'));

            if (items.length > 4) {
              swrp.addClass('swiper');
              swrpWrp.addClass('swiper-wrapper');
              items.addClass('swiper-slide');
              swrpPrt.addClass('swiper-initialized');
              advSlider = new Swiper(el, {
                loop: false,
                speed: 800,
                freeMode: true,
                slidesPerView: 3,
                spaceBetween: 23,
                autoplay: {
                  delay: 5000,
                  disableOnInteraction: false
                },
                breakpoints: {
                  1200: {
                    slidesPerView: 4
                  }
                }
              });
              dstrArray.push(advSlider);
            }
          });
        }
      } else {
        if (typeof advSlider != 'undefined') {
          dstrArray.forEach(function (el) {
            el.destroy();
          });
          $('.js-advantages-slider .swiper-wrapper').removeAttr('style');
          $('.js-advantages-slider .swiper-slide').removeAttr('style');
          advSlider = undefined;
        }
      }
    }
  }

  advantageSlider();
  var $app = $('body');
  var $appHeader = $('.app-header__in, .nav-panel.cloned, .page-scroller');
  var remodalOverlay = $('.remodal-overlay');
  var bodyGutter = 0;

  function setUpBodyGutter() {
    bodyGutter = window.innerWidth - $app.outerWidth();
  }

  function setUpFixedMoves() {
    $app.css({
      marginRight: bodyGutter
    });

    if (window.matchMedia('(min-width: 992px)').matches) {
      $appHeader.css({
        marginRight: bodyGutter
      });
    }

    console.log(bodyGutter);
  }

  function restoreFixedMoves() {
    $app.css({
      marginRight: ''
    });

    if (window.matchMedia('(min-width: 992px)').matches) {
      $appHeader.css({
        marginRight: ''
      });
    }
  }

  setUpBodyGutter();
  $(window).on('resize', function () {
    setUpBodyGutter();
  });
  ;

  (function () {
    $('.js-modal-trigger').on('click', function (evt) {
      evt.preventDefault();
      $appHeader = $('.app-header__in, .nav-panel.cloned, .page-scroller');
      var $this = $(this);

      if ($this.hasClass('js-close')) {
        $this.closest('.b-modal').removeClass('opened');
        closingForm();
      } else {
        var url = $this.attr('href').replace('#', '');
        $('.b-modal').filter('[data-modal=' + url + ']').addClass('opened');
        disableHtmlScroll();
        setUpFixedMoves();
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

    function closingForm() {
      setTimeout(function () {
        enableHtmlScroll();
        restoreFixedMoves();
      }, 500);
    }
  })();

  if ($('.js-hero-slider').length) {
    $('.js-hero-slide[data-slide-index="0"]').find('.banner__item-title, .banner__item-button').addClass('is-active');
    $('.js-lazy-img').each(function () {
      var $this = $(this);
      var src = $this.data('src');
      var srcset = $this.data('srcset');
      $this.attr('src', src);
      $this.attr('srcset', srcset);
    });
    var heroSlider = new Swiper(".js-hero-slider", {
      lazy: true,
      effect: "fade",
      loop: false,
      speed: 2000,
      navigation: {
        nextEl: ".banner .swiper-button-next",
        prevEl: ".banner .swiper-button-prev"
      },
      autoplay: {
        delay: 8000,
        disableOnInteraction: false
      }
    });
    $('.banner__item').removeClass('first-slide');
    heroSlider.on('slideChange', function (event) {
      var index = event.realIndex;
      $('.banner__item-title, .banner__item-button').removeClass('is-active');
      $('.js-swiper-bullet').removeClass('is-active').eq(index).addClass('is-active');
      setTimeout(function () {
        $('.js-hero-slide[data-slide-index="' + index + '"]').find('.banner__item-title, .banner__item-button').addClass('is-active');
      }, 300);
    });
    $('.js-swiper-bullet').on('click', function (event) {
      event.preventDefault();
      var index = $(this).data('index');
      heroSlider.slideTo(index);
    });
  }

  $('.main-menu li').each(function () {
    if ($(this).children('ul').length) {
      $(this).addClass('has-child');
      $(this).find('>a').append('<span class="m-tgl">');
    }
  });
  $(document).on('click', '.main-menu li', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    var index = $(this).data('anhor');
    var containerOffset = $('.js-container').filter('[data-index="' + index + '"]').offset().top - 120;
    $('.main-menu li').removeClass('is-active');
    $this.addClass('is-active scrolling');
    setTimeout(function () {
      $this.addClass('is-active');
    }, 600);
    setTimeout(function () {
      $('.main-menu li').removeClass('scrolling');
    }, 1000);
    $('html, body').animate({
      scrollTop: containerOffset
    }, 500);
    enableHtmlScroll();
    $('.mobile-sidebar').removeClass('opened');
  });
  var googleMaps = $('.c-map');

  var waitGoogleMaps = function waitGoogleMaps() {
    if (typeof google !== "undefined") {
      googleMaps.ready(initMap);
    } else {
      setTimeout(waitGoogleMaps, 150);
    }
  }; // map = new google.maps.Map(document.getElementById('objects-map'), {
  // if( type of google == "undefined" ) {
  // }


  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  }

  function scrollMapController() {
    if (isElementInViewport(googleMaps[0])) {
      var mapScript = document.createElement('script');
      mapScript.setAttribute('src', defers.gmaps);
      mapScript.setAttribute('async', true);

      mapScript.onload = function () {
        waitGoogleMaps();
      };

      document.head.appendChild(mapScript);
      window.removeEventListener('scroll', scrollMapController);
    }
  }

  if (googleMaps.length > 0) {
    window.addEventListener('scroll', scrollMapController);
    scrollMapController();
  }

  $('.map-btn-fullscreen').on('click', function () {
    $(this).closest('.c-map').toggleClass('fullscreen');
  });

  function initMap() {
    var coords = $('#c-map').data('coords').split(',');
    var btnZoomIn = document.querySelector('.js-map-btn.plus');
    var btnZoomOut = document.querySelector('.js-map-btn.minus');
    var map = new google.maps.Map(document.getElementById('c-map'), {
      center: {
        lat: Number(coords[0]),
        lng: Number(coords[1])
      },
      zoom: 15,
      disableDefaultUI: true,
      styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": -3
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#616161"
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f5f5"
        }]
      }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#bdbdbd"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eeeeee"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#757575"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e5e5e5"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#757575"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dadada"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#616161"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e5e5e5"
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eeeeee"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#c9c9c9"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      }]
    });
    var iconDefaultUrl = theme_uri + '/img/map-marker.svg';
    var iconDefault = {
      url: iconDefaultUrl,
      scaledSize: new google.maps.Size(54, 65)
    };
    var marker = new google.maps.Marker({
      position: {
        lat: Number(coords[0]),
        lng: Number(coords[1])
      },
      map: map,
      icon: iconDefault
    });
    btnZoomIn.addEventListener('click', function () {
      map.setZoom(map.getZoom() + 1);
    });
    btnZoomOut.addEventListener('click', function () {
      map.setZoom(map.getZoom() - 1);
    });
  }

  ;
  $(document).on('keydown', function (evt) {
    if (evt.keyCode == 27) {
      $('.c-map').removeClass('fullscreen');
    }
  });
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

  $('.mobile-sidebar').on('click tap', function (event) {
    if ($(event.target).closest('.mobile-sidebar__container').length) return;
    $('.mobile-sidebar').removeClass('opened');
    enableHtmlScroll();
  });
  $('.js-target-btn').on('click', function (evt) {
    evt.preventDefault();
    $(this).toggleClass('show').closest('.js-has-hidden-items').toggleClass('show');
  });
  $('.nav-panel').clone().addClass('cloned').appendTo('body');
  $('.nav-panel.cloned > div').addClass('container');
  $(document).on('scroll', function () {
    if ($(document).scrollTop() > $(window).height() - 200) {
      $('.nav-panel.cloned').addClass('visible');
    } else {
      $('.nav-panel.cloned').removeClass('visible');
    }

    $('.js-container').each(function (i, el) {
      var $this = $(this);
      var cntHeight = $this.innerHeight();
      var cntTop = $this.offset().top;
      var tt = cntTop - $(window).height() / 2 - $(document).scrollTop();
      var bb = cntTop + cntHeight - $(window).height() / 2 - $(document).scrollTop();

      if (tt <= 0 && bb > -100) {
        var indx = $this.data('index');
        $('.main-menu li').removeClass('is-active');
        $('.main-menu li').filter('[data-anhor="' + indx + '"]').addClass('is-active');
      } else if (bb <= 0) {
        $('.main-menu li').removeClass('is-active');
      } else if ($(document).scrollTop() <= 500) {
        $('.main-menu li').removeClass('is-active');
      }
    });
  });
  var workSlider;
  var workSliders = $('.js-works-slider');
  var workDstrArray = [];

  function ourWorksSlider() {
    if (workSliders.length) {
      if ($(window).width() >= 992) {
        if (typeof workSlider == 'undefined') {
          workSliders.each(function (i, el) {
            var swrp = $(this);
            var swrpPrt = $(this).parent();
            var swrpWrp = $(this).find('.our-works__items-in1');
            var items = swrp.find($('.our-works__item'));

            if (items.length > 3) {
              swrp.addClass('swiper');
              swrpWrp.addClass('swiper-wrapper');
              items.addClass('swiper-slide');
              swrpPrt.addClass('swiper-initialized');
              workSlider = new Swiper(el, {
                loop: false,
                speed: 800,
                freeMode: true,
                slidesPerView: 2,
                spaceBetween: 23,
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                },
                // autoplay: {
                //   delay: 7000,
                //   disableOnInteraction: false,
                // },
                breakpoints: {
                  1200: {
                    slidesPerView: 2
                  },
                  2500: {
                    spaceBetween: 32,
                    slidesPerView: 2
                  }
                }
              });
              workDstrArray.push(workSlider);
            }
          });
        }
      } else {
        if (typeof workSlider != 'undefined') {
          $('.our-works__items').removeClass('swiper-initialized');
          $('.js-works-slider').removeClass('swiper');
          $('.our-works__items-in1').removeClass('swiper-wrapper');
          $('.our-works__item').removeClass('swiper-slide');
          workDstrArray.forEach(function (el) {
            el.destroy();
          });
          $('.js-advantages-slider .swiper-wrapper').removeAttr('style');
          $('.js-advantages-slider .swiper-slide').removeAttr('style');
          workSlider = undefined;
        }
      }
    }
  }

  ourWorksSlider();

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

  var partnSlider;
  var partSliders = $('.js-partners-slider');
  var partnDstrArray = [];

  function partnersSlider() {
    if (partSliders.length) {
      if ($(window).width() >= 992) {
        if (typeof partnSlider == 'undefined') {
          partSliders.each(function (i, el) {
            var swrp = $(this);
            var swrpPrt = $(this).parent();
            var swrpWrp = $(this).find('.partners__items-in1');
            var items = swrp.find($('.partners__item'));

            if (items.length > 4) {
              swrp.addClass('swiper');
              swrpWrp.addClass('swiper-wrapper');
              items.addClass('swiper-slide');
              swrpPrt.addClass('swiper-initialized');
              var prevArr = $(this).find('.swiper-button-prev');
              var nextArr = $(this).find('.swiper-button-next');
              partnSlider = new Swiper(el, {
                loop: false,
                speed: 350,
                freeMode: true,
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 11,
                navigation: {
                  prevEl: prevArr,
                  nextEl: nextArr
                },
                // autoplay: {
                //   delay: 5000,
                //   disableOnInteraction: false,
                // },
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true
                },
                breakpoints: {
                  992: {
                    slidesPerView: 3
                  },
                  1200: {
                    slidesPerView: 4
                  }
                }
              });
              partnDstrArray.push(partnSlider);
            }
          });
        }
      } else {
        if (typeof partnSlider != 'undefined') {
          $('.partners__items').removeClass('swiper-initialized');
          $('.partners__items-in').removeClass('swiper');
          $('.partners__items-in1').removeClass('swiper-wrapper');
          $('.partners__item').removeClass('swiper-slide');
          partnDstrArray.forEach(function (el) {
            el.destroy();
          });
          $('.js-partners-slider .swiper-wrapper').removeAttr('style');
          $('.js-partners-slider .swiper-slide').removeAttr('style');
          partnSlider = undefined;
        }
      }
    }
  }

  partnersSlider();
  var prodSlider;
  var pSliders = $('.js-product-slider');
  var prodDstrArray = [];

  function productSlider() {
    if (pSliders.length) {
      if ($(window).width() >= 992) {
        if (typeof prodSlider == 'undefined') {
          pSliders.each(function (i, el) {
            var swrp = $(this);
            var swrpPrt = $(this).parent();
            var swrpWrp = $(this).find('.product-list__items-in1');
            var items = swrp.find($('.product-list__item'));

            if (items.length > 4) {
              swrp.addClass('swiper');
              swrpWrp.addClass('swiper-wrapper');
              items.addClass('swiper-slide');
              swrpPrt.addClass('swiper-initialized');
              prodSlider = new Swiper(el, {
                loop: false,
                speed: 350,
                freeMode: true,
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 11,
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                },
                // autoplay: {
                //   delay: 5000,
                //   disableOnInteraction: false,
                // },
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true
                },
                breakpoints: _defineProperty({
                  1200: {
                    slidesPerView: 4
                  }
                }, "1200", {
                  slidesPerView: 5
                })
              });
              prodDstrArray.push(prodSlider);
            }
          });
        }
      } else {
        if (typeof prodSlider != 'undefined') {
          $('.product-list__items').removeClass('swiper-initialized');
          $('.product-list__items-in').removeClass('swiper');
          $('.product-list__items-in1').removeClass('swiper-wrapper');
          $('.product-list__item').removeClass('swiper-slide');
          prodDstrArray.forEach(function (el) {
            el.destroy();
          });
          $('.js-product-slider .swiper-wrapper').removeAttr('style');
          $('.js-product-slider .swiper-slide').removeAttr('style');
          prodSlider = undefined;
        }
      }
    }
  }

  productSlider();
  $('.js-accordion-title').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    var parent = $this.closest('.js-accordion-item');
    var body = parent.find('.js-accordion-body');
    parent.toggleClass('is-opened');
    body.stop().slideToggle(250);
  });
  $('.js-reviews-slider').each(function (i, el) {
    var prevArr = $(this).find('.swiper-button-prev')[0];
    var nextArr = $(this).find('.swiper-button-next')[0];
    var revSlider = new Swiper(el, {
      loop: false,
      speed: 500,
      freeMode: false,
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 11,
      navigation: {
        prevEl: prevArr,
        nextEl: nextArr
      },
      breakpoints: {
        1921: {
          slidesPerView: 3
        }
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
    revSlider.slideTo(1, false, false);
  });
});