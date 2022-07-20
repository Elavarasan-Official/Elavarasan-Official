(function () {
	'use strict';
    var app = angular.module("CSCSWebsite", ['ngRoute']);
	app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
    .when('/', {
				templateUrl: 'home.html'
			})
            .when('/fixtures', {
                  templateUrl: 'fixtures.html'
            })
            .when('/fixtures-old', {
                  templateUrl: 'fixtures-old.html'
            })
            .when('/results', {
                  templateUrl: 'results.html'
            })
            .when('/teams', {
                  templateUrl: 'teams.html'
            })
            .when('/teams-detailed', {
                  templateUrl: 'teams-detailed.html'
            })
            .when('/photos', {
                  templateUrl: 'photos.html'
            })
            .when('/photos-detailed', {
                  templateUrl: 'photos-detailed.html'
            })
            .when('/videos', {
                  templateUrl: 'videos.html'
            })
            .when('/hall-of-fame', {
                  templateUrl: 'hall-of-fame.html'
            })
            .when('/fame-detailed', {
                  templateUrl: 'fame-detailed.html'
            })
            .when('/committee', {
                  templateUrl: 'committee.html'
            })
            .when('/district-teams', {
                  templateUrl: 'district-teams.html'
            })
            .when('/match-centre', {
                  templateUrl: 'match-centre.html'
            })
            .when('/contact-us', {
                  templateUrl: 'contact-us.html'
            })
            .when('/ground', {
                  templateUrl: 'ground.html'
            })
            .when('/stats', {
                  templateUrl: 'stats.html'
            })
            .when('/stats-delailed', {
                  templateUrl: 'stats-delailed-tab.html'
            })
            .when('/most-runs', {
                  templateUrl: 'most-runs.html'
            })
            .when('/most-wickets', {
                  templateUrl: 'most-wickets.html'
            })
            .when('/best-economy', {
                  templateUrl: 'best-economy.html'
            })
            .when('/best-strikerate', {
                  templateUrl: 'best-strikerate.html'
            })
            .when('/playing-conditions', {
                  templateUrl: 'playing-conditions.html'
            })
            .when('/bcci-domestic', {
                  templateUrl: 'bcci-domestic.html'
            })
            .when('/bcci-domestic-live', {
                  templateUrl: 'bcci-domestic-live.html'
            })
            .when('/bcci-domestic-fixtures', {
                  templateUrl: 'bcci-domestic-fixtures.html'
            })
            .when('/bcci-domestic-results', {
                  templateUrl: 'bcci-domestic-results.html'
            })
            .when('/bcci-domestic-archives', {
                  templateUrl: 'bcci-domestic-archives.html'
            })
            .when('/cscs-live', {
                  templateUrl: 'cscs-live.html'
            })
            .when('/cscs-fixtures', {
                  templateUrl: 'cscs-fixtures.html'
            })
            .when('/cscs-results', {
                  templateUrl: 'cscs-results.html'
            })
            .when('/cscs-standings', {
                  templateUrl: 'cscs-standings.html'
            })
            .when('/cscs-stats', {
                  templateUrl: 'cscs-stats.html'
            })
            .when('/cscs-archives', {
                  templateUrl: 'cscs-archives.html'
            })
            .when('/district-players', {
                  templateUrl: 'district-players.html'
            })
            .when('/district-officials', {
                  templateUrl: 'district-officials.html'
            })
            .when('/district-ground', {
                  templateUrl: 'district-ground.html'
            })
            .when('/district-team-players', {
                  templateUrl: 'district-team-players.html'
            })
            .when('/news', {
                  templateUrl: 'news.html'
            })
            .when('/news-detailed', {
                  templateUrl: 'news-detailed.html'
            })
            .when('/cscs-members', {
                  templateUrl: 'cscs-members.html'
            })
            .when('/player-renewal', {
                  templateUrl: 'player-renewal.html'
            })
            .otherwise({
                redirectTo: '/'
            });
	}]);
}());
	