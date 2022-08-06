(function () {
	'use strict';
    var app = angular.module("ODMSApplication");
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
			$(document).on('click', ".single-select a", function () {
				$(this).closest('.selector-ctrl').find('.single-select a').removeClass('select');
				$(this).addClass('select');
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
			$timeout(function (){
				$('.video-container').mouseover (function () {
					$('.button-controls').animate({ bottom: 0}, 200);
				});
				$('.video-container').mouseleave (function () {
					$('.button-controls').animate({ bottom: -42}, 200);
				});
			});
			$(window).bind('resize', function(){
				link(scope);
         		//scope.$digest();
       		});
			progressAnimation();
	       	
			$(document).on('click', ".main-tab a, .secondary-tab > a, .third-tab a", function () {
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
		}
	}]);
	app.directive('chooseFile', function() {
		return {
			link: function (scope, elem, attrs) {
			var button = elem.find('button');
			var input = angular.element(elem[0].querySelector('input#fileInput'));
			button.bind('click', function() {
				input[0].click();
			});
			input.bind('change', function(e) {
				scope.$apply(function() {
					var files = e.target.files;
					if (files[0]) {
						scope.fileName = files[0].name;
					} else {
						scope.fileName = null;
					}
				});
			});
		  }
		};
	});
	app.directive("alertNotification", ["$document", function(document){
		return{
			link: link,
			restrict:'A'
		};
		function link()
		{
			$(document).on('click', ".alert-notification", function () {
				$('.alert-popup').hide();
				$(this).parent().find('.alert-popup').toggle();
				return false;
			});
			$(document).click(function (event) {
				var msglist = $('.alert-notification');
				if (!$(event.target).is('.alert-popup')) {
					if (msglist.is(":visible")) {
						$('.alert-popup').fadeOut();
					}
				}
			});
		}
	}]);	
}());