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


var led, servo, steering;
 
//Arduino board connection
 
var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    led = new five.Led(13);
    led.on();
    //centreer de servo
  servo =  new five.Servo({
        pin: 3,
        center: true,
        range:[30,150]
      
    });
    steering = 'center';
    
});
 
//Socket connection handler
io.on('connection', function (socket) {  
        console.log(socket.id);
 
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


        
    });
 
var isCenter = function(steerDir){
    return steerDir === 'center'
}
console.log('Waiting for connection');