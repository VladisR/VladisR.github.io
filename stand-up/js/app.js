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
  $('.js-menu-trigger').on('click', function () {
    $('.js-menu').toggleClass('opened');

    if (!$(this).hasClass('type-2') || $(window).width() < 992) {
      if ($('.js-menu').hasClass('opened')) {
        disableHtmlScroll();
      } else {
        enableHtmlScroll();
      }
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

  $(document).on('click tap', function (event) {
    if ($(event.target).closest('.menu-wrapper__container, .js-menu-trigger, .js-game-trigger, .game-popup__container').length) return;
    $('.js-menu').removeClass('opened');
    enableHtmlScroll();
    $('.game-popup').removeClass('opened').find('.game-popup__container-content').find('iframe').remove();
  });
  $('select').each(function () {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;
    $this.addClass('s-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="styledSelect"></div>');
    var $styledSelect = $this.next('div.styledSelect');
    $styledSelect.text($this.children('option').eq(0).text());
    var $list = $('<ul />', {
      'class': 'options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    var $listItems = $list.children('li');
    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.styledSelect.active').each(function () {
        $(this).removeClass('active').next('ul.options').hide();
      });
      $(this).toggleClass('active').next('ul.options').toggle();
    });
    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
      $(this).parent().find('li').removeClass('checked');
      $(this).addClass('checked');
    });
    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  });
  var inst1 = $('[data-remodal-id=modal1]').remodal();
  var inst12 = $('[data-remodal-id=modal2]').remodal();
  $('.s-amount__control').on('click tap', function () {
    var $this = $(this),
        input = $this.parent('.s-amount').find('input'),
        value = parseInt(input.val());

    if ($this.hasClass('minus')) {
      if (value > 1) {
        input.val(value -= 1);
      }

      if (value == 1) {
        $this.addClass('disabled');
      }
    } else {
      input.val(value += 1);
      $this.closest('.s-amount').find('.minus').removeClass('disabled');
    }
  });
  $('.s-amount input').keyup(function (e) {
    if (this.value == "0" || this.value == "") {
      this.value = "1";
      $(this).closest('.s-amount').find('.minus').addClass('disabled');
    } else {
      this.value = this.value.replace(/[^0-9-\.]/g, '');
      $(this).closest('.s-amount').find('.minus').removeClass('disabled');
    }
  });
  $('input[type="tel"]').mask("+7(999) 999-999");
});