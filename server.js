// NOTE: CONFIG express and other modules
  var express = require('express');
  var app = express();

  /* parse incoming urlencoded form data
  and populate the req.body object */
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }));



// NOTE: DATA (hardcoded data can start out here if needed)
  var db = require('./models');

  // NOTE: Aquire data from seed.js
  // var seed = require('seed.js')



// NOTE: ROUTES
  // serves static files from the 'public' directory
  app.use(express.static('public'));



// NOTE: HTML ENDPOINTS
  app.get('/', function homepage(req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });



// TODO: JSON API ENDPOINTS
  // API DOCUMENTATION
  app.get('/api', function apiIndex(req, res) {
    res.json({
      message: "Welcome to SLURP SF, our crowdsourced ramen guide to San Francisco!",
      baseUrl: "https://floating-reef-39049.herokuapp.com",
      documentationUrl: "https://github.com/dalazaro/project-01",
      authors: [ "Stacy Suen", "Daryl Jason Lazaro" ],
      endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints"},
        // NEIGHBORHOODS
        {method: "GET", path: "/api/neighborhood", description: "Index of all neighborhoods"},
        {method: "GET", path: "/api/neighborhood/:id", description: "Show one id-specified neighborhood"},
        {method: "POST", path: "/api/neighborhood", description: "Create new neighborhood"},
        {method: "PUT", path: "/api/neighborhood/:id", description: "Update one id-specified neighborhood"},
        {method: "DELETE", path: "/api/neighborhood/:id", description: "Destroy one neighborhood"},

        // RESTAURANTS
        {method: "GET", path: "/api/neighborhood/:id/restaurants", description: "Show a list of restaurants in an id-specified neighborhood"},
        {method: "GET", path: "/api/neighborhood/:neighborhood_id/restaurants/:restaurant_id", description: "Show one id-specified restaurant"},
        {method: "POST", path: "/api/neighborhood/:id/restaurants", description: "Create a new restaurant within an id-specified neighborhood"},
        // TODO: PUT: Update a restaurant
        {method: "DELETE", path: "/api/neighborhood/:neighborhood_id/restaurants/:restaurant_id", description: "Destroy one id-specified restaurant in an id-specified neighborhood"},

        // TIPS
        {method: "POST", path: "/api/neighborhood/:neighborhood_id/restaurant/:restaurant_id/tips", description: "Create a new tip in an id-specified restaurant"}
      ]
    })
  });


//*****NEIGHBORHOODS*******//

  // Index of all neighborhoods
  app.get('/api/neighborhood', function(req, res) {
    db.Neighborhood.find({}, function(err, allNeighborhoods) {
      res.json(allNeighborhoods);
    })
  });

  // Show one id-specified neighborhood
  app.get('/api/neighborhood/:id', function(req, res) {

    // get neighborhood id
    var neighborhoodId = req.params.id;
    console.log('show neighborhood', neighborhoodId);

    db.Neighborhood.findById(neighborhoodId, function(err, neighborhood) {
      if(err) {
        console.log(err);
      }
      res.json(neighborhood);
    })
  });

  // Create new neighborhood
  app.post('/api/neighborhood', function(req, res) {

    // new neighborhood using form data (`req.body`)
    var newNeighborhood = new db.Neighborhood({
    name: req.body.name,
    wikiUrl: req.body.wikiUrl,
    restaurants: []
    });

    // save neighborhood to DB
    newNeighborhood.save(function(err, neighborhood) {
      if (err) {
        console.log(err);
      }
      console.log('created neighborhood', neighborhood);
      res.json(neighborhood);
    })
  })

  // Update one id-specified neighborhood
  app.put('/api/neighborhood/:id', function(req, res) {

    // get neighborhood id
    var neighborhoodId = req.params.id;
    console.log('show neighborhood', neighborhoodId);

    // find neighborhood
    db.Neighborhood.findById(neighborhoodId, function(err, neighborhood) {
      if (err) {
        return console.log("create error: " + err);
      }
      neighborhood.name = req.body.name;
      neighborhood.wikiUrl = req.body.wikiUrl;
      neighborhood.restaurants = req.body.restaurants;
      console.log('updated neighborhood', req.body);

      neighborhood.save(function(err) {
        if (err) {
          return console.log("create error: " + err);
        }
        res.json({ message: 'Neighborhood updated!' });
      })
    })

  })

  // delete id-specified neighborhood
  app.delete('/api/neighborhood/:id', function(req, res) {

  // destroy method
  db.Neighborhood.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      res.status(500);
      console.log("index error: " + err);
    }
    res.json({ message: 'Neighborhood deleted!' });
  });

});


//****RESTAURANTS*****//

  // Show a list of restaurants in a id-specified neighborhood
  app.get('/api/neighborhood/:id/restaurants', function(req, res) {
    db.Neighborhood.findById(req.params.id, function(err, foundNeighborhood){
      console.log("Responding with restaurants", foundNeighborhood.restaurants);
      res.json(foundNeighborhood.restaurants);
    })
  })

  // Show one id-specified restaurant
  app.get('/api/neighborhood/:neighborhood_id/restaurants/:restaurant_id', function(req, res){
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
  });


  // Create a new restaurant within an id-specified neighborhood
  app.post('/api/neighborhood/:id/restaurants', function(req, res){
    db.Neighborhood.findById(req.params.id, function(err, foundNeighborhood){
      var newRestaurant = new db.Restaurant({
        name: req.body.name,
        url: req.body.url,
        tips: [req.body.tips]
        // FIXME: if tips field is left empty when creating a new restaurant, index[0] is assigned as 'null'
        //alternatively, make this field required
      })
      console.log(req.body);
      foundNeighborhood.restaurants.push(newRestaurant);
      foundNeighborhood.save(function(err, savedNeighborhood){
        console.log("new Restaurant created!!", newRestaurant);
        res.json(newRestaurant);
      })
    })
  })

  // Destroy one id-specified restaurant in an id-specified neighborhood
  app.delete('/api/neighborhood/:neighborhood_id/restaurants/:restaurant_id', function(req, res) {
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
  });

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
