var Campfire = require('campfire').Campfire;
var EventEmitter = require('events').EventEmitter;

module.exports = function(opts, n0d3) {
  var client = new Campfire(opts);
  var emitter = new EventEmitter();
  opts.rooms.forEach(function (roomId) {
    client.join(roomId, function (err, room) {
      if (err) throw err;
      room.listen(function (message) {
        console.log(message.body);
        if (message.body.substr(0, 1) == '.') {
          emitter.emit('command', message.body);
        }
      });
      emitter.say = function (message) {
        room.speak(message);
      };
      n0d3.plugins.forEach(function (plugin) {
        plugin(emitter, n0d3.log, 'campfire');
      });
    });
  });
};
