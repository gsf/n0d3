var Campfire = require('campfire').Campfire;


function N0d3 () {
  this.plugins = [];
}

N0d3.prototype.join = function (joins) {
  var campfire, key, opts, n0d3 = this;
  for (key in joins) {
    if (key == 'campfire') {
      opts = joins[key];
      campfire = new Campfire(opts);
      campfire.join(opts.room, function (err, room) {
        if (err) throw err;
        n0d3.plugins.forEach(function (plugin) {
          plugin(room);
        });
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
