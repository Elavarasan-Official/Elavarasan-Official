var app = angular.module("CSCSWebsite");
app.directive("pageScript", ["$document", "$timeout", "$location", function ($document,$timeout,$location) {
    return {
        link: link,
        restrict: 'A'
    };
    function link() {
        $(document).ready(function () {
		'use strict';
		$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.main-menu-container').addClass('fixed');
		} else if ($(this).scrollTop() < 50) {
			$(".main-menu-container").removeClass('fixed');
		}
		});
		$(window).ready(function(){
			//alert('asdfa');	
			$('#android-ios').modal('show');
			setTimeout(function(){
				$('#android-ios').modal('hide');                
			}, 1000);
		});
		$(document).on('mouseover', ".main-menu > li.dropdown a", function () {
			$(this).parent().addClass('on');
			return false;
		});
		$(document).on('click', ".adv-filter", function () {
			//$('.table-container').slideToggle();
			$(this).closest('.live-wrapper').find('.table-container').slideToggle();
			return false;
		});
		// $(document).on('click', ".adv-filter.collapsed", function () {
			// $(this).closest('.live-wrapper').find('.table-container').animate({right:0});
			// $(this).removeClass('collapsed').addClass('expanded');
		// });
		// $(document).on('click', ".adv-filter.expanded", function () {
			// $(this).closest('.live-wrapper').find('.table-container').animate({right:-560});
			// $(this).removeClass('expanded').addClass('collapsed');
		// });
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
		$(document).on('click', ".main-tab a, .secondary-tab a, .third-tab a", function () {
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
		$('.toggle-wrap, aside .menu a').on('click', function () {
			if($(this).attr('href') != 'javascript:void(0);')
			{
			$('.toggle-wrap').toggleClass('select');
			$('aside').animate({ width: 'toggle' }, 200);
			$('.mobile-view .overlay').toggle();
			}
		});
		menuSelect();
		function menuSelect(){
			var ourLocation = $location.path();
			//alert(ourLocation);
            $('.navbar-nav li a').each(function () {
                var ourLocation = $location.path();
				//alert(ourLocation);
                if ($(this).attr('href') == (ourLocation)) {
                    $('.navbar-nav li').removeClass('active');
                    $(this).parent().addClass('active');
                }
            });
		};
		$(document).on('click', ".sportsmagazine-dropdown-menu", function () {
			{
				$('.navbar-nav li').removeClass('active');
				$(this).parent('li').addClass('active');
			}
		});
		$(document).on('click', ".navbar-nav li a", function () {
			menuSelect();
			if ($(this).attr('href') == ('/')) {
				window.location.reload();
			};
			$('.collapse').collapse('hide');
		});
	   });	   
		customScroll();
		function customScroll(){
			$timeout(function (){
				$("scroll-xy, .scrollable-table").mCustomScrollbar({
					axis:"yx",
					scrollButtons:{enable:true},
					advanced:{autoScrollOnFocus:false},
					theme:"minimal",
					scrollbarPosition:"outside"
				});
				$(".scroll-y, .scrollable-table tbody,.score-info,.stats-table tbody").mCustomScrollbar({
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
    }
}]);
app.directive("innerHeight", ["$timeout", function ($timeout) {
    return {
        link: link,
        restrict: 'A'
    };
	function link() {
		var livescoreHeight = $('.ad-container').outerHeight();
		$('.score-info').attr('style', 'height:' + livescoreHeight + 'px;');
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
		$('.news-title,.photos-title,.cmt-name,.news-txt').each(function () {
			var myTag = $(this).text();
			if (myTag.length > 40) {
			  var truncated = myTag.trim().substring(0, 40) + "…";
			  $(this).text(truncated);
			}
		});
		$timeout(function () {		
		$('[data-countdown]').each(function () {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                //$this.html(event.strftime('%D days %H:%M:%S'));
                $this.html("<div class='col-md-3'><div class='red border-radius'>Days <br/>" + event.strftime('%D') + "</div></div><div class='col-md-3'><div class='red border-radius'>Hours<br/>" + event.strftime('%H') + "</div></div><div class='col-md-3'><div class='red border-radius'>Mins<br/>" + event.strftime('%M') + "</div></div><div class='col-md-3'><div class='red border-radius'>Sec<br/>" + event.strftime('%S') + "</div></div>");
            });
        });
		$('.grd-name,.trophy-name').each(function () {
			var myTag = $(this).text();
			//alert(myTag.length);
			if (myTag.length > 24) {
			  var truncated = myTag.trim().substring(0, 24) + "…";
			  $(this).text(truncated);
			}
		});
		$('.fix-team01,.fix-team02').each(function () {
			var myTag = $(this).text();
			//alert(myTag.length);
			if (myTag.length > 10) {
			  var truncated = myTag.trim().substring(0, 10) + "…";
			  $(this).text(truncated);
			}
		});
		$('.sportsmagazine-fixture-slider').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: false,
          prevArrow: "<span class='slick-arrow-left'><i class='fa fa-angle-left'></i></span>",
          nextArrow: "<span class='slick-arrow-right'><i class='fa fa-angle-right'></i></span>",
          responsive: [
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },{
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 700,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });
		
		$('.sponsors-slider').slick({
          slidesToShow: 6,
          slidesToScroll: 1,
          autoplay: true,
		  arrows: false,
          autoplaySpeed: 1500,
          infinite: true,
          dots: false,
          responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });
		$('.ball-by-ball').slick({
          slidesToShow:28,
          slidesToScroll: 1,
          autoplay: false,
          margin: 10,
          autoplaySpeed: 1500,
          infinite: true,
          dots: false,
          prevArrow: "<span class='slick-arrow-left'><i class='fa fa-angle-left'></i></span>",
          nextArrow: "<span class='slick-arrow-right'><i class='fa fa-angle-right'></i></span>",
          responsive: [
                {
                  breakpoint: 1600,
                  settings: {
                    slidesToShow: 28,
                    slidesToScroll: 1,
                    infinite: true
                  }
                },
				{
                  breakpoint: 1360,
                  settings: {
                    slidesToShow: 22,
                    slidesToScroll: 1
                  }
                },
				{
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 18,
                    slidesToScroll: 1
                  }
                },
				{
                  breakpoint: 980,
                  settings: {
                    slidesToShow:15,
                    slidesToScroll: 1
                  }
                },
				{
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 12,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 639,
                  settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                  }
                },
				{
                  breakpoint: 320,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
              ]
        });
		$('.sportsmagazine-featured-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: false,
          prevArrow: "<span class='slick-arrow-left'><i class='fa fa-angle-left'></i></span>",
          nextArrow: "<span class='slick-arrow-right'><i class='fa fa-angle-right'></i></span>",
          responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });
		$('.next-match-container').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          dots: false,
          prevArrow: "<span class='slick-arrow-left'><i class='fa fa-angle-left'></i></span>",
          nextArrow: "<span class='slick-arrow-right'><i class='fa fa-angle-right'></i></span>",
          responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });
		$('.sportsmagazine-player-slider-image').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          autoplay: true,
          autoplaySpeed: 2000,
          asNavFor: '.sportsmagazine-player-slider-nav'
        });
        $('.sportsmagazine-player-slider-nav').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: '.sportsmagazine-player-slider-image',
          dots: false,
          vertical: true,
          arrows: false,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 2000,
          focusOnSelect: true,
          responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    vertical: true,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    vertical: true,
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: true,
                  }
                }
              ],
        });
		$(function() {
			var austDay = new Date();
			austDay = new Date(austDay.getFullYear() + 2, 2 - 1, -600);
			jQuery('#sportsmagazine-countdown,#sportsmagazine-game-countdown,#sportsmagazine-banner-countdown').countdown({
				until: austDay
			});
			jQuery('#year').text(austDay.getFullYear());
		});
		$(".fancybox").fancybox({
		  openEffect  : 'elastic',
		  closeEffect : 'elastic',
		  helpers: {
			overlay: {
			  locked: false
			},
			title	: { type : 'inside' }
		  }
		});
		},2000);
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
				googlePlus:false,
				pinterest:false
			});
			$('.lg-vdo-download').lightGallery(
			{
				videojs: true,
				controls:true,
				counter:false,
				download:true,
				googlePlus:false,
				pinterest:false
			});
        }, 500);
		$('.video-container a').on('click', function () {
			var vdoURL = $(this).find('video source').attr('src');
			$('.video-display video source').attr('src', vdoURL);
		});
    }
}]);
app.directive('homeBanner', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        link: link
    }
    function link() {
        $timeout(function () {
             $('.sportsmagazine-banner-one').slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  autoplay: true,
			  autoplaySpeed: 2000,
			  infinite: true,
			  dots: false,
			  arrows: false,
			  fade: true,
			  responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
					  }
					},
					{
					  breakpoint: 800,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					},
					{
					  breakpoint: 400,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
			});
        }, 500);
    }
}]);

