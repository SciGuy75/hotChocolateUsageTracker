'use strict';

myApp.controller('graphController',
    function loginController($scope, drinkDataService) {

        $scope.hours = [];
        $scope.names = ["patrick", "another patrick"];


        drinkDataService.drinks

        // Loads hours array for each hour
        for (var i = 0; i < 24; i++){
            $scope.hours[i] = {uses: 0};
        }








        //Javascript events to update height???





    });