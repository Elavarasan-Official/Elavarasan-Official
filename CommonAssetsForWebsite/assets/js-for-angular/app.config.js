(function () {
	'use strict';
    var app = angular.module("AlphaProTracker", ['ui.router', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ui.calendar', 'multipleDatePicker']);
	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
		.state("/", {
			url : '/',
			templateUrl : "/dashboard.html"
		})
		.state("/dashboard", {
			url : '/dashboard',
			templateUrl : "/dashboard.html"
		})
		.state("/dashboard2", {
			url : '/dashboard2',
			templateUrl : "/dashboard2.html"
		})
		.state("/planner", {
			url : '/planner',
			templateUrl : "/planner.html"
		})
		.state("/profile", {
			url : '/profile',
			templateUrl : "/profile.html"
		})
		.state("/all-components", {
			url : '/master/all-components',
			templateUrl : "/master/all-components.html"
		})
		.state("/program", {
			url : '/program',
			templateUrl : "/create-program.html"
		})
		.state("/program2", {
			url : '/program2',
			templateUrl : "/create-program2.html"
		})
		.state("/exercise-builder", {
			url : '/exercise-builder',
			templateUrl : "/exercise-builder.html"
		})
		.state("/assign-program", {
			url : '/assign-program',
			templateUrl : "/create-program3.html"
		})
		.state("/program-report", {
			url : '/program-report',
			templateUrl : "/program-report.html"
		})
		.state("/team-status", {
			url : '/team-status',
			templateUrl : "/program-team-status.html"
		})
		.state("/player-status", {
			url : '/player-status',
			templateUrl : "/program-player-status.html"
		})
		.state("/player-report", {
			url : '/player-report',
			templateUrl : "/program-player-report.html"
		})
		.state("/coach-report", {
			url : '/coach-report',
			templateUrl : "/coach-report.html"
		})
		.state("/messages", {
			url : '/messages',
			templateUrl : "/messages.html"
		})
		.state("/assessment", {
			url : '/assessment',
			templateUrl : "/assessment.html"
		})
		.state("/assessment-entry", {
			url : '/assessment-entry',
			templateUrl : "/assessment-entry.html"
		})
		.state("/assessment-template", {
			url : '/assessment-template',
			templateUrl : "/assessment-template.html"
		})
		.state("/multi-player-chart", {
			url : '/multi-player-chart',
			templateUrl : "/multiplayer-chart.html"
		})
		.state("/match-center", {
			url : '/match-center',
			templateUrl : "/match-center.html"
		})
		.state("/match-center-detail", {
			url : '/match-center-detail',
			templateUrl : "/match-center-detail.html"
		})
		.state("/video-gallery", {
			url : '/video-gallery',
			templateUrl : "/video-gallery.html"
		})
		.state("/video", {
			url : '/video',
			templateUrl : "/video.html"
		})
		.state("/document-gallery", {
			url : '/document-gallery',
			templateUrl : "/document-gallery.html"
		})
		.state("/fixtures", {
			url : '/fixtures',
			templateUrl : "/fixtures.html"
		})
		.state("/results", {
			url : '/results',
			templateUrl : "/results.html"
		})
		.state("/stats", {
			url : '/stats',
			templateUrl : "/stats.html"
		})
		.state("/teams", {
			url : '/teams',
			templateUrl : "/teams.html"
		})
		.state("/nutrition", {
			url : '/nutrition',
			templateUrl : "/nutrition.html"
		})
		.state("/nutrition2", {
			url : '/nutrition2',
			templateUrl : "/nutrition02.html"
		})
		.state("/injury", {
			url : '/injury',
			templateUrl : "/injury.html"
		})
		.state("/tournament", {
			url : '/tournament',
			templateUrl : "/tournaments.html"
		})
		.state("/tournament-list", {
			url : '/tournament-list',
			templateUrl : "/tournaments-list.html"
		})
		.state("/tournament-stats", {
			url : '/tournament-stats',
			templateUrl : "/tournament-stats.html"
		})
		.state("/watch-list", {
			url : '/watch-list',
			templateUrl : "/watch-list.html"
		})
		.state("/player-stats", {
			url : '/player-stats',
			templateUrl : "/player-stats.html"
		})
		.state("/tournament-freez", {
			url : '/tournament-freez',
			templateUrl : "/tournaments-freez.html"
		})
		.state("/training", {
			url : '/training',
			templateUrl : "/training-log.html"
		})
		.state("/training-planner", {
			url : '/training-planner',
			templateUrl : "/training-planner.html"
		})
		.state("/match-details", { 
			url : '/match-details',
			templateUrl : "/match-details.html"
		})
		.state("/soap", { 
			url : '/soap',
			templateUrl : "/soap.html"
		})
		.state("/soap2", { 
			url : '/soap2',
			templateUrl : "/soap2.html"
		})
		.state("/soap-history", { 
			url : '/soap-history',
			templateUrl : "/soap-history.html"
		})
		.state("/illness", { 
			url : '/illness',
			templateUrl : "/illness-tracker.html"
		})
		.state("/test-draw", { 
			url : '/test-draw',
			templateUrl : "/test-draw.html"
		})
		.state("/file-upload", { 
			url : '/file-upload',
			templateUrl : "/file-upload.html"
		})
		.state("/game-dashboard", { 
			url : '/game-dashboard',
			templateUrl : "/game-dashboard.html"
		})
		.state("/player-list", { 
			url : '/player-list',
			templateUrl : "/player-list.html"
		})
		.state("/swimming-player-profile", { 
			url : '/swimming-player-profile',
			templateUrl : "/swimming-player-profile.html"
		})
		.state("/football-player-profile", { 
			url : '/football-player-profile',
			templateUrl : "/football-player-profile.html"
		})
		.state("/archery-player-profile", { 
			url : '/archery-player-profile',
			templateUrl : "/archery-player-profile.html"
		})
		.state("/trackfield-player-profile", { 
			url : '/trackfield-player-profile',
			templateUrl : "/trackfield-player-profile.html"
		})
		.state("/client-registration", { 
			url : '/client-registration',
			templateUrl : "/client-registration.html"
		})
		.state("/app-configuration", { 
			url : '/app-configuration',
			templateUrl : "/app-configuration.html"
		})
		.state("/documents-list", { 
			url : '/documents-list',
			templateUrl : "/documents-list.html"
		})
		.state("/videos-documents", { 
			url : '/videos-documents',
			templateUrl : "/video-document.html"
		})
	});
}());