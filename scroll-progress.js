$(document).ready(function () {

    $(window).on("scroll", function () {

        let scrollTop = $(window).scrollTop();

        let documentHeight = $(document).height();
        let windowHeight = $(window).height();

        let scrollHeight = documentHeight - windowHeight;

        let scrollPercent = (scrollTop / scrollHeight) * 100;

        $("#scroll-progress").css("width", scrollPercent + "%");
    });

});