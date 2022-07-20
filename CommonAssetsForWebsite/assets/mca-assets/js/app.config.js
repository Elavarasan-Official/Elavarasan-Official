(function () {
	'use strict';
    var app = angular.module("MCAWebsite", ['ngRoute']);
	app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
    .when('/', {
				templateUrl: 'home.html'
			})
            .when('/fixtures', {
                  templateUrl: 'fixtures.html'
            })
            .when('/results', {
                  templateUrl: 'results.html'
            })
            .when('/standings', {
                  templateUrl: 'standings.html'
            })
            .when('/stats', {
                  templateUrl: 'stats.html'
            })
            .when('/teams', {
                  templateUrl: 'team-list.html'
            })
            .when('/team-players', {
                  templateUrl: 'players.html'
            })
            .when('/leader-board', {
                  templateUrl: 'leader-board.html'
            })
            .when('/tab-view', {
                  templateUrl: 'home-page-tab.html'
            })
            .when('/400', {
                  templateUrl: '400.html'
            })
            .when('/401', {
                  templateUrl: '401.html'
            })
            .when('/403', {
                  templateUrl: '403.html'
            })
            .when('/404', {
                  templateUrl: '404.html'
            })
            .when('/500', {
                  templateUrl: '500.html'
            })
            .otherwise({
                redirectTo: '/'
            });
	}]);
}());
	