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
    var regex = /.*?(\d+)$/;
    var param = $routeParams.teamId;
    var urlTeam = "http://api.football-data.org/v1/teams/" + param + "";
    var urlFixtures = "http://api.football-data.org/v1/teams/" + param + "/fixtures";
    var urlSpelers = "http://api.football-data.org/v1/teams/" + param + "/players";
    var vandaag = new Date();

    $scope.orderDir = true;
    $scope.fixturesVisible = false;
    $scope.playersVisible = false;

    $http({//teamgegevens laden
        method: "GET",
        url: urlTeam,
        headers: {"X-Auth-Token": $rootScope.footballAuth}
    }).success(function (response) {
        $scope.teamData = response;
        console.log($scope.teamData);
    }).error(function (error) {
        console.log("error teamData");
    });

    $http({//wedstrijden laden
        method: "GET",
        url: urlFixtures,
        headers: {"X-Auth-Token": $rootScope.footballAuth}
    }).success(function (response) {
        $scope.fixturesData = response;
        var prevFixtures = [];
        var nextFixtures = [];
        for (i = 0; i < $scope.fixturesData.fixtures.length; i++) {
            //var fixtureDate = new Date($scope.fixturesData.fixtures[i].date);
            if ($scope.fixturesData.fixtures[i].status == "FINISHED") { //matchen opdelen in gespeelde en nog te komen matchen
                prevFixtures.push($scope.fixturesData.fixtures[i]);
            } else {
                nextFixtures.push($scope.fixturesData.fixtures[i]);
            }
        }
        $scope.prev5Fixtures = prevFixtures.slice(prevFixtures.length - 5, prevFixtures.length);//laatste 5 matchen
        $scope.next5Fixtures = nextFixtures.slice(0, 5);//volgende 5 matchen

        for (i = 0; i < $scope.prev5Fixtures.length; i++) {//bepalen welke ploeg gewonnen heeft
            if ($scope.prev5Fixtures[i].result.goalsHomeTeam > $scope.prev5Fixtures[i].result.goalsAwayTeam) {
                $scope.prev5Fixtures[i].winner = $scope.prev5Fixtures[i].homeTeamName;
            }else if($scope.prev5Fixtures[i].result.goalsHomeTeam < $scope.prev5Fixtures[i].result.goalsAwayTeam){
                $scope.prev5Fixtures[i].winner = $scope.prev5Fixtures[i].awayTeamName;
            }else{
                $scope.prev5Fixtures[i].winner = "DRAW";
            }
            
            var awayTeamId = regex.exec($scope.prev5Fixtures[i]._links.awayTeam.href);
            var homeTeamId = regex.exec($scope.prev5Fixtures[i]._links.homeTeam.href);
        }
        
        console.log($scope.prev5Fixtures);
        console.log($scope.next5Fixtures);

    }).error(function (error) {
        console.log("error fixturesData");
    });

    $http({//gegevens van spelers van bepaald team laden
        method: "GET",
        url: urlSpelers,
        headers: {"X-Auth-Token": $rootScope.footballAuth}
    }).success(function (response) {
        $scope.spelersData = response.players;
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
    }).error(function (error) {
        console.log("error spelersData");
    });

    $scope.orderPlayersByMe = function (x) {//om spelers te ranschikking op bepaalde eigenschap
        $scope.orderPlayersBy = x;
        $scope.orderDir = !$scope.orderDir;
    };

    $scope.toggleShowFixtures = function () {
        $scope.fixturesVisible = !$scope.fixturesVisible;
        if ($scope.playersVisible && $scope.fixturesVisible) {
            $scope.playersVisible = false;
        }
    };

    $scope.toggleShowPlayers = function () {
        $scope.playersVisible = !$scope.playersVisible;
        if ($scope.playersVisible && $scope.fixturesVisible) {
            $scope.fixturesVisible = false;
        }
    };
});

