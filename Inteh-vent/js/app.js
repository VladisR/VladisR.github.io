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
  $('.js-accordion-title').on('click', function () {
    $(this).closest('.js-accordion-item').toggleClass('is-opened').find('.js-accordion-body').stop().slideToggle(250);
  });

  if ($('.js-brands').length) {
    var brandsSlider = new Swiper(".js-brands", {
      freeMode: false,
      spaceBetween: 0,
      slidesPerView: "auto",
      navigation: {
        nextEl: ".brands .swiper-button-next",
        prevEl: ".brands .swiper-button-prev"
      },
      pagination: {
        el: ".brands .swiper-pagination",
        clickable: true
      },
      breakpoints: {
        640: {
          // slidesPerView: 2,
          spaceBetween: 0
        },
        768: {
          // slidesPerView: 4,
          spaceBetween: 0
        },
        992: {
          // slidesPerView: 3,
          spaceBetween: 0
        }
      }
    });
  }

  $('.js-gallery').lightGallery({
    selector: ".certificates__item a",
    download: false,
    share: false,
    flipHorizontal: false,
    flipVertical: false,
    rotate: false,
    autoPlay: false,
    actualSize: false,
    thumbnail: false
  });
  var clientsSlider = new Swiper(".js-clients", {
    freeMode: false,
    // spaceBetween: 25,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".clients .swiper-button-next",
      prevEl: ".clients .swiper-button-prev"
    },
    pagination: {
      el: ".clients .swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {// slidesPerView: 2,
        // spaceBetween: 0,
      },
      768: {// slidesPerView: 4,
        // spaceBetween: 0,
      },
      992: {// slidesPerView: 3,
        // spaceBetween: 62,
      }
    }
  });

  function moveClientsArrows() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.clients .swiper-buttons').appendTo('.clients .clients__header');
    } else {
      $('.js-clients').after($('.clients .swiper-buttons').appendTo('.clients .clients__header'));
    }
  }

  moveClientsArrows();
  $(window).on('resize', moveClientsArrows);
  $('input[type="tel"]').mask("+7 (999) 999-99-99");
  var fileBox = document.querySelectorAll('.js-file');

  if (fileBox) {
    fileBox.forEach(function (el) {
      var textField = el.querySelector('.js-file-label');
      el.querySelector('input').addEventListener('change', function () {
        if (textField) {
          textField.innerText = this.files[0].name;
        }
      });
    });
  }

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
  $('.modal-feedback form').submit(function (event) {
    event.preventDefault();
    $(this).closest('.modal-feedback').hide();
    $(this).closest('.remodal').find('.modal-thanks').show();
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
  })(window); // js-quiz-step-header
  // js-quiz-progress-step
  // js-quiz-step
  // js-to-prev-step
  // js-to-next-step
  // js-quiz-progress-thumb
  // js-quiz-gift


  var $quizStepHeader = $('.js-quiz-step-header');
  var $quizProgressStep = $('.js-quiz-progress-step');
  var $quizStep = $('.js-quiz-step');
  var $toPrevStep = $('.js-to-prev-step');
  var $toNextStep = $('.js-to-next-step');
  var $quizProgressThumb = $('.js-quiz-progress-thumb');
  var $quizGift = $('.js-quiz-gift');
  var $quizBottom = $('.js-quiz-bottom');
  var quizStep = 0;
  var stepCount = $quizStep.length;
  var progress = ['9%', '25.5%', '42%', '58.5%', '75%', '91%', '105%'];
  $toNextStep.on('click', function (event) {
    event.preventDefault();
    quizStep++;
    $quizStepHeader.removeClass('is-active');
    $quizStepHeader.filter('[data-step="' + quizStep + '"]').addClass('is-active');
    $quizProgressStep.removeClass('is-active');
    $quizProgressStep.eq(quizStep).addClass('is-active');
    $quizStep.removeClass('is-active');
    $quizStep.eq(quizStep).addClass('is-active');
    $quizProgressThumb.css('width', progress[quizStep]);
    $toPrevStep.removeClass('is-disabled');

    if (quizStep == stepCount - 1) {
      $quizGift.addClass('is-hidden');
      $quizBottom.addClass('is-hidden');
    }
  });
  $toPrevStep.on('click', function (event) {
    event.preventDefault();
    quizStep--;
    $quizStepHeader.removeClass('is-active');
    $quizStepHeader.filter('[data-step="' + quizStep + '"]').addClass('is-active');
    $quizProgressStep.removeClass('is-active');
    $quizProgressStep.eq(quizStep).addClass('is-active');
    $quizStep.removeClass('is-active');
    $quizStep.eq(quizStep).addClass('is-active');
    $quizProgressThumb.css('width', progress[quizStep]);
    $quizGift.removeClass('is-hidden');
    $quizBottom.removeClass('is-hidden');

    if (quizStep == 0) {
      $toPrevStep.addClass('is-disabled');
    }
  });
  var quizRange = $(".js-range-slider").ionRangeSlider({
    min: 50,
    max: 250,
    from: 80,
    postfix: " м2"
  });
  $('#quiz-step1').val(quizRange.prop("value"));
  $('.quiz-step').each(function () {
    var $items = $(this).find('.js-quiz-step-item');
    var index = $(this).data('step');
    var defaultValue = $(this).find('.js-quiz-step-item.is-active .js-quiz-step-item-value').text();

    if (defaultValue) {
      $('#quiz-step' + index).val(defaultValue);
    }

    $items.on('click', function (event) {
      $items.removeClass('is-active');
      $(this).addClass('is-active');
      $('#quiz-step' + index).val($(this).find('.js-quiz-step-item-value').text());
    });
  });
  var $app = $('.app');
  var $appHeader = $('.header');
  var $mainNav = $('.main-nav');
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
    $mainNav.css({
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
    $mainNav.css({
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

  var reviewsSlider = new Swiper(".js-reviews", {
    freeMode: false,
    spaceBetween: 15,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".reviews .swiper-button-next",
      prevEl: ".reviews .swiper-button-prev"
    },
    pagination: {
      el: ".reviews .swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        // slidesPerView: 2,
        spaceBetween: 15
      },
      768: {
        // slidesPerView: 4,
        spaceBetween: 30
      },
      992: {
        // slidesPerView: 4,
        spaceBetween: 35
      }
    }
  });

  function moveArrows() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.reviews .swiper-buttons').appendTo('.reviews .reviews__header');
    } else {
      $('.js-reviews').after($('.reviews .swiper-buttons').appendTo('.reviews .reviews__header'));
    }
  }

  moveArrows();
  $(window).on('resize', moveArrows);
  $('.js-reviews').lightGallery({
    selector: ".reviews__item a",
    download: false,
    share: false,
    flipHorizontal: false,
    flipVertical: false,
    rotate: false,
    autoPlay: false,
    actualSize: false,
    thumbnail: false
  });
  var servicesSlider = new Swiper(".js-services", {
    freeMode: false,
    spaceBetween: 0,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".services .swiper-button-next",
      prevEl: ".services .swiper-button-prev"
    },
    pagination: {
      el: ".services .swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        // slidesPerView: 2,
        spaceBetween: 0
      },
      768: {
        // slidesPerView: 4,
        spaceBetween: 0
      },
      992: {
        // slidesPerView: 3,
        spaceBetween: 0
      }
    }
  });

  function moveServicesArrows() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.services .swiper-buttons').appendTo('.services .services__header');
    } else {
      $('.js-services').after($('.services .swiper-buttons').appendTo('.services .services__header'));
    }
  }

  moveServicesArrows();
  $(window).on('resize', moveServicesArrows);

  function initWorksSlider() {
    var worksSlider = new Swiper(".js-work-slider", {
      freeMode: false,
      spaceBetween: 0,
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      navigation: {
        nextEl: ".work-slider .swiper-button-next",
        prevEl: ".work-slider .swiper-button-prev"
      },
      pagination: {
        el: ".work-slider .swiper-pagination",
        clickable: true
      },
      breakpoints: {
        640: {
          // slidesPerView: 2,
          spaceBetween: 0
        },
        768: {
          // slidesPerView: 4,
          spaceBetween: 0
        },
        992: {
          // slidesPerView: 3,
          spaceBetween: 0
        }
      }
    });
  }

  initWorksSlider();
});