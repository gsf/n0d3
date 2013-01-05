function Bot () {
  this.plugins = [];
}

Bot.prototype.name = 'n0d3';
Bot.prototype.commandPrefix = '.';

Bot.prototype.use = function (/* plugins */) {
  var args = Array.prototype.slice.call(arguments);
  this.plugins = this.plugins.concat(args);
};

Bot.prototype.join = function (/* clients */) {
  var bot = this;
  Array.prototype.forEach.call(arguments, function (client) {
    client = client(bot); // pass bot into client
    bot.plugins.forEach(function (plugin) {
      plugin(client, bot);
    });
  });
};

module.exports = function () {
  return new Bot();
};
