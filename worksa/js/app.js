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
  /*
  * jQuery Equal Height
  * Author: Suson Waiba
  * Github: https://github.com/susonwaiba/jquery-equal-height
  * URL: http://susonwaiba.com
  */
  $.fn.jQueryEqualHeight = function (innerDiv) {
    if (typeof innerDiv === 'undefined') {
      innerDiv = '.card';
    }

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        topPosition = 0;
    $(this).each(function () {
      $(this).find(innerDiv).css({
        'min-height': '0px'
      });
      topPosition = $(this).position().top;

      if (currentRowStart != topPosition) {
        for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
          rowDivs[currentDiv].find(innerDiv).css({
            'min-height': currentTallest
          });
        }

        rowDivs.length = 0;
        currentRowStart = topPosition;
        currentTallest = $(this).find(innerDiv).height();
        rowDivs.push($(this));
      } else {
        rowDivs.push($(this));
        currentTallest = currentTallest < $(this).find(innerDiv).height() ? $(this).find(innerDiv).height() : currentTallest;
      }

      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].find(innerDiv).css('min-height', currentTallest);
      }
    });
  };

  var $aboutMenuSlider = $('.js-about-menu-slider');

  if ($aboutMenuSlider.length) {
    var $aboutMenuPrev = $('.js-about-menu-prev');
    var $aboutMenuNext = $('.js-about-menu-next');
    $aboutMenuNext.on('click', function () {
      $aboutMenuSlider.animate({
        scrollLeft: $aboutMenuSlider.width()
      }, 300);
      $aboutMenuPrev.removeClass('is-disabled');
      $aboutMenuNext.addClass('is-disabled');
    });
    $aboutMenuPrev.on('click', function () {
      $aboutMenuSlider.animate({
        scrollLeft: 0
      }, 300);
      $aboutMenuPrev.addClass('is-disabled');
      $aboutMenuNext.removeClass('is-disabled');
    });

    if ($aboutMenuSlider.find('.about-menu__item:last-child').hasClass('is-active')) {
      $aboutMenuNext.addClass('is-disabled');
      $aboutMenuPrev.removeClass('is-disabled');
      $aboutMenuSlider.scrollLeft($aboutMenuSlider.width());
      $(window).on('resize', function () {
        $aboutMenuNext.addClass('is-disabled');
        $aboutMenuPrev.removeClass('is-disabled');
        $aboutMenuSlider.scrollLeft($aboutMenuSlider.width());
      });
    }
  }

  function startTimer(timer) {
    var timerDays = timer.querySelector('.js-action-timer-days');
    var timerHours = timer.querySelector('.js-action-timer-hours');
    var timerMinutes = timer.querySelector('.js-action-timer-minutes');
    var deadline = new Date(timer.dataset.end).getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();
      var t = deadline - now;
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      var hours = Math.floor(t % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var minutes = Math.floor(t % (1000 * 60 * 60) / (1000 * 60));
      var seconds = Math.floor(t % (1000 * 60) / 1000);
      timerDays.innerHTML = days;
      timerHours.innerHTML = hours;
      timerMinutes.innerHTML = seconds;

      if (t < 0) {
        clearInterval(x);
        timer.innerHTML = timer.dataset.expired;
      }
    }, 1000);
  }

  var actionTimer = document.querySelectorAll('.js-action-timer');

  if (actionTimer) {
    actionTimer.forEach(startTimer);
  }

  $('.js-client').on('click', function () {
    if ($(this).data('user') == 'new-user') {
      $(this).closest('.cart-order').removeClass('is-client');
    } else {
      $(this).closest('.cart-order').addClass('is-client');
    }
  });
  var swiper = new Swiper(".js-case-slider", {
    slidesPerView: 1,
    spaceBetween: 5,
    pagination: {
      el: ".js-case-slider .swiper-pagination",
      type: "fraction",
      formatFractionCurrent: function formatFractionCurrent(number) {
        return ('0' + number).slice(-2);
      },
      formatFractionTotal: function formatFractionTotal(number) {
        return ('0' + number).slice(-2);
      },
      renderFraction: function renderFraction(currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' + ' / ' + '<span class="' + totalClass + '"></span>';
      }
    },
    navigation: {
      nextEl: ".js-case-slider .swiper-case-button-next",
      prevEl: ".js-case-slider .swiper-case-button-prev"
    }
  });
  $('.logos__item').on('click', function (event) {
    event.preventDefault();
    var $this = $(this);
    var indx = $this.data('index');
    $('.logos__item').removeClass('is-active');
    $this.addClass('is-active');
    $('.case-item').removeClass('is-active').hide();
    $('.case-item').filter('[data-index="' + indx + '"]').fadeIn();
  });
  $('.certificates').lightGallery({
    selector: ".certificates__item a",
    thumbnail: false,
    download: false,
    actualSize: false
  });
  var cookieClose = document.querySelectorAll('.js-close-cookie');

  if (cookieClose) {
    cookieClose.forEach(function (element) {
      element.addEventListener('click', function (event) {
        event.preventDefault();
        element.closest('.cookie').classList.add('is-hidden');
      });
    });
  }

  function directionsMinHeight() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      $('.directions__item').jQueryEqualHeight('.course-item__text');
      $('.directions__item').jQueryEqualHeight('.course-item__title');
    } else {
      $('.course-item__text').removeAttr('style');
      $('.course-item__title').removeAttr('style');
    }
  }

  if ($('.directions__item').length) {
    $(window).on('resize', directionsMinHeight);
  }

  if ($('.faq').length) {
    $('.js-faq-body').each(function () {
      var $html = $(this).html();
      var index = $(this).data('index');
      $('.js-faq-item-body[data-index="' + index + '"]').html($html);
    });
    $('.js-faq-item-title').on('click', function () {
      $(this).closest('.js-faq-item').toggleClass('is-active').toggleClass('is-opened').find('.js-faq-item-body').stop().slideToggle(300);
      $('.js-faq-item').removeClass('is-opened');
      $(this).closest('.js-faq-item').addClass('is-opened');
      $('.js-faq-body').removeClass('is-opened').filter('[data-index="' + $(this).data('index') + '"]').addClass('is-opened');
    });
  }

  $('.js-video').on('click', function (event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      $(this).addClass('is-active');
      var $iframe = $(this).find('iframe');
      $iframe.attr('src', $iframe.attr('data-src'));
    }
  });
  var stars = document.querySelectorAll('.js-rating .i-rating__star');
  stars.forEach(function (star) {
    star.addEventListener('click', function () {
      stars.forEach(function (e) {
        e.classList.remove('is-active');
      });
      this.classList.add('is-active');
    });
  });
  $('.l-menu__button').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.l-menu').toggleClass('is-opened');
  });
  $('.js-menu').on('click', function (event) {
    event.preventDefault();
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

  $('.mobile-sidebar').on('click', function (event) {
    if ($(event.target).closest('.mobile-sidebar__container').length) return;
    $('.mobile-sidebar').removeClass('opened');
    enableHtmlScroll();
  });
  var delay = 0;
  $('.mobile-sidebar .mobile-menu > ul > li').each(function (i) {
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
  $('.mobile-sidebar__content >*').each(function () {
    if (!$(this).hasClass('mobile-menu')) {
      $(this).css({
        animationDelay: '.' + delay + 's'
      });
      delay += 100;
    }
  });
  $('.mobile-menu > ul > li > a').on('click', function (event) {
    if ($(this).closest('li').find('ul').length) {
      event.preventDefault();
      $(this).closest('li').toggleClass('opened');
      $(this).closest('li').find('ul').slideToggle();
    }
  });
  $('.js-more').on('click', function (event) {
    event.preventDefault();
    $(this).toggleClass('hide');
    $(this).closest('.js-hidden-content').toggleClass('show-content');
  });
  $('.product-list').each(function (i, el) {
    var slider = new Swiper(el.querySelector('.js-product-slider'), {
      slidesPerView: "auto",
      loop: false,
      // freeMode: true,
      spaceBetween: 15,
      navigation: {
        nextEl: ".product-list .swiper-button-next",
        prevEl: ".product-list .swiper-button-prev"
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        670: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        920: {
          spaceBetween: 19,
          slidesPerView: 3
        },
        1000: {
          spaceBetween: 19,
          slidesPerView: 3
        },
        1200: {
          spaceBetween: 19,
          slidesPerView: 3
        }
      }
    });
  });

  function numWord(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  }

  function startTimer(timer) {
    var timerDays = timer.querySelector('.js-action-timer-days');
    var timerHours = timer.querySelector('.js-action-timer-hours');
    var timerMinutes = timer.querySelector('.js-action-timer-minutes');
    var timerSeconds = timer.querySelector('.js-action-timer-seconds');
    var deadline = new Date(timer.dataset.end).getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();
      var t = deadline - now;
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      var hours = Math.floor(t % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var minutes = Math.floor(t % (1000 * 60 * 60) / (1000 * 60));
      var seconds = Math.floor(t % (1000 * 60) / 1000);
      timerDays.innerHTML = days + ' ' + numWord(days, ['день', 'дня', 'дней']);
      timerHours.innerHTML = hours < 10 ? '0' + hours : hours;
      timerMinutes.innerHTML = minutes ? minutes < 10 ? '0' + minutes : minutes : '00';
      timerSeconds.innerHTML = seconds ? seconds < 10 ? '0' + seconds : seconds : '00';

      if (t < 0) {
        clearInterval(x);
        timer.innerHTML = timer.dataset.expired;
      }
    }, 1000);
  }

  var actionTimer = document.querySelectorAll('.js-action-timer');

  if (actionTimer) {
    actionTimer.forEach(startTimer);
  }

  var $app = $('.app');
  var $appHeader = $('.header');
  var remodalOverlay = $('.remodal-overlay');
  var bodyGutter = 0;

  function setUpBodyGutter() {
    bodyGutter = window.innerWidth - $app.outerWidth();
  }

  function setUpFixedMoves() {
    $app.css({
      margingRight: bodyGutter
    });
    $appHeader.css({
      paddingRight: bodyGutter
    });
  }

  function restoreFixedMoves() {
    $app.css({
      margingRight: ''
    });
    $appHeader.css({
      paddingRight: ''
    });
  }

  setUpBodyGutter();
  $(window).on('resize', function () {
    setUpBodyGutter();
  });

  if (bodyGutter) {
    $(document).on('opening', '.remodal', function () {
      setUpFixedMoves();
    });
    $(document).on('closed', '.remodal', function () {
      restoreFixedMoves();
    });
  }

  if ($('.about-content .site-squares__item').length) {
    $('.about-content .site-squares__item').jQueryEqualHeight('.site-squares__text');
  }

  if ($('.site-upload').length) {
    $('.site-upload').each(function () {
      var $this = $(this);
      var $input = $this.find('input[type="file"]');
      var $rederer = $this.find('.site-upload__text'); // При изменении инпута вставить в рендерер имя файла

      $input.on('change', function () {
        // только имя файла без пути
        var filename = $input.val().replace(/.*\\/, "");
        $rederer.text(filename).addClass('is-active'); // Если нет файла, то очистить рендерер

        if (!filename) {
          $rederer.text('Файл').removeClass('is-active');
        }
      });
    });
  }

  var inputPhones = $('.iti-phone');

  if (inputPhones.length) {
    inputPhones.each(function () {
      var icountry = $(this).data('country');
      var prnt = this.closest('.i-phone');
      var iti = window.intlTelInput(this, {
        initialCountry: icountry,
        dropdownContainer: prnt,
        utilsScript: "js/vendors/utils.js"
      });
    });
  }

  $('.js-title').on('click', function () {
    if ($(this).closest('.footer').length && $(window).width() >= 768) return;
    $(this).toggleClass('active').closest('.js-parent').find('.js-hidden-content').stop().slideToggle(250);
  });
});