// server.js
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var io=require('socket.io')(httpServer);
 
var port = 3000; 
 
app.use(express.static(__dirname));
 
app.get('/', function(req, res) {  
        res.sendFile(__dirname + 'index.html');
});
 
httpServer.listen(port);  
console.log('Server available at http://localhost:' + port);  


var led, servo, steering, motor;

var speeds = [{stand:0,speed:0},{stand:1,speed:51},{stand:2,speed:102}
,{stand:3,speed:153},{stand:4,speed:204},{stand:5,speed:255}]
var stand = 0;
var steering = 'center';
 
//Arduino board connection
 
var board = new five.Board( {port: "COM4"});  
board.on("ready", function() {  
    console.log('Arduino connected');
   
    motor = new five.Motor({
    pins: {
        pwm:9,
        dir:2,
        cdir: 3  
        }
    });

    led = new five.Led(13);
    led.on();
    
    servo =  new five.Servo({
        pin: 10,
        center: true,
        range:[30,150]
      
    });
    
    
});
 
//Socket connection handler
io.on('connection', function (socket) {  
   
 
        socket.on('led:on', function (data) {
           led.on();
          
         
        });
 
        socket.on('led:off', function (data) {
            led.off();
           
 
        });

        socket.on('servo:left', function(data) {
         var totalTime = isCenter(steering) ? 500 : 1000; 
          servo.to(30, totalTime);
          steering = 'left';
        })

        socket.on('servo:right', function(data){
          var totalTime = isCenter(steering) ? 500 : 1000; 
         
            servo.to(150, totalTime);
            steering = 'right'
        })

        socket.on('servo:center', function(data){
         
            servo.to(90, 500);
            steering = 'center';
        })

         socket.on('motor:stop', function(data){
             stand = 0;
              motor.stop(); 
        })
       
         socket.on('motor:harder', function(data){
             motor.reverse(255);
        })


        
    });
 
var isCenter = function(steerDir){
    return steerDir === 'center'

}

var currentSpeed = function(nieuweStand){
  
    return speeds[nieuweStand].speed
}

console.log('Waiting for connection');