'use strict';
/* ^^^
* Viewport Height Correction
*
* @link https://www.npmjs.com/package/postcss-viewport-height-correction
* ========================================================================== */

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
    setTitlesClass();
    setTextareaHeight();
  });
  $(document).on('scroll', function () {
    selectorsAddClass();

    if (window.matchMedia('(min-width: 992px)').matches) {
      imageZoomingOnScroll();

      if (document.querySelector('.ladder__bg')) {
        ladderlineHeight();
      }
    }
  }).trigger('scroll');

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
    if (window.matchMedia('(min-width: 992px)').matches) {
      var _iterator = _createForOfIteratorHelper(document.getElementsByClassName('wave-title')),
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
    }

    $('.wave-title').each(function () {
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

  function isVisible(row, container, offset) {
    if (!offset) {
      offset = 150;
    }

    var elementTop = $(row).offset().top + offset,
        elementHeight = $(row).height(),
        containerTop = container.scrollTop(),
        containerHeight = container.height();
    return elementTop - containerTop + elementHeight > 0 && elementTop - containerTop < containerHeight;
  }

  function selectorsAddClass() {
    $('.js-sc-container, .wave-title').each(function () {
      if (!topOffset) {
        var topOffset = $(this).data('offset');
      }

      if (isVisible($(this), $(window), topOffset)) {
        $(this).addClass('animated');
      }

      ;
    });
  }

  selectorsAddClass();
  setTimeout(function () {
    $('.js-sc-container, .wave-title').each(function () {
      var topOffset = $(this).data('offset');

      if (!topOffset) {
        topOffset = 1;
      }

      if ($(this).offset().top < $(document).scrollTop() + $(window).height() - topOffset) {
        $(this).addClass('animated');
      }
    }).trigger('scroll');
  });
  var headerFlag = 1;
  var prevScrollpos = window.pageYOffset;

  function headerSetClass() {
    $(document).on('scroll', function () {
      var currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos && $(document).scrollTop() >= 700 && headerFlag == 1) {
        $('.header').addClass('hide');
        setTimeout(function () {
          $('.header').removeClass('hide');
          $('.header').addClass('fixed');
        }, 100);
        headerFlag = 2;
      } else if (prevScrollpos > currentScrollPos && $(document).scrollTop() < 700 && headerFlag == 2) {
        $('.header').addClass('hide');
        setTimeout(function () {
          $('.header').removeClass('fixed');
          $('.header').removeClass('hide');
        }, 100);
        headerFlag = 1;
      } else if (prevScrollpos < currentScrollPos && headerFlag == 2) {
        $('.header').addClass('hide');
        setTimeout(function () {
          $('.header').removeClass('fixed');
          $('.header').removeClass('hide');
        }, 100);
        headerFlag = 1;
      }

      prevScrollpos = currentScrollPos;
    });
  }

  ;
  headerSetClass();
  $('.js-accodion-title').on('click', function () {
    $(this).toggleClass('is-active').closest('.js-accodion-item').find('.js-accodion-body').stop().slideToggle(250);
  });

  function advangesDelay() {
    var advDelay = 0;
    $('.advantages__item').each(function () {
      $(this).css({
        'animation-delay': advDelay + 'ms'
      });
      advDelay += 100;
    });
  }

  ;
  advangesDelay();

  function setTextareaHeight() {
    $('.as-input-box').each(function () {
      var $this = $(this);
      var height = $this.find('.as-input-helper').innerHeight();

      if (height <= 33) {
        $this.find('.as-input-area').css({
          'border-radius': 30
        });
      } else {
        $this.find('.as-input-area').css({
          'border-radius': 10
        });
      }

      $this.find('.as-input-area').css({
        'height': height
      });
    });
  }

  ;
  setTextareaHeight();
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

  function blogPosts(selector) {
    selector = document.querySelectorAll(selector);
    selector.forEach(function (item) {
      var carousel = new Swiper(item, {
        spaceBetween: 20,
        navigation: {
          prevEl: item.parentElement.parentElement.querySelector('.swiper-button-prev'),
          nextEl: item.parentElement.parentElement.querySelector('.swiper-button-next')
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }
      });
    });
  }

  ;
  blogPosts('.js-posts');

  function bloglPostsDelay() {
    var advDelay = 0;
    $('.blog-posts__item').each(function () {
      if (!this.closest('.blog-posts.type-2')) {
        $(this).css({
          'animation-delay': advDelay + 'ms'
        });
        advDelay += 100;
      }
    });
  }

  ;
  bloglPostsDelay();
  var bb;

  function imageZoomingOnScroll() {
    $(".circle-block").each(function () {
      var iTop = this.getBoundingClientRect().top - $(window).height();
      var ad = iTop / 1150;

      if (ad < 0 && ad >= -1) {
        var gg = Math.abs(ad);

        if (gg < 0.90) {
          bb = gg;
          bb += 0.10;
        }
      }

      var image = this.querySelector('.circle-block__image');
      image.style.transform = "scale(" + bb + ")";
    });
  }

  ;
  $('.effective-program__item-title').on('click', function () {
    $(this).toggleClass('is-closed').closest('.effective-program__item').find('.effective-program__item-body').stop().slideToggle(250);
  });
  var lettersGallery = $('.gallery-links').lightGallery({
    selector: ".gallery-links a",
    download: false,
    share: false,
    flipHorizontal: false,
    flipVertical: false,
    rotate: false,
    autoPlay: false,
    actualSize: false,
    thumbnail: false
  });
  $('.js-gallery-call').on('click', function (e) {
    e.preventDefault();
    $('.gallery-links a:first').trigger("click");
  });
  $('[data-scroll-target]').on('click', function (e) {
    e.preventDefault();
    var anhor = $(this).data('scroll-target');
    var offset = $('[data-scroll-id=' + anhor + ']').offset().top - 100;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  });
  $('.hero').addClass('is-animated');

  function ladderlineHeight() {
    var line = document.querySelector('.ladder__bg');
    var offset = line.getBoundingClientRect().top + 400 - $(window).height();

    if (offset <= -4515) {
      line.classList.add('stop');
    }

    if (!line.classList.contains('stop')) {
      if (offset < 0) {
        offset = Math.abs(offset);
        line.style.height = offset + 'px';
      }
    }
  }

  ;

  if (document.querySelector('.ladder__bg')) {
    if (window.matchMedia('(min-width: 992px)').matches) {
      ladderlineHeight();
    }
  }

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
  $('.js-more-btn').on('click', function () {
    var changeText = $(this).data('hide');
    var btnText = $(this).find('.btn-txt').text();
    $(this).find('.btn-txt').text(changeText);
    $(this).data('hide', btnText);
    $(this).toggleClass('hide-text').closest('.has-hidden').find('.js-hidden').slideToggle(250);
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

  $(document).on('opening', '.remodal', function () {
    setTextareaHeight();
  });
  $(document).on('click', '.pricelist__item-button [data-remodal-target="base-form"]', function () {
    var $parent = $(this).closest('.pricelist__item');
    var title = $parent.find('.pricelist__item-title').text();
    var price = $parent.find('.pricelist__item-price').text();
    var $remodal = $('[data-remodal-id="base-form"]');
    $remodal.find('.popup-form__body-text').html(title);
    $remodal.find('.popup-form__body-price').html(price + '€');
  });
  $(document).on('click', '.pricelist__item-button [data-remodal-target="modal-form-4"]', function () {
    var $parent = $(this).closest('.pricelist__item');
    var title = $parent.find('.pricelist__item-title').text();
    var price = $parent.find('.pricelist__item-price').text();
    var $remodal = $('[data-remodal-id="modal-form-4"]');
    $remodal.find('.popup-form__body-text').html(title);
    $remodal.find('.popup-form__body-price').html(price + '€');
  });
  $(document).on('click', '.pricelist__item-button [data-remodal-target="modal-form-2"]', function () {
    var $parent = $(this).closest('.pricelist__item');
    var title = $parent.find('.pricelist__item-title').text();
    var price = $parent.find('.pricelist__item-price-value').text();
    var $remodal = $('[data-remodal-id="modal-form-2"]');
    $remodal.find('.popup-form__body-text').html(title);

    if (price.match(/ \/ м²/)) {
      $remodal.find('.popup-form__body-price').html(price.replace(' / м²', '€ / м²'));
    } else {
      $remodal.find('.popup-form__body-price').html(price + '€');
    }

    $remodal.find('select').trigger('change');
  });
  $(document).on('click', '.pricelist__item-button [data-remodal-target="modal-form-3"]', function () {
    var $parent = $(this).closest('.pricelist__item');
    var title = $parent.find('.pricelist__item-title').text();
    var price = $parent.find('.pricelist__item-price-value').text();
    var $remodal = $('[data-remodal-id="modal-form-3"]');
    $remodal.find('.popup-form__body-text').html(title);

    if (price.match(/ \/ м²/)) {
      $remodal.find('.popup-form__body-price').html(price.replace(' / м²', '€ / м²'));
    } else {
      $remodal.find('.popup-form__body-price').html(price + '€');
    }

    $remodal.find('select').trigger('change');
  });
  $(document).on('change', '[data-remodal-id="modal-form-2"] select', function () {
    var $select = $(this);
    var value = $select.val();
    var text = $select.find('option:selected').text();
    var $remodal = $select.closest('.remodal');
    $remodal.find('.popup-form__body-text').html(text);
    $remodal.find('.popup-form__body-price').html(value);
  });
  $(document).on('change', '[data-remodal-id="modal-form-3"] select', function () {
    var $select = $(this);
    var value = $select.val();
    var text = $select.find('option:selected').text();
    var $remodal = $select.closest('.remodal');
    $remodal.find('.popup-form__body-text').html(text);
    $remodal.find('.popup-form__body-price').html(value);
  });
  $(document).on('change', '[data-remodal-id="modal-form-5"] select', function () {
    var $select = $(this);
    var value = $select.val();
    var text = $select.find('option:selected').text();
    var $remodal = $select.closest('.remodal');
    $remodal.find('.popup-form__body-text').html(text);
    $remodal.find('.popup-form__body-price').html(value);
  });
  $(document).on('change', '[data-remodal-id="modal-form-5_2"] select', function () {
    var $select = $(this);
    var value = $select.val();
    var text = $select.find('option:selected').text();
    var $remodal = $select.closest('.remodal');
    $remodal.find('.popup-form__body-text').html(text);
    $remodal.find('.popup-form__body-price').html(value);
  });

  function reviews(selector) {
    selector = document.querySelectorAll(selector);
    selector.forEach(function (item) {
      var carousel = new Swiper(item, {
        spaceBetween: 20,
        slidesPerView: "auto",
        freeMode: true,
        navigation: {
          prevEl: item.parentElement.parentElement.querySelector('.swiper-button-prev'),
          nextEl: item.parentElement.parentElement.querySelector('.swiper-button-next')
        }
      });
    });
  }

  ;
  reviews('.js-reviews');

  function updSwiperNumericPagination() {
    this.el.parentElement.parentElement.parentElement.querySelector(".reviews2__footer-counter").innerHTML = '<span class="count">' + (this.realIndex + 1) + '</span>/<span class="total">' + this.el.slidesQuantity + "</span>";
  }

  function reviews2(selector) {
    selector = document.querySelectorAll(selector);
    selector.forEach(function (item) {
      item.slidesQuantity = item.querySelectorAll(".swiper-slide").length;
      var carousel = new Swiper(item, {
        spaceBetween: 20,
        effect: "fade",
        navigation: {
          prevEl: item.parentElement.parentElement.parentElement.querySelector('.swiper-button-prev'),
          nextEl: item.parentElement.parentElement.parentElement.querySelector('.swiper-button-next')
        },
        on: {
          init: updSwiperNumericPagination,
          slideChange: updSwiperNumericPagination
        },
        breakpoints: {
          640: {
            spaceBetween: 20
          },
          992: {
            effect: "fade"
          },
          1024: {
            effect: "fade",
            spaceBetween: 450
          }
        }
      });
      carousel.on('slideChange', function () {
        item.parentElement.parentElement.parentElement.querySelector('.reviews2__footer-name span').classList.add('hide');
        setTimeout(function () {
          item.parentElement.parentElement.parentElement.querySelector('.reviews2__footer-name span').classList.remove('hide');
        }, 200);
        setTimeout(function () {
          var name = item.querySelector('.swiper-slide-active').dataset.autor;
          item.parentElement.parentElement.parentElement.querySelector('.reviews2__footer-name span').innerHTML = name;
        }, 200);
      });
    });
  }

  ;
  reviews2('.js-reviews2');
  var carousel = new Swiper('.scroll-block .swiper', {
    spaceBetween: 0,
    slidesPerView: "auto",
    freeMode: true
  });
  var scrollBarWidth = $(window).outerWidth() - $(document).outerWidth();
  $('.js-menu').on('click', function () {
    scrollBarWidth = $(window).outerWidth() - $(document).outerWidth();
    $('.site-sidebar').toggleClass('opened');

    if ($('.site-sidebar').hasClass('opened')) {
      disableHtmlScroll();
    } else {
      enableHtmlScroll();
    }
  });

  function disableHtmlScroll() {
    $('html, .header__in, .site-sidebar__in').css({
      'padding-right': scrollBarWidth
    });

    if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
      $('body').addClass('overflow-hidden');
    } else {
      $('body').removeClass('overflow-hidden');
      $(document.documentElement).addClass('overflow-hidden');
    }
  }

  function enableHtmlScroll() {
    // setTimeout(function(){
    $('body').removeClass('overflow-hidden');
    $(document.documentElement).removeClass('overflow-hidden'); // }, 300)

    $('html, .header__in, .site-sidebar__in').css({
      'padding-right': 0
    });
  }

  $('.site-sidebar').on('click tap', function (event) {
    if ($(event.target).closest('.site-sidebar__container').length) return;
    $('.site-sidebar').removeClass('opened');
    enableHtmlScroll();
  });

  function siteVideoPlay() {
    var siteVideo = document.querySelectorAll('.site-video');
    var playIcons = document.querySelectorAll('.site-video__play');
    playIcons.forEach(function (item) {
      item.addEventListener('click', function () {
        siteVideo.forEach(function (item) {
          item.querySelector('video').pause();
        });
        this.closest('.site-video').classList.add('is-play');
        this.closest('.site-video').querySelector('video').setAttribute('controls', 'true');
        this.closest('.site-video').querySelector('video').play();
      });
    });
  }

  siteVideoPlay();
  var shareItems = document.querySelectorAll('.social_share');

  for (var i = 0; i < shareItems.length; i += 1) {
    shareItems[i].addEventListener('click', function share(e) {
      return JSShare.go(this);
    });
  }

  function usefulPostsDelay() {
    var advDelay = 0;
    $('.useful-posts__item').each(function () {
      $(this).css({
        'animation-delay': advDelay + 'ms'
      });
      advDelay += 100;
    });
  }

  ;
  usefulPostsDelay();

  function setTitlesClass() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.wave-title').each(function () {
        if ($(this).height() < 70) {
          $(this).addClass('no-indent');
        } else {
          $(this).removeClass('no-indent');
        }
      });
    }
  }

  setTitlesClass();
});