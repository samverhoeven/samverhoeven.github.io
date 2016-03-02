var controllers = angular.module("controllers", []);

controllers.controller("leaguesCtrl", function ($scope, $http, $rootScope) {
    var leaguesUrl = "http://api.football-data.org/v1/soccerseasons";

    $scope.filterValues = [394, 396, 398, 399, 401]; //id's van Bundesliga, Ligue1, Premier League, Primera Division, Seria A
    $scope.leagueFilter = function (value) {//filter om enkel de competities in $scope.filterValue te weergeven
        return ($scope.filterValues.indexOf(value.id) !== -1);
    };

    $http({//competities laden
        method: "GET",
        url: leaguesUrl,
        headers: {"X-Auth-Token": $rootScope.footballAuth}
    }).then(function (response) {
        $scope.leaguesData = response.data;
    });
});

controllers.controller("tableCtrl", function ($scope, $http, $rootScope, $routeParams, $location, $ngSilentLocation) {
    var leagueParam = $routeParams.leagueId;

    var leaguesUrl = "http://api.football-data.org/v1/soccerseasons";

    $scope.filterValues = [394, 396, 398, 399, 401]; //id's van Bundesliga, Ligue1, Premier League, Primera Division, Seria A
    $scope.leagueFilter = function (value) {//filter om enkel de competities in $scope.filterValue te weergeven
        return ($scope.filterValues.indexOf(value.id) !== -1);
    };

    $http({//competities laden
        method: "GET",
        url: leaguesUrl,
        headers: {"X-Auth-Token": $rootScope.footballAuth}
    }).then(function (response) {
        $scope.leaguesData = response.data;
        for (i = 0; i < $scope.leaguesData.length; i++) {//om de initiele waarde van selectedLeague in dropdown menu te setten
            if ($scope.leaguesData[i].id == leagueParam) {
                $scope.selectedLeague = $scope.leaguesData[i];
            }
        }
    });

    var regex = /.*?(\d+)$/;

    $scope.showTable = function (selectedLeague) {//wordt zowel bij navigeren vanuit /competities als bij dropdown list gebruikt
        var url2 = "http://api.football-data.org/v1/soccerseasons/" + selectedLeague + "/leagueTable";

        $http({//rangschikking van bepaalde competitie laden
            method: "GET",
            url: url2,
            headers: {"X-Auth-Token": $rootScope.footballAuth}
        }).then(function (response) {
            $scope.leaguetableData = response.data;
            for (i = 0; i < $scope.leaguetableData.standing.length; i++) { //teamId toevoegen aan object adhv regex
                var teamId = regex.exec($scope.leaguetableData.standing[i]._links.team.href);
                $scope.leaguetableData.standing[i].teamId = teamId[1];
            }

            var competitionId = regex.exec($scope.leaguetableData._links.soccerseason.href);
            $scope.leaguetableData.competitionId = competitionId[1]; //zet competitionId in leaguetableData adhv regex

            /*url veranderen als andere competitie geselecteerd wordt in dropdown menu
             * false argument binnen $location path duid er op dat pagina niet ververst moet worden*/
            //$location.path("/competities/" + $scope.leaguetableData.competitionId, false);

            //Veranderen van url zonder refresh adhv ngSilentLocation
            $ngSilentLocation.silent("/competities/" + $scope.leaguetableData.competitionId);
        });
    };

    $scope.showTable(leagueParam); //bij de eerste keer laden van tableCtrl
});

controllers.controller("teamCtrl", function ($scope, $http, $routeParams, $rootScope) {
    var param = $routeParams.teamId;
    var urlTeam = "http://api.football-data.org/v1/teams/" + param + "";
    var urlSpelers = "http://api.football-data.org/v1/teams/" + param + "/players";

    $scope.orderDir = true;

    $http({//teamgegevens laden
        method: "GET",
        url: urlTeam,
        headers: {"X-Auth-Token": $rootScope.footballAuth}
    }).then(function (response) {
        $scope.teamData = response.data;
    });

    $http({//gegevens van spelers van bepaald team laden
        method: "GET",
        url: urlSpelers,
        headers: {"X-Auth-Token": $rootScope.footballAuth}
    }).then(function (response) {
        $scope.spelersData = response.data.players;
        for (i = 0; i < $scope.spelersData.length; i++) {
            //marketValue omvormen van string naar int
            if ($scope.spelersData[i].marketValue != null) {//checken of er een marktwaarde is gegeven
                $scope.spelersData[i].marketValue = $scope.spelersData[i].marketValue.replace(/(,|€|\s)/g, "");
                $scope.spelersData[i].marketValue = parseInt($scope.spelersData[i].marketValue);
            } else {//als marktwaarde niet gegeven is, marketValue uit object verwijderen en marketValueNB in de plaats zetten
                delete $scope.spelersData[i]['marketValue'];
                $scope.spelersData[i].marketValueNB = "Niet bekend";
            }

            //positions vertalen naar Nederlands
            var position = "";
            switch ($scope.spelersData[i].position) {
                case "Keeper":
                    position = "Doelman";
                    break;
                case "Centre Back":
                    position = "Centrale Verdediger";
                    break;
                case "Left-Back":
                    position = "Linkse Verdediger";
                    break;
                case "Right-Back":
                    position = "Rechtse Verdediger";
                    break;
                case "Defensive Midfield":
                    position = "Verdedigende Middenvelder";
                    break;
                case "Central Midfield":
                    position = "Centrale Middenvelder";
                    break;
                case "Attacking Midfield":
                    position = "Aanvallende Middenvelder";
                    break;
                case "Right Wing":
                    position = "Rechtse Vleugelspeler";
                    break;
                case "Left Wing":
                    position = "Linkse Vleugelspeler";
                    break;
                case "Secondary Striker":
                    position = "Tweede Spits";
                    break;
                case "Centre Forward":
                    position = "Spits";
                    break;
                default:
                    position = "";
            }
            $scope.spelersData[i].position = position;
        }
    });

    $scope.orderPlayersByMe = function (x) {//om spelers te ranschikking op bepaalde eigenschap
        $scope.orderPlayersBy = x;
        $scope.orderDir = !$scope.orderDir;
    };
});

