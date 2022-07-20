var app = angular.module("MCAWebsite");
app.directive("pageScript", ["$document", "$timeout", "$location", function ($document,$timeout,$location) {
    return {
        link: link,
        restrict: 'A'
    };
    function link() {
        $(document).ready(function () {
		'use strict';
		$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.header-container').addClass('fixed');
		} else if ($(this).scrollTop() < 100) {
			$(".header-container").removeClass('fixed');
		}
		});
		$(document).on('mouseover', ".main-menu > li.dropdown a", function () {
			$(this).parent().addClass('on');
			return false;
		});
		$("img").mousedown(function(){
			return false;
		});
		$(document).on('click', ".view-by-icon", function() {
			var parentClass = $(this).parent().attr('class');
			var trimTxt = parentClass.split(' ')[0];
			$('.dd-panel').attr('style', 'visibility:hidden;').removeClass('open');
			$('.' + trimTxt + ' .dd-panel').attr('style', 'visibility:visible').toggleClass('open');
			return false;
		});
		$(document).on('click', ".dd-panel a", function () {
			var parentClass = $(this).parent().parent().attr('class');
			var trimTxt = parentClass.split(' ')[0];
			$('.' + trimTxt + ' .dd-panel a').removeClass('select');
			$(this).addClass('select');
			var iconText = $(this).find('span').text();
			$('.' + trimTxt + ' .view-by-icon span.search-value').empty().text(iconText);
		});
		$(document).on('click', ".btn-search", function () {
			$('.search-form').fadeIn();
		});
		$(document).on('click', ".search-form .btn-close", function () {
			$('.search-form').fadeOut();
		});
		// $(document).click(function(event) {
			// var msglist = $('.search-form');
			// if(!$(event.target).is('.search-form')) {
				// if(msglist.is(":visible")) {
					// $('.search-form').fadeOut();
				// }
			// }
		// });
		$(document).click(function(event) {
			var msglist = $('.dd-panel');
			if(!$(event.target).is('.dd-panel')) {
				if(msglist.is(":visible")) {
					$('.dd-panel').attr('style', 'visibility:hidden;').removeClass('open');
				}
			}
		});
		$(document).on('mouseleave', ".main-menu > li.dropdown.on a", function () {
			$(this).parent().removeClass('on');
		});
		tabClick();
		customScroll();
		function tabClick() {
			$(document).on('click', ".main-tab a, .secondary-tab a, .third-tab a, .fourth-tab a, .fifth-tab a", function () {
				var parentRelID = $(this).parent().attr('rel');
				var parentClassName = $(this).parent().attr('class');
				var relID = $(this).attr('rel');
				$('.' + parentRelID + ' .' + parentClassName + '-container').hide();
				$(this).parent().find('a').removeClass('select');
				$(this).addClass('select');
				$('.' + parentRelID + ' .' + parentClassName + '-container.' + relID).show();
				//initWOW();
				//$(".owl-carousel.players-listing").owlCarousel();
			});  
		}
		function customScroll(){
			$timeout(function (){
				$("scroll-xy, .scrollable-table").mCustomScrollbar({
					axis:"yx",
					scrollButtons:{enable:true},
					advanced:{autoScrollOnFocus:false},
					theme:"minimal",
					scrollbarPosition:"outside"
				});
				$(".scroll-y, .scrollable-table tbody,.score-info,.secondary-tab-container").mCustomScrollbar({
					axis:"y",
					scrollButtons:{enable:true},
					advanced:{autoScrollOnFocus:false},
					theme:"minimal",
					scrollbarPosition:"outside"
				});
				$(".scroll-x").mCustomScrollbar({
					axis:"x",
					scrollButtons:{enable:true},
					advanced:{autoExpandHorizontalScroll:true},
					theme:"minimal",
					scrollbarPosition:"outside"
				});
			});
		}
		menuSelect();
		function menuSelect(){
			var ourLocation = $location.path();
            $('.menu li a').each(function () {
                var ourLocation = $location.path();
				// alert(ourLocation);
                if ($(this).attr('href') == (ourLocation)) {
                    $('.menu li a').parent().removeClass('select');
                    $(this).parent().addClass('select');
                }
            });
		};
		flipClock();
		function flipClock(){
			var clock;
			clock = $('.clock').FlipClock({
		        clockFace: 'DailyCounter',
		        autoStart: false,
		        callbacks: {
		        	stop: function() {
		        		$('.message').html('The clock has stopped!')
		        	}
		        }
		    });
				    
		    clock.setTime(172800);
		    clock.setCountdown(true);
		    clock.start();
		};
		$(document).on('click', ".single-select span", function () {
			$(this).closest('.season-filter').find('.single-select span').removeClass('select');
			$(this).addClass('select');
		});
	   });
    }
}]);
app.directive("innerScript", ["$timeout", function ($timeout) {
    return {
        link: link,
        restrict: 'A'
    };
    function link() {
		$('.carousel').carousel({
			interval: 5000 //changes the speed
		});
		$('.char-length').each(function () {
			var myTag = $(this).text();
			//alert(myTag.length);
			if (myTag.length > 50) {
			  var truncated = myTag.trim().substring(0, 50) + "…";
			  $(this).text(truncated);
			}
		});
		$('.news-title').each(function () {
			var myTag = $(this).text();
			//alert(myTag.length);
			if (myTag.length > 40) {
			  var truncated = myTag.trim().substring(0, 40) + "…";
			  $(this).text(truncated);
			}
		});
		$timeout(function () {
		var owl05 = $(".owl-carousel.ball-by-ball");
		owl05.owlCarousel({
			responsive: {
				0: {
					items: 1
				},
				320: {
					items: 5
				},
				480: {
					items: 8
				},
				639: {
					items: 12
				},
				768: {
					items: 15
				},
				980: {
					items: 18
				},
				1024: {
					items: 22
				},
				1360: {
					items: 30
				},
				1600: {
					items: 36
				}
			},
			autoplay: false,
			autoplayTimeout:7000,
			autoplayHoverPause:true,
			loop: false,
			margin:8,
			pagination: false,
			nav: true,
			navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
		});
		var CountTimer = $('.countdown-timer');
		if(CountTimer.length){ 
			$(".countdown-timer").TimeCircles({
				fg_width: 0.04,
				bg_width: 0.8,
				circle_bg_color: "#fff",
				time: {
					Days:{
						color: "#333"
					},
					Hours:{
						color: "#333"
					},
					Minutes:{
						color: "#333"
					},
					Seconds:{
						color: "#333"
					}
				}
			});	
			}
		},1000);
	}
}]);
app.directive('lightGallery', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        link: link
    }
    function link() {
        $timeout(function () {
            $('.lg-share-demo').lightGallery(
			{
				videojs: true,
				controls:true,
				counter:false,
				download:false,
				share:false
			});
        }, 500);
		$('.video-container a').on('click', function () {
			var vdoURL = $(this).find('video source').attr('src');
			//alert(vdoURL);
			$('.video-display video source').attr('src', vdoURL);
		});
    }
}]);

