'use strict';
/* ^^^
* Viewport Height Correction
*
* @link https://www.npmjs.com/package/postcss-viewport-height-correction
* ========================================================================== */

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e6) { throw _e6; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e7) { didErr = true; err = _e7; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  });

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
      finalHTML += '' + (index !== 0 && currLineTop !== nodeTop ? '</div></div>' : ' ') + (index === 0 || currLineTop !== nodeTop ? '<div class="line"><div>' : '') + node.innerHTML;
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
      var line = $(this).find('.line div');
      var delay = 0;
      line.each(function () {
        $(this).css({
          animationDelay: ' ' + delay + 'ms'
        });
        delay += 150;
      });
    });
  }, 50);
  var headerFlag = 1;
  $(document).on('scroll', function () {
    if ($(document).scrollTop() > $('.intro').height() && headerFlag == 1) {
      $('.header').addClass('is-fixed');
      setTimeout(function () {
        $('.header').addClass('is-visible');
      }, 100);
      headerFlag = 2;
    } else if ($(document).scrollTop() < $('.intro').height() && headerFlag == 2) {
      $('.header').removeClass('is-visible');
      setTimeout(function () {
        $('.header').removeClass('is-fixed');
      }, 100);
      headerFlag = 1;
    }
  }).trigger('scroll');
  var aItems = $('.advantages__item, .reviews__item');
  aItems.each(function () {
    var $this = $(this);
    $(document).on('scroll', function () {
      var top = $this.offset().top - $(document).scrollTop() - $(window).height() + $this.innerHeight() / 4;

      if (top <= 0) {
        $this.addClass('is-visible');
      } else {
        $this.removeClass('is-visible');
      }
    });
  });

  function setHelperHeight() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.advantages__helper').css({
        'height': $('.advantages__items').innerHeight() - 220
      });
    } else {
      $('.advantages__helper').css({
        'height': 0
      });
    }
  }

  setHelperHeight();
  $(window).on('resize', setHelperHeight);

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

  $('.b-popup__close').on('click', function () {
    $(this).closest('.b-popup').removeClass('is-visible');
  });

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  $('.c-video').on('click', function (evt) {
    evt.preventDefault();
    var url = $(this).attr('href');
    url = youtube_parser(url);
    $(this).append('<iframe width="1270" height="720" frameborder="0" src="https://www.youtube.com/embed/' + url + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  });

  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).data('copytext')).select();
    document.execCommand("copy");
    $temp.remove();
  }

  $('.js-copy-btn').on('click', function () {
    var selector = $(this).closest('.contacts__item-body');
    copyToClipboard(selector.find('.js-copy-text'));
    selector.addClass('show-tooltip');
    setTimeout(function () {
      selector.removeClass('show-tooltip');
    }, 1500);
  });
  $('.js-gallery').lightGallery({
    selector: ".js-item-gallery",
    download: false,
    share: false,
    flipHorizontal: false,
    flipVertical: false,
    rotate: false,
    autoPlay: false,
    actualSize: false,
    thumbnail: false
  });
  $('.js-accordion-title').on('click', function () {
    $(this).closest('.js-accordion-item').toggleClass('is-opened').find('.js-accordion-body').stop().slideToggle(250);
  });

  function setHeight() {
    $('.js-accordion-title').each(function () {
      $(this).removeAttr('style');
      $(this).css({
        'min-height': $(this).innerHeight() + 4
      });
    });
  }

  setHeight();
  $(window).on('resize', setHeight); // $('input[type="tel"]').mask("+399 999 9999");

  $('.js-switcher').on('click', function () {
    var index = $(this).data('index');

    if (index) {
      $(this).closest('.feedback').find('.phone-or-email').addClass('by-email');
      $(this).closest('.feedback').find('.phone-or-email').find('input[type="tel"]').removeAttr('required');
      $(this).closest('.feedback').find('.phone-or-email').find('input[type="email"]').attr('required', 'true');
    } else {
      $(this).closest('.feedback').find('.phone-or-email').removeClass('by-email');
      $(this).closest('.feedback').find('.phone-or-email').find('input[type="email"]').removeAttr('required');
      $(this).closest('.feedback').find('.phone-or-email').find('input[type="tel"]').attr('required', 'true');
    }
  });
  $('input[type="tel"]').keyup(function (e) {
    this.value = this.value.replace(/[^0-9\.]/g, ''); // this.value = this.value.replace(/[^0-9\.\+?\d*]/g, '');
  });

  function index(item, collection) {
    return [].slice.call(document.querySelectorAll(collection)).indexOf(document.querySelector(item));
  }

  function gallerySliderInit() {
    var gallerySlider = document.querySelectorAll('.js-gallery-slider');
    var gallerySwiper;

    if (gallerySlider) {
      gallerySlider.forEach(function (item) {
        var prev = item.closest('.gallery').querySelector('.button-prev');
        var next = item.closest('.gallery').querySelector('.button-next');
        var totalItems = item.closest('.gallery').querySelectorAll('.swiper-slide').length;
        var itemsLength = item.closest('.gallery').querySelector('.swiper-counter-total span');
        var offer = item.closest('.gallery').querySelector('.swiper-counter-active');

        function swiperInit() {
          gallerySwiper = new Swiper(item, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            speed: 600,
            navigation: {
              prevEl: prev,
              nextEl: next
            },
            pagination: {
              el: ".swiper-pagination"
            },
            breakpoints: {
              640: {
                slidesPerView: 'auto',
                spaceBetween: 10
              },
              768: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 20
              },
              992: {
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 40
              }
            },
            on: {
              init: function init() {
                var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

                if (paginationLength < 9) {
                  offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
                  itemsLength.innerHTML = '0' + paginationLength;
                } else {
                  offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
                  itemsLength.innerHTML = paginationLength;
                }
              },
              slideChange: function slideChange() {
                var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

                if (paginationLength < 9) {
                  offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
                } else {
                  offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
                }
              },
              resize: function resize() {
                var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

                if (paginationLength < 9) {
                  offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
                  itemsLength.innerHTML = '0' + paginationLength;
                } else {
                  offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
                  itemsLength.innerHTML = paginationLength;
                }
              }
            }
          });
        }

        swiperInit();
      });
    }
  }

  gallerySliderInit();
  $('.intro__button').on('click', function () {
    var index = $(this).data('index');
    var indent = $(window).width() <= 768 ? 40 : 80;
    $("html, body").animate({
      scrollTop: $('[data-trget="' + index + '"]').offset().top - indent
    }, 600);
  });
  $('.js-menu-list li').on('click', function (evt) {
    evt.preventDefault();
    var index = $(this).data('index');
    var indent = $(window).width() <= 768 ? 80 : 120;
    var scrollOffset = $('[data-target]').filter('[data-target="' + index + '"]').offset().top - indent;
    $('.js-menu-list li').removeClass('is-active');
    $(this).addClass('is-active');
    enableHtmlScroll();
    $('.mobile-sidebar').removeClass('is-opened');
    $("html, body").animate({
      scrollTop: scrollOffset
    }, 600);
  });
  $('.js-menu').on('click', function () {
    $('.mobile-sidebar').toggleClass('is-opened');

    if ($('.mobile-sidebar').hasClass('is-opened')) {
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
    $('.mobile-sidebar').removeClass('is-opened');
    enableHtmlScroll();
  });
  var routeDelay = 300;
  $('.route-build__item').each(function () {
    $(this).attr('data-aos-delay', +routeDelay);
    $(this).attr('');
    routeDelay += 200;
  });
  $('.js-apple-route').on('click', function (evt) {
    evt.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var coords = $('.js-apple-route').data('coords');

      if (isMobile) {
        $('.js-apple-route').attr('href', 'maps://?saddr=' + lat + ',' + lng + '&daddr=' + coords + '');
        setTimeout(function () {
          window.open('maps://?saddr=' + lat + ',' + lng + '&daddr=' + coords + '', '_blank');
        }, 200);
      } else {
        $('.js-apple-route').attr('href', 'http://maps.apple.com/?saddr=' + lat + ',' + lng + '&daddr=' + coords + '');
        setTimeout(function () {
          window.open('http://maps.apple.com/?saddr=' + lat + ',' + lng + '&daddr=' + coords + '', '_blank');
        }, 200);
      }
    });
  });

  function teamSliderInit() {
    var teamSlider = document.querySelectorAll('.js-team-slider');
    var teamSwiper;

    if (teamSlider) {
      teamSlider.forEach(function (item) {
        var prev = item.closest('.team').querySelector('.button-prev');
        var next = item.closest('.team').querySelector('.button-next');
        var totalItems = item.closest('.team').querySelectorAll('.swiper-slide').length;
        var itemsLength = item.closest('.team').querySelector('.swiper-counter-total span');
        var offer = item.closest('.team').querySelector('.swiper-counter-active');

        function swiperInit() {
          teamSwiper = new Swiper(item, {
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 600,
            navigation: {
              prevEl: prev,
              nextEl: next
            },
            pagination: {
              el: ".swiper-pagination"
            },
            breakpoints: {
              540: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 10
              },
              768: {
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 20
              },
              1200: {
                slidesPerGroup: 4,
                slidesPerView: 4,
                spaceBetween: 40
              }
            },
            on: {
              init: function init() {
                var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

                if (paginationLength < 9) {
                  offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
                  itemsLength.innerHTML = '0' + paginationLength;
                } else {
                  offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
                  itemsLength.innerHTML = paginationLength;
                }
              },
              slideChange: function slideChange() {
                var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

                if (paginationLength < 9) {
                  offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
                } else {
                  offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
                }
              },
              resize: function resize() {
                var paginationLength = item.querySelectorAll('.swiper-pagination-bullet').length;

                if (this.activeIndex < 9) {
                  offer.innerHTML = '0' + ([].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1);
                  itemsLength.innerHTML = '0' + paginationLength;
                } else {
                  offer.innerHTML = [].slice.call(item.querySelectorAll('.swiper-pagination-bullet')).indexOf(item.querySelector('.swiper-pagination-bullet-active')) + 1;
                  itemsLength.innerHTML = paginationLength;
                }
              }
            }
          });
        }

        swiperInit();
      });
    }
  }

  teamSliderInit();

  function splt(_ref) {
    var _ref$target = _ref.target,
        e = _ref$target === void 0 ? ".splt" : _ref$target,
        _ref$reveal = _ref.reveal,
        t = _ref$reveal === void 0 ? !1 : _ref$reveal;
    var l = [];
    var n = document.querySelectorAll(e);

    for (var _e = 0; _e < n.length; _e++) {
      n[_e].setAttribute("id", "i" + [_e + 1]), l.push(n[_e].innerHTML);

      var i = n[_e].innerHTML.split("");

      for (var _l = 0; _l < i.length; _l++) {
        var r = document.createElement("span");
        if (n[_e].appendChild(r), r.setAttribute("id", "c" + [_l + 1]), " " == i[_l]) r.classList.add("whtSpc");else {
          r.classList.add("char");

          var _e2 = document.querySelectorAll(".char");

          for (var _t = 0; _t < _e2.length; _t++) {
            _e2[_t].style.display = "inline-block", _e2[_t].style.overflow = "hidden", _e2[_t].style.verticalAlign = "top";
          }
        }

        if (1 == t) {
          var _e3 = document.createElement("span");

          _e3.innerHTML = i[_l], r.appendChild(_e3), _e3.setAttribute("id", "r"), _e3.classList.add("reveal");

          var _t2 = document.querySelectorAll(".reveal");

          for (var _e4 = 0; _e4 < _t2.length; _e4++) {
            _t2[_e4].style.display = "inherit", _t2[_e4].style.overflow = "inherit", _t2[_e4].style.verticalAlign = "inherit";
          }
        } else r.innerHTML = i[_l];
      }

      n[_e].removeChild(n[_e].childNodes[0]);
    }

    splt.revert = function () {
      for (var _e5 = 0; _e5 < n.length; _e5++) {
        n[_e5].removeAttribute("id"), n[_e5].innerHTML = l[_e5];
      }
    };
  }

  $(document).on('click', function (event) {
    if ($(event.target).closest('.b-popup, .js-form-show').length) return;
    $('.b-popup').removeClass('is-visible');
  });
  $('.js-form-show').on('click', function (evt) {
    evt.preventDefault();
    $('.b-popup').addClass('is-visible');
    setTimeout(function () {
      $('.b-popup').find($('input')).focus();
    }, 100);
  });
  AOS.init({
    once: true
  });
  setTimeout(function () {
    $('.intro').addClass('loaded');
  }, 50);
  var animationSpeed = 15;

  if ($('.rellax').length) {
    var toggleRelaxServices = function toggleRelaxServices() {
      if (window.matchMedia('(min-width: 992px)').matches) {
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

      if (window.matchMedia('(min-width: 1600px)').matches) {
        animationSpeed = 10;
      } else {
        animationSpeed = 15;
      }
    };

    var rellax = new Rellax('.rellax', {
      speed: animationSpeed,
      center: false,
      vertical: true
    });
    var relaxDestroyed = false;
    toggleRelaxServices();
    $(window).on('resize', toggleRelaxServices);
  }

  var animationSpeed2 = 10;

  if ($('.rellax2').length) {
    var toggleRelaxServices2 = function toggleRelaxServices2() {
      if (window.matchMedia('(min-width: 992px)').matches) {
        if (relaxDestroyed && typeof rellax2 !== 'function') {
          rellax2.refresh();
          relaxDestroyed = false;
        }
      } else {
        if (!relaxDestroyed && rellax2.destroy) {
          rellax2.destroy();
          relaxDestroyed = true;
        }
      }

      if (window.matchMedia('(min-width: 1600px)').matches) {
        animationSpeed2 = 300;
      } else {
        animationSpeed2 = 3;
      }
    };

    var rellax2 = new Rellax('.rellax2', {
      speed: animationSpeed2,
      center: false,
      vertical: true
    });
    var relaxDestroyed = false;
    toggleRelaxServices2();
    $(window).on('resize', toggleRelaxServices2);
  }
});