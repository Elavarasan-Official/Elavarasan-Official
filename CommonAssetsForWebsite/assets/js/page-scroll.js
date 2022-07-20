$(document).ready(function () {
    'use strict';
    var scroll = $.cookie('scroll');
    if (scroll) {
        scrollToID(scroll, 1000);
        $.removeCookie('scroll');
    }

    // Handle event onclick, setting the cookie when the href != #
    $('a.hash-link').click(function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var href = $(this).attr('href');
        if (href === '#') {
            scrollToID(id, 1000);
        } else {
            $.cookie('scroll', id);
            window.location.href = href;
        }
    });

    // scrollToID function
    function scrollToID(id, speed) {
        var bodyWidth = $('body').width();
        if (bodyWidth >= 1024) {
            var offSet = 150;
        }
        else if (bodyWidth < 1024) {
            var offSet = 70;
        }
        var obj = $('#' + id);
        if (obj.length) {
            var offs = obj.offset();
            var targetOffset = offs.top - offSet;
            $('html,body').animate({ scrollTop: targetOffset }, speed);
        }
    }
});
