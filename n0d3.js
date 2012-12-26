function N0d3 () {
  this.plugins = [];
}

N0d3.prototype.log = require('util').log;

N0d3.prototype.use = function (/* plugins */) {
  var args = Array.prototype.slice.call(arguments);
  this.plugins = this.plugins.concat(args);
};

N0d3.prototype.join = function (/* clients */) {
  var n0d3 = this;
  Array.prototype.forEach.call(arguments, function (client) {
    n0d3.plugins.forEach(function (plugin) {
      plugin(client, n0d3);
    });
  });
};

module.exports = function () {
  return new N0d3();
};
