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
  'use strict';
  /**
   * определение существования элемента на странице
   */

  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  $('.app-header__burger').on('click tap', function () {
    $(this).toggleClass('close');
    $('.mobile-sidebar').toggleClass('opened');
    $('.app-header').toggleClass('menu-opened');
  });
  $(document).on('click tap', function (event) {
    if ($(event.target).closest('.js-search').length) return;
    $('.js-search').removeClass('opened');
  });
  $('.js-search-trigger').on('click', function () {
    $(this).closest('.js-search').toggleClass('opened').find('input').focus();
  });
  $('.tgl').on('click', function (evt) {
    evt.preventDefault();
    $(this).closest('li').toggleClass('opened').find('>ul').stop().slideToggle(250);
  });
  $('.js-accordion-title').on('click', function () {
    console.log(122);
    $(this).closest('.js-accordion-item').toggleClass('is-opened').find('.js-accordion-body').stop().slideToggle(200);
  });
  var tabs = '.js-tabs';

  function initTabs() {
    var $tabs = $(tabs);
    $.each($tabs, function () {
      var $tab = $(this);
      var $titles = $tab.find('.js-tabs-title');
      var $bodys = $tab.find('.js-tabs-body');
      $titles.on('click', function (event) {
        event.preventDefault();
        var $title = $(this);

        if ($title.hasClass('is-active')) {
          return;
        }

        $titles.removeClass('is-active');
        $title.addClass('is-active');
        $bodys.removeClass('is-active').hide().filter('[data-index="' + $title.data('index') + '"]').fadeIn();
      });
    });
  }

  if ($.exists(tabs)) {
    initTabs();
  }

  $('.js-change').on('click', function () {
    var from = $(this).closest('.js-change-container').find('.js-change-from');
    var to = $(this).closest('.js-change-container').find('.js-change-to');
    var fromNote = $(this).closest('.js-change-container').find('.js-change-from .item-control-note').html();
    var toNote = $(this).closest('.js-change-container').find('.js-change-to .item-control-note').html();
    var fromVal = from.find('input').val();
    var toVal = to.find('input').val();
    from.find('input').val(toVal);
    to.find('input').val(fromVal);
    from.find('.item-control-note').html(toNote);
    to.find('.item-control-note').html(fromNote);
  });

  function onlyAllowAlphanumeric() {
    this.value = this.value.replace(/[^0-9\.]/g, '');
  }

  ;
  $('.js-weight').keyup(onlyAllowAlphanumeric);
  ;

  (function () {
    $('.js-overlay-scrollbar').overlayScrollbars({}).overlayScrollbars();
    var it = 1;

    var _int;

    var intLeft = 0;
    var maxScroll;
    var instance = $('.type-2 .js-overlay-scrollbar').overlayScrollbars({
      callbacks: {
        onScroll: function onScroll(e) {
          var scrollInfo = instance.scroll();
          var scrollLeft = e.target.scrollLeft;
          maxScroll = scrollInfo.max.x;
          intLeft = scrollLeft;

          if (intLeft == 0) {
            $('.js-scroll-left').addClass('disabled');
            $('.directions.type-2').removeClass('scrolled');
          } else {
            $('.js-scroll-left').removeClass('disabled');
            $('.directions.type-2').addClass('scrolled');
          }

          if (intLeft + 1 >= maxScroll) {
            $('.directions.type-2').addClass('max');
            $('.js-scroll-right').addClass('disabled');
          } else {
            $('.directions.type-2').removeClass('max');
            $('.js-scroll-right').removeClass('disabled');
          } // if(intLeft >= 0) {
          //     console.log(1)
          // } else {
          //     console.log(2)
          // }

        }
      }
    }).overlayScrollbars(); // var curDown = false,
    //     xp = 0,
    //     xp3 = 0,
    //     curYPos = 0,
    //     curXPos = 0;
    // $('.directions').mousemove(function(m){
    //   if(curDown){
    //       xp = curXPos - m.pageX;
    //       if(xp >= 0) {
    //           instance.scroll(xp3 += 12)
    //       } else {
    //           instance.scroll(xp3 -= 12)
    //       }
    //   }
    // });
    // $('.directions').mousedown(function(m){
    //   curYPos = m.pageY;
    //   curXPos = m.pageX;
    //   curDown = true;
    //   xp3 = intLeft;
    //   console.log(intLeft)
    //   $('.directions').mousemove(function(m){
    //       $(this).addClass('pe-n')
    //   });
    // });
    // $('.directions').mouseup(function(){
    //   console.log(intLeft)
    //   xp3 = intLeft;
    //   curDown = false;
    //   $(this).removeClass('pe-n')
    // });

    if (intLeft == 0) {
      $('.js-scroll-left').addClass('disabled');
    }

    $('.js-scroll').on('mousedown touchstart', function () {
      if ($(this).hasClass('js-scroll-right')) {
        _int = setInterval(function () {
          instance.scroll(intLeft += 20);
        }, 5);
      } else {
        _int = setInterval(function () {
          instance.scroll(intLeft -= 20);
        }, 5);
      }
    });
    $('.js-scroll').on('mouseup mouseout mouseleave touchend', function () {
      clearInterval(_int);
    });
  })();

  $('input, textarea').on('keyup', function () {
    if ($(this).val().length) {
      $(this).closest('.form-item').addClass('filled');
    } else {
      $(this).closest('.form-item').removeClass('filled');
    }
  });
  $(document).on('opening', '.remodal', function () {
    if (!isMobile) {
      $('.app-header__top').css({
        'padding-right': 17
      });
    }
  });
  $(document).on('closed', '.remodal', function (e) {
    if (!isMobile) {
      $('.app-header__top').css({
        'padding-right': 0
      });
    }
  });
  $('.js-show-more').on('click', function (evt) {
    evt.preventDefault();
    $(this).toggleClass('is-opened').closest('.js-show').find('.js-show-container').toggleClass('is-opened');
  });

  (function () {
    var sliderContainer = $('.js-slider');

    if (!sliderContainer.length) {
      return;
    }

    $.each(sliderContainer, function (i, el) {
      var className = '.js-slider-id-' + i;
      var items = $(this).data('desctop-items');
      var lgItems = 4;
      $(el).addClass(className.replace('.', ''));
      var slider = tns({
        container: className,
        nested: "inner",
        mode: "gallery",
        autoplay: true,
        autoplayHoverPause: true,
        items: 4,
        swipeAngle: 30,
        slideBy: 3,
        gutter: 0,
        mouseDrag: false,
        speed: 800,
        controls: true,
        edgePadding: 1,
        controlsText: ['', ''],
        nav: true,
        navPosition: 'bottom',
        responsive: {
          0: {
            speed: 200,
            gutter: 0,
            items: 1
          },
          540: {
            speed: 200,
            gutter: 0,
            items: 1
          },
          769: {
            speed: 300,
            gutter: 0,
            items: 1
          },
          993: {
            speed: 300,
            gutter: 0,
            items: 1
          },
          1201: {
            speed: 800,
            gutter: 0,
            items: 1
          }
        }
      });
      var arrowLeft = '<span class="svg-icon"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.62281 1.34615L0.923058 8.04591M0.923058 8.04591L7.62281 14.7457M0.923058 8.04591H17.0769" stroke="#06785A" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      var arrowRight = '<span class="svg-icon"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3772 1.34615L17.0769 8.04591M17.0769 8.04591L10.3772 14.7457M17.0769 8.04591H0.923096" stroke="#06785A" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      $('[data-controls="prev"]').append(arrowLeft);
      $('[data-controls="next"]').append(arrowRight);
      $('.slider .tns-nav, .slider .tns-controls').appendTo('.slider__controls-in');
    });
  })();

  $('.js-scroller').on('scroll', function () {
    console.log($(this).scrollLeft());
    $('.titles').scrollLeft($(this).scrollLeft());
  });
});