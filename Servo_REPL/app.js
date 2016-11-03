var five = require('johnny-five');
var board = new five.Board(
  {port: "COM4"}
);

board.on('ready', function(){
  var servo = new five.Servo(10)
   var led = new five.Led(13);

  this.repl.inject({
    //set the servo to a certain degree 
    set:function(degree){
      var ms = 500;
      servo.to(degree, ms);
    },

    sweep:function(){
      servo.sweep();
    },

    on:function(){
      led.on();
    },
   off:function(){
      led.off();
    }

  })
} )