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
  });
  $('input[type="tel"]').mask("+7(999) 999-99-99");
  var hHeight = $('.header__in').height();
  var hFlag = 1;
  $(document).on('scroll', function () {
    if ($(document).scrollTop() > 300 && hFlag == 1) {
      $('.header').addClass('doc-scrolled');
      setTimeout(function () {
        $('.header').css({
          'padding-top': $('.header__in').height()
        });
      });
      hFlag = 2;
    } else if ($(document).scrollTop() <= 300 && hFlag == 2) {
      $('.header').removeClass('doc-scrolled');
      setTimeout(function () {
        $('.header').css({
          'padding-top': hHeight
        });
      });
      hFlag = 1;
    }
  }).trigger('scroll');
  $('.header').css({
    'padding-top': $('.header__in').height()
  });
  $(window).on('resize', function () {
    setTimeout(function () {
      $('.header').css({
        'padding-top': $('.header__in').height()
      });
    });

    if ($(window).width() >= 992) {
      enableHtmlScroll();
      $('.mobile-sidebar').removeClass('opened');
    }
  }).trigger('resize');

  if ($(window).width() <= 1200) {
    $('.advantages__item-title').equalHeightResponsive();
    $('.advantages__item-title').equalHeightResponsive('refresh');
  }

  $('.swiper-parent').each(function (i, el) {
    var slidercontainer = el.querySelector('.js-articles-slider');
    var slider = new Swiper(el.querySelector('.js-articles-slider'), {
      slidesPerView: "auto",
      loop: false,
      freeMode: true,
      spaceBetween: 15,
      scrollbar: {
        el: el.querySelector('.swiper-scrollbar'),
        hide: false,
        draggable: true
      },
      breakpoints: {
        0: {
          spaceBetween: 15
        },
        575: {
          spaceBetween: 20,
          slidesPerView: 'auto'
        },
        992: {
          spaceBetween: 20,
          slidesPerView: 3
        },
        1200: {
          spaceBetween: 30,
          slidesPerView: 4
        }
      }
    });
  });
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
      $('.header__in').css({
        'padding-right': 17
      });
    }
  }

  function removeGutter() {
    if (!isMobile) {
      $(document.documentElement).css({
        'padding-right': 0
      });
      $('.header__in').css({
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

  var cVideo = document.querySelectorAll(".c-video");
  cVideo.forEach(function (elem) {
    var video = elem.querySelector('video');
    video.addEventListener('click', function () {
      if (video.paused) {
        elem.classList.add('play-on');
      } else {
        elem.classList.remove('play-on');
      }
    });
  });
  $('.js-calc-moodel-select').on('click', function (event) {
    $('.js-calc-moodel-select').not(this).removeClass('is-opened');
    $(this).toggleClass('is-opened');
  });
  $(document).on('click', function (event) {
    if ($(event.target).closest('.calc-model__renderer').length) {
      return;
    }

    $('.js-calc-moodel-select').removeClass('is-opened');
  });
  $('.js-calc-moodel-select').each(function () {
    var $select = $(this);
    var $options = $select.find('.calc-model__item');
    var $renderer = $select.find('.calc-model__renderer-title');
    $options.on('click', function () {
      $options.removeClass('is-active');
      $(this).addClass('is-active');
      $renderer.html($(this).text());
    });
  });
  var tableCalc = document.querySelector('.calculator-table');

  if (tableCalc) {
    var calcRows = document.querySelectorAll('.calculator-table__item');
    var calcCols = document.querySelectorAll('.calculator-table__item-col');
    var caclTitles = tableCalc.querySelectorAll('.calculator-table__item-name');
    var tFlag = 1;
    var clonedTitles = [];

    function ttlAdd() {
      if (window.innerWidth <= 1000 && tFlag == 1) {
        caclTitles.forEach(function (title, index) {
          var parnt = title.closest('.calculator-table__container');
          var iTop = title.getBoundingClientRect().top - parnt.getBoundingClientRect().top;
          var iLeft = title.offsetLeft;
          var iwidth = title.getBoundingClientRect().width + 10;
          var iheight = title.getBoundingClientRect().height;

          if (!clone) {
            var clone = title.cloneNode(true);
            clone.style.top = iTop + 'px';
            clone.style.left = iLeft + 'px';
            clone.style.minHeight = iheight + 'px';
            clone.style.width = iwidth + 'px';

            if (index == 0) {
              clone.classList.add('title-head');
              clonedTitles.push(clone);
            }

            clone.classList.add('cloned-title');
            parnt.closest('.calculator-table__container-wrap').appendChild(clone);
          }
        });
        tFlag = 2;
      } else if (window.innerWidth > 1000 && tFlag == 2) {
        var titles = document.querySelectorAll('.cloned-title');
        titles.forEach(function (title) {
          title.remove();
        });
        tFlag = 1;
      }
    }

    ttlAdd();
    window.addEventListener('resize', ttlAdd);
    calcCols.forEach(function (col) {
      col.addEventListener('mouseleave', function () {
        var index = _toConsumableArray(col.parentNode.children).indexOf(col) - 1;
        calcRows.forEach(function (items) {
          var item = items.querySelectorAll('.calculator-table__item-col');
          item[index].classList.remove('hover');
        });
      });
      col.addEventListener('mouseover', function () {
        var index = _toConsumableArray(col.parentNode.children).indexOf(col) - 1;
        calcCols.forEach(function (active) {
          active.classList.remove('hover');
        });
        calcRows.forEach(function (items) {
          var item = items.querySelectorAll('.calculator-table__item-col');
          item[index].classList.add('hover');
        });
      });
      col.addEventListener('click', function () {
        var index = _toConsumableArray(col.parentNode.children).indexOf(col) - 1;
        calcCols.forEach(function (active) {
          active.classList.remove('checked');
        });
        calcRows.forEach(function (items) {
          var item = items.querySelectorAll('.calculator-table__item-col');
          item[index].classList.add('checked');
        });
      });
    });
  }

  $('.js-cars-item').on('click', function (event) {
    $('.js-cars-item').removeClass('is-opened');
    $(this).addClass('is-opened');
  });
  $(document).on('click', function (event) {
    if ($(event.target).closest('.cars__item').length) {
      return;
    }

    if ($('.js-cars-item.is-opened').length) {
      $('.js-cars-item').removeClass('is-opened');
    }
  });

  if ($('.js-case-gallery-slider').length) {
    var slider = new Swiper('.js-case-gallery-slider', {
      slidesPerView: "auto",
      loop: false,
      freeMode: true,
      spaceBetween: 10,
      scrollbar: {
        el: '.case-gallery .swiper-scrollbar',
        hide: false
      },
      breakpoints: {
        0: {
          spaceBetween: 10
        },
        992: {
          spaceBetween: 26,
          slidesPerView: "auto"
        }
      }
    });
  }

  if ($('.js-case-table').length) {
    new SimpleBar(document.querySelector('.js-case-table'), {
      autoHide: false,
      wrapContent: true
    });
  }

  var servicesItems = document.querySelectorAll('.js-service-item');
  servicesItems.forEach(function (service) {
    service.addEventListener('click', function () {
      this.closest('.choice-services__item').classList.toggle('selected');
    });
  });
  $('select[data-index="1"]').on('change', function () {
    $('select[data-index="2"]').removeAttr('disabled');
    $('select[data-index="2"]').closest('.i-select').removeClass('disabled');
  });
  $('select[data-index="2"]').on('change', function () {
    $('select[data-index="3"]').removeAttr('disabled');
    $('select[data-index="3"]').closest('.i-select').removeClass('disabled');
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
    var poster = '//img.youtube.com/vi/' + videoId + '/sddefault.jpg';

    if (!$this.find('img').length) {
      $this.append('<img width="541" height="432" src="' + poster + '" alt="">');
    } else if ($this.find('img').attr('src') == '') {
      $this.find('img').attr('src', poster);
    }
  });
  $('.i-video').on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this),
        videoId = $this.attr('href'),
        videoId = youtube_parser(videoId);

    if (!$('.video-popup').length) {
      var vidoePopup = " <div class=\"video-popup is-visible\">\n\n                                  <div class=\"video-popup__close\">\n\n                                    <span class=\"svg-icon svg-icon--close-croos\" aria-hidden=\"true\">\n\n                                      <svg class=\"svg-icon__link\">\n\n                                        <use xlink:href=\"#close-croos\"></use>\n\n                                      </svg>\n\n                                    </span>\n\n                                  </div>\n\n                                  <div class=\"video-popup__container\">\n\n                                      <div class=\"video-popup__content\">\n\n                                      </div>\n\n                                  </div>\n\n                              </div>";
      $('body').append(vidoePopup);
    }

    if ($('.video-popup iframe').length) {
      $('.video-popup__content iframe').attr('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    } else {
      $('.video-popup__content').append('<iframe width="1270" height="720" frameborder="0" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    }

    $('.video-popup').addClass('is-visible');
    disableHtmlScroll();
    addGutter();
  }); // js-intro-slider

  var introSlider = new Swiper(".js-intro-slider", {
    // lazy: true,
    effect: "fade",
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: ".intro .swiper-button-next",
      prevEl: ".intro .swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  }); // btnZoomIn.addEventListener('click', function(){
  //     map.setZoom(map.getZoom() + 1);
  // });
  // btnZoomOut.addEventListener('click', function(){
  //     map.setZoom(map.getZoom() - 1);
  // });

  $('.main-menu li').each(function () {
    if ($(this).find('ul').length) {
      $(this).addClass('has-child');
    }
  });
  $('.main-menu li').on('click', function (event) {
    $('.main-menu li').removeClass('is-opened');

    if ($(this).find('ul').length && isMobile) {
      event.preventDefault();
      $(this).toggleClass('is-opened');
      $('.main-menu').append($(this).find('.level-2').addClass('lvl2-opened'));
    }
  });
  $('.level-2-close').on('click', function () {
    $('.main-menu li.is-opened').append($(this).closest('.level-2').removeClass('lvl2-opened'));
    $('.main-menu li.is-opened').removeClass('is-opened');
  }); // $('.level-2-close').on('click', function(){
  //     var $this = $(this);
  //     setTimeout(function(){
  //         $this.closest('li.is-opened').removeClass('is-opened')
  //     })
  // });

  $('.js-menu').on('click', function () {
    $('.mobile-sidebar').toggleClass('opened');

    if ($('.mobile-sidebar').hasClass('opened')) {
      disableHtmlScroll();
    } else {
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

  $('.mobile-sidebar').on('click tap', function (event) {
    if ($(event.target).closest('.mobile-sidebar__container').length) return;
    $('.mobile-sidebar').removeClass('opened');
    enableHtmlScroll();
  });
  var delay = 0;
  $('.mobile-sidebar .db-menu ul li').each(function (i) {
    if (i == 0) {
      $(this).css({
        animationDelay: '0s'
      });
    } else {
      $(this).css({
        animationDelay: '.' + delay + 's'
      });
    }

    delay += 100;
  });
  $('.mobile-sidebar__content >*').each(function () {
    if (!$(this).hasClass('db-menu')) {
      $(this).css({
        animationDelay: '.' + delay + 's'
      });
      delay += 100;
    }
  });
  var mostPopularSlider = $('.js-most-popular-slider');

  if (mostPopularSlider.length) {
    mostPopularSlider = new Swiper(".js-most-popular-slider", {
      slidesPerView: "auto",
      loop: false,
      freeMode: true,
      scrollbar: {
        el: ".js-most-popular-slider .swiper-scrollbar",
        hide: false
      }
    });
  }

  if ($('.js-our-works-slider').length) {
    var ourWorksSlider = new Swiper(".js-our-works-slider", {
      slidesPerView: "auto",
      loop: false,
      navigation: {
        nextEl: ".js-our-works-slider .swiper-button-next",
        prevEl: ".js-our-works-slider .swiper-button-prev"
      }
    });
  }

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
          href: theme_uri + "/img/location-icon.svg",
          size: [49, 59],
          offset: [-25, -59]
        }
      };
      var cMap = new ymaps.Map(el, {
        center: cMapOptions.center,
        zoom: cMapOptions.zoom,
        controls: []
      }),
          ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map-zoom-buttons'>" + "<div id='zoom-in' class='btn pluse'></div>" + "<div id='zoom-out' class='btn minus'></div>" + "</div>", {
        build: function build() {
          ZoomLayout.superclass.build.call(this);
          this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
          this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
          $('#zoom-in').bind('click', this.zoomInCallback);
          $('#zoom-out').bind('click', this.zoomOutCallback);
        },
        clear: function clear() {
          $('#zoom-in').unbind('click', this.zoomInCallback);
          $('#zoom-out').unbind('click', this.zoomOutCallback);
          ZoomLayout.superclass.clear.call(this);
        },
        zoomIn: function zoomIn() {
          var map = this.getData().control.getMap();
          map.setZoom(map.getZoom() + 1, {
            checkZoomRange: true
          });
        },
        zoomOut: function zoomOut() {
          var map = this.getData().control.getMap();
          map.setZoom(map.getZoom() - 1, {
            checkZoomRange: true
          });
        }
      }),
          zoomControl = new ymaps.control.ZoomControl({
        options: {
          layout: ZoomLayout
        }
      });
      cMap.controls.add(zoomControl);
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
      cMap.behaviors.disable('scrollZoom');
    });
  };

  if ($('.js-stories-slider').length) {
    var autoplay = {
      delay: 3000,
      disableOnInteraction: false
    };
    var ourWorksSlider = null;

    function initOurWorksSlider(index) {
      ourWorksSlider = new Swiper(".js-stories-slider", {
        slidesPerView: 1.1,
        centeredSlides: true,
        loop: false,
        initialSlide: index,
        spaceBetween: 10,
        speed: 1000,
        pagination: {
          el: ".swiper-history-pagination",
          clickable: true
        },
        autoplay: autoplay,
        breakpoints: {
          768: {
            slidesPerView: 1.3
          },
          950: {
            slidesPerView: 1.4
          },
          1150: {
            slidesPerView: 1.5
          },
          1430: {
            slidesPerView: 1.6
          },
          1600: {
            slidesPerView: 1.6
          },
          1800: {
            slidesPerView: 1.65
          },
          3800: {
            slidesPerView: 1.85
          }
        }
      });
    }

    $('.most-popular__item-in').on('click', function (event) {
      var index = $(this).data('index');

      if (!ourWorksSlider) {
        initOurWorksSlider(index);
        ourWorksSlider.autoplay.stop();
        setTimeout(ourWorksSlider.autoplay.start, 1000);
      } else {
        ourWorksSlider.slideTo(index);
        ourWorksSlider.autoplay.stop();
        setTimeout(ourWorksSlider.autoplay.start, 1000);
      }
    });
    $('.js-stop-history-slider').on('click', function () {
      ourWorksSlider.autoplay.stop();
    });
  }

  $('.b-modal .swiper-history-pagination').on('click', function (event) {
    event.stopPropagation();
  });
  $(document).on('click', '.video-popup', function (event) {
    if (event.target.closest('.video-popup__content')) return;
    var videoContainer = document.querySelector('.video-popup__content');
    stopVideo(videoContainer);
    enableHtmlScroll();
    removeGutter();
    $(document).find('.video-popup').removeClass('is-visible');
  });

  var stopVideo = function stopVideo(element) {
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

  $(document).on('keydown', function (evt) {
    if (evt.keyCode == 27) {
      var videoContainer = document.querySelector('.video-popup__content');
      stopVideo(videoContainer);
      $(document).find('.video-popup').removeClass('is-visible');
      enableHtmlScroll();
      removeGutter();
    }
  });
});