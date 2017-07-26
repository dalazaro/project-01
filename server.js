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
        // {method: "DELETE", path: "/api/neighborhood/:id", description: "Destroy one neighborhood"},
        {method: "GET", path: "/api/neighborhood/:id/restaurants", description: "Show a list of restaurants in an id-specified neighborhood"},
        {method: "POST", path: "/api/neighborhood/:id/restaurants", description: "Create a new restaurant within an id-specified neighborhood"},
        // RESTAURANTS
        {method: "POST", path: "/api/restaurant/:id/tips", description: "Create a new tip in an id-specified restaurant"},
        {method: "DELETE", path: "/api/restaurant/:id", description: "Destroy one restaurant"}
      ]
    })
  });


//*****NEIGHBORHOODS*******//

  // GET /api/neighborhoods
  app.get('/api/neighborhood', function(req, res) {
    db.Neighborhood.find({}, function(err, allNeighborhoods) {
      res.json(allNeighborhoods);
    })
  });

  // GET /api/neighborhoods/:id
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

  // POST /api/neighborhood //created neighborhood
  app.post('/api/neighborhood', function(req, res) {
    // console.log("TESTING THIS OUT");

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

  // PUT /api/neighborhood/:id
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

//****RESTAURANTS*****//

  //Show a list of restaurants in a neighborhood
  app.get('/api/neighborhood/:id/restaurants', function(req, res) {
    db.Neighborhood.findById(req.params.id, function(err, foundNeighborhood){
      console.log("Responding with restaurants", foundNeighborhood.restaurants);
      res.json(foundNeighborhood.restaurants);
    })
  })

  //create a new restaurant in the neighborhood
  app.post('/api/neighborhood/:id/restaurants', function(req, res){
    db.Neighborhood.findById(req.params.id, function(err, foundNeighborhood){
      var newRestaurant = new db.Restaurant({
        name: req.body.name,
        url: req.body.url,
        tips: [req.body.tips]
      })
      // FIXME: be able to add to the tips array
      console.log(req.body);
      foundNeighborhood.restaurants.push(newRestaurant);
      foundNeighborhood.save(function(err, savedNeighborhood){
        console.log("new Restaurant created!!", newRestaurant);
        res.json(newRestaurant);
      })
    })
  })



// get restaurant by id
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


  //add more tips to the tips array for each restaurant //post rather than put so we won't alter restaurant data
  // app.post('/api/neighborhood/:id/restaurants/:id', function(req, res){
  //
  // })


// NOTE: SERVER
  app.listen(process.env.PORT || 3000, function(){
    console.log('Express server is up and running on http://localhost:3000');
  });
