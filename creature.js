var util = require('./util.js')

function Creature(_id) {
  // In Game Stats
  this.id = _id;
  this.isAlive;
  this.pos;
  this.life;
  this.initiative;
  this.speed;
  this.damage;
  this.defense;
  this.dodgeChance;
  this.critChance;
  this.critDamagePercentage;
  this.weaponLongRangeProficiency;
  this.weaponShoerRangeProficiency;
  this.weaponHandProficiency;

  // Other
  var creaturesInSight = [];

  this.randomice = function() {
    this.life = 100;
    this.isAlive = true;
    this.initiative = util.randRange(0, 1);
    this.speed = util.randRange(1, 4);
    this.damage = util.randRange(5, 10);
    this.defense = util.randRange(5, 10);
    this.dodgeChance = util.randRange(0.1, 0.3);
    this.critChance = util.randRange(0.2, 0.3);
    this.critDamagePercentage = util.randRange(25, 50);
    this.weaponLongRangeProficiency = util.randRange(0, 100);
    this.weaponShortRangeProficiency = util.randRange(0, 100);
    this.weaponHandsProficiency = util.randRange(0, 100);
    this.weightCapacity = util.randRange(50, 100);
    this.visionRange = util.randRange(3, 15);
    this.stealth = util.randRange(0.2, 0.8);
  };

  this.prepare = function(map) {
    this.creaturesInSight = [];
  };

  this.gatherData = function(map) {
    var creature;
    for (var i = 0; i < map.creatures.length; i++) {
      creature = map.creatures[i];

      if (creature.id === this.id) continue;

      if (this.pos.distance(creature.pos) < this.visionRange && util.roll(this.stealth)) {
        creaturesInSight.push(creature);
      }
    }
  };

  this.action = function(map) {

  };

  return this;
}

module.exports = Creature;
