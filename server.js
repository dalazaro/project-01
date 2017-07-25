//Server-side JS

var express = require('express');
var app = express();
var bodyParser = require("body-parser");

//JSON API Endpoints


//gets all restaurants
app.get('/api/restaurants' function(req, res){
  db.Place.find({})
  .exec(function(err, places){
    if (err) {
      return console.log("index error: " + err);
    }
    res.json(places);
  });
})


//get one restaurant
app.get('/api/restaurants/:id', function (req, res){
  var restaurantId = req.params.id
  db.Restaurant.findById(restaurantId, function(err, foundRestaurant){
    res.json(foundRestaurant);
  });
});


// //create new Place -- WORKS
// app.post('/api/places', function (req, res){
//   var newPlace = new db.Place (req.body);
//     newPlace.save(function (err, savedPlace){
//       res.json(savedPlace);
//     })
// })


app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
