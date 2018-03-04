let $ = require('jquery');
let action = 'click';
let speed = 100;

$(document).ready( function() {
    // 	question handler
    $('.faq-item.question').on(action, function() {

        let icon = $(this).find('.icon');
        if (icon.hasClass('icon-plus')) {
            icon.addClass('icon-dash');
            icon.removeClass('icon-plus');
        } else {
            icon.removeClass('icon-dash');
            icon.addClass('icon-plus');
        }

        // get next element
        $(this).find('.answer')
            .slideToggle(speed)
            .siblings('.faq-item.answer').slideUp(speed);
    });
});