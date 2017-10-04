var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = require('./restaurant');

var NeighborhoodSchema = new Schema({
  name: String,
  wikiUrl: String,
  image: String,
  restaurants: [Restaurant.schema]
});

var Neighborhood = mongoose.model('Neighborhood', NeighborhoodSchema);

module.exports = Neighborhood;
