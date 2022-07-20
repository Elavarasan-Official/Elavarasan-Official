(function () {
	'use strict';
    var app = angular.module("AlphaProTracker");
	app.directive("bodyClass", ["$location", "$window", function ($location, window){
		return{
			link: link,
			restrict:'A'
		};
		function link()
		{
			var path = $location.path();
			if (path === '/')
			{
				$('body').addClass('login-bg');
			}
			else if (path === '/planner')
			{
				$('body').addClass('no-skin planner-page');
			}
			else
			{
				$('body').addClass('no-skin');
			}
			var logoWidth = $('.logo img').width();
			var logoHeight = $('.logo img').height();
			var imgRatio = logoWidth / logoHeight;
			if (imgRatio >= 1.5)
			{
				$('.logo img').addClass('landscape');
			}
			else
			{
				$('.logo img').addClass('portrait');
			}
		}
	}]);
	
	app.directive("formAccordion", ["$window", "$document", function(window, document) {
	return {
		link: link,
		restrict: 'A'
	 };
	function link(){
		$(document).ready(function() {
			var $container = $('.accordion-form'),
			$trigger = $('.accordion');
            $container.hide();
            //$trigger.first().addClass('active').next().show();
            $trigger.on('click', function (e) {
                if ($(this).next().is(':hidden')) {
                    $trigger.removeClass('active').next().slideUp(300);
                    $(this).toggleClass('active').next().slideDown(300);
                }
				else{
                    $(this).toggleClass('active').next().slideUp(300);
				}
                e.preventDefault();
            });
		});
		$(document).ready(function() {
			var $container = $('.session-expand'),
			$trigger = $('.session-link');
            $container.hide();
            $trigger.first().addClass('active').next().show();

            $trigger.on('click', function (e) {
                if ($(this).next().is(':hidden')) {
                    $trigger.removeClass('active').next().slideUp(300);
                    $(this).toggleClass('active').next().slideDown(300);
                }
                e.preventDefault();
            });
		});
	}
	}]);

	
	app.directive("customScroll", ["$timeout", function($timeout) {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
			$timeout(function (){
				$(".dashboard-menu, .accordion-container, .participants-detail-container, .events-view .events-month, .events-view .events-conflict, .table-scroll, .table-scroll tbody, .multi-chk-bx, .match-center-scroll, .scrollable-table").mCustomScrollbar({
					axis:"yx",
					scrollButtons:{enable:true},
					advanced:{autoScrollOnFocus:false},
					theme:"minimal",
					scrollbarPosition:"outside"
				});
				$(".dashboard-container, .alert-popup .alert-popup-pane, .sidebar, .msg-container ul, .msg-log .msg-history, .search-player .search-filter, .left-container, .right-container, .view-comments, .page-scroll, .scrollable-table tbody,.nutrition-body, .nutrition-wrapper,.watch-scrollable,.parameter-table,.scroll-y,.ui-menu").mCustomScrollbar({
					axis:"y",
					scrollButtons:{enable:true},
					advanced:{autoScrollOnFocus:false},
					theme:"minimal",
					scrollbarPosition:"outside",
					mouseWheelPixels: 100
				});
				if(!$(".page-container").hasClass('no-scroll')){
					$(".page-container, .output-container").mCustomScrollbar({
					axis:"y",
					scrollButtons:{enable:true},
					advanced:{autoScrollOnFocus:false},
					theme:"minimal",
					scrollbarPosition:"outside",
					mouseWheelPixels: 100
				});
				}
				$(".scorecard-pagination").mCustomScrollbar({
					axis:"x",
					scrollButtons:{enable:true},
					advanced:{autoExpandHorizontalScroll:true},
					theme:"minimal",
					scrollbarPosition:"outside"
				});
				//$("#msg-history").mCustomScrollbar('scrollTo', 'last');
			},500);
		}
		$(window).bind('resize', function(){
				link();
         		//scope.$digest();
       		});
	}]);

	app.directive("tabClick", function() {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
			
		}
	});
	
	app.directive("injuryTracker", function() {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
			var allStates = $("svg > g > path");
				allStates.on("click", function() {
				//allStates.removeClass("on"); // for single injury
				$(this).toggleClass("on");
				//alert($(this).attr('class'));
			});
		}
	});

	app.directive("statsTabClick", function() {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
			$(document).on('click', ".tabs a", function () {
				var relID = $(this).attr('rel');
				var className = $(this).parent().attr('class');
				var trimTxt = $.trim(className).substring(0, 10).split(' ').slice(0, -1).join(' ');
				$('.' + trimTxt + ' a').removeClass('select');
				$(this).addClass('select');
				$('.' + trimTxt + '-container').hide();
				$('.' + trimTxt + '-container.' + relID).show();
			});
		}
	});

	app.directive("countdownTimer", ["$timeout", function($timeout){
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
		$timeout(function (){
			$('[data-countdown]').each(function () {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                //$this.html(event.strftime('%D days %H:%M:%S'));
                $this.html("<div class='col-md-3'><div class='blue border-radius txt-center'>Days <br/>" + event.strftime('%D') + "</div></div><div class='col-md-3'><div class='blue border-radius txt-center'>Hours<br/>" + event.strftime('%H') + "</div></div><div class='col-md-3'><div class='blue border-radius txt-center'>Mins<br/>" + event.strftime('%M') + "</div></div><div class='col-md-3'><div class='blue border-radius txt-center'>Sec<br/>" + event.strftime('%S') + "</div></div>");
            });
        });
		});
		}
	}]);
	
	app.directive("sidebarCtrl", ["$timeout", "$location", function($timeout, $location){
		return{
			link: link,
			restrict:'A'
		};
		function link()
		{
			var ourLocation = $location.path();
			$('.nav li a').each(function () {
				if ($(this).attr('href') === ('#' + ourLocation)) {
					$(this).parents('li').addClass('active open');
					$(this).parent().removeClass('open').addClass('active');
				}
			});
			$(document).on('click', ".nav li a", function () {
				//alert('hi');
				$('.nav li').removeClass('active open');
				$('.nav li .submenu').removeClass('nav-show').addClass('nav-hide').hide();
				$(this).parents('li').addClass('active open');
				$('.nav li.active.open > .submenu').addClass('nav-show').removeClass('nav-hide').show();
				$(this).parent().removeClass('open').addClass('active');
				var pageURL = $(this).attr('href');
				if (pageURL !== "javascript:void(0);")
				{
					$('.apps-left').animate({marginLeft:-220});
					$('.toggle-btn.expanded').removeClass('expanded').addClass('collapsed').animate({marginLeft:5});
				}
			});
			$timeout(function (){
				var bdyHeight = $('body').height();
				var logoHeight = $('.logo').height();
				var menuHeight = bdyHeight - logoHeight;
				var hdrHeight = $('header').outerHeight();
				$('.apps-right').attr('style', 'top:' + hdrHeight + 'px;');
				$('.sidebar').attr('style', 'height:' + menuHeight + 'px;');
			});
			$(document).on('click', ".toggle-btn.collapsed", function () {
				$('.apps-left').animate({marginLeft:0});
				$(this).removeClass('collapsed').addClass('expanded').animate({marginLeft:225});
			});
			$(document).on('click', ".toggle-btn.expanded, .toggle-dashboard", function () {
				$('.apps-left').animate({marginLeft:-220});
				$('.toggle-btn.expanded').removeClass('expanded').addClass('collapsed').animate({marginLeft:5});
			});
			$(document).on('click', '.browse', function(){
			 	var file = $(this).parent().parent().parent().find('.file');
			  	file.trigger('click');
			});
			$(document).on('change', '.file', function(){
			  	$(this).parent().find('.form-control').val($(this).val());/*.replace(/C:\\fakepath\\/i, '')*/
			});
			$(document).on('click', ".player-fitness.collapsed", function () {
				$(this).closest('.overview').find('.fitness-container').animate({bottom:0});
				$(this).removeClass('collapsed').addClass('expanded');
			});
			$(document).on('click', ".player-fitness.expanded", function () {
				$(this).closest('.overview').find('.fitness-container').animate({bottom:-105});
				$(this).removeClass('expanded').addClass('collapsed');
			});
			// $(document).on('click', ".player-fitness", function () {
				// $('.fitness-container').removeClass('test-hide');
				// $(this).closest('.overview').find('.fitness-container').toggleClass('test-hide');
			// });
			$(document).on('click', ".bat-switch a", function () {
				$(this).closest('.squad-tracker').find('.bat-switch a').removeClass('select');
				$(this).addClass('select');
			});
			$(document).on('click', ".multi-select a", function () {
				$(this).toggleClass('select');
			});
			$(document).on('click', ".single-select a, .single-container a", function () {
				$(this).closest('.selector-ctrl').find('.single-select a, .single-container a').removeClass('select');
				$(this).addClass('select');
			});
			$(document).on('dblclick', ".wish-list", function () {
				$(this).toggleClass('select');
			});	
			// $(document).on('click', ".nr-title a", function () {
				// $(this).toggleClass('select');
			// });
			$(document).on('click', ".nr-title a.collapsed", function () {
				$(this).closest('.nr-list').find('.nutrition-info').css('height', '100%');
				$(this).removeClass('collapsed').addClass('expanded');
			});
			$(document).on('click', ".nr-title a.expanded", function () {
				$(this).closest('.nr-list').find('.nutrition-info').animate({height:36});
				$(this).removeClass('expanded').addClass('collapsed');
			});
			
			$(function() {
				var availableTags = [
				  "Rock",
				  "Rap",
				  "Trova",
				  "Blues",
				  "Country",
				  "Folk",
				  "Jass",
				  "POP",
				  "Electronic1",
				  "Electronic2",
				  "Electronic3"
				];
				$( "#tags" ).autocomplete({
				  source: availableTags
				});
		   });
		   
		}
	}]);
	
	app.directive("innerpageHeight", ["$window", "$timeout", function(window, $timeout) {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(scope){
			var bdyHeight = $(window).height();
			var hdrHeight = $('header').outerHeight(true);
			var logoHeight = $('.logo').outerHeight(true);
			var titleHeight = $('.page-title').outerHeight(true);
			var tblHrHeight = $('.scrollable-table .table thead').outerHeight(true);
			var innerPagetitleHeight = $('.team-status .right-container .inner-page-title').outerHeight(true)
			$timeout(function (){
				$('.video-container').mouseover (function () {
					//alert('hi');
					$('.button-controls').animate({ bottom: 0}, 200);
				});
				$('.video-container').mouseleave (function () {
					$('.button-controls').animate({ bottom: -42}, 200);
				});
				$('.input-container').each(function () {
					var inputContainerHeight = $(this).outerHeight(true);
					var parentContainerHeight = $(this).parents('.page-container').height();
					var tblHdrHeight = $('.tournament-stats-page .output-container thead').height();
					var tblScrollHeight = bdyHeight - hdrHeight - titleHeight - inputContainerHeight - tblHdrHeight - 70;
					var wtchTblHdr = $('.watchlist-page .output-container th').height();
					var wtchScrollHeight = bdyHeight - hdrHeight - titleHeight - inputContainerHeight - wtchTblHdr - 35;
					//var innerPageHeight = $('.right-container .inner-page-title').outerHeight(true);
					var heightDiff = parentContainerHeight - inputContainerHeight;
						$(this).parent().find('.output-container').attr('style', 'height:' + heightDiff + 'px; position:relative; overflow:visible;');
						$(this).parent('.left-container, .right-container').find('.output-container').attr('style', 'height:' + (heightDiff - 10) + 'px; position:relative; overflow:visible;');
						$(this).parent('.wrapper').find('.output-container').attr('style', 'height:' + (heightDiff - 20) + 'px; position:relative; overflow:visible;');
						$(this).parents('.match-center-page').find('.match-center-scroll').attr('style', 'height:' + (heightDiff - 10) + 'px; position:relative; overflow:visible;');
						$(this).parents('.stats-page').find('.page-scroll').attr('style', 'height:' + (heightDiff - 10) + 'px; position:relative; overflow:visible;');
						$(this).parents('.assessment-entry').find('.output-container').attr('style', 'height:' + (heightDiff - 10) + 'px; position:relative; overflow:visible;');
						$(this).parents('.player-stats-page').find('.left-container, .right-container').attr('style', 'height:' + (heightDiff - 15) + 'px; position:relative; overflow:visible;');
						$(this).parents('.tournament-stats-page').attr('style', 'height:auto;');
						$(this).parents('.tournament-stats-page').find('.output-container').attr('style', 'height:auto;');
						$(this).parents('.tournament-stats-page').find('.output-container .scrollable-table tbody').attr('style', 'max-height:' + tblScrollHeight + 'px !important; position:relative; overflow:visible;');
						$(this).parents('.watchlist-page').find('.output-container .watch-scrollable').attr('style', 'max-height:' + wtchScrollHeight + 'px; position:relative; overflow:visible;');
					//alert(inputContainerHeight);
				});
				$('.dashboard-container .event-time-type .event-name').each(function () {
					var myTag = $(this).text();
					if (myTag.length > 32) {
					  var truncated = myTag.trim().substring(0, 32) + "…";
					  $(this).text(truncated);
					}
				});
			});
			var msgLGroupHeight = $('.msg-left .msg-group').outerHeight(true);
			var msgLHeaderHeight = $('.msg-left .msg-header').outerHeight(true);
			var msgRHeaderHeight = $('.msg-right .msg-header').outerHeight(true);
			var pgmLHeaderHeight = $('.pgm-left .msg-header').outerHeight(true);
			var pgmFilterHeight = $('.pgm-filter').outerHeight(true);
			var innerpageHeight1 = bdyHeight - logoHeight;
			var innerpageHeight2 = bdyHeight - hdrHeight - titleHeight;
			//var innerpageHeight3 = innerpageHeight2 - inputContainerHeight - 10;
			var innerpageHeight4 = innerpageHeight2 - msgLGroupHeight - msgLHeaderHeight;
			var innerpageHeight5 = innerpageHeight2 - msgRHeaderHeight - 82;
			var innerpageHeight6 = innerpageHeight2 - pgmLHeaderHeight - pgmFilterHeight - 10;
			var innerpageHeight7 = innerpageHeight2 - pgmLHeaderHeight - 10;
			var innerpageHeight8 = innerpageHeight2 - 10;
			var innerpageHeight9 = bdyHeight - hdrHeight - titleHeight - tblHrHeight - 30;
			var innerpageHeight10 = bdyHeight - hdrHeight - titleHeight - 10;
			var innerpageHeight11 = bdyHeight - hdrHeight - titleHeight - innerPagetitleHeight - tblHrHeight - 55;
			var plannerPageWidth = $('.page-container, .msg-page, .profile-page').outerWidth(true);
			var plannerLeft = $('.planner-left, .msg-left, .match-center-right, .profile-left, .left-container').outerWidth(true);
			var scrollHeight = bdyHeight - hdrHeight;
			var searchHeight = scrollHeight - $('.custom-cmb').outerHeight() - $('.search-player .secondary-tab').outerHeight() - $('.search-player .search-container').outerHeight() - 35;
			$('.search-player .search-panel').attr('style', 'height:' + scrollHeight + 'px;');
			$('.search-player .search-filter').attr('style', 'height:' + searchHeight + 'px;');
			$('.body').attr('style', 'height:' + bdyHeight + 'px;');
			$('.dashboard-menu').attr('style', 'height:' + innerpageHeight1 + 'px;');
			$('.page-container,.dashboard-container').attr('style', 'height:' + (innerpageHeight2 - 10) + 'px;');
			$('.planner-right, .msg-right').attr('style', 'width:' + (plannerPageWidth - plannerLeft - 10) + 'px;');
			$('.match-center-left').attr('style', 'width:' + (plannerPageWidth - plannerLeft) + 'px;');
			$('.profile-left, .left-container').attr('style', 'height:' + (innerpageHeight2 - 10) + 'px;');
			$('.profile-right, .right-container').attr('style', 'width:' + (plannerPageWidth - plannerLeft - 10) + 'px; height:' + (innerpageHeight2 - 10) + 'px;');
			$('.msg-container ul').attr('style', 'height:' + innerpageHeight4 + 'px;');
			$('.msg-log .msg-history').attr('style', 'height:' + innerpageHeight5 + 'px;');
			$('.pgm-left .pgm-listings').attr('style', 'height:' + innerpageHeight6 + 'px;');
			$('.pgm-right .pgm-listings').attr('style', 'height:' + innerpageHeight7 + 'px;');
			$('.pgm-left .training-listings, .pgm-right .training-listings').attr('style', 'height:' + innerpageHeight8 + 'px;');
			$('.coach-report-page .scrollable-table tbody').attr('style', 'height:' + innerpageHeight9 + 'px;');
			$('.coach-report-page .coach-container').attr('style', 'height:' + innerpageHeight10 + 'px;');
			$('.team-status .scrollable-table tbody').attr('style', 'max-height:' + innerpageHeight11 + 'px;');
			//alert(innerpageHeight9);
			$('.txt-editor').tagEditor({ initialTags: ['Hello', 'World', 'Example', 'Tags'], delimiter: ',', placeholder: 'Enter tags ...' }).css('display', 'block').attr('readonly', true);
			$(window).bind('resize', function(){
				link(scope);
         		//scope.$digest();
       		});
			progressAnimation();
	       	$('.btn-with-txt-bx .form-control').attr('style', 'width:' + ($('.btn-with-txt-bx').outerWidth(true) - 33) + 'px; display:inline-block; vertical-align:middle;');
			$(document).on('click', ".search-icon.expand", function () {
				$('.search-player.collapsed').removeClass('collapsed').addClass('expand').animate({ marginRight: '0px' });
				//$('.left-menu.expand').removeClass('expand').addClass('collapsed').animate({ marginLeft: '-250px' });
				$(this).removeClass('expand').addClass('collapsed');
			});
			$(document).on('click', ".search-icon.collapsed, .element-item .player-name", function () {
				$('.search-player.expand').removeClass('expand').addClass('collapsed').animate({ marginRight: '-250px' });
				$('.search-icon.collapsed').removeClass('collapsed').addClass('expand');
			});
			$(document).on('click', ".main-tab a, .secondary-tab > a, .third-tab a, .plan-tab a", function () {
				var parentRelID = $(this).parent().attr('rel');
				var parentClassName = $(this).parent().attr('class');
				var relID = $(this).attr('rel');
				//alert(parentRelID);
				$('.' + parentRelID + ' .' + parentClassName + '-container').hide();
				$(this).parent().find('a').removeClass('select');
				$(this).addClass('select');
				$('.' + parentRelID + ' .' + parentClassName + '-container.' + relID).show();
				var maxHeight = 0;
				$(".h2h .h2h-container").each(function () {
					if ($(this).outerHeight(true) > maxHeight) { maxHeight = $(this).height(); }
				});
				$(".h2h-container").outerHeight(maxHeight);
				progressAnimation();
			});
			$(document).on('change', ".fileupload", function () {
				$('.upload-txt').attr('value', $('.fileupload-container').val());
			});
			$('.tmt-teams .competition-name').each(function () {
				var myTag = $(this).text();
				//alert(myTag.length);
				if (myTag.length > 32) {
				  var truncated = myTag.trim().substring(0, 32) + "…";
				  $(this).text(truncated);
				}
			});
			
			
		   $(function() {
				window.fs_test = $('.test').fSelect();
			});
			
			
			$(function () {
			  $('[data-toggle="popover"]').popover()
			})
			 $('[data-toggle="popover-click"]').popover({
			  html: true,
			  trigger: 'hover',
			  placement: 'top',
			  content: function () { return '<img src="' + $(this).data('img') + '" />'; }
			});
			
			$( function() {
				$( "#slider-range1" ).slider({
				  range: true,
				  min: 0,
				  max: 20,
				  values: [ 0, 5 ],
				  slide: function( event, ui ) {
					$( "#over01" ).val( "From Over " + ui.values[ 0 ] + " - End Over " + ui.values[ 1 ] );
				  }
				});
				$( "#over01" ).val( "From Over " + $( "#slider-range1" ).slider( "values", 0 ) +
				  " - End Over " + $( "#slider-range1" ).slider( "values", 1 ) );
				  
				  $( "#slider-range2" ).slider({
				  range: true,
				  min: 0,
				  max: 20,
				  values: [ 6, 10 ],
				  slide: function( event, ui ) {
					$( "#over02" ).val( "From Over " + ui.values[ 0 ] + " - End Over " + ui.values[ 1 ] );
				  }
				});
				$( "#over02" ).val( "From Over " + $( "#slider-range2" ).slider( "values", 0 ) +
				  " - End Over " + $( "#slider-range2" ).slider( "values", 1 ) );
				  
				  
				  $( "#slider-range3" ).slider({
				  range: true,
				  min: 0,
				  max: 20,
				  values: [ 11, 15 ],
				  slide: function( event, ui ) {
					$( "#over03" ).val( "From Over " + ui.values[ 0 ] + " - End Over " + ui.values[ 1 ] );
				  }
				});
				$( "#over03" ).val( "From Over " + $( "#slider-range3" ).slider( "values", 0 ) +
				  " - End Over " + $( "#slider-range3" ).slider( "values", 1 ) );
				  
				   $( "#slider-range4" ).slider({
				  range: true,
				  min: 0,
				  max: 20,
				  values: [ 16, 20 ],
				  slide: function( event, ui ) {
					$( "#over04" ).val( "From Over " + ui.values[ 0 ] + " - End Over " + ui.values[ 1 ] );
				  }
				});
				$( "#over04" ).val( "From Over " + $( "#slider-range4" ).slider( "values", 0 ) +
				  " - End Over " + $( "#slider-range4" ).slider( "values", 1 ) );
				  
			  } );
			
			function progressAnimation()
			{
				//alert('hi');
				$('.linear-chart').each(function() {
					$(this).find('.linear-value').animate({
					  width:$(this).attr('data-percentage')
					},2000);
					
					$(this).find('.progress-number-mark').animate(
					  {left:$(this).attr('data-percentage')},
					  {
					   duration: 2000,
					   step: function(now, fx) {
						 var data = Math.round(now);
						 $(this).find('.percent').html(data + '%');
					   }
					});
				});
			}
			var owl01 = $(".owl-carousel.team-player");
			owl01.owlCarousel({
				responsive: {
					0: {
						items: 1
					},
					480: {
						items: 2
					},
					600: {
						items: 3
					},
					1000: {
						items: 5
					}
				},
				autoplay: false,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				loop: false,
				margin:25,
				pagination: true,
				nav: true,
				navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
			});
			var owl02 = $(".owl-carousel.matches");
			owl02.owlCarousel({
				responsive: {
					0: {
						items: 1
					},
					480: {
						items: 2
					},
					600: {
						items: 3
					},
					1000: {
						items: 4
					}
				},
				autoplay: false,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				loop: false,
				margin:25,
				pagination: true,
				nav: true,
				navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
			});
			var owl03 = $(".owl-carousel.team-widget");
			owl03.owlCarousel({
				responsive: {
					0: {
						items: 1
					},
					480: {
						items: 2
					},
					600: {
						items: 3
					},
					1000: {
						items: 4
					}
				},
				autoplay: false,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				loop: false,
				margin:25,
				pagination: true,
				nav: true,
				navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
			});
			/* Training Planner Date Carousel */			
			var owl04 = $(".owl-carousel.training-date");
			owl04.owlCarousel({
				responsive: {
					0: {
						items: 1
					},
					480: {
						items: 4
					},
					600: {
						items: 6
					},
					1000: {
						items: 12
					}
				},
				autoplay: false,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				loop: false,
				margin:10,
				pagination: true,
				nav: true,
				navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
			});	

			$('.owl-carousel.soap-document').owlCarousel({
				items:1,
				margin:10,
				autoHeight:true
			});
		}
	}]);
	
	app.directive("alertNotification", ["$document", function(document){
		return{
			link: link,
			restrict:'A'
		};
		function link()
		{
			$(document).on('click', ".alert-notification", function () {
				$('.theme-selector').hide();
				$('.profile-popup').hide();
				$('.alert-popup').toggle();
				return false;
			});
			$(document).on('click', ".theme-switch", function () {
				$('.alert-popup').hide();
				$('.theme-selector').toggle();
				return false;
			});
			$(document).on('click', ".user-profile", function () {
				$('.alert-popup').hide();
				$('.theme-selector').hide();
				$('.profile-popup').toggle();
				return false;
			});
			$(document).click(function (event) {
				var msglist = $('.alert-notification');
				if (!$(event.target).is('.alert-popup, .profile-popup')) {
					if (msglist.is(":visible")) {
						$('.alert-popup, .profile-popup').fadeOut();
					}
				}
			});
		}
	}]);
	
	app.directive("maxHeight", ["$document", function(document){
		return{
			link: findMax,
			restrict:'A'
		};
		function findMax()
		{
			var maxHeight = 0;
			$(".get-max-height video").each(function () {
				if ($(this).outerHeight(true) > maxHeight) { maxHeight = $(this).outerHeight(true); }
			});
			$(".get-max-height .white").outerHeight(maxHeight + 60);
			var commentSection = $('.comments-section').outerHeight(true);
			var commentPost = $('.comments-section .post-by').outerHeight(true);
			var addComment = $('.comments-section .add-comments').outerHeight(true);
			$('.view-comments').attr('style', 'height:' + (commentSection - commentPost - addComment - 30) + 'px;');
		}
	}]);
	
	app.directive("archiveClick", function(){
		return{
			link: link,
			restrict:'A'
		};
		function link()
		{
			$(document).on('click', ".archive-link", function () {
				$('.archive-container').slideToggle();
			});
		}
	});
	
	app.directive("getIconText", ["$window", "$document", function(window, document) {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
			$(document).on('click', ".view-by-icon", function() {
				var parentClass = $(this).parent().attr('class');
				$('.' + parentClass + ' .dd-panel').toggle();
				return false;
			});
			$(document).click(function(event) {
				var msglist = $('.dd-panel');
				if(!$(event.target).is('.dd-panel')) {
					if(msglist.is(":visible")) {
						$('.dd-panel').fadeOut();
					}
				}
			});
			$(document).on('click', ".dd-panel a", function () {
				var parentClass = $(this).parent().parent().attr('class');
				$('.' + parentClass + ' .dd-panel a').removeClass('select');
				var iconClass = $(this).find('i').attr('class');
				var iconText = $(this).find('span').text();
				$('.' + parentClass + ' .view-by-icon i').removeClass().addClass(iconClass);
				$('.' + parentClass + ' .view-by-icon span').empty().text(iconText);
			});
		}
	}]);
	app.directive("getPlayer", ["$window", "$document", function(window, document) {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
			$(document).on('click', ".view-by-icon", function() {
				var parentClass = $(this).parent().attr('class');
				$('.' + parentClass + ' .dd-panel').toggle();
				return false;
			});
			$(document).click(function(event) {
				var msglist = $('.dd-panel');
				if(!$(event.target).is('.dd-panel')) {
					if(msglist.is(":visible")) {
						$('.dd-panel').fadeOut();
					}
				}
			});
			// $(document).on('click', ".dd-panel a", function () {
				// var parentClass = $(this).parent().parent().attr('class');
				// $('.' + parentClass + ' .dd-panel a').removeClass('select');
				// var iconClass = $(this).find('i').attr('class');
				// var iconText = $(this).find('span').text();
				// $('.' + parentClass + ' .view-by-icon i').removeClass().addClass(iconClass);
				// $('.' + parentClass + ' .view-by-icon span').empty().text(iconText);
			// });
		}
	}]);
	
	app.directive("txtEditor", function() {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
			$(document).on('click', ".dashboard-tabs a", function () {
				var parentRelID = $(this).parent().attr('rel');
				//alert(parentRelID);
				var relID = $(this).attr('rel');
				$('.' + parentRelID + ' .dashboard-tabs-container').hide();
				$(this).parent().find('a').removeClass('select');
				$(this).addClass('select');
				$('.' + parentRelID + ' .dashboard-tabs-container.' + relID).show();
			});
		}
	});

	app.directive("msgPageTab", ["$document", function(document){
		return{
			link: link,
			restrict:'A'
		};
		function link()
		{
			$(document).on('click', ".msg-left .msg-group a", function () {
				var relID = $(this).attr('rel');
				$('.msg-section').hide();
				$('.msg-group a').removeClass('select');
				$(this).addClass('select');
				$('.msg-section.' + relID).show();
			});
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

	app.directive("programPage", ["$timeout", function($timeout){
		return{
			link: link,
			restrict:'A'
		};
		function link()
		{
			$timeout(function (){
				$('.pgm-left .pgm-name span').each(function () {
					var myTag = $(this).text();
					if (myTag.length > 40) {
					  var truncated = myTag.trim().substring(0, 40) + "…";
					  $(this).text(truncated);
					}
				});
			});
			$(document).on('click', ".training-action a", function () {
				var relID = $(this).attr('rel');
				//var parentID = $(this).parent().parent();
				$('.action-panel').hide();
				$('.action-panel.' + relID).show();
			});
		}
	}]);
	
	app.directive("drawSign", ["$document", function(document){
		return{
			link: link,
			restrict:'A'
		};
		function link()
		{
				var $canvas,
					onResize = function(event) {
					  $canvas.attr({
						height: window.innerHeight,
						width: window.innerWidth
					  });
					};

				$(document).ready(function() {
				  $canvas = $('canvas');
				  window.addEventListener('orientationchange', onResize, false);
				  window.addEventListener('resize', onResize, false);
				  onResize();

				  $('.drawpad').signaturePad({
					drawOnly: true,
					defaultAction: 'drawIt',
					validateFields: false,
					lineWidth: 0,
					output: null,
					sigNav: null,
					name: null,
					typed: null,
					clear: 'input[type=reset]',
					typeIt: null,
					drawIt: null,
					typeItDesc: null,
					drawItDesc: null
				  });
				});
		}
	}]);
	
	app.directive("newLoading", function() {
		return {
			link: link,
			restrict: 'A'
		 };
		function link(){
			$('.loader').ClassyLoader({
				percentage: 100,
				speed: 20,
				width:200,
				height:200,
				fontSize: '24px',
				fontColor: 'white',
				diameter: 50,
				lineColor: 'rgba(65,203,82,1)',
				remainingLineColor: 'rgba(200,200,200,0.4)',
				lineWidth: 10
			});
			setTimeout(function() {
				$('.loader, .div-loader-container .overlay').fadeOut();
			},3000);
		}
	});
	
	
}());