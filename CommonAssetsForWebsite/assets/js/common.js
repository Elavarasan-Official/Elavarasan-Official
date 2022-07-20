$(document).ready(function () {
    'use strict';
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('header').addClass('fixed');
            $('.header01').attr('style', 'top:-44px;');
        } else if ($(this).scrollTop() < 44) {
            $("header").removeClass('fixed');
            $('.header01').attr('style', 'top:0;');
        }
    });
    var getNav = $("nav"),
        getWindow = $(window).width(),
        getHeight = $(window).height(),
        getIn = getNav.find("ul.nav").data("in"),
        getOut = getNav.find("ul.nav").data("out");
    $(".dropdown-menu", this).addClass("animated");
    $("li.dropdown", this).on("mouseenter", function () {
        $(".dropdown-menu", this).eq(0).removeClass(getOut);
        $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
        $(this).addClass("on");
        return false;
    });
    $("li.dropdown", this).on("mouseleave", function () {
        $(".dropdown-menu", this).eq(0).removeClass(getIn);
        $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
        $(this).removeClass("on");
    });
    $(this).on("mouseleave", function () {
        $(".dropdown-menu", this).stop().removeClass(getIn);
        $(".dropdown-menu", this).stop().addClass(getOut).fadeOut();
        $("li.dropdown", this).removeClass("on");
        return false;
    });
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    });
    setTimeout(function () {
        $('#success').fadeOut();
    }, 5000);
    initWOW();
    function initWOW() {
        var wow = new WOW({
            boxClass: 'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0,          // distance to the element when triggering the animation (default is 0)
            mobile: true,       // trigger animations on mobile devices (default is true)
            live: true,       // act on asynchronously loaded content (default is true)
            //callback: function (box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
            //},
            scrollContainer: null // optional scroll container selector, otherwise use window
        });
        wow.init();
    }
    var owl01 = $(".owl-carousel.products");
    owl01.owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        },
        autoplay: true,
        loop: true,
        pagination: false,
        nav: false
    });
    var owl02 = $(".owl-carousel.clients");
    owl02.owlCarousel({
        responsive: {
            0: {
                items: 2
            },
            800: {
                items: 3
            },
            1000: {
                items: 6
            }
        },
        autoplay: true,
        loop: true,
        pagination: false,
        nav: false
    });
    var owl03 = $(".owl-carousel.history");
    owl03.owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        },
        autoplay: true,
        loop: true,
        pagination: false,
        nav: false
    });
    var owl04 = $(".owl-carousel.testimonial");
    owl04.owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        },
        autoplay: true,
        loop: true,
        pagination: false,
        nav: false
    });
    var owl05 = $(".owl-carousel.offices");
    owl05.owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        },
        autoplay: true,
        loop: true,
        pagination: true,
        nav: false
    });
    var $counterWidgets = $('.widget-number-counters');
    if ($counterWidgets.length) {
        $counterWidgets.each(function () {
            new NumberCounter($(this));
        });
    }
    maxHeight();
    function maxHeight() {
        $(".dropdown").hover(function () {
            var maxHeight = 0;
            $('.dropdown.on').find('.dropdown-menu > li').each(function () {
                if ($(this).outerHeight(true) > maxHeight) { maxHeight = $(this).height(); }
            });
            $('.dropdown.on').find('.dropdown-menu .col-sm-3').outerHeight(maxHeight);
        });
    }
    $(document).on('click', ".main-tab a, .secondary-tab a, .third-tab a", function () {
        var parentRelID = $(this).parent().attr('rel');
        var parentClassName = $(this).parent().attr('class');
        var relID = $(this).attr('rel');
        $('.' + parentRelID + ' .' + parentClassName + '-container').hide();
        $(this).parent().find('a').removeClass('select');
        $(this).addClass('select');
        $('.' + parentRelID + ' .' + parentClassName + '-container.' + relID).show();
        initWOW();
    });
    var $container = $('.answer, .career-info'),
	$trigger = $('.question, .job-title');
    $container.hide();
    $trigger.first().addClass('select').next().show();

    $trigger.on('click', function (e) {
        if ($(this).next().is(':hidden')) {
            $trigger.removeClass('select').next().slideUp(300);
            $(this).toggleClass('select').next().slideDown(300);
        }
        e.preventDefault();
    });
    $('.toggle-wrap').on('click', function () {
        $(this).toggleClass('select');
        $('aside').animate({ width: 'toggle' }, 200);
        $('.mobile-view .overlay').toggle();
    });
});
(function ($) {
    // Get the current URL
    var pathname = window.location,
    // Get data to share
        shareTitle = $('.body h1').text(),
        shareSubtitle = $('.share-sub').text(),
    // Create the URL's
        tweeturl = 'http://twitter.com/share?url=' + encodeURI(pathname) + '&text=' + shareTitle,
        fburl = 'http://www.facebook.com/sharer.php?u=' + pathname,
        gpurl = 'https://plus.google.com/share?url=' + pathname,
        liurl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + pathname + '&title=' + shareTitle;

    // add the URL's to anchors
    $('.social-share .share-twitter').attr('href', tweeturl);
    $('.social-share .share-fb').attr('href', fburl);
    $('.social-share .share-gp').attr('href', gpurl);
    $('.social-share .share-linkedin').attr('href', liurl);
    $('.fb-comments').attr('data-href', pathname);
} (jQuery));
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));