var five = require('johnny-five');
var colorMap = require('./color-map.js');
var cred = require('./twitter-auth.js');
var twitter = require('node-tweet-stream')

var board = new five.Board({ port: "COM5" });

var HEX_PATTERN = /#([0-9a-f]{3}|[0-9a-f]{6})$/i;

board.on('ready', function () {
    var led = new five.Led.RGB({
        pins: {
            red: 3,
            green: 6,
            blue: 5
        }
    });
    led.color(colorMap['red'])

    var twit = new twitter({
        consumer_key: cred.API_KEY,
        consumer_secret: cred.API_SECRET,
        token: cred.TOKEN,
        token_secret: cred.TOKEN_SECRET
    })

    twit.track('#amislights')

    twit.on("tweet", function (tweet) {

        var textColor = Object.keys(colorMap).some(function (color) {
            if (tweet.text.indexOf(color) >= 0) {
                led.color(colorMap[color])
                return true;
            }
            return false
        })
    
       if(!textColor) {
        var newColor = (tweet.text).match(HEX_PATTERN)[0]
        console.log(tweet.text)
        console.log(newColor)
        if (newColor) {
            led.color(newColor)
            return true;
        }
    }
})

twit.on("error", function (error) {
    console.log('Oh noes, something goes wrong ', error);
})
    
} )