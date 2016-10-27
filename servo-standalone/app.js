var five = require('johnny-five');
var board = new five.Board(
  {port: "COM4"}
);

board.on('ready', function(){
  var servo = new five.Servo(10)
   servo.sweep();
} )