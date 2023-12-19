(function ($) {
    function DemoAdminBarMode() {
        $('#enable-admin-bar').on('change', function () {
            var adminBarModeStatus = $(this).prop('checked');
            if (adminBarModeStatus) {
                $('html').addClass('admin-bar-html');
                $('body').append('<div id="wpadminbar">WP Admin bar</div>').addClass('admin-bar');
            }
            else {
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
                }
                else {
                    $('.js-iedg-navbar').css('margin-top', '');
                }
            }
        });
    }

    $(function () {
        DemoAdminBarMode();
    });
})(jQuery);