"use strict";

var siteHeader = document.querySelector('.header');
var inroMain = document.querySelector('.intro-main');
var inroIn = document.querySelector('.intro-in');
var cfwImage = document.querySelector('.cfw-image');

if (siteHeader) {
  siteHeader.classList.add('animated');
}

if (inroMain) {
  inroMain.classList.add('animated');
}

if (cfwImage) {
  cfwImage.classList.add('animated');
}

if (inroIn) {
  setTimeout(function () {
    inroIn.classList.add('animated');
  }, 50);
}

function headerActions() {
  var scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  var burger = document.querySelector('.js-menu');
  var header = document.querySelector('.header');

  function disableHtmlScroll() {
    var isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    document.documentElement.style.paddingRight = scrollBarWidth + 'px';

    if (header.classList.contains('fixed')) {
      document.querySelector('.header__box').style.paddingRight = scrollBarWidth + 'px';
      document.querySelector('.header__container-in-line').style.marginLeft - scrollBarWidth / 2 + 'px';
      document.querySelector('.header__container-in0').style.paddingRight = scrollBarWidth + 'px';
    }

    if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
    }
  }

  function enableHtmlScroll() {
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
    document.querySelector('.header__box').style.paddingRight = 0;
    document.querySelector('.header__container-in-line').style.marginLeft = 0;
    document.querySelector('.header__container-in0').style.paddingRight = 0;
    document.documentElement.style.paddingRight = 0;
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('.js-menu, .header__container-in1')) return;
    burger.classList.remove('is-active');
    header.classList.remove('menu-opened');
    enableHtmlScroll();
  });

  function headerHeight() {
    if (document.querySelector('.simple-header')) {
      header.style.minHeight = document.querySelector('.header__box').innerHeight + 'px';
      header.classList.add('absolute');
    }
  }

  function headerMenuWidth() {
    if (document.querySelector('.header__box').clientHeight + document.querySelector('.header__container-in1').clientHeight > window.innerHeight) {
      document.querySelector('.header__container-in').style.paddingLeft = 40 + scrollBarWidth + 'px';
    } else {
      document.querySelector('.header__container-in').removeAttribute('style');
    }
  }

  headerHeight();
  var headerFlag = 1;

  function headerAddClass() {
    var scrollIndent = 500;

    if (document.querySelector('.simple-header')) {
      scrollIndent = 300;
    }

    if (window.pageYOffset >= scrollIndent && headerFlag == 1) {
      header.classList.add('abs');
      setTimeout(function () {
        header.classList.add('fixed');
        header.classList.remove('abs');
      }, 100);
      headerFlag = 2;
    } else if (window.pageYOffset < scrollIndent && headerFlag == 2) {
      header.classList.add('abs');
      setTimeout(function () {
        header.classList.remove('fixed');
        header.classList.remove('abs');
      }, 100);
      headerFlag = 1;
    }
  }

  headerAddClass();
  document.addEventListener('scroll', function () {
    headerAddClass();
  });
  window.addEventListener('resize', function () {
    isApple = /iPod|iPad|iPhone/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (!isMobile) {
      headerMenuWidth();
    }
  });
  burger.addEventListener("click", function () {
    scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    this.classList.toggle('is-active');
    header.classList.toggle('menu-opened');

    if (document.querySelector('.header').classList.contains('menu-opened')) {
      disableHtmlScroll();

      if (document.querySelector('.announcement') && !header.classList.contains('fixed') && window.matchMedia('(max-width: 992px)').matches) {
        document.querySelector('.header .header__container').style.maxHeight = window.innerHeight - (document.querySelector('.announcement').height + document.querySelector('.header__box').height + 'px');
      }
    } else {
      enableHtmlScroll();
      document.querySelector('.header .header__container').removeAttribute('style');
    }

    if (!isMobile) {
      headerMenuWidth();
    }
  });
}

headerActions();

var inViewport = function inViewport(elem) {
  var allElements = document.querySelectorAll(elem);
  var windowHeight = window.innerHeight;

  var elems = function elems() {
    for (var i = 0; i < allElements.length; i++) {
      var viewportOffset = allElements[i].getBoundingClientRect();
      var dataOffset = allElements[i].dataset.offset;

      if (!dataOffset) {
        dataOffset = 150;
      }

      var top = viewportOffset.top + dataOffset;

      if (top < windowHeight) {
        allElements[i].classList.add('animated');
      } else {// allElements[i].classList.remove('animated');
      }
    }
  };

  elems();
  window.addEventListener('scroll', elems);
};

inViewport('.js-sc-container');

if (document.querySelector('.mosaic__button')) {
  document.querySelector('.mosaic__button').addEventListener('click', function () {
    setTimeout(function () {
      inViewport('.js-sc-container');
    }, 100);
  });
}