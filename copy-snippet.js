/* TASK 8: Copied to Clipboard button */
$(document).ready(function () {
    var COPY_ICON  = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg>';
    var CHECK_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    // Give every copy button its icon
    $('.copy-btn').html(COPY_ICON);

    // Checkmark + tooltip, then reset after 2 seconds
    function showCopied($btn) {
        clearTimeout($btn.data('timer'));
        $btn.addClass('copied')
            .html(CHECK_ICON)
            .attr('data-tooltip', 'Copied to clipboard!')
            .attr('aria-label', 'Copied to clipboard');

        $btn.data('timer', setTimeout(function () {
            $btn.removeClass('copied')
                .html(COPY_ICON)
                .removeAttr('data-tooltip')
                .attr('aria-label', 'Copy to clipboard');
        }, 2000));
    }

    function copyText(text, done) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(done);
        } else {
            // Fallback for file:// or old browsers
            var $tmp = $('<textarea>').val(text).css({ position: 'fixed', opacity: 0 }).appendTo('body');
            $tmp[0].select();
            document.execCommand('copy');
            $tmp.remove();
            done();
        }
    }

    // Click on the Copy button
    $('.copy-btn').on('click', function () {
        var $btn  = $(this);
        var $text = $btn.closest('.snippet').find('.snippet-text');
        var text  = $text.text().trim().replace(/\n\s+/g, '\n');
        copyText(text, function () { showCopied($btn); });
    });

    // .on('copy'): also react when the user copies a snippet manually (Ctrl+C / right-click)
    $('.snippet-text').on('copy', function () {
        showCopied($(this).closest('.snippet').find('.copy-btn'));
    });
});

