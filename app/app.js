'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', ["ngRoute", "ngLocale"]);

myApp.config(function($routeProvider, ) {
    $routeProvider
        .when("/", {
            controller: "loginController",
            templateUrl: "templates/loginTemplate.html"
        })
        .when("/messages", {
            controller: "messagesController",
            templateUrl: "templates/messagesTemplate.html"
        })

});



