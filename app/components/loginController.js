'use strict';

myApp.controller('loginController',
    function loginController($scope, $location, userInfoService) {

        $scope.tempUsername = "";
        $scope.tempPassword = "";

        $scope.getLoginInfo = function () {
            if ($scope.tempUsername && $scope.tempPassword) {
                userInfoService.username = $scope.tempUsername;
                userInfoService.password = $scope.tempPassword;
                console.log("Username: " + userInfoService.username);
                console.log("Password: " + userInfoService.password);
                //Add in here to make it reroute to a new messages page
                $location.path('/messages')
            } else {
                alert("Username or password field is empty...");
            }
        };



    });