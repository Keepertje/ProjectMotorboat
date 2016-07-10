 var app = angular.module('myApp', ['btford.socket-io']).
    factory('mySocket', function (socketFactory) {
        return socketFactory();
    }).
    controller('ArduController', function (mySocket) {
 
        this.ledOn = function () {
 
            mySocket.emit('led:on');
            console.log('LED ON');
        };
 
 
        this.ledOff = function () {
 
            mySocket.emit('led:off');
            console.log('LED OFF');  
        };    
});