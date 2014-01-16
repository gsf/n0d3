var irc = require('irc');

function Bot () {
  this.plugins = [];
}

Bot.prototype.name = 'n0d3';
Bot.prototype.commandPrefix = '.';

Bot.prototype.use = function (/* plugins */) {
  var args = Array.prototype.slice.call(arguments);
  this.plugins = this.plugins.concat(args);
};

Bot.prototype.join = function(opts) {
  opts = opts || {};
  opts.floodProtection = opts.floodProtection || true;
  opts.nick = opts.nick || this.name;
  var client;
  // ex: .ping
  var re1 = RegExp('\\' + this.commandPrefix + '(\\w+) *');
  // ex: botName: ping
  var re2 = RegExp(opts.nick + '[:,?!]? (\\w+) *');
  // ex: /msg botName ping
  var re3 = /(\w+) */;
  function commandCheck (to, text) {
    if (re1.test(text)) return re1;
    if (re2.test(text)) return re2;
    if (to === opts.nick) return re3;
  }
  console.log('Connecting to ' + opts.network);
  client = new irc.Client(opts.network, opts.nick, opts);
  //client.on('raw', function(message) {console.log(message)});
  client.on('message', function(nick, to, text, message) {
    var commandText, command, re = commandCheck(to, text);
    if (re) {
      commandText = text.replace(re, function(match, p1) {
        command = '.' + p1;
        return '';
      });
      // second argument here is our nice command object
      client.emit(command, {
        reply: function(replyText) {
          // if sent directly to then just reply directly to
          if (to === opts.nick) return client.say(nick, replyText);
          // otherwise say it in the channel and prepend the nick
          client.say(to, nick + ': ' + replyText);
        },
        sender: nick,
        text: commandText  // commandText is everything after the command
      });
    }
  });
  this.plugins.forEach(function (plugin) {
    plugin(client, this);
  });
};

module.exports = function () {
  return new Bot();
};
