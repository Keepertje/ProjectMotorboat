 var app = angular.module('myApp', ['btford.socket-io']).
    factory('mySocket', function (socketFactory) {
        return socketFactory();
    }).
    controller('ArduController', function (mySocket) {
       
        this.ledOn = function () {
            mySocket.emit('led:on');
        };
 
        this.ledOff = function () {

            mySocket.emit('led:off');
        };    
        this.servoLeft = function(){
            mySocket.emit('servo:left');
        }
            this.servoCenter = function(){
                mySocket.emit('servo:center');
            }
        this.servoRight = function(){
            mySocket.emit('servo:right')
        }

       
        this.motorRight = function(){
            mySocket.emit('motor:harder')
        }
        this.motorStop = function(){
            mySocket.emit('motor:stop')
        }

});