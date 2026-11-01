/* TASK 6: Loading spinner on Submit */
(function ($) {
    var DELAY = 2000; // simulated server call (ms)

    // Puts the button in "loading" state, then restores it after DELAY.
    // onDone runs when the fake server call finishes.
    window.runWithSpinner = function ($btn, onDone) {
        if ($btn.prop('disabled')) return;           // ignore repeated clicks

        var originalHtml = $btn.html();
        $btn.data('original-html', originalHtml)
            .prop('disabled', true)                   // prevent double submit
            .attr('aria-busy', 'true')
            .html('<span class="btn-spinner" aria-hidden="true"></span> Please wait…');

        setTimeout(function () {
            $btn.html($btn.data('original-html'))     // back to normal
                .prop('disabled', false)
                .removeAttr('aria-busy');
            if (typeof onDone === 'function') onDone();
        }, DELAY);
    };
})(jQuery);
