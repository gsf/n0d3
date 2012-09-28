var Campfire = require('campfire').Campfire;
var irc = require('irc');
var log = require('util').log;


function N0d3 () {
  this.plugins = [];
}

N0d3.prototype.join = function (joins) {
  var client, key, opts, n0d3 = this;
  for (key in joins) {
    if (key == 'campfire') {
      opts = joins[key];
      client = new Campfire(opts);
      client.join(opts.room, function (err, room) {
        if (err) throw err;
        n0d3.plugins.forEach(function (plugin) {
          plugin(room, log);
        });
      });
    }
    if (key == 'irc') {
      opts = joins[key];
      client = new irc.Client(opts.network, opts.nick, {
        channels: opts.channels
      });
      n0d3.plugins.forEach(function (plugin) {
        plugin(client, log);
      });
    }
  }
};

N0d3.prototype.use = function () {
  var args = Array.prototype.slice.call(arguments);
  this.plugins = this.plugins.concat(args);
};

module.exports = function () {
  return new N0d3();
};
