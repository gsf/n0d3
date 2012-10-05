var Campfire = require('campfire').Campfire;

module.exports = function(opts, n0d3) {
  var client = new Campfire(opts);
  opts.rooms.forEach(function (roomId) {
    client.join(roomId, function (err, room) {
      if (err) throw err;
      n0d3.plugins.forEach(function (plugin) {
        plugin(room, n0d3.log, 'campfire');
      });
    });
  });
};
