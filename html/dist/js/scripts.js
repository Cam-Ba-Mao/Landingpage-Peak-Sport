"use strict";

var $ = jQuery.noConflict();
// Global functions
var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
function openPopupOverlay() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if ($('.rt-popup-overlay').length) return;
  $('body').append('<div class="iedg-popup-overlay"></div>');
  $('body').addClass('is-lock').css('paddingRight', scrollbarWidth);
  $('.rt-popup-overlay').fadeIn(speed);
}
function closePopupOverlay() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  $('.rt-popup-overlay').fadeOut(speed);
  setTimeout(function () {
    $('.rt-popup-overlay').remove();
  }, speed);
  $('body').removeClass('is-lock').css('padding-right', '');
}
function getRootVars() {
  var root = document.querySelector(":root");
  root.style.setProperty("--vh", window.innerHeight / 100 + "px");
  root.style.setProperty("--mh", $('header.iedg-header').outerHeight() + "px");
}

// Main functions
(function ($) {
  $.rt_noti = function (html) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25000;
    if ($('.rt-noti').length) return;
    $('body').append('<div class="iedg-noti">' + html + '</div>');
    setTimeout(function () {
      $('.rt-noti').addClass('opening');
    }, 10);
    setTimeout(function () {
      $('.rt-noti').removeClass('opening');
    }, time);
    setTimeout(function () {
      $('.rt-noti').remove();
    }, time + 500);
  };
  function handleWordpressAdminMode() {
    if ($('#wpadminbar').length && $('.js-iedg-navbar').length && $(window).width() <= 600) {
      $(window).on('scroll', function () {
        var top = $(window).scrollTop(),
          offsetTop = 46 - top > 0 ? 46 - top : 0;
        $('.js-iedg-navbar').css('margin-top', offsetTop);
      });
    }
  }
  function initLazyLoad() {
    $('.lazy').Lazy({
      afterLoad: function afterLoad(el) {
        $(el).addClass('loaded');
        // handleIE();
      }
    });
  }
  function initSelect2() {
    if ($('.ginput_container select').length > 0) {
      $('.ginput_container select').select2({
        width: "100%",
        minimumResultsForSearch: -1
      });
    }
    if ($('.rt-form-group select').length > 0) {
      $('.rt-form-group select').select2({
        width: "100%",
        minimumResultsForSearch: -1
      });
    }
    if ($('select.rt-is-select2').length > 0) {
      $('select.rt-is-select2').select2({
        width: "100%",
        minimumResultsForSearch: -1
      });
    }
    if ($('select.rt-is-select2-filter').length > 0) {
      $('select.rt-is-select2-filter').select2({
        width: "100%",
        minimumResultsForSearch: -1,
        theme: "filter"
      });
    }

    // if( $('.pennacademy-course-ordering select').length > 0 ) {
    //     $('.pennacademy-course-ordering select').select2({
    //         width: "resolve",
    //         minimumResultsForSearch: -1
    //     });
    // }

    /* if( $('.wpforms-field select').length > 0 ) {
        $('.wpforms-field select').select2({
            width: "100%",
            minimumResultsForSearch: -1
        });
    } */
  }
  function initPopup() {
    $('[data-popup-target]').on('click', function (e) {
      e.preventDefault();
      var popupTarget = $(this).data('popup-target'),
        popupContent = $('[data-popup-content="' + popupTarget + '"]');
      if (popupContent.length == 0) return;
      popupContent.addClass('is-active');
      openPopupOverlay();
    });
    $('[data-popup-close]').on('click', function (e) {
      e.preventDefault();
      $(this).closest('[data-popup-content]').removeClass('is-active');
      closePopupOverlay();
    });
    $(document).on('click', '.rt-popup-overlay', function (e) {
      $('[data-popup-content]').removeClass('is-active');
      closePopupOverlay();
    });
  }
  function handleIE() {
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);
    if (ie) {
      $('.rt-img-drop').each(function () {
        var $container = $(this),
          imgLazy = $(this).find('img').attr('src'),
          picLazy = $(this).find('source').attr('srcset'),
          imgUrl = picLazy ? picLazy : imgLazy;
        if (imgUrl) {
          $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('custom-object-fit');
        }
      });
    }
  }
  function initAnchorScroll() {
    $('a.js-anchor-scroll[href*=\\#]:not([href=\\#])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            // scrollTop: target.offset().top - $('.iedg-header .iedg-navbar').outerHeight()
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
    $(document).on('click', 'body .iedg-header a[href*=\\#]:not([href=\\#]), footer .penn-footer__bottom--nav a[href*=\\#]:not([href=\\#])', function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('body').removeClass('is-lock');
          $('header.iedg-header ').removeClass('is-active');
          $('.iedg-navbar-toggler').removeClass('is-active');
          $('.iedg-navbar-collapse').removeClass('is-show');
          $('html, body').animate({
            scrollTop: target.offset().top - $('.iedg-header .iedg-navbar').outerHeight()
          }, 1000);
          return false;
        }
      }
    });
  }
  function initFormFloatLabel() {
    // Check input autofill
    $(window).bind('load', function () {
      $.each($('.rt-form-group input:-webkit-autofill'), function () {
        var label = $(this).prev();
        label.addClass('freeze');
      });
      $.each($('.gfield input:-webkit-autofill'), function () {
        var label = $(this).closest('.gfield').find('.gfield_label');
        label.addClass('freeze');
      });
      $.each($('.wpforms-field input:-webkit-autofill'), function () {
        var label = $(this).closest('.gfield').find('.gfield_label');
        label.addClass('freeze');
      });
    });

    // Check select
    $('.ginput_container_select select').closest('.gfield').addClass('has-select');
    $('.rt-form-group select').closest('.rt-form-group').addClass('has-select');

    // Check input
    var formFields = $('.gfield, .rt-form-group, .wpforms-field, .comment-form p');
    formFields.each(function () {
      var field = $(this),
        input = field.find('input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]), textarea, select'),
        label = field.find('label');
      if (input.attr('type') != 'file') {
        input.focus(function () {
          label.addClass('freeze');
        });
      }
      input.focusout(function () {
        checkInput();
      });
      if (input.val() && input.val().length) {
        label.addClass('freeze');
      }
      function checkInput() {
        var valueLength = input.val().length;
        if (valueLength > 0) {
          label.addClass('freeze');
        } else {
          label.removeClass('freeze');
        }
      }
      input.change(function () {
        checkInput();
      });
    });
  }
  function handleLightGallery() {
    // Gallery
    $(document).on('click', '.rt-light-gallery', function (e) {
      e.preventDefault();
      var $dynamicGallery = document.querySelector(".rt-light-gallery");
      var sources = $(this).attr('data-sources');
      sources = JSON.parse(sources);
      var dynamicGallery = window.lightGallery($dynamicGallery, {
        dynamic: true,
        // plugins: [lgZoom, lgVideo, lgThumbnail],
        plugins: [lgVideo, lgAutoplay, lgThumbnail],
        dynamicEl: sources,
        download: false,
        counter: false,
        slideShowAutoplay: sources.length > 1 ? true : false,
        autoplayControls: false,
        autoplayVideoOnSlide: true,
        showCloseIcon: true,
        mobileSettings: {
          controls: true,
          showCloseIcon: true
        }
      });
      dynamicGallery.openGallery(0);
    });

    // Item
    $(document).on('click', '.rt-light-gallery-item', function (e) {
      e.preventDefault();
      var index = 0;
      var i = 0;
      var $dynamicGallery = document.querySelector(".rt-light-gallery-item");
      var sources = [];
      var element = $(this).closest('.rt-light-gallery-list');
      var urlTemp = $(this).find('.rt-light-gallery-item:not(.slick-cloned) img').attr('src');
      if (element.find('.rt-light-gallery-item:not(.slick-cloned) img').length > 0) {
        element.find('.rt-light-gallery-item:not(.slick-cloned) img').each(function (e) {
          if ($(this).attr('src') == urlTemp) {
            index = i;
          }
          var source = {
            "src": $(this).attr('src'),
            "thumb": $(this).attr('src'),
            "subHtml": $(this).attr('alt')
          };
          sources.push(source);
          i++;
        });
      }

      //sources = JSON.parse(sources);

      var dynamicGallery = window.lightGallery($dynamicGallery, {
        dynamic: true,
        // plugins: [lgZoom, lgVideo, lgThumbnail],
        plugins: [lgVideo, lgAutoplay, lgThumbnail],
        dynamicEl: sources,
        download: false,
        counter: false,
        slideShowAutoplay: sources.length > 1 ? true : false,
        autoplayControls: false,
        autoplayVideoOnSlide: true,
        showCloseIcon: true,
        mobileSettings: {
          controls: true,
          showCloseIcon: true
        }
      });
      dynamicGallery.openGallery(index);
    });
  }
  $(function () {
    getRootVars();
    initLazyLoad();
    initSelect2();
    initPopup();
    handleWordpressAdminMode();
    initFormFloatLabel();
    initAnchorScroll();
    handleLightGallery();
  });
  $(window).on('resize', function () {
    getRootVars();
  });
})(jQuery);
(function ($) {
  function DemoAdminBarMode() {
    $('#enable-admin-bar').on('change', function () {
      var adminBarModeStatus = $(this).prop('checked');
      if (adminBarModeStatus) {
        $('html').addClass('admin-bar-html');
        $('body').append('<div id="wpadminbar">WP Admin bar</div>').addClass('admin-bar');
      } else {
        $('html').removeClass('admin-bar-html');
        $('body').removeClass('admin-bar');
        $('#wpadminbar').remove();
        $('.js-iedg-navbar').css('margin-top', '');
      }
      if ($(window).width() <= 600) {
        DemoNavbarMove();
        $(window).on('scroll', function () {
          DemoNavbarMove();
        });
      }
      function DemoNavbarMove() {
        var top = $(window).scrollTop(),
          offsetTop = 46 - top > 0 ? 46 - top : 0;
        if ($('#wpadminbar').length && $('.js-iedg-navbar').length) {
          $('.js-iedg-navbar').css('margin-top', offsetTop);
        } else {
          $('.js-iedg-navbar').css('margin-top', '');
        }
      }
    });
  }
  $(function () {
    DemoAdminBarMode();
  });
})(jQuery);
(function ($) {
  var body = $('body');
  var scrollUp = "scroll-up";
  var scrollDown = "scroll-down";
  var lastScroll = 0;
  function handleNavCollapse() {
    $('.iedg-navbar-toggler').on('click', function () {
      $(this).toggleClass('is-active');
      $('body').toggleClass('is-lock');
      // $('.iedg-menu-header').toggleClass('is-active');
      $('header.iedg-header ').toggleClass('is-active');
      $('.iedg-navbar-collapse').toggleClass('is-show');
    });
  }
  function handleScrollMenu() {
    $(window).on('scroll', function () {
      calculateScroll();
    });
  }
  function calculateScroll() {
    var currentScroll = window.pageYOffset;

    // console.log(currentScroll);
    // console.log(lastScroll);

    if (currentScroll > lastScroll && !body.hasClass(scrollDown)) {
      // down
      body.removeClass(scrollUp);
      body.addClass(scrollDown);
    } else if (currentScroll < lastScroll && body.hasClass(scrollDown)) {
      // up
      body.removeClass(scrollDown);
      body.addClass(scrollUp);
    }
    lastScroll = currentScroll;
    if (currentScroll <= 0) {
      body.removeClass(scrollUp);
      // return;
    }
  }
  $(function () {
    handleNavCollapse();
    handleScrollMenu();
    calculateScroll();
  });
})(jQuery);
(function ($) {
  function SliderSpaceLearning() {
    var thumbnailSlider = new Swiper('.slider-nav', {
      slidesPerView: 3,
      spaceBetween: 0,
      loop: true,
      // centeredSlides: true,
      slideToClickedSlide: true,
      // loop: true,
      // loopedSlides: 4,
      // navigation: false,
      navigation: {
        prevEl: '.swiper-arrow .swiper-arrows-prev',
        nextEl: '.swiper-arrow .swiper-arrows-next'
      },
      breakpoints: {
        // when window width is >= 768px
        768: {
          slidesPerView: 4
        }
      }
    });
    var mainSlider = new Swiper('.slider-for', {
      // loop: true,
      // spaceBetween: 16,
      slidesPerView: 1,
      loop: true,
      loopedSlides: 1,
      pagination: {
        el: '.swiper-arrow .swiper-number',
        type: 'custom',
        renderCustom: function renderCustom(swiper, current, total) {
          return '<span class="swiper-number-active">' + current + '</span>' + '<span class="swiper-number-count">' + total + '</span>';
        }
      }
    });
    thumbnailSlider.on('slideChange', function (swiper) {
      if (mainSlider.realIndex != swiper.realIndex) {
        mainSlider.slideToLoop(swiper.realIndex);
      }
    });
    mainSlider.on('realIndexChange', function (swiper) {
      if (thumbnailSlider.realIndex != swiper.realIndex) {
        thumbnailSlider.slideToLoop(swiper.realIndex);
      }
    });
    var node = $("#space-learning");
    var wWin = $(window).width();
    if (1200 >= wWin) {
      $(node).find(".penn-space-learning__posts").prepend($(node).find(".penn-space-learning__post-entry"));
      $(node).find(".slick-arrow").each(function () {
        $(node).find(".slider-for-wrap").append($(this));
      });
    } else {
      $(node).find(".penn-space-learning__posts").append($(node).find(".penn-space-learning__post-entry"));
      $(node).find(".slick-arrow").each(function () {
        $(node).find(".swiper-nav").append($(this));
      });
    }
    $(window).resize(function () {
      wWin = $(window).width();
      if (1200 >= wWin) {
        $(node).find(".penn-space-learning__posts").prepend($(node).find(".penn-space-learning__post-entry"));
        $(node).find(".slick-arrow").each(function () {
          $(node).find(".slider-for-wrap").append($(this));
        });
      } else {
        $(node).find(".penn-space-learning__posts").append($(node).find(".penn-space-learning__post-entry"));
        $(node).find(".slick-arrow").each(function () {
          $(node).find(".swiper-nav").append($(this));
        });
      }
    });
  }
  function handleMatchHeightPerception() {
    if ($('.penn-feel-student__item--footer').length < 1) return false;
    var footerHeight = $('.penn-feel-student__item--footer').outerHeight() + 1; //+1 to dismiss the remnant of below line while scrolling (to hide it completely)
    $('.penn-feel-student__item--body').attr('style', '--footerHeight:' + footerHeight + 'px');
    $('.penn-feel-student__item--footer--wrap').matchHeight();
    $('.penn-feel-student__item--cta').matchHeight();
  }
  function initSliderAchievements() {
    var sliderAchievements = new Swiper('.penn-achievements__slider', {
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      navigation: {
        prevEl: '.penn-achievements__slider--arrow .button-prev',
        nextEl: '.penn-achievements__slider--arrow .button-next'
      }

      // Additional Swiper options
    });
  }
  function handleMatchHeightTitle() {
    if ($('.penn-consultation__item--title').length > 0) {
      $('.penn-consultation__item--title').matchHeight();
    }
  }
  $(function () {
    SliderSpaceLearning();
    handleMatchHeightPerception();
    initSliderAchievements();
    handleMatchHeightTitle();
    $(window).resize(function () {
      handleMatchHeightPerception();
      handleMatchHeightTitle();
    });
  });
})(jQuery);