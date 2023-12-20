(function ($) {

    function handleMatchHeightTitle() {
        if ($('.peak-product__item--body .product-item__image img').length > 0) {
            $('.peak-product__item--body .product-item__image img').matchHeight();
        }
    }

    $(function () {
        handleMatchHeightTitle();

        $(window).resize(function () {
            handleMatchHeightTitle();
        });
    });
})(jQuery);