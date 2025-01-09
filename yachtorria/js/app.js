'use strict';
/* ^^^
 * Viewport Height Correction
 *
 * @link https://www.npmjs.com/package/postcss-viewport-height-correction
 * ========================================================================== */

function setViewportProperty() {
  let vh = window.innerHeight * 0.01;
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

var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
/* ^^^
 * JQUERY Actions
 * ========================================================================== */

$(function () {
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
  $('.js-actions-trigger').on('click', function () {
    $('.actions__item').toggleClass('is-animated');
  });
  $('.js-b-title').on('click', function () {
    $(this).toggleClass('is-active').closest('.js-b-parent').find('.js-b-body').stop().slideToggle(300, function () {
      $(this).closest('.js-b-parent').toggleClass('is-opened');
    });
  });
  $($('.js-header-nav').html()).appendTo('.js-aside-menu');
  $($('.js-header-actions').html()).appendTo('.js-aside-actions');
  var $asideNav = $('.js-aside-nav');
  var $asideNavOpen = $('.js-aside-nav-open');
  var $asideNavClose = $('.js-aside-nav-close');
  var $popupOverlay = $('.js-popup-overlay');

  function addGutter() {
    if (!isMobile) {
      $(document.documentElement).css({
        'padding-right': getScrollbarWidth()
      });
      $('.header').css({
        'padding-right': getScrollbarWidth()
      });
      $('.page-scroller').css({
        'margin-right': getScrollbarWidth()
      });
    }
  }

  function removeGutter() {
    if (!isMobile) {
      $(document.documentElement).css({
        'padding-right': 0
      });
      $('.header').css({
        'padding-right': 0
      });
      $('.page-scroller').css({
        'margin-right': 0
      });
    }
  }

  function openNav() {
    $asideNav.addClass('is-opened');
    $popupOverlay.addClass('is-visible');
    disableHtmlScroll();
    addGutter();
  }

  function closeNav() {
    $asideNav.removeClass('is-opened');
    $popupOverlay.removeClass('is-visible');
    enableHtmlScroll();
    removeGutter();
  }

  $asideNavOpen.on('click', function (event) {
    event.preventDefault();
    openNav();
  });
  $asideNavClose.on('click', function (event) {
    event.preventDefault();
    closeNav();
  });
  $(document).on('keydown', function (evt) {
    if (evt.keyCode == 27) {
      enableHtmlScroll();
      removeGutter();
      $asideNav.removeClass('is-opened');
      $popupOverlay.removeClass('is-visible');
    }
  });
  $('.js-date-select').each((i, select) => {
    const $select = $(select);
    const $renderer = $select.find('.date-select__renderer');
    const $text = $select.find('.date-select__renderer-text');
    const $options = $select.find('li');
    $renderer.on('click', () => {
      $select.toggleClass('is-opened');
    });
    $options.on('click', function () {
      const val = $(this).html();
      $options.removeClass('is-active');
      $(this).addClass('is-active');
      $text.html(val);
      const $target = $select.data('target-input') ? $($select.data('target-input')) : null;

      if ($target && $target.length) {
        $target.val(val);
        $target.removeAttr('disabled');
      }
    });
  });
  $(document).on('click', event => {
    if (!$(event.target).closest('.date-select__renderer').length) {
      $('.js-date-select').removeClass('is-opened');
    }
  });

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  $('.i-video').each(function () {
    var $this = $(this),
        videoId = $this.attr('href'),
        videoId = youtube_parser(videoId);
    var poster = '//img.youtube.com/vi/' + videoId + '/hq720.jpg';

    if (!$this.find('img').length) {
      $this.append('<img width="541" height="432" src="' + poster + '" alt="">');
    } else if ($this.find('img').attr('src') == '') {
      $this.find('img').attr('src', poster);
    }
  });
  var videoRemodal = $('[data-remodal-id=modal-video]').remodal();
  $('.i-video').on('click', function (evt) {
    if (!this.closest('.gallery')) {
      evt.preventDefault();
      var $this = $(this),
          videoId = $this.attr('href'),
          videoId = youtube_parser(videoId);

      if ($('.remodal--video iframe').length) {
        $('.remodal--video iframe').attr('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      } else {
        $('.remodal--video .remodal__content').append('<iframe width="1270" height="720" frameborder="0" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
      }
    }
  });
  var remodalVideoContainer = document.querySelector('.remodal--video .remodal__content');
  $(document).on('closed', videoRemodal, function () {
    stopVideo(remodalVideoContainer);
  });

  var stopVideo = function (element) {
    var iframe = element.querySelector('iframe');
    var video = element.querySelector('video');

    if (iframe) {
      var iframeSrc = iframe.src;
      iframe.src = "";
    }

    if (video) {
      video.pause();
    }
  };

  function setNegativeMargin() {
    setTimeout(function () {
      $('.gallery__items-wrapper').each(function () {
        var indent = $(this).offset().left;
        var container = $(this).find('.js-gallery');
        container.css({
          'margin-left': -indent,
          'margin-right': -indent,
          'padding-left': indent,
          'padding-right': indent
        });
      });
    });
  }

  setNegativeMargin();
  $(window).on('resize', setNegativeMargin);
  var gallery = $('.gallery');

  if (gallery.length) {
    gallery.each(function () {
      var sliderContainer = $(this).find('.js-gallery');
      var switcher = $(this).closest('.gallery').find('.gallery__switcher');
      var items = $(this).find('.gallery__item');
      var ssl = this.closest('.gallery').querySelector('.js-gallery');
      var slider = new Swiper(ssl, {
        slidesPerView: "auto",
        spaceBetween: 10,
        loop: false,
        speed: 500,
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true
        },
        breakpoints: {
          768: {
            spaceBetween: 26
          }
        }
      });
      switcher.on('click', function (evt) {
        var $this = $(this);
        var index = $this.data('index');
        evt.preventDefault();

        if ($this.hasClass('is-active')) {
          return;
        }

        $('.gallery__switcher').removeClass('is-active');
        $this.addClass('is-active');

        if (index == "all") {
          items.fadeIn(200);
        } else {
          items.hide().filter('[data-item="' + index + '"]').fadeIn(200);
        }

        slider.update();
        slider.translateTo(0, 0);
      });
    });
  }

  $('.gallery__items-in').lightGallery({
    selector: ".gallery__item a",
    download: false,
    actualSize: false,
    thumbnail: false
  });

  if ($('.js-hero-slider').length) {
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
        nextEl: ".hero .swiper-button-next",
        prevEl: ".hero .swiper-button-prev"
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      }
    });
    heroSlider.on('slideChange', function (event) {
      var $currenSlide = $('.js-hero-slide[data-slide-index="' + event.realIndex + '"]');
      $('.js-hero-slide').removeClass('first-slide');
      $currenSlide.addClass('previous-slide');
      var index = event.realIndex;
      $('.js-swiper-bullet').removeClass('is-active').eq(index).addClass('is-active');

      if ($currenSlide.find('video').length) {
        if (!$currenSlide.find('.js-intro-video').hasClass('is-inited')) {
          lazyVideo($currenSlide.find('.js-intro-video')[0]);
        }

        heroSlider.autoplay.stop();
      } else {
        heroSlider.autoplay.start();
      }
    });
    $('.js-swiper-bullet').on('click', function (event) {
      event.preventDefault();
      var index = $(this).data('index');
      heroSlider.slideTo(index);
    });
  }

  function lazyVideo(video) {
    video.src = video.querySelector('source').dataset.src;
    video.addEventListener('loadeddata', function () {
      document.querySelector('.js-hero-preloader').classList.add('is-hidden');
      video.classList.add('is-visible');
      video.play();
    }, false);
    video.classList.add('is-inited');
  }

  var introVideo = document.querySelector('.js-intro-video');

  if (introVideo && !$(introVideo).closest('.js-hero-slider').length) {
    lazyVideo(introVideo);
    $(introVideo).closest('.hero').find('.hero__item').addClass('swiper-slide-active-force');
  }

  var clickLink = $('.hot_tours__list-item');
  var allCan = $('.all-can');
  clickLink.on('click', function () {
    if ($(this).hasClass('js-tour-nav')) {
      return;
    }

    $('.hot_tours__list').find('.active').removeClass('active');
    $('.hot_tours__items').find('.show').removeClass('show');
    $('.hot_tours__items').addClass('hide');
    $(this).addClass('active');
    var linkId = $(this).data('id');
    var blockId;
    $('.hot_tours__item').each(function () {
      blockId = $(this).data('id');
      $(this).addClass('hide');

      if (linkId == blockId) {
        $('.hot_tours__items').find('.show').removeClass('show');
        $(this).addClass('show');
        $(this).removeClass('hide');
      }
    });
  });
  allCan.on('click', function () {
    $('.hot_tours__items').find('.hide').removeClass('hide');
  });
  $('.js-tour-nav').on('click', function () {
    var indx = $(this).data('tour-id');
    $(this).addClass('active').siblings().removeClass('active');
    window.scrollTo({
      top: $('[data-section-id="tour-id-' + indx + '"]').offset().top,
      left: 0,
      behavior: 'smooth'
    });
  });

  function impressionsSlidersInit(selector, xxlItems, xlItems, mdlItems) {
    let sliders = document.querySelectorAll(selector);

    if (sliders) {
      sliders.forEach(function (el) {
        let slider = new Swiper(el, {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: false,
          speed: 500,
          initialSlide: 1,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          breakpoints: {
            680: {
              slidesPerView: mdlItems,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: xlItems,
              spaceBetween: 20
            },
            1270: {
              slidesPerView: xxlItems,
              spaceBetween: 20
            }
          }
        });
      });
    }
  }

  impressionsSlidersInit('.js-impressions', 3, 2, 2);
  impressionsSlidersInit('.js-impressions2', 4, 3, 2);

  if ($('.js-stories-slider').length) {
    var storiesSlider = new Swiper(".js-stories-slider", {
      lazy: true,
      loop: false,
      slidesPerView: 'auto',
      navigation: {
        nextEl: ".main-stories .swiper-button-next",
        prevEl: ".main-stories .swiper-button-prev"
      }
    });
  }

  let $app = $('.app');
  let $appHeader = $('.header');
  let remodalOverlay = $('.remodal-overlay');
  let bodyGutter = 0;

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

  $('.tour-programm__images-wrap').lightGallery({
    selector: ".tour-programm__image a",
    download: false,
    actualSize: false,
    thumbnail: false
  });

  if ($('.js-programm-slider').length) {
    $(".js-programm-slider").each(function () {
      var $this = $(this);
      var programmSlider = new Swiper(this, {
        lazy: true,
        effect: "fade",
        loop: true,
        pagination: {
          el: $this.find('.swiper-pagination')[0],
          clickable: true
        },
        navigation: {
          nextEl: $this.find('.swiper-button-next')[0],
          prevEl: $this.find('.swiper-button-prev')[0]
        }
      });
    });
  }

  if ($('.js-tour-text-slider').length) {
    $(".js-tour-text-slider").each(function () {
      var $this = $(this);
      var tourSlider = new Swiper(this, {
        lazy: true,
        // effect: "fade",
        loop: true,
        spaceBetween: 30,
        pagination: {
          el: $this.closest('.tour-text__container').find('.swiper-pagination')[0]
        }
      });
    });
  }

  var clickLink = $('.upcoming_tours__list-item');
  var allCan = $('.all-can');
  clickLink.on('click', function () {
    $('.upcoming_tours__list').find('.active').removeClass('active');
    $('.upcoming_tours__items').find('.show').removeClass('show');
    $('.upcoming_tours__items').addClass('hide');
    $(this).addClass('active');
    var linkId = $(this).data('id');
    var blockId;
    $('.upcoming_tours__item').each(function () {
      blockId = $(this).data('id');
      $(this).addClass('hide');

      if (linkId == blockId) {
        $('.upcoming_tours__items').find('.show').removeClass('show');
        $(this).addClass('show');
        $(this).removeClass('hide');
      }
    });
  });
  allCan.on('click', function () {
    $('.upcoming_tours__items').find('.hide').removeClass('hide');
  });
});