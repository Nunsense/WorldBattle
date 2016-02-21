var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  create_at : { type: Date, default: Date.now, required: true },
  starts_at : { type: Date, default: Date.now, required: true },
  ends_at : { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Game', gameSchema);
