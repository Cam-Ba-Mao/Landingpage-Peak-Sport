(function ($) {
    const body = $('body');
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
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