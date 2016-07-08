var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
var chartData = require("../models/ChartData.js");

client.subscribe('presence');
//client.publish('presence', 'Hello mqtt');

client.on('connect', function() { // publish some data upon connect
    var fs = require("fs");
    var contents = fs.readFileSync("./conf/data.json");
    var jsonContent = JSON.parse(contents);
    for (var i = 0; i < jsonContent.length; i++) {
        client.publish('presence', JSON.stringify(jsonContent[i]));
    }
});

client.on('message', function (topic, message) {
    //console.log(JSON.parse(message));
    chartData.add(JSON.parse(message));
});