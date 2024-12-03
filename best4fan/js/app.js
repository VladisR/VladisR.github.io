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
  });
  $('.accordion-item__title').on('click', function () {
    $(this).toggleClass('is-active').closest('.accordion-item').find('.accordion-item__body').stop().slideToggle(200);
  });
  $('.advantages').addClass('animation-start');
  $(document).on('change input', '.bfrSlid', function () {
    var button = $(this).closest('.before-after').find('.before-after__scroll');
    $(this).closest('.before-after').find('.before-after__image').css({
      'width': $(this).val() + "%"
    });

    if (button.length) {
      button.css({
        'left': $(this).val() + "%"
      });
    }

    if ($(this).val() <= 30) {
      $(this).closest('.gallery2__item').addClass('loupe-visible');
    } else {
      $(this).closest('.gallery2__item').removeClass('loupe-visible');
    }
  });
  $('.js-zoom').on('click', function () {
    var $this = $(this);
    var beforeImg = $this.data('before');
    var afterImg = $this.data('after');
    var beforeAfterBox = $('.js-before-after-box');
    var elements = "<div class=\"before-after\">\n\n                          <div class=\"before-after__figure\" style=\"background-image: url(".concat(beforeImg, ")\">\n\n                            <div class=\"before-after__image\">\n\n                              <div class=\"before-after__image-in\" style=\"background-image: url(").concat(afterImg, ")\">\n\n  \n\n                              </div>\n\n                            </div>\n\n                          </div>\n\n                          <div class=\"before-after__scroll\"></div>\n\n                          <input type=\"range\" min=\"0\" max=\"100\" value=\"50\" class=\"bfrSlid\"/>\n\n                      </div>");
    beforeAfterBox.append(elements);
    setTimeout(function () {
      setWidth();
    });
    $(window).on('resize', setWidth);
  });

  function setWidth() {
    $('.before-after__image-in').css({
      'width': $('.remodal .before-after').width()
    });
  }

  function classAdd() {
    if ($('.c-bg').offset().top - $(window).height() - $(document).scrollTop() <= 0) {
      $('.c-bg').addClass('is-visible');
    } else {
      $('.c-bg').removeClass('is-visible');
    }
  }

  var uploadFileStorage = [];
  var uploadFilesReadyForSend = [];
  window.uploadFileStorage = uploadFileStorage;
  window.uploadFilesReadyForSend = uploadFilesReadyForSend;

  function initFileUploader() {
    var $fileUploader = $('.js-file-uploader');
    var $fileInput = $fileUploader.find('input[type="file"]');
    var $items = $fileUploader.find('.file-uploader__items');
    $fileInput.on('change', function () {
      var files = this.files;

      for (var i = 0; i < files.length; i++) {
        (function (file) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var fileData = {
              name: file.name,
              size: (file.size / 1024).toFixed(2),
              // конвертируем размер в килобайты
              type: file.type,
              data: e.target.result,
              file: file,
              lastModified: file.lastModified // добавляем дату последней модификации

            }; // Проверяем, существует ли уже файл с таким же именем и датой последней модификации

            var duplicate = uploadFileStorage.find(function (existingFile) {
              return existingFile && existingFile.name === fileData.name && existingFile.lastModified === fileData.lastModified;
            }); // Если дубликат не найден, добавляем файл

            if (!duplicate) {
              uploadFileStorage.push(fileData);
              renderFileItem(fileData);
            } // Обновляем uploadFilesReadyForSend после добавления файла


            uploadFilesReadyForSend = uploadFileStorage.filter(Boolean).map(function (file) {
              return file.file;
            });
            logFileStorage();
          };

          reader.readAsDataURL(file);
        })(files[i]);
      }

      $fileInput.val(''); // очищаем input после сбора данных
    });

    function renderFileItem(fileData) {
      var template = '<div class="file-uploader__item" data-index="' + (uploadFileStorage.length - 1) + '">' + '<div class="file-uploader__item-title">' + '<a href="#" class="js-delete-file" data-index="' + (uploadFileStorage.length - 1) + '">' + fileData.name + '</a>' + '</div>' + '<div class="file-uploader__item-size">' + fileData.size + ' кб</div>' + '<div class="file-uploader__item-action">' + '<a href="#" aria-label="Удалить" class="js-delete-file" data-index="' + (uploadFileStorage.length - 1) + '">' + '<span class="svg-icon svg-icon--trash" aria-hidden="true">' + '<svg class="svg-icon__link">' + '<use xlink:href="#trash"></use>' + '</svg>' + '</span>' + '</a>' + '</div>' + '</div>';
      $items.append(template);
    }

    $fileUploader.on('click', '.js-delete-file', function (e) {
      e.preventDefault();
      var index = $(this).data('index');
      delete uploadFileStorage[index];
      uploadFilesReadyForSend = uploadFileStorage.filter(Boolean).map(function (file) {
        return file.file;
      });
      $(this).closest('.file-uploader__item').remove();

      if (!uploadFileStorage.length) {
        $items.html('');
      }

      logFileStorage();
    });
  }

  function logFileStorage() {
    console.log('uploadFileStorage : ', uploadFileStorage);
    console.log('uploadFilesReadyForSend : ', uploadFilesReadyForSend);
  }

  if ($('.js-file-uploader').length) {
    initFileUploader();
  }

  $('input[type="tel"]').mask("+7(999) 999-99-99");
  $('.js-gallery').each(function () {
    var $this = $(this);
    var slider = new Swiper($this[0], {
      freeMode: true,
      spaceBetween: 24,
      slidesPerView: "auto",
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false
      },
      breakpoints: {
        992: {
          slidesPerView: "auto",
          spaceBetween: 32
        }
      }
    });
  });
  var lettersGallery = $('.js-zoom-gallery').lightGallery({
    selector: ".swiper-slide a",
    download: false,
    share: false,
    flipHorizontal: false,
    flipVertical: false,
    rotate: false,
    autoPlay: false,
    actualSize: false,
    thumbnail: false
  });
  var swiperPosition;
  var translateX;
  $('.js-gallery2').each(function () {
    var $this = $(this);
    var prev = $this.closest('.gallery2').find('.swiper-button-prev');
    var next = $this.closest('.gallery2').find('.swiper-button-next');
    var slider = new Swiper($this[0], {
      slidesPerView: 1,
      allowTouchMove: false,
      simulateTouch: false,
      navigation: {
        prevEl: prev[0],
        nextEl: next[0]
      },
      breakpoints: {
        0: {
          speed: 300,
          slidesPerView: 1,
          spaceBetween: 16
        },
        575: {
          slidesPerView: 2,
          spaceBetween: 16,
          slidesPerGroup: 2
        },
        768: {
          speed: 700,
          slidesPerView: 3,
          spaceBetween: 16,
          slidesPerGroup: 2
        },
        992: {
          speed: 700,
          slidesPerView: 4,
          spaceBetween: 32,
          slidesPerGroup: 3
        }
      }
    });
  });
  $('[data-img]').each(function () {
    var url = $(this).data('img');
    $(this).css({
      'background-image': 'url(' + url + ')'
    });
  });
  $('.intro').addClass('animation-start loadet');

  function intro() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.intro').css({
        'height': $('.intro__in').innerHeight()
      });
      $('.intro__in').css({
        'top': $('.header__in').height()
      });
    }
  }

  $(document).scroll(function () {
    if ($(document).scrollTop() >= $('.header__in').height() + $('.intro__in').innerHeight()) {
      $('.intro').addClass('hide');
    } else {
      $('.intro').removeClass('hide');
    }

    classAdd();
  });
  intro();
  $(window).on('resize', intro);
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
    $(this).toggleClass('is-active');
    $('.mobile-sidebar').toggleClass('opened');

    if ($('.mobile-sidebar').hasClass('opened')) {
      disableHtmlScroll();
      $('.mobile-sidebar__container').stop().slideDown(250, function () {
        $(this).css({
          'display': 'flex'
        });
      });
    } else {
      enableHtmlScroll();
      $('.mobile-sidebar__container').stop().slideUp(250);
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
    $('.mobile-sidebar__container').slideUp(250);
    $('.js-menu').removeClass('is-active');
    enableHtmlScroll();
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

  function linesHeight() {
    $('.pattern-printing__elements').css({
      'height': $('.pattern-printing__lines').height()
    });
  }

  linesHeight();
  $(window).on('resize', linesHeight);
  $('.remodal--before-after').parent().addClass('remodal-image');
  $('[data-index]').on('click', function (evt) {
    evt.preventDefault();
    var indent = 150;

    if ($(window).width() <= 992) {
      indent = 60;
    }

    var index = $(this).data('index');
    var offset = $('[data-target="' + index + '"]').offset().top - indent;
    $('html, body').scrollTop(offset);
    $('.mobile-sidebar').removeClass('opened');
    $('.mobile-sidebar__container').slideUp(250);
    enableHtmlScroll();
    $('.js-menu').removeClass('is-active');
  });

  if ($('.rellax').length) {
    setTimeout(function () {
      var toggleRelax = function toggleRelax() {
        if (window.matchMedia('(min-width: 992px)').matches) {
          if (relaxDestroyed && typeof rellax !== 'function') {
            rellax.refresh();
            relaxDestroyed = false;
          }
        } else {
          if (!relaxDestroyed && rellax.destroy) {
            rellax.destroy();
            relaxDestroyed = true;
          }
        }
      };

      var rellax = new Rellax('.rellax', {
        center: true,
        vertical: true
      });
      var relaxDestroyed = false;
      toggleRelax();
      $(window).on('resize', toggleRelax);
    }, 0);
  }
});