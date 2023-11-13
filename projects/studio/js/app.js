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
  $(window).on('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    enableHtmlScroll();
  });
  $(document).on('scroll', function () {
    if ($(document).scrollTop() >= 700) {
      $('.header__fixed').addClass('visible');
    } else {
      $('.header__fixed').removeClass('visible');
    }

    if ($('.intro').length) {
      if ($(document).scrollTop() > $('.intro__content').offset().top - $('.header__content').height() + 50) {
        $('.header__menu').addClass('white');
      } else {
        $('.header__menu').removeClass('white');
      }
    } else if ($('.intro-in').length) {
      if ($(document).scrollTop() > $('.intro-in__text').offset().top - $('.header__content').height() - 20) {
        $('.header__menu').addClass('white');
      } else {
        $('.header__menu').removeClass('white');
      }
    }
  });
  $('.address__map-btn--fullscreen').on('click', function () {
    $('.address__map').toggleClass('fullscreen');
  });
  var googleMaps = $('.c-map');

  var waitGoogleMaps = function waitGoogleMaps() {
    if (typeof google !== "undefined") {
      googleMaps.ready(initMap);
    } else {
      setTimeout(waitGoogleMaps, 150);
    }
  };

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  }

  function scrollMapController() {
    if (isElementInViewport(googleMaps[0])) {
      var mapScript = document.createElement('script');
      mapScript.setAttribute('src', site_defers.map);
      mapScript.setAttribute('async', true);

      mapScript.onload = function () {
        waitGoogleMaps();
      };

      document.head.appendChild(mapScript);
      window.removeEventListener('scroll', scrollMapController);
    }
  }

  if (googleMaps.length > 0) {
    window.addEventListener('scroll', scrollMapController);
    scrollMapController();
  }

  function initMap() {
    var elementsParent = $('.locations');
    var elements = $('.js-location');
    var markersArr = [];
    var map;
    var btnZoomIn = document.querySelector('.address__map-btn.btn-plus');
    var btnZoomOut = document.querySelector('.address__map-btn.btn-minus');
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 55.76756326414851,
        lng: 37.56636777425447
      },
      zoom: 10,
      disableDefaultUI: true,
      styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e9e9e9"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dedede"
        }, {
          "lightness": 21
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#333333"
        }, {
          "lightness": 40
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }, {
          "color": "#000"
        }, {
          "lightness": 60
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f2f2f2"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }]
    });
    var popupContent = '<p class="content">Что угодно</p>';
    var iconDefaultUrl = 'img/map-marker.svg';
    var iconDefault = {
      url: iconDefaultUrl,
      scaledSize: new google.maps.Size(37, 46)
    };
    elements.each(function () {
      var lat = parseFloat(this.dataset.lat);
      var lng = parseFloat(this.dataset.lng);
      var iconUrl = this.dataset.icon;
      var iconCustomized = {
        url: iconUrl,
        scaledSize: new google.maps.Size(37, 46)
      };
      var popupId = this.dataset.id;
      var marker = new google.maps.Marker({
        id: popupId,
        position: {
          lat: lat,
          lng: lng
        },
        map: map,
        icon: iconUrl ? iconCustomized : iconDefault
      });
      markersArr.push(marker);
      marker.addListener('click', function () {
        elementsParent.addClass('is-opened').removeAttr('style');
        elements.removeClass('is-opened');
        elements.filter('[data-id="' + marker.id + '"]').addClass('is-opened');
        map.setCenter(marker.getPosition());
        map.setZoom(11);
      });
    });
    btnZoomIn.addEventListener('click', function () {
      map.setZoom(map.getZoom() + 1);
    });
    btnZoomOut.addEventListener('click', function () {
      map.setZoom(map.getZoom() - 1);
    });
    $('.contacts__address-icon').on('click', function (evt) {
      evt.preventDefault();
      var locationId = $(this).closest('.contacts__address').index();
      var marker = markersArr[locationId];
      map.setCenter(marker.getPosition());
      map.setZoom(11);
      elementsParent.addClass('is-opened');
      $('.js-location').removeClass('is-opened');
      $('.js-location').filter('[data-id="' + marker.id + '"]').addClass('is-opened');
    });
  }

  ;
  $(document).on('keydown', function (evt) {
    if (evt.keyCode == 27) {
      $('.locations').removeClass('is-opened');
      $('.location').removeClass('is-opened');
    }
  });
  $(document).on('click', function (e) {
    if ($(e.target).closest('.location, .address__map-in, .contacts__address-icon').length) {
      return;
    }

    $('.locations').removeClass('is-opened');
    $('.location').removeClass('is-opened');
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
        $('.b-modal').filter('[data-modal=' + url + ']').addClass('opened').removeAttr('style');
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
        $('.header__fixed').css({
          'padding-right': 17
        });
      }
    }

    function removeGutter() {
      if (!isMobile) {
        $(document.documentElement).css({
          'padding-right': 0
        });
        $('.header__fixed').css({
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

  function formatState(state) {
    if (!state.id) {
      return state.text;
    }

    var baseUrl = "files";
    var $state = $('<span class="it-wr"><span class="it-icon"><img src="' + baseUrl + '/' + state.element.getAttribute('data-imgname').toLowerCase() + '.png" /></span>' + state.text + '</span>');
    return $state;
  }

  $('.filter .js-select-brand').select2({
    minimumResultsForSearch: -1,
    templateSelection: formatState,
    templateResult: formatState
  });
  $('.filter .js-select').select2({
    minimumResultsForSearch: -1
  });
  $('.js-select-brand').on('change', function () {
    $('.js-select-model').removeAttr('disabled');
  });
  $('.js-select-model').on('change', function () {
    $('.js-select-modification').removeAttr('disabled');
  });
  setTimeout(function () {
    var introVideo = document.querySelector('.js-intro-video');

    if (introVideo) {
      introVideo.src = introVideo.querySelector('source').dataset.src;
      introVideo.addEventListener('loadeddata', function () {
        document.querySelector('.js-preloader').classList.add('is-hidden');
        introVideo.classList.add('is-visible');
        introVideo.play();
      }, false);
    }
  }, 200);

  if (isSafari) {
    $('.js-file-extension').each(function () {
      var srcset = $(this).attr('srcset');
      var src = $(this).attr('src');

      if (srcset) {
        $(this).attr('srcset', srcset.replace(/webp/gi, 'jpg'));
      }

      $(this).attr('src', src.replace(/webp/gi, 'jpg'));
    });
  }

  $('.js-list-carousel').each(function () {
    var cslider = this;
    var catalogSlider = new Swiper(cslider, {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      speed: 400,
      spaceBetween: 33,
      slidesPerView: 2,
      slideActiveClass: 'is-active',
      freeMode: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 17
        },
        375: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 33
        },
        575: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 33
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 2,
          spaceBetween: 33
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 3,
          spaceBetween: 43
        }
      }
    });
  });
  var catalogSlider2 = new Swiper(".js-list-carousel2", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
      draggable: true
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    spaceBetween: 33,
    slidesPerView: 2,
    slideActiveClass: 'is-active',
    freeMode: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 17
      },
      375: {
        slidesPerView: 1,
        spaceBetween: 33
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 33
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 33
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 44
      },
      1366: {
        slidesPerView: 3,
        spaceBetween: 65
      }
    }
  });
  $('.js-list-carousel4').each(function () {
    var slider = this;
    var catalogSlider4 = new Swiper(slider, {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      spaceBetween: 20,
      slidesPerView: 2,
      slideActiveClass: 'is-active',
      freeMode: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        360: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        660: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        1921: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      }
    });
  });

  if ($('.js-list-carousel3').length) {
    var initSwiper = function initSwiper() {
      var screenWidth = $(window).width();

      if (screenWidth < 992 && catalogSlider3 == undefined) {
        if (typeof mySwiper === "undefined") {
          catalogSlider3 = new Swiper(".js-list-carousel3", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
            scrollbar: {
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            },
            spaceBetween: 20,
            slidesPerView: 2,
            slideActiveClass: 'is-active',
            freeMode: false,
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              360: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              575: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 37
              }
            }
          });
        }
      } else if (screenWidth > 991 && catalogSlider3 != undefined) {
        catalogSlider3.destroy();
        catalogSlider3 = undefined;
        jQuery('.swiper-wrapper').removeAttr('style');
        jQuery('.swiper-slide').removeAttr('style');
      }
    }; //Swiper plugin initialization


    var catalogSlider3 = undefined;
    initSwiper(); //Swiper plugin initialization on window resize

    $(window).on('resize', function () {
      initSwiper();
    });
  }

  $('.location__close').on('click', function () {
    $(this).closest('.location').removeClass('is-opened');
    $('.locations').removeClass('is-opened');
  });
  $('.main-menu li, .header__menu li').each(function () {
    if ($(this).children('ul').length) {
      $(this).addClass('has-child'); // $(this).find('>a').append('<span class="m-tgl"><span class="svg-icon svg-icon--arr-d" aria-hidden="true"><svg class="svg-icon__link"><use xlink:href="#arr-d"></use></svg></span></span>')
    }
  });
  $('.m-tgl').on('click', function (evt) {
    evt.preventDefault();
    $(this).closest('li').toggleClass('is-opened').find('>ul').stop().slideToggle(200);
  });
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
  }); // (function(window) {
  //   'use strict';
  //   function enableScrollBehaviorPolyfill() {
  //     window.removeEventListener('scroll', enableScrollBehaviorPolyfill);
  //     if (! 'scrollBehavior' in document.documentElement.style) {
  //       let script = document.createElement('script');
  //       script.setAttribute('async', true);
  //       script.setAttribute('src', site_defers.smoothscroll);
  //       document.body.appendChild(script);
  //     }
  //   }
  //   window.addEventListener('scroll', enableScrollBehaviorPolyfill);
  //   let btn = document.getElementById('back_to');
  //   let classes = {
  //     visible: 'page-scroller--visible',
  //     inMemory: 'page-scroller--in-memory',
  //   }
  //   let tmpY = 0;
  //   let viewY = 100;
  //   let inMemory = false;
  //   /**
  //    * Native scrollTo with callback
  //    * @param offset - offset to scroll to
  //    * @param callback - callback function
  //    */
  //   function scrollTo(offset, callback) {
  //     const fixedOffset = offset.toFixed();
  //     const onScroll = function () {
  //       if (window.pageYOffset.toFixed() === fixedOffset) {
  //         window.removeEventListener('scroll', onScroll);
  //         callback();
  //       }
  //     }
  //     window.addEventListener('scroll', onScroll);
  //     onScroll();
  //     window.scrollTo({
  //       top: offset,
  //       behavior: 'smooth'
  //     });
  //   }
  //   function resetScroll() {
  //     setTimeout(() => {
  //       if (window.pageYOffset > viewY) {
  //         btn.classList.add(classes.visible);
  //       } else if (!btn.classList.contains(classes.inMemory)) {
  //         btn.classList.remove(classes.visible);
  //       }
  //     }, 100);
  //     if (!inMemory) {
  //       tmpY = 0;
  //       btn.classList.remove(classes.inMemory);
  //     }
  //     inMemory = false;
  //   }
  //   function addResetScroll() {
  //     window.addEventListener('scroll', resetScroll);
  //   }
  //   function removeResetScroll() {
  //     window.removeEventListener('scroll', resetScroll);
  //   }
  //   addResetScroll();
  //   let onClick = function() {
  //     removeResetScroll();
  //     if (window.pageYOffset > 0 && tmpY === 0) {
  //       inMemory = true;
  //       tmpY = window.pageYOffset;
  //       btn.classList.add(classes.inMemory);
  //       scrollTo(0, () => {
  //         addResetScroll();
  //       });
  //     } else {
  //       btn.classList.remove(classes.inMemory);
  //       scrollTo(tmpY, () => {
  //         tmpY = 0;
  //         addResetScroll();
  //       });
  //     }
  //   };
  //   btn.addEventListener('click', onClick);
  // })(window);

  $('div>table').wrap('<div class="table-wrapper">');
  $('.swiper-parent').each(function () {
    $(this).find('.swiper-scrollbar').appendTo($(this));

    if ($(this).closest('.list-block').find('.has-arrows').length) {
      $(this).closest('.list-block').find('.has-arrows').append($(this).find('.swiper-button-wrapper'));
    } else {
      $(this).find('.swiper-button').appendTo($(this));
    }
  });

  function tooltip() {
    var tltp;
    var drpd;
    $('.tooltip').on({
      mouseenter: function mouseenter() {
        tltp = $(this);
        drpd = tltp.find('.tooltip__dropdown');
        drpd.appendTo('body').css({
          'left': tltp.offset().left,
          'top': tltp.offset().top,
          'opacity': 1,
          'display': 'block'
        });
      },
      mouseleave: function mouseleave() {
        drpd.removeAttr('style').appendTo(tltp);
      }
    });
  }

  ;
  tooltip();
});