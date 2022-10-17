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


jQuery.cookie = function (b, j, m) {
  if (typeof j != "undefined") {
    m = m || {};

    if (j === null) {
      j = "";
      m.expires = -1;
    }

    var e = "";

    if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
      var f;

      if (typeof m.expires == "number") {
        f = new Date();
        f.setTime(f.getTime() + m.expires * 24 * 60 * 60 * 1000);
      } else {
        f = m.expires;
      }

      e = "; expires=" + f.toUTCString();
    }

    var l = m.path ? "; path=" + m.path : "";
    var g = m.domain ? "; domain=" + m.domain : "";
    var a = m.secure ? "; secure" : "";
    document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("");
  } else {
    var d = null;

    if (document.cookie && document.cookie != "") {
      var k = document.cookie.split(";");

      for (var h = 0; h < k.length; h++) {
        var c = jQuery.trim(k[h]);

        if (c.substring(0, b.length + 1) == b + "=") {
          d = decodeURIComponent(c.substring(b.length + 1));
          break;
        }
      }
    }

    return d;
  }
};

$(function () {
  var _Swiper;

  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  });

  var Defaults = $.fn.select2.amd.require('select2/defaults');

  $.extend(Defaults.defaults, {
    searchInputPlaceholder: ''
  });

  var SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');

  var _renderSearchDropdown = SearchDropdown.prototype.render;

  SearchDropdown.prototype.render = function (decorated) {
    // invoke parent method
    var $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));

    this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
    return $rendered;
  };

  $('.js-lg-trigger').on('click tap', function () {
    $(this).closest('.js-lg-parent').toggleClass('opened');
  });
  $('.js-lg-parent a').on('click tap', function () {
    $('.js-lg-parent a').removeClass('active');
    $(this).addClass('active').closest('.js-lg-parent').removeClass('opened').find('.js-txt').text($(this).text());
  });

  function headerIndetTop() {
    if ($(window).width() <= 992) {
      $('.app-header').css({
        'padding-top': $('.app-header__in').height()
      });
    } else {
      $('.app-header').css({
        'padding-top': 0
      });
    }
  }

  $(window).on('load', function () {
    headerIndetTop();
  });
  $(window).on('resize', headerIndetTop);
  $('.app__content select').select2({
    minimumResultsForSearch: -1
  });
  $('.select2').each(function () {
    $(this).addClass($(this).prev('select').attr('class').replace('select2-hidden-accessible', ''));
  });
  $('.app__content select').on('select2:select', function () {
    $(this).parent().addClass('filled');
  });
  $('.js-accordion-title').on('click tap', function () {
    $(this).closest('.js-accordion-item').toggleClass('is-opened').find('.js-accordion-body').stop().slideToggle(250);
  });

  (function () {
    var scrollBar = $('.js-overlay-scrollbar').overlayScrollbars({
      scrollbars: {
        clickScrolling: true
      },
      overflowBehavior: {
        x: 'scroll',
        y: 'scroll'
      },
      callbacks: {
        onScroll: function onScroll(e) {
          var scrollInfo = scrollBar.scroll();
          var max = scrollInfo.max.x;
          var scrollLeft = e.target.scrollLeft; // same as `scrollInfo.position.x`

          var scrollTop = e.target.scrollTop; // same as `scrollInfo.position.y`
          // var scrollInfo = instance.scroll();
          // var scrollLeft = e.target.scrollLeft;
          // // maxScroll = scrollInfo.max.x;
          // intLeft = scrollLeft;
          // if (intLeft == 0) {
          //   $('.js-scroll-left').addClass('disabled');
          //   $('.directions.type-2').removeClass('scrolled');
          // } else {
          //   $('.js-scroll-left').removeClass('disabled');
          //   $('.directions.type-2').addClass('scrolled');
          // }
          // if (intLeft + 1 >= maxScroll) {
          //   $('.directions.type-2').addClass('max');
          //   $('.js-scroll-right').addClass('disabled');
          // } else {
          //   $('.directions.type-2').removeClass('max');
          //   $('.js-scroll-right').removeClass('disabled');
          // }
        }
      }
    }).overlayScrollbars();
  })(); // var el = document.querySelectorAll('.js-fake-scrollbar');
  // el.forEach(e => {
  //     SimpleScrollbar.initEl(e)
  // });
  // $('.ss-content').each(function(){
  //     if($(this).find('.myClassin').height() > $(this).height()) {
  //         $(this).parent().addClass('bot-shadow')
  //     }
  // });
  // $('.ss-content').on('scroll', function(){
  //     var offsetTop = $(this).find('.myClassin').position().top;
  //     var offsetbot = $(this).find('.myClassin').position().top + $(this).find('.myClassin').height() - $(this).find('.myClassin').parent().height();
  //     if(offsetTop < 0) {
  //         $(this).parent().addClass('top-shadow')
  //     } else {
  //         $(this).parent().removeClass('top-shadow')
  //     }
  //     if(offsetbot > 1) {
  //         $(this).parent().addClass('bot-shadow')
  //     } else {
  //         $(this).parent().removeClass('bot-shadow')
  //     }
  // });


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
  })(); // if (!$.cookie('was')) {


  $('.b-modal.age-check').addClass('opened');
  $('.cookies-popup').addClass('visible'); // }

  $.cookie('was', true, {
    expires: 4,
    path: '/'
  }); // if (!$.cookie('discount')) {

  setTimeout(function () {
    $('.b-modal.discount').addClass('opened');
  }, 5000); // }

  $.cookie('discount', true, {
    expires: 1,
    path: '/'
  });
  $('.js-button').on('click', function () {
    $(this).closest('.cities').removeClass('visible');
    $('.mobile-sidebar').removeClass('sities-visible');

    if ($(window).width() <= 992) {
      $('.app-header').css({
        'padding-top': $('.app-header__in').height() - $('.cities').height()
      });
    }
  });
  var selectRegion = $('.js-select-cities').data('region');
  $('.js-select-cities').select2({
    searchInputPlaceholder: 'Enter region',
    placeholder: selectRegion,
    dropdownParent: ".cities .select2"
  });
  $('.js-hide').on('click', function (evt) {
    evt.preventDefault();
    $(this).closest('.cookies-popup').removeClass('visible');
  });
  $('.filter__item-title').on('click', function () {
    $(this).closest('.filter__item').toggleClass('is-opened');
  });
  var filterScrolBars = $('.filter__item-list').overlayScrollbars({}).overlayScrollbars();
  $('input, textarea').on('keyup', function () {
    if ($(this).val().length) {
      $(this).closest('.form-item').addClass('filled');
    } else {
      $(this).closest('.form-item').removeClass('filled');
    }
  });
  $('.form__star').on('click', function (evt) {
    evt.preventDefault();
    $('.form__star').removeClass('active');
    $(this).addClass('active').closest('.form__stars').addClass('selected');
  });
  $('.js-password-trigger').on('click', function (evt) {
    var $this = $(this);
    $this.toggleClass('visible');

    if ($this.hasClass('visible')) {
      $this.closest('.js-password-parent').find('input').attr('type', 'text');
    } else {
      $this.closest('.js-password-parent').find('input').attr('type', 'password');
    }
  });
  $('.mn-tgl').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);

    if ($this.closest('li').find('>ul').is(':visible')) {
      $this.closest('li').find('>ul').slideUp(200);
      setTimeout(function () {
        $this.closest('li').removeClass('is-opened');
      }, 200);
      $this.parent('a').toggleClass('active');
    } else {
      $this.closest('li').find('>ul').stop().slideDown(200);
      setTimeout(function () {
        $this.closest('li').toggleClass('is-opened');
      }, 200);
      $this.parent('a').toggleClass('active');
    }
  });

  (function () {
    $('.main-menu.desctop .flex-menu').flexMenu({
      linkText: '...'
    });
    $('.main-menu.desctop  .sub-menu').addClass('js-overlay-scrollbar');
    var menuscrollbar = $('.js-overlay-scrollbar').overlayScrollbars({}).overlayScrollbars();
    $('.flex-menu > .menu-item-has-children').on({
      mouseover: function mouseover() {
        $('.main-menu.desctop').addClass('sub-levels-visible');
      },
      mouseleave: function mouseleave() {
        if (!$('.main-menu.desctop').hasClass('active')) {
          $('.main-menu.desctop').removeClass('sub-levels-visible');
        }
      }
    });
    $('.mn-overlay').on({
      mouseover: function mouseover() {
        $('.main-menu.desctop').addClass('sub-levels-visible active');
      },
      mouseleave: function mouseleave(event) {
        $('.main-menu.desctop').removeClass('active');

        if (!$('.main-menu.desctop').hasClass('active')) {
          $('.main-menu.desctop').removeClass('sub-levels-visible');
        }
      }
    });
    $('.sub-menu').on({
      mouseover: function mouseover() {
        $('.main-menu.desctop').addClass('active');
      },
      mouseleave: function mouseleave(event) {
        $('.main-menu.desctop').removeClass('active');
      }
    });
  })();

  $('.js-menu').on('click', function () {
    $(this).toggleClass('close');
    $('.mobile-sidebar').toggleClass('opened');

    if ($('.mobile-sidebar').hasClass('opened')) {
      disableHtmlScroll();
    } else {
      enableHtmlScroll();
    }
  });
  $('.mobile-sidebar, .mobile-sidebar__content').css({
    'height': '100vh'
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
  $('.order select').select2('destroy');
  $('.order select').each(function () {
    var $this = $(this);
    var placeholder = $this.data('placeholder');
    $this.select2({
      searchInputPlaceholder: selectRegion,
      placeholder: placeholder,
      minimumResultsForSearch: -1
    });
  });
  $('.p-amount__control').on('click tap', function () {
    var $this = $(this),
        input = $this.closest('.p-amount').find('input'),
        value = parseInt(input.val());

    if ($this.hasClass('minus')) {
      if (value > 6) {
        input.val(value -= 6);
      }

      if (value == 6) {
        $this.addClass('disabled');
      }
    } else {
      input.val(value += 6);
      $this.closest('.p-amount').find('.minus').removeClass('disabled');
    }
  });
  $('.p-amount input').keyup(function (e) {
    if (this.value == "0" || this.value == "") {
      this.value = "1";
      $(this).closest('.p-amount').find('.minus').addClass('disabled');
    } else {
      this.value = this.value.replace(/[^0-9-\.]/g, '');
      $(this).closest('.p-amount').find('.minus').removeClass('disabled');
    }
  });

  function setThumbHeight() {
    if ($(window).width() > 992) {
      $('.product-details__thumbnails-wrapper').css({
        'height': $('.product-details__image').height() + 40
      });
    } else {
      $('.product-details__thumbnails-wrapper').removeAttr('style');
    }
  }

  if ($('.product-details__thumbnails-in > div').length > 5) {
    var thumbSlider = function thumbSlider() {
      if ($(window).width() > 992 && thumbFlag == 1) {
        thSlider = new Swiper(".js-swiper-thumbnails", {
          direction: "vertical",
          slidesPerView: 6,
          slidesPerGroup: 3,
          spaceBetween: 13,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        });
        thumbFlag = 2;
      } else if ($(window).width() < 992 && thumbFlag == 2) {
        thSlider.destroy();
        $(document).find('.js-swiper-thumbnails').find('.swiper-wrapper').removeAttr('style');
        $(document).find('.js-swiper-thumbnails').find('.product').removeAttr('style');
        thumbFlag = 1;
      }
    };

    $('.product-details__thumbnails-wrapper').addClass('initialize-slider');
    $('.product-details__thumbnails').addClass('js-swiper-thumbnails swiper');
    $('.product-details__thumbnails-in').addClass('swiper-wrapper');
    var thumbFlag = 1;
    var thSlider;
    setThumbHeight();
    thumbSlider();
    $('.js-swiper-thumbnails .swiper-button').appendTo('.product-details__thumbnails-wrapper');
    $(window).on('resize', function () {
      setThumbHeight();
      thumbSlider();
    });
  }

  $('.product-details__thumbnails-in a').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    $('.product-details__thumbnails-in a').removeClass('is-active');
    $this.addClass('is-active');
    $('.product-details__image-in img').attr('src', href);
    $('.product-details__image-in a').attr('href', href);
  });

  function productAmountInSlider() {
    $('.product-list').each(function () {
      var total = $(this).find('.product').length;

      if (total <= 5 && $(window).width() >= 1500) {
        $(this).addClass('minimal-amount');
      }
    });
  } // var flag = 1;
  // var producrSlider = undefined;
  // function initSwiper() {
  //     if($(window).width() > 574 && flag == 1) {
  //           producrSlider = new Swiper('.js-swiper', {
  //           autoHeight: false,
  //           loop: false,
  //           lazy: true,
  //           slidesPerView: 4,
  //           slidesPerGroup: 3,
  //           spaceBetween: 0,
  //           freeMode: true,
  //           speed: 500,
  //           navigation: {
  //             nextEl: '.swiper-button-next',
  //             prevEl: '.swiper-button-prev',
  //           },
  //           scrollbar: {
  //             el: ".swiper-scrollbar",
  //             draggable: true,
  //           },
  //           breakpoints: {
  //             575: {
  //               slidesPerView: 2,
  //               spaceBetween: 0
  //             },
  //             880: {
  //               slidesPerView: 3,
  //               spaceBetween: 0
  //             },
  //             1200: {
  //               slidesPerView: 3,
  //               spaceBetween: 0
  //             },
  //             1500: {
  //               slidesPerView: 4,
  //               spaceBetween: 0
  //             },
  //             1800: {
  //               slidesPerView: 5,
  //               spaceBetween: 0
  //             }
  //           }
  //         });
  //         flag = 2
  //     } else if ($(window).width() < 574 && flag == 2) {
  //         producrSlider.destroy();
  //         $(document).find('.js-swiper').find('.swiper-wrapper').removeAttr('style')
  //         $(document).find('.js-swiper').find('.product').removeAttr('style')
  //       flag = 1
  //     }
  //     if($(window).width() < 575) {
  //       $('.product').each(function(){
  //         var $this = $(this);
  //         var image = $(this).find('.product__image img');
  //         var imageUrl = $(this).find('.product__image img').data('src');
  //         image.attr('src', imageUrl)
  //       });
  //     }
  // };


  var producrSlider2 = undefined;
  var flag2 = 1;

  function initSwiper2() {
    if ($(window).width() > 574 && flag2 == 1) {
      producrSlider2 = new Swiper('.js-swiper-2', {
        autoHeight: false,
        loop: false,
        lazy: true,
        slidesPerView: 4,
        slidesPerGroup: 3,
        spaceBetween: 0,
        freeMode: true,
        speed: 500,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          draggable: true
        },
        breakpoints: {
          575: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          880: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          1366: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          1800: {
            slidesPerView: 4,
            spaceBetween: 0
          }
        }
      });
      $('.js-swiper-2 .swiper-button').appendTo('.swiper-controls');
      $('.js-swiper-2 .swiper-scrollbar').appendTo('.swiper-controls');
      flag2 = 2;
    } else if ($(window).width() < 574 && flag2 == 2) {
      producrSlider2.destroy();
      $('.js-swiper-2 .swiper-wrapper').removeAttr('style');
      $('.js-swiper-2 .product').removeAttr('style');
      flag2 = 1;
    }

    if ($(window).width() < 575) {
      $('.product.type-2 .product').each(function () {
        var $this = $(this);
        var image = $(this).find('.product__image img');
        var imageUrl = $(this).find('.product__image img').data('src');
        image.attr('src', imageUrl);
      });
    }
  }

  ;
  productAmountInSlider(); // initSwiper();

  initSwiper2();

  if ($(window).width() < 575) {
    $('.product-list.type-2 .product').each(function () {
      var $this = $(this);
      var image = $(this).find('.product__image img');
      var imageUrl = $(this).find('.product__image img').data('src');
      image.attr('src', imageUrl);
      $this.find('.swiper-lazy-preloader').hide();
    });
  } else {
    $('.product-list.type-2 .product').each(function () {
      var $this = $(this);
      var image = $(this).find('.product__image img'); // var imageUrl = $(this).find('.product__image img').data('src');
      // image.attr('src', imageUrl)

      $this.find('.swiper-lazy-preloader').show();
    });
  }

  $(window).on('resize', function () {
    productAmountInSlider(); // initSwiper();

    initSwiper2();

    if ($(window).width() < 575) {
      $('.product.type-2 .product').each(function () {
        var $this = $(this);
        var image = $(this).find('.product__image img');
        var imageUrl = $(this).find('.product__image img').data('src');
        image.attr('src', imageUrl);
      });
    }
  });
  var producrSlider_3 = undefined;

  function productSlider3() {
    producrSlider_3 = new Swiper('.js-swiper3', {
      autoHeight: false,
      loop: false,
      lazy: true,
      slidesPerView: 4,
      slidesPerGroup: 3,
      spaceBetween: 0,
      freeMode: true,
      speed: 500,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        575: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        880: {
          slidesPerView: 3,
          spaceBetween: 0
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 0
        },
        1500: {
          slidesPerView: 4,
          spaceBetween: 0
        },
        1800: {
          slidesPerView: 4,
          spaceBetween: 0
        }
      }
    });
  }

  ;
  productSlider3();
  $('.js-more-btn').on('click', function (event) {
    event.preventDefault();
    $(this).parent().toggleClass('hide-more').closest('.js-more-parent').toggleClass('visible-all');
  });
  $('.js-rating-trigger').on('click', function (evt) {
    evt.preventDefault();
    $(this).toggleClass('active');
    $('.form--rating').toggleClass('visible');
  });
  $('.js-anhor').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this),
        anhor = $this.attr('href').replace('#', ''),
        indent = isMobile == true ? 100 : 80;
    $('.js-rating-trigger').addClass('active');
    $('.form--rating').addClass('visible');
    $('html,body').animate({
      scrollTop: $('#' + anhor + '').offset().top - indent
    }, 500);
  });
  $('.trigger-shop-popup').on('click', function (evt) {
    evt.preventDefault();
    $('.shop-block--filter').toggleClass('is-opened');

    if ($('.shop-block').hasClass('is-opened')) {
      disableHtmlScroll();
    } else {
      enableHtmlScroll();
    }
  });
  var swiper = new Swiper('.js-main-slider', (_Swiper = {
    // direction: 'vertical',
    autoHeight: true,
    autoplay: true,
    loop: false,
    effect: "fade",
    speed: 2000
  }, _defineProperty(_Swiper, "autoplay", {
    delay: 5000
  }), _defineProperty(_Swiper, "navigation", {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }), _defineProperty(_Swiper, "pagination", {
    el: '.swiper-pagination',
    clickable: true
  }), _Swiper));
  $('.js-title').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    var url = $this.attr('href');
    $('.js-title').removeClass('is-active');
    $this.addClass('is-active');
    $('.js-tabs .product-list').addClass('loading').append('<div class="prod-loading">');
    $.ajax({
      url: url,
      success: function success(res) {
        setTimeout(function () {
          $('.js-body').removeClass('is-active').find('.product-list').remove();
          $('.js-body').html(res);
          flag = 1;
          producrSlider_3 = undefined;
          productSlider3(); // producrSlider = undefined;
          // initSwiper();
        }, 200);
      }
    });
  });

  if (isMobile == true) {
    $('body').addClass('is-mobile');
  }
});
