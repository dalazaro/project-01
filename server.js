// NOTE: CONFIG express and other modules
  var express = require('express');
  var app = express();

  /* parse incoming urlencoded form data
  and populate the req.body object */
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }));

  var controllers = require('./controllers');

  var db = require('./models');

// NOTE: ROUTES
  // serves static files from the 'public' directory
  app.use(express.static('public'));

// NOTE: HTML ENDPOINTS
  app.get('/', function homepage(req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

// NOTE: JSON API ENDPOINTS
//*****API DOCUMENTATION*******//
  app.get('/api', controllers.api.index);

//*****NEIGHBORHOODS*******//

  // Index of all neighborhoods
  app.get('/api/neighborhood', controllers.neighborhood.index);

  // Show one id-specified neighborhood
  app.get('/api/neighborhood/:id', controllers.neighborhood.show);

  // Create new neighborhood
  app.post('/api/neighborhood', controllers.neighborhood.create);

  // Update one id-specified neighborhood
  app.put('/api/neighborhood/:id', controllers.neighborhood.update);

  // delete id-specified neighborhood
  app.delete('/api/neighborhood/:id', controllers.neighborhood.destroy);

//****RESTAURANTS*****//

  // Show a list of restaurants in a id-specified neighborhood
  app.get('/api/neighborhood/:id/restaurants', controllers.neighborhoodRestaurant.index);

  // Show one id-specified restaurant
  app.get('/api/neighborhood/:neighborhood_id/restaurants/:restaurant_id', controllers.neighborhoodRestaurant.show);

  // Create a new restaurant within an id-specified neighborhood
  app.post('/api/neighborhood/:id/restaurants', controllers.neighborhoodRestaurant.create);

  // Destroy one id-specified restaurant in an id-specified neighborhood
  app.delete('/api/neighborhood/:neighborhood_id/restaurants/:restaurant_id', controllers.neighborhoodRestaurant.destroy);

//****TIPS*****//

  // Create a new tip in an id-specified restaurant
  app.post('/api/neighborhood/:neighborhood_id/restaurants/:restaurant_id/tips', function(req, res) {
    var restaurantId = req.params.restaurant_id;
      console.log(restaurantId);

    var newTip = req.body.tips;
      console.log(newTip);

    db.Neighborhood.findById(req.params.neighborhood_id, function(err, foundNeighborhood){
      for (var i = 0; i < foundNeighborhood.restaurants.length; i++){
        var idString = foundNeighborhood.restaurants[i]._id.toString();
        if (restaurantId === idString) {
          foundNeighborhood.restaurants[i].tips.push(newTip);
          console.log('success!');
        }
      }
      foundNeighborhood.save(function(err){
        if (err) {
          console.log(err);
        }
        res.json({ message: "new tip for Restaurant created!!" });
      })
    });
  });

// NOTE: SERVER
  app.listen(process.env.PORT || 3000, function(){
    console.log('Express server is up and running on http://localhost:3000');
  });
