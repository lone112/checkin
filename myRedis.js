/**
 * Created by fei on 8/24/2016.
 */
var option = {
    host: 'redis-18862.c8.us-east-1-3.ec2.cloud.redislabs.com',
    port: 18862
};

option.password = process.env.password;

var redis = require("redis"),
    client = redis.createClient(option);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});

client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});

exports.checkIn = function(uid,subject){
    client.rpush([subject, uid], function(err, reply) {
        console.log(reply); //prints 2
    });
};