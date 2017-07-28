var db = require('../models');

function index(req, res) {
  db.Neighborhood.findById(req.params.id, function(err, foundNeighborhood){
    console.log("Responding with restaurants", foundNeighborhood.restaurants);
    res.json(foundNeighborhood.restaurants);
  })
};

function show(req, res){
  db.Neighborhood.findById(req.params.neighborhood_id, function(err, foundNeighborhood){
    console.log(foundNeighborhood);
    var restaurantId = foundNeighborhood.restaurants.id(req.params.restaurant_id);
    if (restaurantId){
      res.json(restaurantId)
    }
    else{
      console.log("OH NO!");
    }
  })
};

function create(req, res){
  db.Neighborhood.findById(req.params.id, function(err, foundNeighborhood){
    var newRestaurant = new db.Restaurant({
      name: req.body.name,
      url: req.body.url,
      tips: [req.body.tips]
    })
    console.log(req.body);
    foundNeighborhood.restaurants.push(newRestaurant);
    foundNeighborhood.save(function(err, savedNeighborhood){
      console.log("new Restaurant created!!", newRestaurant);
      res.json(newRestaurant);
    })
  })
};

function destroy(req, res) {
  db.Neighborhood.findById(req.params.neighborhood_id, function(err, foundNeighborhood) {
    console.log(foundNeighborhood);
    var correctRestaurant = foundNeighborhood.restaurants.id(req.params.restaurant_id);
    if (correctRestaurant) {
      correctRestaurant.remove();
      foundNeighborhood.save(function(err, saved) {
        console.log('REMOVED ', correctRestaurant.name, 'FROM ', saved.restaurants);
        res.json({ message: 'Restaurant deleted!' });
      });
    } else {
      return console.log(err);
    }
  })
};

module.exports = {
  index: index,
  show: show,
  create: create,
  destroy: destroy
};
