$(document).ready(function () {

    $(".add-to-order").on("click", function (event) {

        event.preventDefault();

        $("#order-toast")
            .stop(true, true)
            .fadeIn(300)
            .delay(2000)
            .fadeOut(500);

    });

});