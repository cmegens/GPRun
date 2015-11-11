var leds = require('rpi-ws2801');
var Arr2 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51];
var Arr3 = [52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];
leds.connect(100); // assign number of WS2801 LEDs 
var colorArray = ['#FF00FF', '#000000', '#00FF00', '#000000', '#e5662d', '#000000']

var ledCounter = 0;
var colorCounter = 0;


lightRun();

function lightRun() {

    ledControl(ledCounter, 500, 8, 255);

    setTimeout(function() {
        lightRun()
    }, 50);
    ledCounter++;
    if (ledCounter > 50) {
        ledCounter = 0;
        colorCounter++;
        console.log('werkt' + ledCounter);
    }



    function ledControl(led, duration, fadeSpeed, maxBrightness) {
        fadeLedIn(led, 0, maxBrightness, duration, fadeSpeed)
    }


    function fadeLedIn(led, brightness, maxBrightness, duration, fadeSpeed) {
        leds.setColor(led, [brightness, 0, brightness]);



        var newbrighthness = brightness + fadeSpeed;

        if (brightness < maxBrightness) {

            setTimeout(function() {
                fadeLedIn(led, newbrighthness, maxBrightness, duration, fadeSpeed)
            }, 10);
        } else {
            console.log('bangerang')
            setTimeout(function() {
                fadeLedOut(led, newbrighthness, maxBrightness, duration, fadeSpeed)
            }, duration);


        }


    }

    function fadeLedOut(led, brightness, maxBrightness, duration, fadeSpeed) {
        leds.setColor(led, [0, 0, brightness]);
        var newbrighthness = brightness - fadeSpeed;


        if (brightness > 0) {

            setTimeout(function() {
                fadeLedOut(led, newbrighthness, maxBrightness, duration, fadeSpeed)
            }, 10);
        }

    }

    leds.update();

}
