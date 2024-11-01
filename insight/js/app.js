'use strict';

// @&~*#()<>xdbgyyzor@&^%*!####11

/* ^^^
* Viewport Height Correction
*
* @link https://www.npmjs.com/package/postcss-viewport-height-correction
* ========================================================================== */
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var isFirefox = /^((?!chrome|android).)*firefox/i.test(navigator.userAgent);
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  });
  if (isApple) {
    $(document.body).addClass('is-ios');
  }
  if (isSafari) {
    $(document.body).addClass('is-safari');
  }
  $(document).on('scroll', function () {
    if ($(document).scrollTop() >= $('.js-intro').height() - $('.header__container').height()) {
      $('.header').addClass('no-transparent');
    } else {
      $('.header').removeClass('no-transparent');
    }
  }).trigger('scroll');
  var articles = document.querySelectorAll('.js-articles');
  articles.forEach(function (el) {
    var scrollBar = el.closest('.swiper-parent').querySelector('.swiper-scrollbar');
    var slider = new Swiper(el, {
      slidesPerView: "auto",
      spaceBetween: 0,
      loop: false,
      speed: 500,
      freeMode: true,
      scrollbar: {
        el: scrollBar,
        draggable: true
      },
      breakpoints: {
        768: {
          spaceBetween: 0
        }
      }
    });
  });
  (function () {
    var bodyGutter;
    $('.js-modal-trigger').on('click', function (evt) {
      evt.preventDefault();
      var $this = $(this);
      bodyGutter = window.innerWidth - $('.app').innerWidth();
      if ($this.hasClass('js-close')) {
        $this.closest('.b-modal').removeClass('opened');
        closingForm();
      } else {
        var url = $this.attr('href').replace('#', '');
        $('.b-modal').filter('[data-modal=' + url + ']').addClass('opened');

        // .find('[tabindex="1"]')

        // .focus()

        if (!isSafari) {
          disableHtmlScroll();
          addGutter();
        }
        setTimeout(function () {
          $('.b-modal').filter('[data-modal=' + url + ']').find('.b-modal__close').focus();
        }, 500);
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
          'padding-right': bodyGutter
        });
        $('.header__container').css({
          'padding-right': bodyGutter
        });
      }
    }
    function removeGutter() {
      if (!isMobile) {
        $(document.documentElement).css({
          'padding-right': 0
        });
        $('.header__container').css({
          'padding-right': 0
        });
      }
    }
    function closingForm() {
      setTimeout(function () {
        if (!isSafari) {
          enableHtmlScroll();
        }
        removeGutter();
      }, 500);
    }

    // $('.b-modal [tabindex="1"]').on('focus', function(){

    //   $('.b-modal [tabindex="2"]').focus()

    // })

    // $('.b-modal [tabindex="11"]').on('focus', function(){

    //   $('.b-modal [tabindex="1"]').focus()

    // })
  })();
  var companySeoSlider = $('.js-company-ceo-slider');
  var companySeoflag = 1;
  var seoSlider = undefined;
  function companySeoSliders() {
    setTimeout(function () {
      companySeoSlider.each(function () {
        if ($(window).width() >= 768 && companySeoflag == 1) {
          seoSlider = new Swiper(this, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true,
            loop: false,
            breakpoints: {
              280: {
                slidesPerView: 1,
                spaceBetween: 27
              },
              992: {
                slidesPerView: 1,
                spaceBetween: 27
              },
              1200: {
                slidesPerView: 2,
                freeMode: false,
                spaceBetween: 15
              },
              1600: {
                slidesPerView: 2,
                freeMode: false,
                spaceBetween: 85
              },
              1700: {
                slidesPerView: 2,
                freeMode: false,
                spaceBetween: 125
              }
            }
          });
          companySeoflag = 2;
        } else if ($(window).width() < 768 && companySeoflag == 2) {
          if (seoSlider) {
            seoSlider.destroy();
            setTimeout(function () {
              $('.countries-list .swiper-wrapper').removeAttr('style');
              $('.countries-list .countries-list__item').removeAttr('style');
            }, 1000);
          }
          companySeoflag = 1;
        }
      });
    }, 50);
  }
  companySeoSliders();
  $(window).on('resize', companySeoSliders);
  $('.fullscreen').on('click', function () {
    $(this).toggleClass('close').closest('.js-map').find('.contacts-content__map-container').toggleClass('fullscreen-visible');
  });
  $(document).on('keydown', function (evt) {
    if (evt.keyCode == 27) {
      $('.contacts-content__map-container').removeClass('fullscreen-visible');
      $('.fullscreen').removeClass('close');
    }
  });
  if (isFirefox && $('.contacts-us').next('.services2').length > 0 || isFirefox && $('.contacts-us').next('.bot-text').length > 0) {
    $('.services2').prev('.contacts-us').addClass('firefox-indent');
    $('.bot-text').prev('.contacts-us').addClass('firefox-indent');
  }
  var countriesSlider = $('.js-countries');
  var countriesSlider2 = $('.js-countries2');
  var countriesSlider3 = $('.js-countries3');
  var slider = undefined;
  var slider2 = undefined;
  var slider3 = undefined;
  var flag = 1;
  var flag2 = 1;
  var flag3 = 1;
  var setTrst;
  function countriesSliders2() {
    countriesSlider2.each(function () {
      if ($(this).hasClass('js-autoplay')) {
        var clonedItems;
      }
      if (!slider2 && $(window).width() < 1200) {
        var scrollBar = $(this).closest('.swiper-parent').find('.swiper-scrollbar')[0];

        //     slider2 = new Swiper(this, {

        //         slidesPerView: "auto",

        //         freeMode: true,

        //         loop: true,

        //         scrollbar: {

        //             el: scrollBar,

        //             draggable: true

        //         }

        // });
      }
      if ($(window).width() >= 1200 && flag2 == 1) {
        if (slider2) {
          slider2.destroy();
        }
        slider2 = new Swiper(this, {
          initialSlide: 5,
          loop: true,
          freeMode: false,
          speed: 3000,
          autoplay: {
            delay: 1,
            disableOnInteraction: false,
            reverseDirection: true
          },
          scrollbar: {
            el: scrollBar,
            draggable: true
          },
          breakpoints: {
            992: {
              slidesPerView: 2,
              spaceBetween: 49
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 49
            },
            1600: {
              slidesPerView: 5,
              spaceBetween: 73
            },
            1920: {
              slidesPerView: 6,
              spaceBetween: 73
            }
          }
        });
      } else if ($(window).width() < 1200 && flag2 == 2) {
        slider2.destroy();

        // var scrollBar = $(this).closest('.swiper-parent').find('.swiper-scrollbar')[0];

        // slider2 = new Swiper(this, {

        //     slidesPerView: "auto",

        //     freeMode: true,

        //     loop: true,

        //     scrollbar: {

        //         el: scrollBar,

        //         draggable: true

        //     }

        // });

        flag2 = 1;
      }
    });
  }
  function countriesSliders() {
    setTimeout(function () {
      countriesSlider.each(function () {
        if ($(window).width() >= 746 && flag == 1) {
          slider = new Swiper(this, {
            slidesPerView: 2,
            initialSlide: 5,
            spaceBetween: 40,
            freeMode: false,
            loop: true,
            speed: 3000,
            autoplay: {
              delay: 0.5,
              disableOnInteraction: false,
              reverseDirection: true
            },
            breakpoints: {
              992: {
                initialSlide: -1,
                slidesPerView: 2,
                spaceBetween: 70
              },
              1200: {
                initialSlide: -1,
                slidesPerView: 3,
                spaceBetween: 100
              },
              1600: {
                initialSlide: -1,
                slidesPerView: 4,
                spaceBetween: 103
              }
            }
          });
          flag = 2;
        } else if ($(window).width() < 746 && flag == 2) {
          if (slider) {
            slider.destroy();
            setTimeout(function () {
              $('.countries-list .swiper-wrapper').removeAttr('style');
              $('.countries-list .countries-list__item').removeAttr('style');
            }, 1000);
          }
          flag = 1;
        }
      });
    }, 50);
  }
  function countriesSliders3() {
    setTimeout(function () {
      countriesSlider3.each(function () {
        if ($(window).width() >= 746 && flag3 == 1) {
          slider3 = new Swiper(this, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            initialSlide: 5,
            loop: true,
            speed: 3000,
            autoplay: {
              delay: 1,
              disableOnInteraction: false,
              reverseDirection: true
            },
            breakpoints: {
              992: {
                slidesPerView: 'auto',
                spaceBetween: 0
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 39
              },
              1600: {
                slidesPerView: 5,
                spaceBetween: 97
              }
            }
          });
          flag3 = 2;
        } else if ($(window).width() < 746 && flag3 == 2) {
          if (slider3) {
            slider3.destroy();
            setTimeout(function () {
              $('.countries-list .swiper-wrapper').removeAttr('style');
              $('.countries-list .countries-list__item').removeAttr('style');
            }, 1000);
          }
          flag3 = 1;
        }
      });
    }, 50);
  }
  if (countriesSlider.length) {
    countriesSliders();
  }
  if (countriesSlider2.length) {
    countriesSliders2();
  }
  if (countriesSlider3.length) {
    countriesSliders3();
  }
  if (countriesSlider.length) {
    $(window).on('resize', countriesSliders);
  }
  if (countriesSlider2.length) {
    $(window).on('resize', countriesSliders2);
  }
  if (countriesSlider3.length) {
    $(window).on('resize', countriesSliders3).trigger('resize');
  }
  $(document).on('scroll', function () {
    // var coeff = 90 * ($(document).scrollTop() / 100)

    var coeff = 150 * ($(document).scrollTop() / 100);
    $('.decor-lines__image').css({
      'background-position-x': coeff + 'px'
    });
  });
  $('.hero-in').css({
    'min-height': $('.hero-in__in').innerHeight()
  }).addClass('fixed');
  function setProperty() {
    $('.hero').css({
      'height': $(window).height()
    });
    $('.hero__item').css({
      'width': $('.hero__item').innerHeight()
    });
    if ($(window).width() <= 768) {
      $('.hero-in__in').css({
        'height': $('.js-hero').innerHeight()
      });
    } else {
      $('.hero-in__in').removeAttr('style');
    }
  }
  ;

  // setProperty();

  // setTimeout(function(){

  //     if($(window).width() >= 768) {

  //         $(window).on('resize', setProperty).trigger('resize');

  //     }

  // }, 50)

  setTimeout(function () {
    $('.js-intro').addClass('loadet');
  }, 100);
  if ($('.js-hero').length > 0) {
    $(document).on('scroll', function () {
      var docScrollTop = $(document).scrollTop();
      if (docScrollTop > $('.js-hero').innerHeight() - $('.header__container').height()) {
        $('.js-hero').addClass('hide-hero');
      }
      if (docScrollTop < $('.js-hero').innerHeight() - $('.header__container').height()) {
        $('.js-hero').removeClass('hide-hero');

        // if($(window).width() >= 1200 && !isSafari) {

        //     $('.js-translate').css({

        //         'transform': 'translate3d(0px,' + docScrollTop+'px, 0)'

        //     });

        // }

        var coeff1 = $(window).width() <= 768 ? 400 : 750;
        var coeff2 = $(window).width() <= 768 ? 200 : 400;
        var trts = -1 * ($('.js-hero').offset().top - docScrollTop);
        var sst = $('.js-hero').offset().top / 10000;
        var cper = 1;
        var trsc = cper -= sst;
        var opst = 1 - docScrollTop / coeff1;
        var opst2 = 1 + docScrollTop / coeff2;
        var opasityStart = 0.285;
        var opasityOut = opst2 / 3.5;
        if ($('.hero video').length > 0) {
          opasityStart = 0;
          opasityOut = docScrollTop / $('.js-hero').height() * 100 / 100;
        }
        $('.js-opacityout').css({
          'opacity': opst
        });
        $('.js-shadow').css({
          'opacity': opasityOut

          // 'opacity': ((docScrollTop/$('.js-hero').height()) * 100 / 100)
        });
      }
      if ($(window).width() >= 1200 && docScrollTop == 0) {
        $('.js-opacityout').css({
          'opacity': 1
        });
        $('.js-shadow').css({
          'opacity': opasityStart
        });
      }
    });
  }
  var bgImg = $('.hero__image').attr('src');
  $('.hero__item').on({
    mouseenter: function mouseenter() {
      var index = $(this).data('index');
      var video = $('.hero__media-action[data-index="' + index + '"]').find('video')[0];
      $('.hero__media-action').removeClass('fadeIn').addClass('pause');
      $('.hero__media-action[data-index="' + index + '"]').addClass('fadeIn').removeClass('pause');
      if ($('.hero__media-action.pause').find('video').length) {
        $('.hero__image').addClass('vdd');
      }
      setTimeout(function () {
        if ($('.hero__media-action.pause').find('video').length) {
          $('.hero__media-action.pause').find('video')[0].pause();
        }
      }, 500);
      if ($('.hero__media-action[data-index="' + index + '"]').find('video').length) {
        $('.hero__media-action[data-index="' + index + '"]').find('video')[0].play();
      }
    },
    mouseleave: function mouseleave() {
      var ind = $(this).data('index');
      var imgurl = $('.hero__media-action[data-index="' + ind + '"] img').attr('src');
      var objPos = $('.hero__media-action[data-index="' + ind + '"] img').css("object-position");
      if ($('.hero__media-action[data-index="' + ind + '"]').find('video').length) {
        $('.hero__media-action[data-index="' + ind + '"]').removeClass('fadeIn').addClass('pause');
        setTimeout(function () {
          $('.hero__media-action[data-index="' + ind + '"].pause').find('video')[0].pause();
        }, 500);
        $('.hero__image').removeClass('vdd');
      }
      $('.hero__image img').attr('src', imgurl).attr('srcset', imgurl).css({
        'object-position': objPos
      });
    },
    touchstart: function touchstart() {
      var index = $(this).data('index');
      var video = $('.hero__media-action[data-index="' + index + '"]').find('video')[0];
      $('.hero__media-action').removeClass('fadeIn').addClass('pause');
      $('.hero__media-action[data-index="' + index + '"]').addClass('fadeIn').removeClass('pause');
      if ($('.hero__media-action.pause').find('video').length) {
        $('.hero__image').addClass('vdd');
      }
      setTimeout(function () {
        if ($('.hero__media-action.pause').find('video').length) {
          $('.hero__media-action.pause').find('video')[0].pause();
        }
      }, 500);
      if ($('.hero__media-action[data-index="' + index + '"]').find('video').length) {
        $('.hero__media-action[data-index="' + index + '"]').find('video')[0].play();
      }
    },
    touchend: function touchend() {
      var ind = $(this).data('index');
      var imgurl = $('.hero__media-action[data-index="' + ind + '"] img').attr('src');
      var objPos = $('.hero__media-action[data-index="' + ind + '"] img').css("object-position");
      if ($('.hero__media-action[data-index="' + ind + '"]').find('video').length) {
        $('.hero__media-action[data-index="' + ind + '"]').removeClass('fadeIn').addClass('pause');
        $('.hero__media-action[data-index="' + ind + '"].pause').find('video')[0].pause();
        $('.hero__image').removeClass('vdd');
      }
      $('.hero__image img').attr('src', imgurl).attr('srcset', imgurl).css({
        'object-position': objPos
      });
    }
  });
  var hotelsAndVillas = document.querySelectorAll('.js-hotels-and-villas-slider');
  hotelsAndVillas.forEach(function (el) {
    var scrollBar = el.closest('.swiper-parent').querySelector('.swiper-scrollbar');
    var slider = new Swiper(el, {
      slidesPerView: "auto",
      spaceBetween: 0,
      loop: false,
      speed: 500,
      freeMode: true,
      scrollbar: {
        el: scrollBar,
        draggable: true
      },
      breakpoints: {
        768: {
          spaceBetween: 0
        }
      }
    });
  });
  $('.languages__active').on('click', function (event) {
    event.preventDefault();
    $(this).closest('.languages').toggleClass('is-opened');
  });
  $(document).on('click', function () {
    if ($(event.target).closest('.languages').length) return;
    $('.languages').removeClass('is-opened');
  });
  $('.main-menu li').each(function () {
    if ($(this).children('ul').length) {
      $(this).addClass('has-child');
      $(this).find('>a, >span').append('<span class="m-tgl">');
    }
  });
  $('.mobile-sidebar .has-child').on('click', function (evt) {
    if (isMobile) {
      evt.preventDefault();
    }
    $(this).toggleClass('is-opened').find('>ul').stop().slideToggle(200);
  });
  $('.js-menu').on('click', function () {
    $('.mobile-sidebar').toggleClass('opened');
    if ($('.mobile-sidebar').hasClass('opened')) {
      disableHtmlScroll();
    } else {
      enableHtmlScroll();
    }
  });
  var docScrollPosition = $(document).scrollTop();
  function disableHtmlScroll() {
    if (isSafari) {
      docScrollPosition = $(document).scrollTop();
      if ($('.header').hasClass('no-transparent')) {
        setTimeout(function () {
          $('.header').addClass('no-transparent');
        }, 10);
      }
      $('body').addClass('overflow-hidden');
      $(document.documentElement).addClass('overflow-hidden');
      $('html, body').animate({
        scrollTop: docScrollPosition
      }, 0);
    } else {
      $('body').removeClass('overflow-hidden');
      $(document.documentElement).addClass('overflow-hidden');
    }
  }
  function enableHtmlScroll() {
    $('body').removeClass('overflow-hidden');
    $(document.documentElement).removeClass('overflow-hidden');
    if (isSafari) {
      $('html, body').animate({
        scrollTop: docScrollPosition
      }, 0);
    }
  }
  $('.mobile-sidebar').on('click tap', function (event) {
    if ($(event.target).closest('.mobile-sidebar__container').length) return;
    $('.mobile-sidebar').removeClass('opened');
    enableHtmlScroll();
  });
  var delay = 0;
  $('.mobile-sidebar .main-menu > ul > li').each(function (i) {
    if (i == 0) {
      $(this).css({
        animationDelay: '0s'
      });
    } else {
      $(this).css({
        animationDelay: '.' + delay + 's'
      });
    }
    delay += 100;
  });
  $('.mobile-sidebar__content div').each(function () {
    if (!$(this).hasClass('main-menu')) {
      $(this).css({
        animationDelay: '.' + delay + 's'
      });
      delay += 100;
    }
  });
  $(window).on('resize', function () {
    if ($(window).width() >= 992 && $('.mobile-sidebar').hasClass('opened')) {
      enableHtmlScroll();
      $('.mobile-sidebar').removeClass('opened');
    }
  });
  $('.js-more-btn').on('click', function () {
    $(this).toggleClass('hide');
    $(this).closest().find('.has-hidden').toggleClass('visible');
  });
  var $rellaxMarquee = $('.js-marquee');
  $.each($rellaxMarquee, function () {
    var marqueeOffset = 0;
    var marqueeScrollbar = null;
    var $line = $(this);
    var martext = $(this).html();
    var speed = $(this).data('speed');
    for (var i = 0; i < 3; i++) {
      martext = martext += martext;
      $line.html(martext);
    }
    if (typeof Scrollbar !== 'undefined') {
      marqueeScrollbar = Scrollbar.get(document.getElementById('page-scroller'));
    }
    function moveMarquee() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var pageY = marqueeScrollbar ? marqueeScrollbar.offset.y : scrollTop;
      scrollTop = $(window).height() + pageY;
      marqueeOffset = $line.offset().top + 10;
      var scrollPos = pageY - $(window).height();
      var translateX = speed * (marqueeOffset - scrollTop);
      if (scrollTop >= marqueeOffset) {
        $line.css({
          transform: 'translateX(' + translateX + 'px)'
        });
      }
    }
    if ($rellaxMarquee.length) {
      moveMarquee();
      $(window).on('resize', moveMarquee);
      $(window).on('scroll', moveMarquee);
    }
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
  $('.scroll-btn').on('click', function () {
    $('html, body').animate({
      scrollTop: $('.js-intro').height() - $('.header__container').height() + 3
    }, 500);
  });
  function servIndent() {
    var iHeight = $('.services__item').innerHeight();
    if ($(window).width() < 768) {
      $('.services__container-wrap').css({
        'margin-top': -iHeight,
        'margin-bottom': -(iHeight / 2) + 6
      });
      $('.services__item').css({
        'margin-top': -(iHeight / 2) - 6,
        'margin-bottom': iHeight / 2 + 6
      });
      $('.services__items').css({
        'padding-top': iHeight / 2
      });
    } else {
      $('.services__container-wrap').css({
        'margin-top': 0,
        'margin-bottom': 0
      });
      $('.services__item').css({
        'margin-top': 0,
        'margin-bottom': 0
      });
      $('.services__items').css({
        'padding-top': 0
      });
    }
  }
  ;
  servIndent();
  $(window).on('resize', servIndent);
  if ($('.rellax').length) {
    var toggleRelaxServices = function toggleRelaxServices() {
      if (window.matchMedia('(min-width: 768px)').matches) {
        if (relaxDestroyed && typeof rellax !== 'function') {
          rellax.refresh();
          relaxDestroyed = false;
        }
      } else {
        if (!relaxDestroyed && rellax.destroy) {
          rellax.destroy();
          relaxDestroyed = true;
        }
      }
    };
    var rellax = new Rellax('.rellax', {
      center: false,
      vertical: true
    });
    var relaxDestroyed = false;
    toggleRelaxServices();
    $(window).on('resize', toggleRelaxServices);
  }
  $('.js-more-btn').on('click', function () {
    var text1 = $(this).data('text');
    var text2 = $(this).find('.jtx').text();
    console.log(text1);
    $(this).data('text', text2).find('.jtx').text(text1);
    $(this).closest('.js-parent').find('.js-hidden-items').toggleClass('visible');
  });
  if ($('.rellax2').length) {
    setTimeout(function () {
      var rellax2 = new Rellax('.rellax2', {
        center: false
      });
    }, 500);
  }
  var widgets = $('.js-widgets-slider');
  var widgetSlider = undefined;
  var widgetFlag = 1;
  function widgetsCarousel() {
    widgets.each(function () {
      if ($(window).width() < 768 && widgetFlag == 1) {
        var scrollBar = $(this).closest('.swiper-parent').find('.swiper-scrollbar')[0];
        widgetSlider = new Swiper(this, {
          slidesPerView: "auto",
          spaceBetween: 0,
          loop: false,
          speed: 500,
          freeMode: true,
          scrollbar: {
            el: scrollBar,
            draggable: true
          },
          breakpoints: {
            768: {
              spaceBetween: 0
            }
          }
        });
        widgetFlag = 2;
      } else if ($(window).width() >= 768 && widgetFlag == 2) {
        if (widgetSlider) {
          widgetSlider.destroy();
          setTimeout(function () {
            $('.widgets .swiper-wrapper').removeAttr('style');
            $('.widgets .countries-list__item').removeAttr('style');
          }, 1000);
        }
        widgetFlag = 1;
      }
    });
  }
  ;
  widgetsCarousel();
  var temp = '.js-weather-item';
  $(temp).each(function () {
    var city = $(this).data('city');
    var tempContainer = $(this).find('.js-temp');
    var icon = $(this).find('.widgets__item-icon');
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=en&appid=" + site_defers.weatherApiKey + "&units=metric",
      dataType: "json",
      success: function success(res) {
        tempContainer.html(Math.floor(res.main.temp));
        icon.append('<img loading="lazy" src="img/' + res.weather[0].description.replace(' ', '-') + '.svg" alt="">');
      }
    });
  });
  $(window).on('resize', widgetsCarousel);
  function ultimateLineWrapperMachine3000(node) {
    var paragraphContent = node.innerHTML.replace(/^\s+|\s+$/gm, ''); // Удаляем лишние пробелы получившиеся из-за форматирования html
    var paragrapthWrappedWords = paragraphContent.replace(/(\S+)/g, '<span class="word">$1</span>'); // Оборачиваем все слова вместе с символами

    node.innerHTML = paragrapthWrappedWords;
    var wrappedWords = document.getElementsByClassName('word');
    var arrayOfWordNodes = Object.keys(wrappedWords).map(function (k) {
      return wrappedWords[k];
    });
    var currLineTop = 0;
    var finalHTML = '';
    arrayOfWordNodes.forEach(function (node, index) {
      var nodeTop = node.offsetTop;
      finalHTML += '' + (index !== 0 && currLineTop !== nodeTop ? '</span></span>' : ' ') + (index === 0 || currLineTop !== nodeTop ? '<span class="line"><span>' : '') + node.innerHTML;
      currLineTop = nodeTop;
    });
    node.innerHTML = finalHTML.trim();
  }
  setTimeout(function () {
    var _iterator = _createForOfIteratorHelper(document.getElementsByClassName('text-splitter')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        ultimateLineWrapperMachine3000(node);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    $('.text-splitter').each(function () {
      var line = $(this).find('.line span');
      var delay = 0;
      line.each(function () {
        $(this).css({
          animationDelay: ' ' + delay + 'ms'
        });
        delay += 150;
      });
    });
  }, 50);
  if ($('.text-splitter').length) {
    if ($(document).scrollTop() <= 0 && $(window).width() > 1024) {
      $('.text-splitter').viewportChecker({
        classToAdd: 'visible',
        offset: -20
      });
    } else {
      $('.text-splitter').addClass('visible');
    }
  }
});