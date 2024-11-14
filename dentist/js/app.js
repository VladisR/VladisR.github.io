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
// $(function() {


$.exists = function (selector) {
  return $(selector).length > 0;
};

var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
$(window).on('resize', function () {
  isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  headerHeight();
  gallerContainerHeight();

  if (!isMobile) {
    headerMenuWidth();
  }
});
$(document).on('scroll', function () {
  headerAddClass();
  imagesZoomingOnScroll();
  toothRotate();
  selectorsAddClass();
});

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
  var _iterator = _createForOfIteratorHelper(document.getElementsByClassName('text-splitter')),
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

  $('.text-splitter').each(function () {
    var line = $(this).find('.line');
    var delay = 0;
    line.each(function () {
      $(this).css({
        transitionDelay: ' ' + delay + 'ms'
      }).find('>div').css({
        transitionDelay: ' ' + delay + 'ms'
      });
      delay += 100;
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
  $('.js-sc-container').each(function () {
    var topOffset = $(this).data('offset');

    if (isVisible($(this), $(window), topOffset)) {
      $(this).addClass('animated');
    }

    ;
  });
}

setTimeout(function () {
  $('.js-sc-container').each(function () {
    if ($(this).offset().top < $(document).scrollTop() + $(window).height()) {
      $(this).addClass('animated');
    }
  }).trigger('scroll');
});
var scrollBarWidth = $(window).outerWidth() - $(document).outerWidth();
$('.js-menu').on('click', function () {
  scrollBarWidth = $(window).outerWidth() - $(document).outerWidth();
  $(this).toggleClass('is-active');
  $('.mobile-sidebar').toggleClass('opened');
  $('.header').toggleClass('menu-opened');

  if ($('.header').hasClass('menu-opened')) {
    disableHtmlScroll();

    if ($('.announcement').length > 0 && !$('.header').hasClass('fixed') && window.matchMedia('(max-width: 992px)').matches) {
      $('.header .header__container').css({
        'max-height': $(window).height() - ($('.announcement').outerHeight() + $('.header__box').height())
      });
    }
  } else {
    enableHtmlScroll();
    $('.header .header__container').removeAttr('style');
  }

  if (!isMobile) {
    headerMenuWidth();
  }
});

function disableHtmlScroll() {
  $('html').css({
    'padding-right': scrollBarWidth
  });

  if ($('.header').hasClass('fixed')) {
    $('.header__box').css({
      'padding-right': scrollBarWidth
    });
    $('.header__container-in-line').css({
      'margin-left': -(scrollBarWidth / 2)
    });
    $('.header__container-in0').css({
      'padding-right': scrollBarWidth
    });
  }

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
  $('.header__box').css({
    'padding-right': 0
  });
  $('.header__container-in-line').css({
    'margin-left': 0
  });
  $('.header__container-in0').css({
    'padding-right': 0
  });
  $('html').css({
    'padding-right': 0
  });
}

$(document).on('click', function (event) {
  if ($(event.target).closest('.js-menu, .header__container-in1').length) return;
  $('.js-menu').removeClass('is-active');
  $('.header').removeClass('menu-opened');
  enableHtmlScroll();
});

function headerHeight() {
  if ($('.simple-header').length > 0) {
    $('.header').css({
      'min-height': $('.header__box').height()
    });
    $('.header').addClass('absolute');
  }
}

function headerMenuWidth() {
  if ($('.header__box').height() + $('.header__container-in1').innerHeight() > $(window).height()) {
    $('.header__container-in').css({
      'padding-left': 40 + scrollBarWidth
    });
  } else {
    $('.header__container-in').removeAttr('style');
  }
}

headerHeight();
var headerFlag = 1;

function headerAddClass() {
  var scrollIndent = 500;

  if ($('.simple-header').length > 0) {
    scrollIndent = 300;
  }

  if ($(document).scrollTop() >= scrollIndent && headerFlag == 1) {
    $('.header').addClass('abs');
    setTimeout(function () {
      $('.header').addClass('fixed');
      $('.header').removeClass('abs');
    }, 100);
    headerFlag = 2;
  } else if ($(document).scrollTop() < scrollIndent && headerFlag == 2) {
    $('.header').addClass('abs');
    setTimeout(function () {
      $('.header').removeClass('fixed');
      $('.header').removeClass('abs');
    }, 100);
    headerFlag = 1;
  }
}

headerAddClass();
$('.header').addClass('animated');
$('.js-title').on('click', function () {
  $(this).toggleClass('is-active').closest('.js-item').toggleClass('is-opened').find('.js-body').stop().slideToggle(300);
});
var advDelay = 0;
$('.advantages__item').each(function () {
  $(this).css({
    transitionDelay: '.' + advDelay + 's'
  });
  advDelay += 100;
});
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

var siteCarousel = $('.carousel');
siteCarousel.each(function (el, i) {
  var slider = new Swiper($(this).find('.swiper')[0], {
    spaceBetween: 40,
    freeMode: true,
    slidesPerView: "auto",
    navigation: {
      nextEl: $(this).find('.swiper-button-next')[0],
      prevEl: $(this).find('.swiper-button-prev')[0]
    },
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        spaceBetween: 40
      },
      768: {
        slidesPerView: 'auto',
        spaceBetween: 40
      },
      1024: {
        slidesPerView: 'auto',
        spaceBetween: 40
      }
    }
  });
}); // $('.cfw-image').addClass('animated')

function imagesZoomingOnScroll() {
  $(".gallery__item-image").each(function () {
    var image = this.querySelector('img');
    var iTop = this.getBoundingClientRect().top / 1.75 - $(window).height();
    var aaa = Math.abs(Math.ceil(iTop / 5.2));

    if (iTop < -50) {
      if (aaa < 100) {
        image.style.transform = "scale(1.0".concat(aaa, ")");
      } else {
        image.style.transform = "scale(1.".concat(aaa, ")");
      }
    }
  });
}

$('.intro-in').addClass('animated');

function toothRotate() {
  var docScroll = $(document).scrollTop() / 25;

  if (docScroll <= 15) {
    $('.intro-in__img img').css({
      transform: "rotate(".concat(-docScroll, "deg)")
    });
  }
} // $('.intro-main').addClass('animated');
// $('.main-menu li').each(function(){
//     if($(this).children('ul').length) {
//         $(this).addClass('has-child')
//         $(this).find('>a').append('<span class="m-tgl">')
//     }
// });
// $('.m-tgl').on('click', function(evt){
//     evt.preventDefault();
//     $(this)
//         .closest('li')
//         .toggleClass('is-opened')
//         .find('>ul')
//         .stop()
//         .slideToggle(200)
// });
// if (window.matchMedia('(min-width: 992px)').matches) {
//     $('.mosaic__items').mosaicflow({
//         itemSelector: '.mosaic__item',
//         minColumns: 3,
//         minItemWidth: 364,
//         threshold: 40
//     }).trigger('resize');
// }
// function rellaxInit() {
//     var animationSpeed = 15;
//     if ($('.rellax').length) {
//         var toggleRelaxServices = function toggleRelaxServices() {
//             if (window.matchMedia('(min-width: 992px)').matches) {
//                 if (relaxDestroyed && typeof rellax !== 'function') {
//                     rellax.refresh();
//                     relaxDestroyed = false;
//                 }
//             } else {
//                 if (!relaxDestroyed && rellax.destroy) {
//                 rellax.destroy();
//                 relaxDestroyed = true;
//                 }
//             }
//             if (window.matchMedia('(min-width: 1600px)').matches) {
//               animationSpeed = 10
//             } else {
//               animationSpeed = 10
//             }
//         };
//         var rellax = new Rellax('.rellax', {
//             speed: 10,
//             center: false,
//             vertical: true,
//         });
//         var relaxDestroyed = false;
//         toggleRelaxServices();
//         $(window).on('resize', toggleRelaxServices);
//     };
// }
// setTimeout(function(){
//     rellaxInit();
// }, 500);
// var docsc = $(document).scrollTop();


function gallerContainerHeight() {
  $('.mosaic__items').css({
    'height': $('.mosaic__items').height()
  });
}

setTimeout(function () {
  gallerContainerHeight();
});
setTimeout(function () {
  $('.mosaic__items').addClass('has-hidden');
});
var scrollPos;
$('.mosaic__button').on('click', function () {
  if ($('.show-all').length <= 0) {
    scrollPos = $(document).scrollTop();
  } else {
    window.scrollTo({
      top: scrollPos,
      behavior: 'auto'
    });
  }

  $(this).closest('.mosaic').toggleClass('show-all');
  $('.mosaic__items').css({
    'height': 'auto'
  }).removeClass('has-hidden');
  setTimeout(function () {
    selectorsAddClass();
  }, 100);
});
$('.js-m-item').each(function (i) {
  $(this).css({
    'order': i + 1
  }).attr('data-height', $(this).height());
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
  var viewY = 500;
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

var iCursor = document.querySelector('.services__cursor');
var container = document.querySelector('.services__container');

function servicesCursorMove() {
  $('.services__item').each(function (i) {
    if (i + 1 == 100) {
      $(this).addClass('hundred-start');
    }
  });
  var X = 0;
  var Y = 0;
  var mouse = {
    x: 0,
    y: 0
  };
  container.addEventListener("mouseover", function (event) {
    var rect = container.getBoundingClientRect(); // container.classList.add('tooth-visible');

    mouse.x = event.clientX - rect.left + 15;
    mouse.y = event.clientY - rect.top + 5;
    X += (mouse.x - X) * 0.07;
    Y += (mouse.y - Y) * 0.07;
    iCursor.style.transform = "translate3d(".concat(X, "px, ").concat(Y, "px, 0)");
  });
  container.addEventListener("mousemove", function (event) {
    var rect = container.getBoundingClientRect();
    container.classList.add('tooth-visible');
    mouse.x = event.clientX - rect.left + 15;
    mouse.y = event.clientY - rect.top + 5;
    X += (mouse.x - X) * 0.07;
    Y += (mouse.y - Y) * 0.07;
    iCursor.style.transform = "translate3d(".concat(X, "px, ").concat(Y, "px, 0)");
  });
  container.addEventListener("mouseleave", function (event) {
    iCursor.style.transform = "translate3d(0px, 0px, 0)";
    container.classList.remove('tooth-visible');
  });

  function move() {
    X += (mouse.x - X) * 0.065;
    Y += (mouse.y - Y) * 0.065;
    iCursor.style.transform = "matrix(1, 0, 0, 1, ".concat(X, ", ").concat(Y, ")");
    requestAnimationFrame(move);
  }

  move();
}

if (container) {
  var curContainer = document.querySelector('.services__cursor');
  servicesCursorMove();
  $('.services__item').on('mouseover', function () {
    if ($(this).index() % 2 == 0) {
      curContainer.classList.add('to-right');
    } else {
      curContainer.classList.remove('to-right');
    }
  });
} // });