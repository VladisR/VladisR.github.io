'use strict';
/* ^^^
* Viewport Height Correction
*
* @link https://www.npmjs.com/package/postcss-viewport-height-correction
* ========================================================================== */

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function setViewportProperty() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
} // window.addEventListener('resize', setViewportProperty);
// setViewportProperty(); // Call the fuction for initialisation

/* ^^^
* Полифил для NodeList.forEach(), на случай если забыл про IE 11
*
* @link https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
* ========================================================================== */


if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
} // document.addEventListener("DOMContentLoaded", () => {


var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
var isFirefox = /^((?!chrome|android).)*firefox/i.test(navigator.userAgent);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isMobile) {
  document.documentElement.classList.add('is-mobile');
  document.documentElement.classList.remove('is-desctop');
} else {
  document.documentElement.classList.remove('is-mobile');
  document.documentElement.classList.add('is-desctop');
}

if (isSafari) {
  document.documentElement.classList.add('is-safari');
}

window.addEventListener("resize", function () {
  var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

  if (isMobile) {
    document.documentElement.classList.add('is-mobile');
    document.documentElement.classList.remove('is-desctop');
  } else {
    document.documentElement.classList.remove('is-mobile');
    document.documentElement.classList.add('is-desctop');
  }
});
var windowScrollY; // function preventDefault(e) {
//     e.preventDefault();
// }

function syncHeight() {
  document.documentElement.style.setProperty('--window-inner-height', "".concat(window.innerHeight, "px"));
}

syncHeight();
window.addEventListener('resize', syncHeight);

function disableHtmlScroll() {
  var wrapper = document.querySelector('.app');
  windowScrollY = window.scrollY;

  if (!isMobile) {
    document.body.style.marginRight = window.innerWidth - wrapper.offsetWidth + 'px';
  } // if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
  //     document.body.classList.add('overflow-hidden')
  // } else {
  // document.body.classList.remove('overflow-hidden')


  document.documentElement.classList.add('overflow-hidden');

  if (isSafari) {
    document.body.style.top = "-".concat(windowScrollY, "px");
  }
}

function enableHtmlScroll() {
  document.body.classList.remove('overflow-hidden');
  document.documentElement.classList.remove('overflow-hidden');
  document.body.style.marginRight = null;

  if (isSafari) {
    document.body.style.top = null;
    window.scrollTo(0, windowScrollY);
    console.log(windowScrollY);
  }
}

function addEvent(parent, evt, selector, func) {
  var evt = evt;
  parent.addEventListener(evt, function (event) {
    if (event.target.matches(selector + ', ' + selector + ' *')) {
      func.apply(event.target.closest(selector), arguments);
    }
  }, false);
}

function slidingSidebar() {
  document.querySelector('.m-h-button--burger').addEventListener('click', function () {
    if (this.classList.contains('close')) {
      document.querySelector('.mobile-sidebar').classList.add('is-closing');
      setTimeout(function () {
        document.querySelector('.mobile-sidebar').classList.remove('is-closing');
        document.querySelector('.mobile-sidebar').classList.remove('is-opened');
        enableHtmlScroll();
      }, 500);
    } else {
      document.querySelector('.mobile-sidebar').classList.add('is-opened');
      disableHtmlScroll();
    }

    this.classList.toggle('close');
  });
  document.querySelector('.mobile-sidebar').addEventListener('click', function (e) {
    if (e.target.closest('.mobile-sidebar__container')) return;
    document.querySelector('.mobile-sidebar').classList.add('is-closing');
    document.querySelector('.m-h-button--burger').classList.remove('close');
    setTimeout(function () {
      document.querySelector('.mobile-sidebar').classList.remove('is-closing');
      document.querySelector('.mobile-sidebar').classList.remove('is-opened');
      enableHtmlScroll();
    }, 500);
  });
}

;
slidingSidebar();

function startTimer(timer) {
  var timerDays = timer.querySelector('.js-action-timer-days');
  var timerHours = timer.querySelector('.js-action-timer-hours');
  var timerMinutes = timer.querySelector('.js-action-timer-minutes');
  var deadline = new Date(timer.dataset.end).getTime();
  var x = setInterval(function () {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor(t % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor(t % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor(t % (1000 * 60) / 1000);
    timerDays.innerHTML = days;
    timerHours.innerHTML = hours;
    timerMinutes.innerHTML = seconds;

    if (t < 0) {
      clearInterval(x);
      timer.innerHTML = timer.dataset.expired;
    }
  }, 1000);
}

var actionTimer = document.querySelectorAll('.js-action-timer');

if (actionTimer) {
  actionTimer.forEach(startTimer);
}

var addetToCartPopup = document.querySelectorAll('.added-to-cart');
document.addEventListener('click', function (event) {
  if (event.target.closest('.added-to-cart')) {
    return;
  }

  if (addetToCartPopup) {
    addetToCartPopup.forEach(function (sp) {
      return sp.classList.remove('is-visible');
    });
  }
});
var iforms = document.querySelectorAll('form');

if (iforms) {
  iforms.forEach(function (elem) {
    elem.addEventListener('submit', function (e) {
      var iFileBox = this.querySelector('.i-file');
      var iFile = iFileBox.querySelector('input[type="file"]');

      if (iFile.files.length > 10) {
        e.preventDefault();
        iFileBox.classList.add('error');
      }
    });
  });
}

var yaMaps = document.querySelectorAll('.c-map');

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
    mapScript.setAttribute('src', site_defers.ymaps);
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
  yaMaps.forEach(function (el) {
    var coords = el.dataset.coords.split(',').map(function (point) {
      return Number.parseFloat(point.trim());
    });
    var zoom = el.dataset.zoom;

    if (!zoom) {
      zoom = 15;
    }

    var cMapOptions = {
      center: coords,
      iconCenter: coords,
      zoom: zoom,
      icon: {
        href: "img/location-icon.svg",
        size: [25, 41]
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
      iconImageSize: cMapOptions.icon.size
    });
    cMap.geoObjects.add(cMapPlacemark);
    cMap.behaviors.disable('scrollZoom');
  });
};

var iMap = document.querySelectorAll('.i-map');

if (iMap) {
  var popupMap;
  iMap.forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      var coords = el.dataset.coords.split(',').map(function (point) {
        return Number.parseFloat(point.trim());
      });
      var zoom = el.dataset.zoom;

      if (!zoom) {
        zoom = 15;
      }

      var cMapOptions = {
        center: coords,
        iconCenter: coords,
        zoom: zoom,
        icon: {
          href: "img/location-icon.svg",
          size: [25, 41]
        }
      };

      if (typeof ymaps === "undefined") {
        var mapScript = document.createElement('script');
        mapScript.setAttribute('src', site_defers.ymaps);
        mapScript.setAttribute('async', true);

        mapScript.onload = function () {
          setTimeout(function () {
            initMapPopup();
          }, 150);
        };

        document.head.appendChild(mapScript);
      } else {
        initMapPopup();
      }

      function initMapPopup() {
        if (popupMap) {
          popupMap.destroy();
        }

        setTimeout(function () {
          popupMap = new ymaps.Map('popup-map', {
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
            iconImageSize: cMapOptions.icon.size
          });
          popupMap.geoObjects.add(cMapPlacemark);
          popupMap.behaviors.disable('scrollZoom');
        });
      }
    });
  });
}

function cMenuSublevesToggle() {
  var cMenuItemsParent = document.querySelectorAll('.c-menu > ul > li');
  var cMenuItems = document.querySelectorAll('.c-menu > ul > li > a');
  cMenuItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parent = e.target.closest('li');
      var children = parent.querySelector('ul');

      if (children) {
        e.preventDefault();
        var close = children.querySelector('.c-close');
        close.addEventListener('click', function (e) {
          parent.classList.remove('is-opened');
        });
      }

      if (parent.classList.contains('is-opened')) {
        parent.classList.remove('is-opened');
      } else {
        cMenuItemsParent.forEach(function (elem) {
          elem.classList.remove('is-opened');
        });
        parent.classList.add('is-opened');
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('.c-menu')) return;

    if (document.querySelector('.c-menu li.is-opened')) {
      document.querySelector('.c-menu li.is-opened').classList.remove('is-opened');
    }
  });
}

cMenuSublevesToggle();

function cSelection() {
  if (event.target.closest('.i-list__close')) {
    this.closest('.c-selection').querySelector('.i-list').classList.remove('is-opened');
  } else if (event.target.closest('.i-list')) {
    return;
  } else {
    this.closest('.c-selection').querySelector('.i-list').classList.toggle('is-opened');
  }
}

addEvent(document, 'click', '.c-selection', cSelection);

function openCityList(e) {
  var cityName = this.querySelector('a').innerText;

  if (this.querySelector('ul')) {
    e.preventDefault();
    this.classList.toggle('is-opened');
  } else {
    document.querySelectorAll('.city-selected').forEach(function (elem) {
      elem.innerText = cityName;
    });
    closeModal(e);
  }
}

addEvent(document, 'click', '.js-list li', openCityList); //+ simple

var comparison = document.querySelector('.comparison');

if (comparison) {
  var swiperl = new Swiper(".prodsl", {
    speed: 200,
    slidesPerView: 1,
    spaceBetween: 5
  });
  var paramsl = new Swiper(".paramsl", {
    allowTouchMove: false,
    slidesPerView: 1,
    spaceBetween: 5
  });
  swiperl.on('setTranslate', function onSliderMove() {
    var _this = this;

    paramsl.forEach(function (el) {
      el.setTranslate(_this.translate);
    });
  });
  swiperl.on('touchEnd', function onSliderMove() {
    paramsl.forEach(function (el) {
      el.slideToClosest(200);
    });
  });
  paramsl[1].on('touchEnd', function onSliderMove() {});
  var swiperr = new Swiper(".prodsr", {
    speed: 200,
    slidesPerView: 1,
    spaceBetween: 5
  });
  var paramsr = new Swiper(".paramsr", {
    allowTouchMove: false,
    slidesPerView: 1,
    spaceBetween: 5
  });
  swiperr.on('setTranslate', function onSliderMove() {
    var _this2 = this;

    paramsr.forEach(function (el) {
      el.setTranslate(_this2.translate);
    });
  });
  swiperr.on('touchEnd', function onSliderMove() {
    paramsr.forEach(function (el) {
      el.slideToClosest(200);
    });
  });
  var comparisonDesctopSlider = new Swiper(".js-comparison-slider", {
    spaceBetween: 0,
    slidesPerView: 2,
    breakpoints: {
      640: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 2
      },
      1366: {
        slidesPerView: 3
      },
      1440: {
        slidesPerView: 4
      }
    }
  });
}

var paramsWrapper = document.querySelectorAll('.comparison__options-group');
var optionItem = document.querySelectorAll('.comparison__option');
paramsWrapper.forEach(function (item) {
  var index = _toConsumableArray(item.parentNode.children).indexOf(item);

  item.setAttribute('data-list', index);
});
optionItem.forEach(function (item) {
  item.addEventListener('mouseover', function () {
    var itemIndex = _toConsumableArray(item.parentNode.children).indexOf(item);

    var groupIndex = this.closest('.comparison__options-group').dataset.list;
    var group = document.querySelectorAll('.comparison__options-group[data-list="' + groupIndex + '"]');
    optionItem.forEach(function (active) {
      active.classList.remove('hover');
    });
    group.forEach(function (items) {
      var item = items.querySelectorAll('.comparison__option');

      if (item[itemIndex]) {
        item[itemIndex].classList.add('hover');
      }
    });
  });
});

function sameHeights() {
  var nodeList = document.querySelectorAll('.comparison__option');
  var elems = [].slice.call(nodeList);
  var tallest = Math.max.apply(Math, elems.map(function (elem, index) {
    elem.style.minHeight = '';
    return elem.offsetHeight;
  }));
  elems.forEach(function (elem, index, arr) {
    elem.style.minHeight = tallest + 'px';
  });
}

var resized = true;
var timeout = null;

var refresh = function refresh() {
  if (resized) {
    requestAnimationFrame(sameHeights);
  }

  clearTimeout(timeout);
  timeout = setTimeout(refresh, 100);
  resized = false;
};

window.addEventListener('resize', function () {
  if (window.innerWidth >= 992) {
    resized = true;
  } else {
    resized = false;
  }
});

if (window.innerWidth >= 992) {
  refresh();
}

function reviewsSlidersInit() {
  var revievSliders = document.querySelectorAll('.js-review-media');

  if (revievSliders) {
    revievSliders.forEach(function (el) {
      var destopItems = el.dataset.ditems;
      var slider = new Swiper(el, {
        slidesPerView: 4,
        spaceBetween: 7,
        loop: false,
        speed: 500,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          768: {
            slidesPerView: 4,
            spaceBetween: 7
          },
          1024: {
            slidesPerView: destopItems,
            spaceBetween: 12
          }
        }
      });
    });
  }
}

;
reviewsSlidersInit();

function selectSize() {
  document.querySelector('.select-popup').classList.add('is-visible');
  disableHtmlScroll();
}

function closeSizePopup(e) {
  if (!this.classList.contains('select-popup__close')) {
    if (e.target.closest('.select-popup__content')) return;
  }

  document.querySelector('.select-popup.is-visible').classList.remove('is-visible');
  enableHtmlScroll();
}

document.addEventListener('keydown', function (e) {
  var selectPopup = document.querySelector('.select-popup');

  if (selectPopup.classList.contains('is-visible')) {
    if (e.keyCode == 27 && selectPopup.classList.contains('is-visible')) {
      selectPopup.classList.remove('is-visible'); // enableHtmlScroll();
    }
  }
});
addEvent(document, 'click', '.fake-select__text', selectSize);
addEvent(document, 'click', '.select-popup', closeSizePopup);
addEvent(document, 'click', '.select-popup__close', closeSizePopup);
var galleryThumbs = new Swiper('.js-gallery-thumbs', {
  slidesPerView: "auto",
  centeredSlides: false,
  loop: false,
  slideToClickedSlide: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true
});
var gallerySlider = new Swiper('.js-gallery-slider', {
  slidesPerView: 1,
  centeredSlides: true,
  speed: 500,
  effect: 'fade',
  loop: true,
  thumbs: {
    swiper: galleryThumbs
  }
});
var heroWrapper = document.querySelector('.js-hero-wrapper');

function heroWidth() {
  heroWrapper.style.width = document.body.offsetWidth - heroWrapper.getBoundingClientRect().x + 'px';
}

if (heroWrapper) {
  heroWidth();
  window.addEventListener('resize', heroWidth);
  var heroSlider = new Swiper(".js-hero-slider", {
    slidesPerView: "auto",
    loop: false,
    navigation: false,
    autoplay: false
  });
}

var fileBox = document.querySelectorAll('.i-file');

if (fileBox) {
  fileBox.forEach(function (el) {
    var counter = el.querySelector('.jscnt');
    var textField = el.querySelector('.i-file__text-field');
    el.querySelector('input').addEventListener('change', function () {
      if (counter) {
        counter.innerText = this.files.length;
      }

      if (textField) {
        textField.innerText = this.files[0].name;
        textField.classList.add('changed');
      }
    });
  });
}

var stars = document.querySelectorAll('.js-rating .i-rating__star');
stars.forEach(function (star) {
  star.addEventListener('click', function () {
    stars.forEach(function (e) {
      e.classList.remove('is-active');
    });
    this.classList.add('is-active');
  });
});

function scrollToreviews(evt) {
  evt.preventDefault();
  var tabsTitles = document.querySelectorAll('.product-tabs .js-product-tabs-title');
  var tabsBodys = document.querySelectorAll('.product-tabs .js-product-tabs-body');
  tabsTitles.forEach(function (title) {
    title.classList.remove('is-active');
  });
  tabsBodys.forEach(function (title) {
    title.classList.remove('is-opened');
  });
  document.querySelectorAll('.product-tabs .js-product-tabs-title[data-tab_index="1"]').forEach(function (item) {
    item.classList.add('is-active');
  });
  document.querySelectorAll('.product-tabs .js-product-tabs-body[data-tab_index="1"]').forEach(function (item) {
    item.classList.add('is-opened');
  });

  if (this.closest('.site-popup')) {
    var popup = document.querySelector('.quick-view');
    var reviews = popup.querySelector('.product-reviews');
    popup.scrollTo({
      top: reviews.offsetTop - 20,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo({
      top: document.querySelector('.product-tabs .product-reviews').offsetTop - 50,
      left: 0,
      behavior: 'smooth'
    });
  }
}

addEvent(document, 'click', '.js-scroll-to-reviews', scrollToreviews);
var installmentButton = document.querySelectorAll('.js-installment-button');
var installmentBody = document.querySelectorAll('.js-installment-body ');
installmentButton.forEach(function (button) {
  button.addEventListener('click', function (event) {
    var indx = button.dataset.index;
    event.preventDefault();
    installmentButton.forEach(function (b) {
      return b.classList.remove('is-active');
    });
    button.classList.add('is-active');
    installmentBody.forEach(function (ib) {
      ib.classList.remove('is-active');

      if (ib.dataset.index === indx) {
        ib.classList.add('is-active');
      }
    });
  });
}); // var modal;

function openModal(e) {
  e.preventDefault();
  var anhor = this.dataset.modaltarget;
  var modal = document.querySelector('[data-modalid="' + anhor + '"]');

  if (modal) {
    modal.classList.add('is-opened');

    if (modal.closest('.selections')) {
      modal.closest('.selections').classList.add('is-opened');
    }

    disableHtmlScroll();
    quickViewReviewsSlider('.quick-view .js-product-reviews-slider');

    if (anhor == 'sorting' || anhor == 'filter') {
      document.querySelector('.selections').classList.add('is-opened');
    }
  }
}

function closeModal(e) {
  if (e.target.closest('.is-opened[data-modalid]')) {
    e.target.closest('.is-opened[data-modalid]').classList.remove('is-opened');
    var openedCount = document.querySelectorAll('.is-opened[data-modalid]');
    var mSidebar = document.querySelectorAll('.mobile-sidebar.is-opened');

    if (openedCount.length <= 0 && mSidebar.length <= 0 && !document.querySelector('.select-popup').classList.contains('is-visible')) {
      setTimeout(function () {
        enableHtmlScroll();
      }, 500);
    }
  }
}

var sitePopup = document.querySelectorAll('[data-modalid]');

if (sitePopup) {
  sitePopup.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
      if (e.target.closest('[data-modaltarget], .site-popup__container, .fake-select__dropdown-items, .popup-form__content')) return;
      e.target.classList.remove('is-opened');
      var openedCount = document.querySelectorAll('.is-opened[data-modalid]');

      if (openedCount.length <= 0 || document.querySelector('.select-popup').classList.contains('is-visible')) {
        setTimeout(function () {
          if (!document.querySelector('.select-popup').classList.contains('is-visible')) {
            enableHtmlScroll();
          }
        }, 500);
      }
    });
  });
}

addEvent(document, 'click', '[data-modaltarget]', openModal);
addEvent(document, 'click', '[data-modalclose]', closeModal);

function mQuestion(e) {
  var $this = this;

  if (screen.width < 768) {
    $this.classList.add('is-opened');
    setTimeout(function () {
      $this.classList.add('is-visible');
    });
  }

  if (e.target.className.includes('js-cls-qstn')) {
    setTimeout(function () {
      $this.classList.remove('is-visible');
    });
    setTimeout(function () {
      $this.classList.remove('is-opened');
    }, 300);
  }
}

addEvent(document, 'click', '.m-question', mQuestion);

function headerMenu() {
  var dMnButton = document.querySelectorAll('.js-mn-button');
  dMnButton.forEach(function (elem) {
    elem.addEventListener('click', function (e) {
      var mnIndex = this.dataset.mntarget;
      var dMenu = document.querySelector('[data-mnindex="' + mnIndex + '"]');
      var dMenuContainer = dMenu.querySelector('.main-menu-desktop__container');
      var dMenuItem = dMenu.querySelectorAll('.main-menu-desktop__container > ul > li');

      if (mnIndex == 'roomsmenu') {
        document.querySelector('[data-mntarget="catalogmenu"]').classList.remove('close');
      } else {
        document.querySelector('[data-mntarget="roomsmenu"]').classList.remove('close');
      }

      if (document.querySelector('.main-menu-desktop.is-opened')) {
        document.querySelector('.main-menu-desktop.is-opened').classList.remove('is-opened');
      }

      if (this.classList.contains('close')) {
        dMenu.classList.remove('is-opened');
      } else {
        dMenu.classList.add('is-opened');
      }

      this.classList.toggle('close');
      var dMenuHeight = dMenu.querySelector('.main-menu-desktop__container > ul').offsetHeight;
      var dMenuHeight2 = dMenu.querySelector('.current-item .md-lvl2-items').offsetHeight;

      if (dMenuHeight2 > dMenuHeight) {
        dMenuContainer.style.height = dMenuHeight2 + 'px';
      }

      dMenuItem.forEach(function (elem) {
        elem.addEventListener('click', function (e) {
          if (this.querySelector('.md-lvl2')) {
            e.preventDefault();
            dMenuItem.forEach(function (items) {
              items.classList.remove('current-item');
            });
            this.classList.add('current-item');
            dMenuHeight2 = this.querySelector('.md-lvl2-items').offsetHeight;

            if (dMenuHeight2 > dMenuHeight) {
              dMenuContainer.style.height = dMenuHeight2 + 'px';
            }
          }
        });
      });
      document.addEventListener('click', function (e) {
        if (e.target.closest('.main-menu-desktop, .header__d-button')) return;
        dMnButton[0].classList.remove('close');
        dMnButton[1].classList.remove('close');
        dMenu.classList.remove('is-opened');
      });
    });
  });

  function closeMenu() {
    var bntTarget = this.closest('.main-menu-desktop').dataset.mnindex;
    this.closest('.main-menu-desktop').classList.remove('is-opened');
    document.querySelector('[data-mntarget="' + bntTarget + '"]').classList.remove('close');
  }

  addEvent(document, 'click', '.main-menu-desktop__close', closeMenu);
}

headerMenu();

function fcngMenu() {
  var levels2 = document.querySelectorAll('.main-menu .mn-level-2');
  var item = document.querySelectorAll('.main-menu ul li');
  var index;
  var levels2List = document.querySelector('.main-menu__levels-2-list');
  var mMenus = document.querySelector('.m-menus');
  levels2.forEach(function (elem, ind) {
    mMenus.appendChild(elem);
  });
  item.forEach(function (elem, indx) {
    elem.addEventListener('click', function (e) {
      var backIndex = 1;

      if (elem.classList.contains('has-children')) {
        e.preventDefault();
        var listClass = elem.closest('ul').classList.item(0);

        if (listClass) {
          levels2List.classList.add(listClass + '-opened');
        }

        index = _toConsumableArray(this.parentNode.children).indexOf(this);

        if (!listClass) {
          item.forEach(function (e) {
            e.classList.remove('mn-current-item');
          });
          levels2.forEach(function (elem, ind) {
            elem.classList.remove('is-opened');
          });

          if (levels2[index]) {
            levels2[index].classList.add('is-opened');
          }
        } else {
          elem.parentNode.classList.add('mn-list-opened');
        }

        var itt = _toConsumableArray(this.parentNode.children);

        itt.forEach(function (e) {
          e.classList.remove('mn-current-item');
        });
        item[indx].classList.add('mn-current-item');
      }
    });
  });
  document.querySelector('.js-menu-back').addEventListener('click', function () {
    if (levels2List.classList.contains('mn-level-4-opened')) {
      document.querySelector('.mn-level-4.mn-list-opened .mn-current-item').classList.remove('mn-current-item');
      document.querySelector('.mn-level-4.mn-list-opened').classList.remove('mn-list-opened');
      levels2List.classList.remove('mn-level-4-opened');
    } else if (levels2List.classList.contains('mn-level-3-opened')) {
      document.querySelector('.mn-level-3.mn-list-opened .mn-current-item').classList.remove('mn-current-item');
      document.querySelector('.mn-level-3.mn-list-opened').classList.remove('mn-list-opened');
      levels2List.classList.remove('mn-level-3-opened');
    } else if (levels2List.classList.contains('mn-level-2-opened')) {
      document.querySelector('.mn-level-2.mn-list-opened .mn-current-item').classList.remove('mn-current-item');
      document.querySelector('.mn-level-2.mn-list-opened').classList.remove('mn-list-opened');
      levels2List.classList.remove('mn-level-2-opened');
    }
  });
  document.querySelector('.mobile-sidebar__top').style.minHeight = document.querySelector('.mobile-sidebar .main-menu').offsetHeight + 'px';
}

fcngMenu();
var goodsTitle = [].slice.call(document.querySelectorAll('.js-goods-title'));
var goodsBody = [].slice.call(document.querySelectorAll('.js-goods-body'));

if (goodsTitle && goodsBody) {
  goodsTitle.forEach(function (title) {
    title.addEventListener('click', function () {
      var indx = title.dataset.index;
      goodsTitle.forEach(function (gt) {
        return gt.classList.remove('is-active');
      });
      title.classList.add('is-active');
      goodsBody.forEach(function (body) {
        body.classList.add('is-hidden');
        body.classList.remove('is-active');

        if (body.dataset.index === indx) {
          body.classList.add('is-active');
        }
      });
    });
  });
}

function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

var iVideo = document.querySelectorAll('.i-video');
iVideo.forEach(function (video) {
  var videoId = youtube_parser(video.href);
  var poster = '//img.youtube.com/vi/' + videoId + '/hq720.jpg';

  if (video.querySelector('img').src == '') {
    video.querySelector('img').src = poster;
  }

  video.addEventListener('click', function (event) {
    event.preventDefault();
    var videoId = youtube_parser(this.href);
    var iframe = document.querySelector('.popup-video iframe');

    if (iframe) {
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    } else {
      document.querySelector('.popup-video').innerHTML = '<iframe width="1270" height="720" frameborder="0" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
  });
});

var stopVideo = function stopVideo() {
  var iframe = document.querySelector('.popup-video iframe');
  var video = document.querySelector('.popup-video video');

  if (iframe) {
    iframe.src = "";
  }

  if (video) {
    video.pause();
  }
};

var iVideoStop = document.querySelectorAll('.i-video-stop');

if (iVideoStop) {
  iVideoStop.forEach(function (stop) {
    stop.addEventListener('click', stopVideo);
  });
}

function prodAddToCart(event) {
  event.preventDefault();
  var parent = this.closest('.js-product-add-to-card-parent') || null;
  this.classList.add('in-cart');
  if (parent.classList.contains('in-cart')) return;

  if (document.querySelector('.added-to-cart')) {
    document.querySelector('.added-to-cart').classList.add('is-visible');
  }

  if (parent) {
    parent.classList.add('in-cart');
  }
}

addEvent(document, 'click', '.js-product-add-to-card', prodAddToCart);
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('js-more-btn')) {
    event.preventDefault();

    if (event.target.closest('.js-parent').classList.contains('js-some-hiddent-items')) {
      event.target.closest('.js-parent').classList.add('is-expanded');
    } else {
      event.target.closest('.js-parent').querySelector('.is-hidden').classList.remove('is-hidden');
    }

    event.target.classList.add('is-hidden');
  }
});
var scrollToProductBuild = document.querySelector('.js-scroll-to-product-build');

if (scrollToProductBuild) {
  scrollToProductBuild.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({
      top: document.querySelector('.product-build').offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  });
}

function prodControls() {
  var tooltipContainer = this.closest('.product-controls').querySelector('.product-controls__tooltips');
  var favoriteTooltip = this.closest('.product-controls').querySelector('.tooltip--favorite');
  var comparisonTooltip = this.closest('.product-controls').querySelector('.tooltip--comparison');
  var moreBtn = this.closest('.product-controls').querySelector('.product-controls__item--more');
  this.classList.toggle('is-checked');

  if (this.closest('.product-controls').querySelector('.product-controls__item--comparison.is-checked') || this.closest('.product-controls').querySelector('.product-controls__item--favorite.is-checked')) {
    moreBtn.classList.add('show');
  } else {
    moreBtn.classList.remove('show');
    tooltipContainer.classList.remove('show');
    moreBtn.classList.remove('is-checked');
  }

  if (this.classList.contains('product-controls__item--favorite')) {
    if (this.classList.contains('is-checked')) {
      if (favoriteTooltip.classList.contains('show')) {
        return;
      } else {
        favoriteTooltip.classList.add('show');
        setTimeout(function () {
          favoriteTooltip.classList.remove('show');
        }, 3000);
      }

      tooltipContainer.classList.add('show-favorite');
    } else {
      favoriteTooltip.classList.remove('show');
      tooltipContainer.classList.remove('show-favorite');
    }
  }

  if (this.classList.contains('product-controls__item--comparison')) {
    if (this.classList.contains('is-checked')) {
      if (comparisonTooltip.classList.contains('show')) {
        return;
      } else {
        comparisonTooltip.classList.add('show');
        setTimeout(function () {
          comparisonTooltip.classList.remove('show');
        }, 3000);
      }

      tooltipContainer.classList.add('show-comparison');
    } else {
      comparisonTooltip.classList.remove('show');
      tooltipContainer.classList.remove('show-comparison');
    }
  }

  if (this.classList.contains('product-controls__item--more')) {
    tooltipContainer.classList.toggle('show');
  }
}

addEvent(document, 'click', '.product-controls__item', prodControls);

function prodClassAdd() {
  if (this.closest('.product-item').classList.contains('in-cart')) return;
  this.closest('.product-item').classList.add('in-cart');

  if (document.querySelector('.added-to-cart')) {
    document.querySelector('.added-to-cart').classList.add('is-visible');
  }
}

function hideToCartPopup() {
  this.closest('.added-to-cart').classList.remove('is-visible');
}

addEvent(document, 'click', '.js-added-to-close', hideToCartPopup);
addEvent(document, 'click', '.js-add-to-card', prodClassAdd);
columnReverse('.product-item__row--name', '.product-item__name', '.i-rating', 0);
columnReverse('.product-item__row--price', '.product-item__price', '.product-item__discount-info', 5);
var productsTopContainer = document.querySelector('.product-item__top-main');

if (productsTopContainer) {
  setTimeout(function () {
    new ResponsiveAutoHeight('.product-item__top-main');
  }, 50);
}

function productReviewsSliderInit() {
  var productReviewsSlider = document.querySelectorAll('.js-product-reviews-slider');

  if (productReviewsSlider) {
    productReviewsSlider.forEach(function (el) {
      if (!el.classList.contains('swiper-initialized')) {
        var slider = new Swiper(el, {
          slidesPerView: "auto",
          spaceBetween: 11,
          loop: false,
          speed: 500,
          breakpoints: {
            768: {
              spaceBetween: 23
            }
          }
        });
      }
    });
  }
}

productReviewsSliderInit();

function quickViewReviewsSlider(selector) {
  var quickViewReviewsSlider = document.querySelector(selector);

  if (quickViewReviewsSlider) {
    var quickViewReviews = new Swiper(quickViewReviewsSlider, {
      slidesPerView: "auto",
      spaceBetween: 11,
      loop: false,
      speed: 500,
      breakpoints: {
        768: {
          spaceBetween: 23
        }
      }
    });
  }
}

function scrollToform(evt) {
  evt.preventDefault();

  if (this.closest('.site-popup')) {
    var popup = document.querySelector('.site-popup.is-opened').querySelector('.rewiews-in-popup');
    var indent = 100;

    if (!popup) {
      popup = document.querySelector('.site-popup.is-opened').querySelector('.quick-view');
      indent = 0;
    }

    var form = popup.querySelector('.c-form');
    popup.scrollTo({
      top: form.offsetTop - indent,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo({
      top: document.querySelector('.c-form').offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  }
}

addEvent(document, 'click', '.js-scroll-to-reviewes-form', scrollToform);
var productReviewsOption = document.querySelectorAll('.js-product-reviews-option');
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('js-product-reviews-option')) {
    event.preventDefault();
    event.target.closest('.js-product-reviews-select').classList.toggle('is-opened');
    productReviewsOption.forEach(function (op) {
      op.classList.remove('is-active');
    });
    event.target.classList.add('is-active');
  }
});

function prodTabs(selector) {
  var parentContainer = document.querySelectorAll(selector);
  parentContainer.forEach(function (item) {
    var headers = item.querySelectorAll('.js-product-tabs-header');
    var descriptions = item.querySelectorAll('.js-product-tabs-description');
    var titles = item.querySelectorAll('.js-product-tabs-title');
    var bodys = item.querySelectorAll('.js-product-tabs-body');

    if (headers) {
      headers.forEach(function (header) {
        header.addEventListener('click', function () {
          var indx = header.dataset.tab_index;
          header.classList.toggle('is-active');
          descriptions.forEach(function (description) {
            if (description.dataset.tab_index === indx) {
              description.classList.toggle('is-hidden');
            }
          });
        });
      });
    }

    if (titles) {
      titles.forEach(function (header) {
        header.addEventListener('click', function () {
          var indx = header.dataset.tab_index;
          var isDesktopMedia = window.matchMedia('(min-width: 992px)').matches;

          if (isDesktopMedia) {
            titles.forEach(function (t) {
              return t.classList.remove('is-active');
            });
            header.classList.add('is-active');
          } else {
            header.classList.toggle('is-active');
          }

          bodys.forEach(function (body) {
            if (isDesktopMedia) {
              body.classList.remove('is-opened');

              if (body.dataset.tab_index === indx) {
                body.classList.add('is-opened');
              }
            } else {
              if (body.dataset.tab_index === indx) {
                body.classList.toggle('is-opened');
              }
            }
          });
        });
      });
    }
  });
}

prodTabs('.product-tabs');

function columnReverse(parent, selector1, selector2, indent) {
  var rows = document.querySelectorAll(parent);
  rows.forEach(function (row) {
    var coll1 = row.querySelector(selector1);
    var coll2 = row.querySelector(selector2);

    function setClass() {
      setTimeout(function () {
        if (coll2 != null) {
          if (coll1.offsetWidth + indent + coll2.offsetWidth > row.offsetWidth) {
            row.classList.add('column-reverse');
          } else {
            row.classList.remove('column-reverse');
          }
        }
      }, 100);
    }

    setClass();
    window.addEventListener('resize', setClass);
  });
}

columnReverse('.product-thumb__price', '.product-thumb__price-current', '.product-thumb__discount-and-old-price', 15);
var rangeSliders = document.querySelectorAll('.js-range');
rangeSliders.forEach(function (slider, index) {
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

function slctToggle(e) {
  if (!e.target.parentElement.className.includes('m-question')) {
    this.closest('.js-item-parent').classList.toggle('is-opened');
  }
}

function showMore(e) {
  e.preventDefault();
  var repText = this.dataset.text;
  var iText = this.querySelector('.js-text').innerHTML;
  this.closest('.has-hidden-items').classList.toggle('show-hiddens');
  this.querySelector('.js-text').innerHTML = repText;
  this.dataset.text = iText;
}

addEvent(document, 'click', '.js-item-title', slctToggle);
addEvent(document, 'click', '.js-show-more', showMore);
var selection = document.querySelector('.selections');

if (selection) {
  selection.addEventListener('click', function (e) {
    if (e.target.closest('.selections__item-body, .selections__item-button.reset')) return;
    selection.classList.remove('is-opened');
    setTimeout(function () {
      enableHtmlScroll();
    }, 300);
    selection.querySelector('.selections__item.is-opened').classList.remove('is-opened');
  });
}

;

function shopNavs() {
  var shopNav = document.querySelectorAll('.header .shop-nav__item');

  function showNav(e) {
    if (e.target.closest('.shop-nav__item-dropdown')) return;
    shopNav.forEach(function (e) {
      e.classList.remove('is-opened');
    });
    this.classList.toggle('is-opened');
  }

  ;

  function closeNav() {
    this.closest('.shop-nav__item').classList.remove('is-opened');
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.shop-nav__item')) return;
    shopNav.forEach(function (e) {
      e.classList.remove('is-opened');
    });
  });
  addEvent(document, 'click', '.header .shop-nav__item', showNav);
  addEvent(document, 'click', '.header .shop-nav__item-dropdown-close', closeNav);
}

shopNavs();

function showBy() {
  var selectBox = document.querySelectorAll('.show-by');

  if (selectBox) {
    selectBox.forEach(function (selectBox) {
      var select = selectBox.querySelector('select');
      select.addEventListener('change', function (e) {
        this.closest('.show-by').querySelector('.js-vsb').innerText = this.options[this.selectedIndex].value; // number.innerText = this.options[this.selectedIndex].value
      });
    });
  }
}

showBy();

function sortingToggle() {
  var sortingItems = document.querySelectorAll('.sorting__item');
  sortingItems.forEach(function (item) {
    item.addEventListener('click', function () {
      event.preventDefault();
      sortingItems.forEach(function (item) {
        item.classList.remove('is-active');
      });
      this.classList.add('is-active');
    });
  });
}

;
sortingToggle();
var spots = document.querySelectorAll('.js-spot');
document.addEventListener('click', function (event) {
  if (event.target.closest('.js-spot')) {
    return;
  }

  if (spots) {
    spots.forEach(function (sp) {
      return sp.classList.remove('is-visible');
    });
  }
});

if (spots) {
  spots.forEach(function (spot) {
    spot.addEventListener('click', function () {
      spots.forEach(function (sp) {
        return sp.classList.remove('is-visible');
      });
      spot.classList.add('is-visible');
    });
  });
}

function viewSwitcherToggle() {
  if (this.classList.contains('view-switcher')) {
    this.classList.toggle('is-active');
    document.querySelector('.toggle-switch--view').classList.toggle('is-visible');

    if (document.querySelector('.toggle-switch--view').classList.contains('is-visible')) {
      setTimeout(function () {
        document.querySelector('.toggle-switch--view').classList.add('opacity-in');
      });
    } else {
      document.querySelector('.toggle-switch--view').classList.remove('opacity-in');
    }
  } else {
    var cls = this.dataset.view;

    if (cls == 'details') {
      document.querySelector('.view-switcher').classList.add(cls);
      document.querySelector('.js-catalog').classList.remove('tile-view');
    } else {
      document.querySelector('.view-switcher').classList.remove('details');
      document.querySelector('.js-catalog').classList.add('tile-view');
    }
  }

  columnReverse('.product-item__row--name', '.product-item__name', '.i-rating', 0);
  columnReverse('.product-item__row--price', '.product-item__price', '.product-item__discount-info', 5);
  columnReverse('.product-item__row--name', '.product-item__name', '.i-rating', 0);
  columnReverse('.product-item__row--price', '.product-item__price', '.product-item__discount-info', 5);
  setTimeout(function () {
    new ResponsiveAutoHeight('.js-catalog .product-item__top-main');
  }, 100);
}

addEvent(document, 'click', '.js-switcher', viewSwitcherToggle);
window.addEventListener('resize', setViewportProperty);
setViewportProperty(); // Call the fuction for initialisation
// });