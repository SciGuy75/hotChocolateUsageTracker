'use strict';

myApp.controller('hotChocolateController',
    function loginController($scope, drinkDataService, drinksApiService) {
        $scope.joseCount = 0;
        $scope.isuruCount = 0;
        $scope.joseHourly = [];
        $scope.isuruHourly = [];

    

        $scope.joseDrinkHotChocolate = function() {
            $scope.newDrink("Jose");
        };

        $scope.isuruDrinkHotChocolate = function() {
            $scope.newDrink("Isuru");
        };

        $scope.newDrink = function(_name) {

            var hour = new Date().getHours();

            if (_name == "Jose"){
                for (var i = 0; i < $scope.joseHourly.length; i++){
                    if ($scope.joseHourly[i].time == hour){
                        $scope.joseHourly[i].count++;
                        $scope.joseCount++;
                        drinkDataService.drinks.push({name: _name, date: hour});
                        $scope.api_postDrink('jose', hour, (data)=>{console.log("Successful Post")});
                        return;
                    }
                }

                // If this is reached, it didn't exist yet
                $scope.api_postDrink('jose', hour, (data)=>{console.log("Successful Post")});
                $scope.joseHourly.push({time: hour, count: 1})
                $scope.joseCount++;
                drinkDataService.drinks.push({name: _name, date: hour});

            } else if (_name == "Isuru"){

                for (var i = 0; i < $scope.isuruHourly.length; i++){
                    if ($scope.isuruHourly[i].time == hour){
                        $scope.isuruHourly[i].count++;
                        $scope.isuruCount++;
                        drinkDataService.drinks.push({name: _name, date: hour});
                        $scope.api_postDrink('isuru', hour, (data)=>{console.log("Successful Post")});
                        return;
                    }
                }

                // If this is reached, it didn't exist yet
                $scope.api_postDrink('isuru', hour, (data)=>{console.log("Successful Post")});
                $scope.isuruHourly.push({time: hour, count: 1})
                $scope.isuruCount++;
                drinkDataService.drinks.push({name: _name, date: hour});
            }
        }

        

        $scope.api_getDrinks = function(user, callback){
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("GET", "http://127.0.0.1:5000/" + user.toLowerCase() + "/drinks/", true);
            xhr.onreadystatechange = function(){
                   if (xhr.readyState === 4 && xhr.status === 200){
                       callback(xhr.response);
                   }
            }
            xhr.send();
        }

        $scope.api_postDrink = function(user, time, callback){
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("POST", "http://127.0.0.1:5000/" + user.toLowerCase() + "/drinks/", true);
            xhr.onreadystatechange = function(){
                   if (xhr.readyState === 4 && xhr.status === 201){
                       callback(xhr.response);
                   }
            }
            xhr.send(time);
        }





        $scope.api_getDrinks('isuru', (data)=>{
            for(var i = 0; i<data.length; i++) {
                var hourlyUse = data[i];
                for (var i = 0; i < $scope.isuruHourly.length; i++){
                    if ($scope.isuruHourly[i].time == data[i].time){
                        $scope.isuruHourly[i].count++;
                        $scope.isuruCount++;
                    }
                }
                if (i == $scope.isuruHourly.length) $scope.isuruHourly.push(data[i]);
            }
        });

        $scope.api_getDrinks('jose', (data)=>{
            for(var i = 0; i<data.length; i++) {
                var hourlyUse = data[i];
                for (var i = 0; i < $scope.joseHourly.length; i++){
                    if ($scope.joseHourly[i].time == data[i].time){
                        $scope.joseHourly[i].count++;
                        $scope.joseCount++;
                    }
                }
                if (i == $scope.joseHourly.length) $scope.joseHourly.push(data[i]);
            }
        });


    });