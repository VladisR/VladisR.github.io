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
    enableHtmlScroll();
    listSlider();
    paramsMove();
    productThumbnailsSlider();

    if (isMobile) {
      $('body').addClass('touchDevice').removeClass('descktop');
    } else {
      $('body').removeClass('touchDevice').addClass('descktop');
    }
  });

  if (isMobile) {
    $('body').addClass('touchDevice');
  } else {
    $('body').addClass('descktop');
  }

  ;
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
          href: emotionMarket.assets_uri + "/img/map-location-icon.svg",
          size: [160, 180],
          offset: [-70, -110]
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
      cMap.controls.remove('zoomControl');

      if (isMobile) {
        cMap.behaviors.disable('scrollZoom');
      }
    });
  };

  var list2Slider;
  var aSliders = $('.js-list-slider');
  var dstrArray = [];

  function listSlider() {
    if ($('.js-list-slider').length) {
      if ($(window).width() >= 1022) {
        if (typeof list2Slider == 'undefined') {
          aSliders.each(function (i, el) {
            var items = $(this).find($('.swiper-slide'));

            if (items.length > 3) {
              list2Slider = new Swiper(el, {
                calculateHeight: true,
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                },
                spaceBetween: 24,
                slidesPerView: 3,
                slideActiveClass: 'is-active',
                breakpoints: {
                  1022: {
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                    spaceBetween: 24
                  }
                }
              });
              $(this).find('.swiper-navigation').appendTo($(this).closest('.b-list2').find('.b-list2__head'));
              dstrArray.push(list2Slider);
            }
          });
        }
      } else {
        if (typeof list2Slider != 'undefined') {
          aSliders.each(function () {
            var controls = $(this).closest('.b-list2').find('.swiper-navigation');
            var container = $(this).closest('.b-list2').find('.js-list-slider');
            controls.appendTo(container);
          });
          dstrArray.forEach(function (el) {
            el.destroy();
          });
          $('.js-list-slider .swiper-wrapper').removeAttr('style');
          $('.js-list-slider .swiper-slide').removeAttr('style');
          list2Slider = undefined;
        }
      }
    }
  }

  listSlider();
  $('.js-ajax-load').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    var url = $this.attr('href');
    var parent = $this.closest('.js-ajax');
    var content = parent.find('.js-ajax-content');
    parent.addClass('loading');
    $.ajax({
      url: url,
      success: function success(res) {
        parent.removeClass('loading');
        content.html(res);
      }
    });
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
        waitYmaps();
      });
    });
  }

  if (tabs) {
    initTabs();
  }

  $('.js-categories li').each(function () {
    if ($(this).children('ul').length) {
      $(this).addClass('has-child');
      $(this).find('>a').append('<span class="m-tgl"><span class="svg-icon svg-icon--arr-d2" aria-hidden="true"><svg class="svg-icon__link"><use xlink:href="#arr-d2"></use></svg></span></span>');
    }
  });
  $('.js-anhor').on('click', function (evt) {
    evt.preventDefault();
    var anhor = $(this).data('anhor');
    var container = $('.js-anhor-container').filter('[data-anhor="' + anhor + '"]').offset().top;
    $('html, body').scrollTop(container - 110);
  });
  var inst = $('[data-remodal-id=cities]').remodal();
  $('.cities-list li a').on('click', function () {
    inst.close();
  }); // $('input[type="tel"]').mask("+7(999) 999-99-99");

  $('input[type="tel"]').inputmask("+7(999) 999-99-99"); // $.mask.definitions['h'] = '[A-Fa-f0-9]';
  // $('.aad').mask("---.--333-");

  $('.i-email').inputmask('email');
  $('.js-img-container').each(function (i, el) {
    var infoBlockSlider = new Swiper(el, {
      effect: "fade",
      loop: true,
      noSwiping: true,
      simulateTouch: false,
      speed: 1500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    });
  });
  $('input, textarea').on('keyup', function () {
    if ($(this).val().length) {
      $(this).closest('.item-control').addClass('filled');
    } else {
      $(this).closest('.item-control').removeClass('filled');
    }
  });
  $('.js-remove-val').on('click', function () {
    $(this).hide().closest('.item-control').find('input').val('');
  });
  setTimeout(function () {
    $('.location-wrapper').addClass('is-active');
  }, 2000);
  $('.location-wrapper .js-button').on('click', function () {
    $('.location-wrapper').removeClass('is-active');
  });
  $('.main-menu li').each(function () {
    if ($(this).children('ul').length) {
      $(this).addClass('has-child');
      $(this).find('>a').append('<span class="m-tgl">');
    }
  });
  $('.has-child').on('click', function (evt) {
    if ($(window).width() < 1022) {
      evt.preventDefault();
      $(this).toggleClass('is-opened').find('>ul').stop().slideToggle(200, function () {
        $(this).toggleClass('is-opened');
      });
    } else if (isMobile && $(window).width() >= 1022) {
      evt.preventDefault();
      $(this).toggleClass('is-opened');
    }
  });
  var dataContainer = $('[data-id=""]');
  $('.js-icn-target').on('click', function () {
    var $this = $(this);
    var dataId = $this.data('target');
    dataContainer = $('[data-id="' + dataId + '"]');
    dataContainer.toggleClass('opened');

    if (dataContainer.hasClass('opened')) {
      $this.addClass('close');
      disableHtmlScroll();
    } else {
      $this.removeClass('close');
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

  $('.js-bl-cl').on('click tap', function (event) {
    if ($(event.target).closest('.js-bl-cn').length) return;
    $('.js-bl-cl').removeClass('opened');
    enableHtmlScroll();
  });
  $(document).on('keydown', function (evt) {
    if (evt.keyCode == 27) {
      $('.js-bl-cl').removeClass('opened');
      enableHtmlScroll();
    }
  });
  /* ^^^
     * Quantity
     * ========================================================================== */

  $(document).on('click', '.p-amount__button', function () {
    var $this = $(this);
    var input = $this.closest('.p-amount').find('input').get(0);

    if ($this.hasClass('minus')) {
      input.stepDown();
    }

    if ($this.hasClass('plus')) {
      input.stepUp();
    }

    $(input).trigger('change');
    setTimeout(function () {
      if ($this.closest('.p-amount').find('input').val() <= 1) {
        $this.closest('.p-amount').find('.p-amount__button.minus').addClass('disabled');
      } else {
        $this.closest('.p-amount').find('.p-amount__button.minus').removeClass('disabled');
      }
    });
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

  $(document).on('click', '.js-thumb', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    var imgHref = $this.data('url');
    var imgContainer = $('.product-card__image');
    var image = imgContainer.find('.js-image');

    if ($this.parent().hasClass('is-active')) {
      return;
    }

    image.animate({
      'opacity': 0
    }, 300, function () {
      imgContainer.addClass('loading');
      image.attr('src', imgHref).removeAttr('srcset');
      imgContainer.imagesLoaded(function () {
        imgContainer.removeClass('loading');
        image.animate({
          'opacity': 1
        });
      });
    });
    $('.product-card__thumb').removeClass('is-active');
    $this.parent().addClass('is-active');
  });
  var prdFlag = 1;

  function paramsMove() {
    if (window.matchMedia("(min-width: 1022px)").matches && prdFlag == 1) {
      $('.product-card__col').appendTo('.product-card');
      prdFlag = 2;
    } else if (window.matchMedia("(max-width: 1022px)").matches && prdFlag == 2) {
      $('.product-card__content').prepend($('.product-card__col'));
      prdFlag = 1;
    }
  }

  paramsMove();
  var thumbsSlider;

  function productThumbnailsSlider() {
    if ($('.js-product-thumbnails').length) {
      if ($(window).width() >= 1022 && $('.js-product-thumbnails .swiper-slide').length > 5) {
        if (typeof thumbsSlider == 'undefined') {
          thumbsSlider = new Swiper('.js-product-thumbnails', {
            calculateHeight: true,
            loop: false,
            preventClicks: false,
            preventClicksPropagation: false,
            keyboard: {
              enabled: true
            },
            navigation: {
              nextEl: ".js-product-thumbnails .swiper-button-next",
              prevEl: ".js-product-thumbnails .swiper-button-prev"
            },
            spaceBetween: 12,
            slidesPerView: 4
          });
          $('.js-product-thumbnails.swiper-initialized').parent().addClass('is-swiper-initialized');
          $('.js-product-thumbnails .swiper-button').appendTo('.product-card__thumbnails-wrapper');
        }
      } else {
        if (typeof thumbsSlider != 'undefined') {
          thumbsSlider.destroy();
          thumbsSlider = undefined;
          $('.js-product-thumbnails .swiper-wrapper').removeAttr('style');
          $('.js-product-thumbnails .swiper-slide').removeAttr('style');
        }
      }
    }
  }

  productThumbnailsSlider();
  var $app = $('.app');
  var $appHeader = $('.app-header__in');
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
        marginRight: bodyGutter
      });
    }
  }

  function restoreFixedMoves() {
    $app.css({
      margingRight: ''
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

  $('.remodal--search').closest('.remodal-wrapper').addClass('remodal-search');
  var rangeSliders = document.getElementsByClassName('js-range');
  [].slice.call(rangeSliders).forEach(function (slider, index) {
    var inputFrom = slider.querySelector('.js-range-from');
    var inputTo = slider.querySelector('.js-range-to');
    var inslider = slider.querySelector('.js-range-slider');
    var min = parseFloat(inslider.dataset.min);
    var max = parseFloat(inslider.dataset.max);
    var step = parseFloat(inslider.dataset.step);
    var decimals = inslider.dataset.decimals;
    noUiSlider.create(inslider, {
      start: [0, max],
      connect: true,
      step: step,
      range: {
        'min': min,
        'max': max
      }
    });
    inputFrom.addEventListener('change', function () {
      inslider.noUiSlider.set([this.value.replace(/\s/g, ''), null]);
    });
    inputTo.addEventListener('change', function () {
      inslider.noUiSlider.set([null, this.value.replace(/\s/g, '')]);
    });
    inslider.noUiSlider.on('update', function (values, handle) {
      var fromVal = Number(values[0]);
      var toVal = Number(values[1]);
      inputFrom.value = fromVal.toLocaleString();
      inputTo.value = toVal.toLocaleString();
      var fSize = fromVal.toLocaleString();
      var tSize = toVal.toLocaleString();
      setTimeout(function () {
        inputFrom.setAttribute('size', fSize.length);
        inputTo.setAttribute('size', tSize.length);
      });
    });
  });
  $('.s-filter__range-values-input').on('click tap', function () {
    $(this).find('input').focus();
  });
  $('.js-accordion-title').on('click', function () {
    $(this).toggleClass('is-active').closest('.js-accordion-item').toggleClass('is-active').find('.js-accordion-body').stop().slideToggle(250, function () {
      $(this).closest('.js-accordion-item').toggleClass('is-opened');
    });
  });
  $('.s-search').on('click', function () {
    setTimeout(function () {
      $('.remodal .s-search input').focus();
    }, 300);
  });
  $('select').select2({
    minimumResultsForSearch: -1
  });
  $('.slider__item-image').each(function (i) {
    var $this = $(this);
    $this.find('mask').attr('id', 'mask-' + i);
    $this.find('g').attr('mask', 'url(#mask-' + i + ')');
    $this.find('rect').attr('fill', 'url(#pattern-' + i + ')');
    $this.find('pattern').attr('id', 'pattern-' + i);
    $this.find('use').attr('xlink:href', '#image-' + i);
    $this.find('image').attr('id', 'image-' + i);
  });
  var mainSlider = new Swiper(".js-slider", {
    effect: "fade",
    speed: 1000,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });

  if ($('.sticky-sidebar').length) {
    $(window).on('load', function () {
      var indent = 24;
      var sidebar = new StickySidebar('.sticky-sidebar', {
        topSpacing: 24,
        bottomSpacing: 24,
        containerSelector: '.content-wrapper',
        innerWrapperSelector: '.sticky-sidebar',
        minWidth: 1022
      });
    });
  }
});