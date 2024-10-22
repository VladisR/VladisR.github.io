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
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    revSlider();
    servSlider();
    partSlider();
    partSlider2();
    achievementsSlider();

    if ($(window).width() >= 992) {
      $('html').removeClass('overflow-hidden');
      $('.mobile-sidebar').removeClass('opened');
    }
  });
  $('.js-accordion-title').on('click', function (evt) {
    $(this).closest('.js-accordion-parent').toggleClass('is-opened').find('.js-accordion-body').stop().slideToggle(250);
  });
  var achievSlider;
  var aSliders = $('.js-achievements');
  var dstrArray = [];

  function achievementsSlider() {
    if ($('.js-achievements').length) {
      if ($(window).width() >= 992) {
        if (typeof achievSlider == 'undefined') {
          aSliders.each(function (i, el) {
            var items = $(this).find($('.swiper-slide'));

            if (items.length > 4) {
              achievSlider = new Swiper(el, {
                calculateHeight: true,
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                },
                spaceBetween: 30,
                slidesPerView: 4,
                slideActiveClass: 'is-active',
                breakpoints: {
                  992: {
                    slidesPerView: 4,
                    slidesPerGroup: 2,
                    spaceBetween: 30
                  }
                }
              });
              $(this).find('.swiper-controls').appendTo($(this).closest('.achievements'));
              dstrArray.push(achievSlider);
            }
          });
        }
      } else {
        if (typeof achievSlider != 'undefined') {
          aSliders.each(function () {
            var controls = $(this).closest('.achievements').find('.swiper-controls');
            var container = $(this).closest('.achievements').find('.achievements__items-wrapper');
            controls.appendTo(container);
          });
          dstrArray.forEach(function (el) {
            el.destroy();
          });
          $('.js-achievements .swiper-wrapper').removeAttr('style');
          $('.js-achievements .swiper-slide').removeAttr('style');
          achievSlider = undefined;
        }
      }
    }
  }

  achievementsSlider();
  $(document).on('scroll load', function () {
    if ($(document).scrollTop() > 150) {
      $('.app-header').addClass('fixed');
    } else {
      $('.app-header').removeClass('fixed');
    }
  }).trigger('scroll');
  var yaMaps = $('.c-map');

  var waitYmaps = function waitYmaps() {
    if (typeof ymaps !== "undefined") {
      ymaps.ready(initMap);
    } else {
      setTimeout(waitYmaps, 150);
    }
  };

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  }

  function scrollMapController() {
    if (isElementInViewport(yaMaps[0])) {
      var mapScript = document.createElement('script');
      mapScript.setAttribute('src', defers.ymaps);
      mapScript.setAttribute('async', true);

      mapScript.onload = function () {
        waitYmaps();
      };

      document.head.appendChild(mapScript);
      window.removeEventListener('scroll', scrollMapController);
    }
  }

  if (yaMaps.length > 0) {
    window.addEventListener('scroll', scrollMapController);
    scrollMapController();
  }

  var initMap = function initMap() {
    yaMaps.each(function (i, el) {
      var coords = $(el).data('coords').split(',').map(function (point) {
        return Number.parseFloat(point.trim());
      });
      var zoom = $(el).data('zoom');

      if (!zoom) {
        zoom = 15;
      }

      var cMapOptions = {
        center: coords,
        iconCenter: coords,
        zoom: zoom,
        icon: {
          href: charkk.assets_uri + "/img/map-marker.svg",
          size: [60, 80],
          offset: [-20, -65]
        }
      };
      var cMap = new ymaps.Map(el, {
        center: cMapOptions.center,
        zoom: cMapOptions.zoom,
        controls: ['zoomControl']
      }, {});
      var cMapPlacemark = new ymaps.Placemark([cMapOptions.iconCenter[0], cMapOptions.iconCenter[1]], {
        hintContent: '',
        balloonContent: ''
      }, {
        iconLayout: 'default#image',
        iconImageHref: cMapOptions.icon.href,
        iconImageSize: cMapOptions.icon.size,
        iconImageOffset: cMapOptions.icon.offset
      });
      cMap.geoObjects.add(cMapPlacemark);
      cMap.behaviors.disable('scrollZoom');
    });
  };

  $('input[type="tel"]').mask("+7(999) 999-99-99");
  $('input[type="file"]').on('change', function () {
    $(this).closest('.i-file').find('.i-file__name').text($(this)[0].files[0].name);
  });

  if ($('.js-hero-slider').length) {
    $('.js-hero-slide[data-slide-index="0"]').find('.fw-slider__item-title, .fw-slider__item-text, .fw-slider__item-stiker').addClass('is-active');
    $('.js-lazy-img').each(function () {
      var $this = $(this);
      var src = $this.data('src');
      var srcset = $this.data('srcset');
      $this.attr('src', src);
      $this.attr('srcset', srcset);
    });
    var heroSlider = new Swiper(".js-hero-slider", {
      effect: "fade",
      loop: false,
      speed: 3000,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      }
    });
    $('.fw-slider__item').removeClass('first-slide');
    heroSlider.on('slideChange', function (event) {
      var index = event.realIndex;
      $('.fw-slider__item-title, .fw-slider__item-text, .fw-slider__item-stiker').removeClass('is-active');
      $('.js-swiper-bullet').removeClass('is-active').eq(index).addClass('is-active');
      setTimeout(function () {
        $('.js-hero-slide[data-slide-index="' + index + '"]').find('.fw-slider__item-title, .fw-slider__item-text, .fw-slider__item-stiker').addClass('is-active');
      }, 300);
    });
    $('.js-swiper-bullet').on('click', function (event) {
      event.preventDefault();
      var index = $(this).data('index');
      heroSlider.slideTo(index);
    });
  }

  var gThumbs = new Swiper(".js-gallery-h-thumbs", {
    spaceBetween: 10,
    watchSlidesProgress: false,
    breakpoints: {
      0: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      575: {
        slidesPerView: 6,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 8,
        spaceBetween: 10
      },
      1200: {
        slidesPerView: 9,
        spaceBetween: 20
      }
    }
  });
  var gSlider = new Swiper(".js-gallery-h", {
    spaceBetween: 10,
    lazy: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    thumbs: {
      swiper: gThumbs
    }
  });
  $('.m-tgl').on('click', function (evt) {
    evt.preventDefault();

    if ($(this).closest('.main-menu.mobile').length) {
      $(this).closest('li').toggleClass('is-opened').find('.m-dropdown').stop().slideToggle(200);
    } else {
      $(this).closest('li').toggleClass('is-opened').find('>ul').stop().slideToggle(200);
    }
  });
  $('.main-menu .menu-item-has-children').on({
    mouseenter: function mouseenter() {
      $('.app-header').addClass("colored");
    },
    mouseleave: function mouseleave() {
      $('.app-header').removeClass("colored");
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
  $(document).on('click', '.js-thumb', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    var href = $this.data('url');
    var imageParent = $this.closest('.object-h');
    var image = imageParent.find('.js-image');

    if ($this.parent().hasClass('is-active')) {
      return;
    }

    image.animate({
      'opacity': 0
    }, 300, function () {
      imageParent.addClass('loading');
      image.attr('src', href).removeAttr('srcset').closest(imageParent);
      imageParent.imagesLoaded(function () {
        imageParent.removeClass('loading');
        image.animate({
          'opacity': 1
        });
      });
    });
    imageParent.find('.object-h__thumb').removeClass('is-active');
    $this.parent().addClass('is-active');
  });

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

  var partnersSlider;
  var partnersSlider2;

  function partSlider() {
    if ($('.js-partners').length) {
      if ($(window).width() >= 992) {
        if (typeof partnersSlider == 'undefined') {
          partnersSlider = new Swiper('.js-partners', {
            calculateHeight: true,
            loop: true,
            navigation: {
              nextEl: ".js-partners .swiper-button-next",
              prevEl: ".js-partners .swiper-button-prev"
            },
            spaceBetween: 30,
            slidesPerView: 4,
            slideActiveClass: 'is-active',
            lazy: true,
            breakpoints: {
              992: {
                slidesPerView: 5,
                slidesPerGroup: 4,
                spaceBetween: 30
              },
              1200: {
                slidesPerView: 6,
                slidesPerGroup: 5,
                spaceBetween: 30
              }
            }
          });
          $('.js-partners .swiper-controls').appendTo($('.js-partners').parent());
        }
      } else {
        $('.partners__item').each(function () {
          var $this = $(this);
          var src = $this.find('img').data('src');
          $this.find('img').attr('src', src);
        });

        if (typeof partnersSlider != 'undefined') {
          partnersSlider.destroy();
          partnersSlider = undefined;
          $('.js-partners2').parent().find('.swiper-controls').appendTo($('.js-partners').parent().find('.partners__items-wrapper'));
          $('.js-partners .swiper-wrapper').removeAttr('style');
          $('.js-partners .swiper-slide').removeAttr('style');
        }
      }
    }
  }

  function partSlider2() {
    if ($('.js-partners2').length) {
      if ($(window).width() >= 992) {
        if (typeof partnersSlider2 == 'undefined') {
          partnersSlider2 = new Swiper('.js-partners2', {
            calculateHeight: true,
            loop: true,
            navigation: {
              nextEl: ".js-partners2 .swiper-button-next",
              prevEl: ".js-partners2 .swiper-button-prev"
            },
            spaceBetween: 30,
            slidesPerView: 4,
            slideActiveClass: 'is-active',
            lazy: true,
            breakpoints: {
              992: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 30
              }
            }
          });
          $('.js-partners2 .swiper-controls').appendTo($('.js-partners2').parent());
        }
      } else {
        $('.partners__item').each(function () {
          var $this = $(this);
          var src = $this.find('img').data('src');
          $this.find('img').attr('src', src);
        });

        if (typeof partnersSlider2 != 'undefined') {
          partnersSlider2.destroy();
          partnersSlider2 = undefined;
          $('.js-partners2').parent().find('.swiper-controls').appendTo($('.js-partners2').parent().find('.partners__items-wrapper'));
          $('.js-partners2 .swiper-wrapper').removeAttr('style');
          $('.js-partners2 .swiper-slide').removeAttr('style');
        }
      }
    }
  }

  partSlider();
  partSlider2();
  var $app = $('.app');
  var $appHeader = $('.app-header');
  var $footerCart = $('.footer-cart');
  var remodalOverlay = $('.remodal-overlay');
  var bodyGutter = 0;

  function setUpBodyGutter() {
    bodyGutter = window.innerWidth - $app.outerWidth();
  }

  function setUpFixedMoves() {
    $app.css({
      margingRight: bodyGutter
    });

    if (window.matchMedia('(min-width: 992px)').matches) {
      $appHeader.css({
        paddingRight: bodyGutter
      });
    }
  }

  function restoreFixedMoves() {
    $app.css({
      margingRight: ''
    });

    if (window.matchMedia('(min-width: 992px)').matches) {
      $appHeader.css({
        paddingRight: ''
      });
    }
  }

  setUpBodyGutter();
  $(window).on('resize', function () {
    setUpBodyGutter();
  });

  if (bodyGutter) {
    $(document).on('opening', '.remodal', function () {
      // bodyScrollLock.disableBodyScroll(remodalOverlay[0]);
      setUpFixedMoves();
    });
    $(document).on('closed', '.remodal', function () {
      // bodyScrollLock.enableBodyScroll(remodalOverlay[0]);
      restoreFixedMoves();
    });
  }

  var reviewsSlider;

  function revSlider() {
    if ($('.js-reviews').length) {
      if ($(window).width() >= 992) {
        if (typeof reviewsSlider == 'undefined') {
          reviewsSlider = new Swiper('.js-reviews', {
            calculateHeight: true,
            loop: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
            spaceBetween: 30,
            slidesPerView: 2,
            slideActiveClass: 'is-active',
            breakpoints: {
              992: {
                slidesPerView: 2,
                slidesPerGroup: 4,
                spaceBetween: 30
              },
              1200: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 30
              }
            }
          });
          $('.js-reviews .swiper-button').appendTo($('.js-reviews').parent());
        }
      } else {
        if (typeof reviewsSlider != 'undefined') {
          reviewsSlider.destroy();
          reviewsSlider = undefined;
          $('.reviews .swiper-button').appendTo($('.reviews__items-wrapper'));
          $('.js-reviews .swiper-wrapper').removeAttr('style');
          $('.js-reviews .swiper-slide').removeAttr('style');
        }
      }
    }
  }

  revSlider();
  var servicesSlider;

  function servSlider() {
    if ($('.js-services').length && $('.js-services .swiper-slide').length > 3) {
      if ($(window).width() >= 992) {
        if (typeof servicesSlider == 'undefined') {
          servicesSlider = new Swiper('.js-services', {
            calculateHeight: true,
            navigation: {
              nextEl: ".js-services .swiper-button-next",
              prevEl: ".js-services .swiper-button-prev"
            },
            scrollbar: {
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true
            },
            spaceBetween: 27,
            slidesPerView: 3,
            slideActiveClass: 'is-active',
            breakpoints: {
              992: {
                slidesPerView: 3,
                slidesPerGroup: 2,
                spaceBetween: 27
              }
            }
          });
          $('.js-services .swiper-controls').appendTo($('.services.type-2'));
          $('.swiper-button-lock').parent().hide();
        }
      } else {
        if (typeof servicesSlider != 'undefined') {
          servicesSlider.destroy();
          servicesSlider = undefined;
          $('.services.type-2 .swiper-controls').appendTo($('.services__items-wrapper'));
          $('.js-services .swiper-wrapper').removeAttr('style');
          $('.js-services .swiper-slide').removeAttr('style');
        }
      }
    }
  }

  servSlider();
  $('.js-load-content').on('click', function (evt) {
    evt.preventDefault();
    $(this).addClass('loading');
  });
  $('.js-scroll-to').on('click', function () {
    $('html,body').animate({
      scrollTop: $('.c-form').offset().top - 60
    }, 500);
  });

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  $('.js-video').each(function () {
    var videoId = $(this).data('video-url'),
        videoId = youtube_parser(videoId);
    var hasImage = $(this).find('img').length;
    var poster = '//img.youtube.com/vi/' + videoId + '/hq720.jpg';

    if (!hasImage) {
      $(this).find('> .video__image').css('background-image', 'url(' + poster + ')');
    }
  });

  if ($('.js-video').length) {
    $('body').append('<div class="video-popup"><div class="video-popup__container"><div class="video-popup__close js-trigger-close"><span class="svg-icon svg-icon--close" aria-hidden="true"><svg class="svg-icon__link"><use xlink:href="#close"></use></svg></span></div><div class="popup-content"></div></div></div>');
  }

  $('.js-video').on('click', function (event) {
    event.preventDefault();
    var href = $(this).data('video-url');
    var videoId = youtube_parser(href);
    $('.video-popup').addClass('opened');

    if (href.indexOf('<iframe') > -1) {
      $('.video-popup__container .popup-content').append(href);
    } else if (href.indexOf('youtube') > -1 || href.indexOf('youtu') > -1) {
      $('.video-popup__container .popup-content').append('<iframe width="100%" height="100%" frameborder="0" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    } else if (href.indexOf('rutube') > -1) {
      href = href.match(/^https.+?video\/(.+)/)[1];
      $('.video-popup__container .popup-content').append('<iframe width="100%" height="100%" frameborder="0" src="https://rutube.ru/play/embed/' + href + '?t=5" frameBorder="0" allow="autoplay; encrypted-media" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
    } else {
      $('.video-popup__container .popup-content').append('<video controls="controls" autoplay><source src="' + href + '" type="video/ogg"><source src="' + href + '" type="video/mp4"><source src="video/duel.webm" type="video/webm"></video>');
    }
  });

  function closeVideo() {
    $('.video-popup').removeClass('opened');
    setTimeout(function () {
      $('.video-popup__container').find('iframe, video').remove();
    }, 300);
  }

  $('.video-popup').on('click', function (e) {
    if ($(e.target).closest('.video-popup__container').length) {
      return;
    }

    closeVideo();
  });
  $('.js-trigger-close').on('click', function () {
    closeVideo();
  });
  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      closeVideo();
      $('.l-sidebar').removeClass('opened');
    }
  });
});