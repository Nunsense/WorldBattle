require('paint-console'); // console.info; console.warn; console.error; console.log;

var noise = require('./lib/perlin.js');
var util = require('./util.js');
var Creature = require('./creature.js');

var grid;
var creatures = [];

function Grid() {
  this.w = 0;
  this.h = 0;
  this.cells = [];
  this.init = function(w, h) {
    this.w = w;
    this.h = h;
    this.cells = new Array(this.w);
    for (var i = 0; i < this.w; i ++) {
      this.cells[i] = new Array(this.h);
      for (var j = 0; j < this.h; j ++) {
        var height = Math.abs(noise.perlin2(i / 10, j / 10));

        this.cells[i][j] = {
          height: height,
          creature: undefined
        }
      }
    }
  };
  this.get = function(x, y) { return this.inGrid(x, y) ? this.cells[x][y] : undefined; }

  this.isEmpty = function(x, y) { return this.cells[x][y].creature === undefined; }

  this.xInGrid = function(x) { return x >= 0 && x < this.w }
  this.yInGrid = function(y) { return y >= 0 && y < this.h; }
  this.inGrid = function(x, y) { return this.xInGrid(x) && this.yInGrid(y); }

  this.removeAt = function(x, y) { if (this.inGrid(x, y)) this.cells[x][y].creature = undefined; }
  this.removeAt = function(pos) { this.removeAt(pos.x, pos.y); }

  return this;
};

function create(w, h) {
  grid = new Grid();
  grid.init(w, h);

  var creaturePosition = [
    { x:  0, y:  1 },
    { x:  1, y:  0 },
    { x:  0, y: -1 },
    { x: -1, y:  0 }
  ]

  var centerX = Math.floor(w / 2)
    , centerY = Math.floor(h / 2);

  creatures = new Array(creaturePosition.length);
  for (var i = 0; i < creaturePosition.length; i++) {
    var creature = newBot(i)
      , x = centerX + creaturePosition[i].x
      , y = centerY + creaturePosition[i].y;

    moveCreature(creature, x, y);
    creatures[i] = creature;
  }

  return grid;
}

function run() {
  var orderedCreatures, toKill, i
    , map = { creatures: creatures, grid: grid };

  setTimeout(function() {
    toKill = [];

    creatures.sort(function(a, b) {
      return a.initiative > b.initiative // Check initiatives
          || a.speed > b.speed           // Check speeds
          || util.rand() < util.rand();  // Luck factor
    });

    for (i = 0; i < creatures.length; i++) {
      var creature = creatures[i];
      creature.prepare(map);
    }
    for (i = 0; i < creatures.length; i++) {
      var creature = creatures[i];
      creature.gatherData(map);
    }
    for (i = 0; i < creatures.length; i++) {
      var creature = creatures[i];
      creature.action(map);

      if (!creature.isAlive) toKill.push(i);
    }

    // Remove dead creatures
    for (i = toKill.length - 1; i >= 0; i--) {
      var index = toKill[i]
        , creature = creatures[index];
      grid.removeAt(creature.pos);
      creatures.splice(index, 1);
    }
  }, 1);
}

function newBot(id) {
  var new_creature = new Creature(id);
  new_creature.randomice();

  return new_creature;
}

function moveCreature(creature, x, y) {
  if (!grid.inGrid(x, y) || !grid.isEmpty(x, y)) return;

  creature.pos = new util.Vec(x, y);

  grid.get(x, y).creature = creature;
}

module.exports = {
  run: run,
  create: create
};
