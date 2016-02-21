function Vec(x, y) {
  this.x = x;
  this.y = y;

  this.distance = function(vec) {
    var dx = this.x - vec.x
      , dy = this.y - vec.y;
    return Math.sqrt(dx*dx + dy*dy);
  };

  return this;
}

function rand() {
  return Math.random();
}

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

function roll(value, factor) {
  if (factor === undefined) factor = 1;
  return rand() * factor < value;
}

module.exports = {
  rand: rand,
  randRange: randRange,
  roll: roll,
  Vec: Vec
};
