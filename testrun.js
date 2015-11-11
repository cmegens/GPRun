require('console-stamp')(console, '[HH:MM:ss.l]');
var GPIO = require('onoff').Gpio;
var request = require('request');
var sensor1 = new GPIO(18, 'in', 'both');
var sensor2 = new GPIO(17, 'in', 'both');
var sensor3 = new GPIO(27, 'in', 'both');
var sensor4 = new GPIO(23, 'in', 'both');


var request = require('request');
var startTime = 0;
var stopTime = 0;
var duration = 0;
var sensor1value = 0;
var sensor2value = 0;
var sensor3value = 0;
var sensor4value = 0;
var previousSensor =0;


function exit() {
    sensor1.unexport();
    sensor2.unexport();
    sensor3.unexport();
    sensor4.unexport(); 
    process.exit();
}




sensor1.watch(function(err, sensor1value) {
    if (err) {
        throw err;
    }
    sensor1.readSync(sensor1value);
    if (sensor1value == 1 && previousSensor != 1) {
        console.log(previousSensor + ' ' + 'sensor 1 ' + Date.now());
        startTime = Date.now();
        }
     previousSensor = 1;   
});

sensor2.watch(function(err, sensor2value) {
    if (err) {
        throw err;
    }
    sensor2.readSync(sensor2value);
    if (sensor2value == 1 && previousSensor != 2 ) {
        console.log(previousSensor + ' ' + 'sensor 2 ' + Date.now()); 
        stopTime = Date.now();
        if (previousSensor == 1) {
            duration = stopTime - startTime;
            console.log('duration ' + duration)
        }  
    }
    previousSensor = 2;
});

sensor3.watch(function(err, sensor3value) {
    if (err) {
        throw err;
    }
    sensor3.readSync(sensor3value);
    if (sensor3value == 1 && previousSensor != 3) {
        console.log(previousSensor + ' ' + 'sensor 3 ' + Date.now());
         stopTime = Date.now();
        if (previousSensor == 4) {
            duration = stopTime - startTime;
            console.log('duration ' + duration)
        }  
    }
    previousSensor = 3;
});

sensor4.watch(function(err, sensor4value) {
    if (err) {
        throw err;
    }
    sensor4.readSync(sensor4value);
    if (sensor4value == 1 && previousSensor != 4) {
        console.log(previousSensor + ' ' + 'sensor 4 ' + Date.now());
        startTime = Date.now();
    }
    previousSensor = 4;
});




process.on('SIGINT', exit);
