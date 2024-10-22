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
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isSafari) {
    document.documentElement.classList.add('is-safari');
  }

  function syncHeight() {
    document.documentElement.style.setProperty('--window-inner-height', "".concat(window.innerHeight, "px"));
  }

  syncHeight();
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  });
  $('.js-menu').on('click', function () {
    $('.header').toggleClass('menu-opened').find('.js-menu-list').slideToggle(250);
  });
  var headerFlag = 1;

  function headerFix() {
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
  }

  headerFix();
  $(document).on('scroll', headerFix);
  $('.js-menu-anhors li').on('click', function (evt) {
    evt.preventDefault();
    var index = $(this).data('index');
    var indent = $(window).width() <= 768 ? 80 : 120;

    if ($(this).hasClass('extra-indent') && $(window).width() >= 992) {
      indent = 330;
    }

    var scrollOffset = $('[data-target]').filter('[data-target="' + index + '"]').offset().top - indent;
    $('.js-menu-list li').removeClass('is-active');
    $(this).addClass('is-active');

    if ($(window).width() < 992) {
      $('.js-menu-list').hide();
    }

    $('.header').removeClass('menu-opened');
    $("html, body").animate({
      scrollTop: scrollOffset
    }, 700);
  });
  var tabs = '.js-tabs';

  function initTabs() {
    var $tabs = $(tabs);
    $.each($tabs, function () {
      var $tab = $(this);
      var $titles = $tab.find('.js-tab-title');
      var $select = $tab.find('.t-select');
      var $bodys = $tab.find('.js-tabs-body');
      $titles.on('click', function (event) {
        event.preventDefault();
        var $title = $(this);
        var text = $title.find('.t-text').text();

        if ($title.closest('.info').prev('.info').length <= 0) {
          setTimeout(function () {
            $('.info__decor-pic.pic-3').addClass('run-animation');
          }, 300);
        }

        $select.text(text);
        $title.closest('.mobile-tab').removeClass('is-opened');

        if ($title.hasClass('is-active')) {
          return;
        }

        $titles.removeClass('is-active');
        $title.addClass('is-active');
        $bodys.removeClass('is-active').hide().filter('[data-index="' + $title.data('index') + '"]').fadeIn(600).addClass('is-visible');
      });
    });
  }

  if ($.exists(tabs)) {
    initTabs();
  }

  $('.js-modal-trigger').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);

    if ($this.hasClass('js-close')) {
      $this.closest('.b-modal').removeClass('opened');
      closingForm();
    } else {
      var url = $this.data('modaltarget');
      $('.b-modal').filter('[data-modal=' + url + ']').addClass('opened');
      disableHtmlScroll();
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
    }, 500);
  }

  var windowScrollY = window.scrollY;

  function disableHtmlScroll() {
    var indent = window.innerWidth - $('.app').width();
    windowScrollY = window.scrollY;

    if (!isMobile) {
      $(document.documentElement).css({
        'padding-right': indent
      });
      $('.header__content').css({
        'padding-right': indent
      });
    }

    $(document.documentElement).addClass('overflow-hidden');

    if (isSafari) {
      document.body.style.top = "-".concat(windowScrollY, "px");
    }
  }

  function enableHtmlScroll() {
    $(document.documentElement).css({
      'padding-right': 0
    });
    $('.header__content').css({
      'padding-right': 0
    });
    $('body').removeClass('overflow-hidden');
    $(document.documentElement).removeClass('overflow-hidden');

    if (isSafari) {
      document.body.style.top = null;
      $(window).scrollTop(windowScrollY, 0);
    }
  }

  var rellax = new Rellax('.rellax', {
    speed: 3,
    center: false,
    vertical: true
  });
  var lastScrollTop = 0;
  var flag = 1;
  var indent = 400;
  $('.info').each(function () {
    var $this = $(this);
    var header = $this.find('.jsh');
    var title = header.find('.info__title .t-text');

    function headings() {
      if (window.matchMedia('(min-width: 992px)').matches) {
        var scll = $(document).scrollTop() + $(window).height() - $this.offset().top;
        var aaass = -1;

        if (header.length > 0) {
          if (window.matchMedia('(min-width: 992px)').matches) {
            var offsetIndent = $(window).height() / 2;
            var tSpeed = -1.08;
          }

          if (window.matchMedia('(min-width: 1200px)').matches) {
            var offsetIndent = $(window).height() / 2.2;
            var tSpeed = -1.08;
          }

          if (window.matchMedia('(min-width: 1600px)').matches) {
            var offsetIndent = $(window).height() / 2;
            var tSpeed = -1.08;
          }

          var coeff = (aaass -= (header.offset().top + offsetIndent - ($(document).scrollTop() + $(window).height())) / 1000) * -1;
          var translateTitle = (header.offset().top + offsetIndent - ($(document).scrollTop() + $(window).height())) * tSpeed;
          var coeftitle = 0;

          if (translateTitle >= 1) {
            coeftitle = translateTitle;
          }

          if (coeff > 0 && coeff > 0.42 && coeff < 1.009) {
            var coeff2 = coeff;
          }

          title.css({
            transform: 'scale(' + coeff2 + ')' + 'translateY(' + coeftitle + 'px)'
          });

          if (translateTitle >= 623.835) {
            title.css({
              transform: 'scale(' + 0.425375 + ')' + 'translateY(' + 623.835 + 'px)'
            });
          }
        }

        if ($this.offset().top + $this.innerHeight() + indent + 500 < $(document).scrollTop() + $(window).height()) {
          $this.removeClass('is-smal-title');
        } else if ($this.offset().top + indent + 500 < $(document).scrollTop() + $(window).height()) {
          $this.addClass('is-smal-title');
          $this.prev('.info').removeClass('is-smal-title');
        } else if ($this.offset().top + indent + 500 > $(document).scrollTop() + $(window).height()) {
          $this.removeClass('is-smal-title');
        }

        if ($this.offset().top + $this.innerHeight() + indent - 200 < $(document).scrollTop() + $(window).height()) {
          if ($this.hasClass('is-active')) {
            $('body').css({
              'background-color': '#ffffff'
            }).removeClass('white-text');
          }

          $this.removeClass('is-active');
        } else if ($this.offset().top + indent < $(document).scrollTop() + $(window).height()) {
          var bgg = $this.data('bg');

          if ($this.hasClass('is-active')) {
            $('body').css({
              'background-color': bgg
            }).addClass('white-text');
          }

          $this.addClass('is-active');
          $this.prev('.info').removeClass('is-active').find('.info__in').css({
            'background-color': bgg
          });
        } else if ($this.offset().top + indent > $(document).scrollTop() + $(window).height()) {
          $this.removeClass('is-active');
          $this.prev('.info').find('.info__in').css({
            'background-color': $this.prev('.info').data('bg')
          });

          if ($('.info.is-active').length <= 0) {
            $('body').css({
              'background-color': '#ffffff'
            }).removeClass('white-text');
          }
        }
      }
    }

    headings();
    $(document).on('scroll', headings);
  });
  $('.intro').addClass('decor-visible');
  $('.js-tab-select-text').on('click', function (evt) {
    evt.preventDefault();
    $(this).closest('.mobile-tab').toggleClass('is-opened');
  });
});