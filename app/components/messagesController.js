'use strict';


myApp.controller("messagesController",
    function messagesController($scope, userInfoService){

        // If username is blank from refresh, put in placeholder
        if (userInfoService.username === "") {
            userInfoService.username = "BlankUsername";
        }


        $scope.getLocalTime = function(){
            var dateObject = new Date();
            var hours = dateObject.getHours();
            var minutes = dateObject.getMinutes();
            if (hours > 12){
                hours -= 12;
                var outTimeString = hours + ":" + minutes + " pm"
            }else {
                var outTimeString = hours + ":" + minutes + " am"
            }

            return outTimeString;

        };

        // Where all the local messages are stored, first one is a template
        $scope.messages = [{
            from: "Sender",
            contents: "Contents of Message",
            date: $scope.getLocalTime()
        }];


        // Returns left or right for div alignment based on who sent message
        $scope.getAlignment = function(from){
            if (from === userInfoService.username){
                return "right";
            } else {
                return "left";
            }
        };

        // Current message bound to the content input field
        $scope.currentMessage = {
            from: userInfoService.username,
            contents: "",
            date: "",
        };

        // Validates message isn't empty and adds it to messages list to be displayed
        $scope.sendMessage = function(){
            if ($scope.currentMessage.contents !== "") {
                $scope.currentMessage.date = $scope.getLocalTime();
                $scope.messages.push(Object.assign({}, $scope.currentMessage));

                $scope.currentMessage.contents = "";
                $scope.currentMessage.date = "";

            } else {
                console.log("Failed Message Send - Message Contents were empty");
            }
        };

        //LOOK INTO PROMISES

        $scope.scrollBar = document.getElementsByClassName("messagesContainer")[0];

        // Automatically moves the scrollbar to the bottom when a message is sent
        $scope.setScrollPosition = function () {
            //let scrollBar = document.getElementsByClassName("messagesContainer")[0];
            $scope.scrollBar.scrollTop = $scope.scrollBar.scrollHeight;   // NEEDS FIXING
            console.log("Scroll bar height: " + $scope.scrollBar.scrollHeight);
        }



});