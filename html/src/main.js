var $ = jQuery.noConflict();
// Global functions
var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

function openPopupOverlay(speed = 500) {
    if ($('.rt-popup-overlay').length) return;
    $('body').append('<div class="iedg-popup-overlay"></div>');
    $('body').addClass('is-lock').css('paddingRight', scrollbarWidth);
    $('.rt-popup-overlay').fadeIn(speed);
}

function closePopupOverlay(speed = 500) {
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
    $.rt_noti = function (html, time = 25000) {
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
            afterLoad: function (el) {
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
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {
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
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {
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
                var label = $(this).prev()
                label.addClass('freeze');
            });

            $.each($('.gfield input:-webkit-autofill'), function () {
                var label = $(this).closest('.gfield').find('.gfield_label')
                label.addClass('freeze');
            });

            $.each($('.wpforms-field input:-webkit-autofill'), function () {
                var label = $(this).closest('.gfield').find('.gfield_label')
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
            let $dynamicGallery = document.querySelector(".rt-light-gallery");
            let sources = $(this).attr('data-sources');
            sources = JSON.parse(sources);

            let dynamicGallery = window.lightGallery($dynamicGallery, {
                dynamic: true,
                // plugins: [lgZoom, lgVideo, lgThumbnail],
                plugins: [lgVideo, lgAutoplay, lgThumbnail],
                dynamicEl: sources,
                download: false,
                counter: false,
                slideShowAutoplay: (sources.length > 1 ? true : false),
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

            let index = 0;
            let i = 0;
            let $dynamicGallery = document.querySelector(".rt-light-gallery-item");
            let sources = [];
            let element = $(this).closest('.rt-light-gallery-list');
            let urlTemp = $(this).find('.rt-light-gallery-item:not(.slick-cloned) img').attr('src');

            if (element.find('.rt-light-gallery-item:not(.slick-cloned) img').length > 0) {
                element.find('.rt-light-gallery-item:not(.slick-cloned) img').each(function (e) {

                    if ($(this).attr('src') == urlTemp) {
                        index = i;
                    }

                    let source = {
                        "src": $(this).attr('src'),
                        "thumb": $(this).attr('src'),
                        "subHtml": $(this).attr('alt')
                    }

                    sources.push(source);
                    i++;
                });
            }

            //sources = JSON.parse(sources);

            let dynamicGallery = window.lightGallery($dynamicGallery, {
                dynamic: true,
                // plugins: [lgZoom, lgVideo, lgThumbnail],
                plugins: [lgVideo, lgAutoplay, lgThumbnail],
                dynamicEl: sources,
                download: false,
                counter: false,
                slideShowAutoplay: (sources.length > 1 ? true : false),
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