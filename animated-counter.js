$(document).ready(function () {
    let counterStarted = false;

    $(window).on("scroll", function () {
        let counterPosition = $(".counter-section").offset().top;
        let scrollPosition = $(window).scrollTop() + $(window).height();

        if (scrollPosition > counterPosition && !counterStarted) {
            counterStarted = true;

            $(".counter").each(function () {
                let $this = $(this);
                let target = $this.data("target");

                $({ count: 0 }).animate(
                    { count: target },
                    {
                        duration: 2000,
                        easing: "swing",
                        step: function () {
                            $this.text(Math.floor(this.count));
                        },
                        complete: function () {
                            $this.text(target);
                        }
                    }
                );
            });
        }
    });
});