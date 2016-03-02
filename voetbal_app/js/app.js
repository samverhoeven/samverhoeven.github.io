var app = angular.module('myApp', [
    "ngSilent",
    "ngRoute",
    "controllers"
]);

app.run(function ($rootScope, $route, $location) {
    $rootScope.footballAuth = "ca3b6f7b377b44ab9b04d3cdc20fc3ca";
});

app.config(function ($routeProvider) {
    $routeProvider.
            when("/competities", {
                templateUrl: "partials/competities.html",
                controller: "leaguesCtrl"
            }).
            when("/competities/:leagueId", {
                templateUrl: "partials/rangschikking.html",
                controller: "tableCtrl"
            }).
            when("/teams/:teamId", {
                templateUrl: "partials/teaminfo.html",
                controller: "teamCtrl"
            }).
            otherwise({
                redirectTo: "/competities"
            });
});


