var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');

client.subscribe('presence');
client.publish('presence', 'Hello mqtt');

client.on('message', function (topic, message) {
    console.log(message.toString());
    // TODO: SHOW THE MESSAGE IN CHART(MAYBE STORE IN A TABLE FIRST)
});