function N0d3 () {
  this.plugins = [];
}

N0d3.prototype.join = function (joins) {
  for (var key in joins) {
    require('./adapters/'+key)(joins[key], this);
  }
};

N0d3.prototype.log = require('util').log;

N0d3.prototype.use = function () {
  var args = Array.prototype.slice.call(arguments);
  this.plugins = this.plugins.concat(args);
};

module.exports = function () {
  return new N0d3();
};
