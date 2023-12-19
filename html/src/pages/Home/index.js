(function ($) {

    function SliderSpaceLearning() {


        const thumbnailSlider = new Swiper('.slider-nav', {
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
                nextEl: '.swiper-arrow .swiper-arrows-next',
            },
            breakpoints: {
                // when window width is >= 768px
                768: {
                    slidesPerView: 4,

                },


            }
        });

        const mainSlider = new Swiper('.slider-for', {
            // loop: true,
            // spaceBetween: 16,
            slidesPerView: 1,
            loop: true,
            loopedSlides: 1,

            pagination: {
                el: '.swiper-arrow .swiper-number',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return '<span class="swiper-number-active">' + current + '</span>' +
                        '<span class="swiper-number-count">' + total + '</span>';
                }
            },

        });

        thumbnailSlider.on('slideChange', function (swiper) {
            if ((mainSlider.realIndex != swiper.realIndex)) {
                mainSlider.slideToLoop(swiper.realIndex);
            }
        });

        mainSlider.on('realIndexChange', function (swiper) {
            if ((thumbnailSlider.realIndex != swiper.realIndex)) {
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
        }
        else {
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
            }
            else {
                $(node).find(".penn-space-learning__posts").append($(node).find(".penn-space-learning__post-entry"));
                $(node).find(".slick-arrow").each(function () {
                    $(node).find(".swiper-nav").append($(this));
                });
            }


        });
    }

    function handleMatchHeightPerception() {
        if ($('.penn-feel-student__item--footer').length < 1) return false;

        let footerHeight = $('.penn-feel-student__item--footer').outerHeight() + 1; //+1 to dismiss the remnant of below line while scrolling (to hide it completely)
        $('.penn-feel-student__item--body').attr('style', '--footerHeight:' + footerHeight + 'px');

        $('.penn-feel-student__item--footer--wrap').matchHeight();
        $('.penn-feel-student__item--cta').matchHeight();
    }

    function initSliderAchievements() {

        const sliderAchievements = new Swiper('.penn-achievements__slider', {
            slidesPerView: 1,
            spaceBetween: 16,
            grabCursor: true,
            navigation: {
                prevEl: '.penn-achievements__slider--arrow .button-prev',
                nextEl: '.penn-achievements__slider--arrow .button-next',
            },

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