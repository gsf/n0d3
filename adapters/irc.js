var irc = require('irc');

module.exports = function (opts, n0d3) {
  var client = new irc.Client(opts.network, opts.nick, {
    channels: opts.channels
  });
  n0d3.plugins.forEach(function (plugin) {
    plugin(client, n0d3.log);
  });
};
