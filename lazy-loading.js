$(document).ready(function () {

    function lazyLoadImages() {

        $(".lazy-image").each(function () {

            let image = $(this);

            if (image.attr("src")) {
                return;
            }

            let windowBottom =
                $(window).scrollTop() + $(window).height();

            let imageTop =
                image.offset().top;

            if (windowBottom > imageTop - 100) {

                image.attr("src", image.data("src"));

                image.hide().fadeIn(600);
            }

        });
    }

    $(window).on("scroll", function () {
        lazyLoadImages();
    });

    lazyLoadImages();

});