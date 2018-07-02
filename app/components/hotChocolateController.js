'use strict';

myApp.controller('hotChocolateController',
    function loginController($scope, drinkDataService) {

        $scope.joseCount = 0;
        $scope.isuruCount = 0;
        $scope.joseHourly = [{time: 14, count: 3}, {time: 9, count: 4}, {time: 10, count: 1}];
        $scope.isuruHourly = [];




        $scope.getDrinks = function(user) {
            //user = user.lower();
            $.get('localhost:5000/' + user + '/drinks/', function(data){
                console.log("Data received: " + data);
            });
        }

        //$scope.getDrinks('jose')


        $scope.joseDrinkHotChocolate = function() {
            $scope.newDrink("Jose");
            console.log(drinkDataService.drinks);
        };

        $scope.isuruDrinkHotChocolate = function() {
            $scope.newDrink("Isuru");
            console.log(drinkDataService.drinks);
        };

        $scope.newDrink = function(_name) {

            var hour = new Date().getHours()

            $scope.getRequest();

            if (_name == "Jose"){
                for (var i = 0; i < $scope.joseHourly.length; i++){
                    if ($scope.joseHourly[i].time == hour){
                        $scope.joseHourly[i].count++;
                        $scope.joseCount++;
                        drinkDataService.drinks.push({name: _name, date: hour});
                        return;
                    }
                }

                // If this is reached, it didn't exist yet
                $scope.joseHourly.push({time: hour, count: 1})
                $scope.joseCount++;
                drinkDataService.drinks.push({name: _name, date: hour});

            } else if (_name == "Isuru"){

                for (var i = 0; i < $scope.isuruHourly.length; i++){
                    if ($scope.isuruHourly[i].time == hour){
                        $scope.isuruHourly[i].count++;
                        $scope.isuruCount++;
                        drinkDataService.drinks.push({name: _name, date: hour});
                        return;
                    }
                }

                // If this is reached, it didn't exist yet
                $scope.isuruHourly.push({time: hour, count: 1})
                $scope.isuruCount++;
                drinkDataService.drinks.push({name: _name, date: hour});
            }
        }

        $scope.getRequest = function() {
            var request = $.ajax({
                url: "http://127.0.0.1:5000/isuru/drinks/",
                method: "GET",
                data: {},
                crossDomain: true,
                dataType: 'json',
                success: function(data) {console.log(data)},
                failure: function() {console.log("Did not work")}
            });

            request.done(function(data){
                console.log(data);
                console.log("Count: " + data[0]["count"] + "  Time: " + data[0]["time"]);
                $scope.isuruHourly.push({count: data[0]["count"], time: data[0]["time"]});
                console.log("Test Worked");
            })

        }


        $scope.getRequest();

    });