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
/* ^^^
* JQUERY Actions
* ========================================================================== */


$(function () {
  $.exists = selector => $(selector).length > 0;

  var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  });

  function headerPadding() {
    $('.js-indent').css({
      'padding-top': $('.header__in').innerHeight()
    });
  }

  ;
  headerPadding();
  $(window).on('resize', headerPadding);
  $(document).on('scroll', function () {
    if ($(document).scrollTop() > 200) {
      $('.header').addClass('shadow');
    } else {
      $('.header').removeClass('shadow');
    }
  }).trigger('scroll');

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  $('.js-video').each(function () {
    if (!$(this).find('video').length) {
      var url = $(this).attr('href');
      var videoId = youtube_parser(url);
      var poster = '//img.youtube.com/vi/' + videoId + '/hq720.jpg';

      if ($(this).data('youtubeposter')) {
        $(this).find('img').attr('src', poster);
        $(this).find('img').attr('srcset', poster);
      }
    }

    $(this).on('click', function (e) {
      e.preventDefault();

      if ($('.iframe-loading').length) {
        return;
      }

      var video = $(this).find('video')[0];

      if (video) {
        if ($(this).hasClass('is-playing')) {
          $(this).removeClass('is-playing').addClass('is-paused');
        } else {
          if ($('.is-playing').find('iframe').length > 0) {
            $('.is-playing').find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', "*");
          }

          $('.js-video').removeClass('is-playing').addClass('is-paused');
          $(this).addClass('is-playing').removeClass('is-paused');
        }

        if (video.paused) {
          video.setAttribute("controls", 'controls');
          video.play();
        } else {
          video.removeAttribute("controls");
          video.pause();
        }
      } else {
        if ($(this).hasClass('is-paused')) {
          if ($(this).hasClass('is-paused') && $(this).find('iframe').length > 0) {
            $(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', "*");
          }
        }

        if ($('.is-playing').length) {
          if ($('.is-playing').find('video').length) {
            $('.is-playing').find('video')[0].pause();
          }

          if ($('.is-playing').find('iframe').length > 0) {
            $('.is-playing').find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', "*");
          }

          $('.js-video').removeClass('is-playing').addClass('is-paused');
        }

        if (!$(this).find('iframe').length) {
          $(this).find('.b-video__container').append('<iframe width="1270" height="720" frameborder="0" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
          $(this).addClass('iframe-loading');
          $(this).find('iframe').on('load', function () {
            $('.b-video').removeClass('iframe-loading');
          });
        }

        $(this).addClass('is-playing').removeClass('is-paused');
      }
    });
  });
  $('.faq__item-header').on('click', function () {
    $(this).toggleClass('is-active');
    $(this).parent().find('.faq__item-body').stop().slideToggle();
  });
  var lettersGallery = $('.js-letters-gallery').lightGallery({
    selector: ".js-letters-gallery a",
    download: false,
    share: false,
    flipHorizontal: false,
    flipVertical: false,
    rotate: false,
    autoPlay: false,
    actualSize: false,
    thumbnail: false
  });
  $('.main-menu li').each(function () {
    if ($(this).children('ul').length) {
      $(this).addClass('has-child');
      $(this).find('>a').append('<span class="m-tgl">');
    }
  });
  $('.m-tgl').on('click', function (evt) {
    evt.preventDefault();
    $(this).closest('li').toggleClass('is-opened').find('>ul').stop().slideToggle(200);
  });
  $('.js-menu').on('click', function () {
    $('.header').toggleClass('opened');
    $('.mobile-sidebar').toggleClass('opened');

    if ($('.mobile-sidebar').hasClass('opened')) {
      disableHtmlScroll();
      $('.mobile-sidebar__container').slideDown(300);
    } else {
      enableHtmlScroll();
      $('.mobile-sidebar__container').slideUp(300);
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
    $('.mobile-sidebar').removeClass('opened');
    enableHtmlScroll();
  });
  $('.js-to-quiz-step').on('click', function (event) {
    event.preventDefault();
    var index = $(this).data('to-step');
    $('.js-quiz-step').hide();
    $('.js-quiz-step[data-step="' + index + '"]').fadeIn();
  });
  let $app = $('.app');
  let bodyGutter = window.innerWidth - $app.outerWidth();
  $(document).on('opening', '.remodal', function () {
    $('.header__in1').css({
      'padding-right': bodyGutter
    });
  });
  $(document).on('closed', '.remodal', function () {
    $('.header__in1').css({
      'padding-right': 0
    });
  });
  $(document).on('click', function (event) {
    if ($(event.target).closest('.js-list-btn').length) return;
    $('.s-list').removeClass('is-opened');
  });
  $('.s-list__item').on('click', function (e) {
    e.preventDefault();
    var text = $(this).text();
    if ($(this).hasClass('is-active')) return;
    $(this).closest('.s-list').find('.js-st').html(text);
    $(this).closest('.s-list').find('.s-list__item').removeClass('is-active');
    $(this).addClass('is-active');
  });
  $('.js-list-btn').on('click', function () {
    var $this = $(this);

    if ($this.closest('.s-list').hasClass('is-opened')) {
      $this.closest('.s-list').removeClass('is-opened');
    } else {
      $('.s-list').removeClass('is-opened');
      $this.closest('.s-list').addClass('is-opened');
    }
  });
  $('.js-accordion-title').on('click', function () {
    $(this).closest('.js-accordion-item').toggleClass('is-opened').find('.js-accordion-body').stop().slideToggle(250);
  });
  $('.services__item-table-col').each(function () {
    var items = $(this).find('.services__item-table-text');
    items.each(function (i) {
      $(this).addClass('item-' + i);
    });
  });
  $(document).find('.item-0').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-1').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-2').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-3').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-4').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-5').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-6').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-7').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-8').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-9').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-10').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-11').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-12').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-13').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-14').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-15').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-16').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-17').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-18').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-19').equalHeightResponsive().trigger('equal-refresh');
  $(document).find('.item-20').equalHeightResponsive().trigger('equal-refresh');
  var fileBox = document.querySelectorAll('.js-site-file');

  if (fileBox) {
    fileBox.forEach(function (el) {
      var textField = el.querySelector('.js-site-file-placeholder');
      var remove = el.querySelector('.js-site-file-delete');
      el.querySelector('input').addEventListener('change', function () {
        if (textField) {
          if (this.files.length) {
            el.classList.add('is-active');
            textField.innerText = this.files[0].name;
          } else {
            el.classList.remove('is-active');
            textField.innerText = '';
          }
        }
      });
      remove.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        if (textField) {
          textField.innerText = '';
          el.classList.remove('is-active');
          el.querySelector('input').value = '';
        }
      });
    });
  }

  var reviewsSlider = $('.js-reviews');
  var reviewsSliderflag = 1;
  var reviews = undefined;

  function reviewsSliders() {
    setTimeout(function () {
      reviewsSlider.each(function () {
        var prev = $(this).closest('.slider').find('.swiper-button-prev');
        var next = $(this).closest('.slider').find('.swiper-button-next');

        if ($(window).width() >= 768 && reviewsSliderflag == 1) {
          reviews = new Swiper(this, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: false,
            navigation: {
              prevEl: prev[0],
              nextEl: next[0]
            },
            breakpoints: {
              280: {
                slidesPerView: 1,
                spaceBetween: 0
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16
              }
            }
          });
          reviewsSliderflag = 2;
        } else if ($(window).width() < 768 && reviewsSliderflag == 2) {
          if (reviews) {
            reviews.destroy();
            setTimeout(function () {
              $('.countries-list .swiper-wrapper').removeAttr('style');
              $('.countries-list .countries-list__item').removeAttr('style');
            }, 1000);
          }

          reviewsSliderflag = 1;
        }
      });
    }, 50);
  }

  reviewsSliders();
  $(window).on('resize', reviewsSliders);
});