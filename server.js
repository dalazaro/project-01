// NOTE: CONFIG express and other modules
  var express = require('express');
  var app = express();

  /* parse incoming urlencoded form data
  and populate the req.body object */
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }));



// NOTE: DATA (hardcoded data can start out here if needed)
  var db = require('./models');



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
      baseUrl: "",
      documentationUrl: "https://github.com/dalazaro/project-01",
      authors: [ "Stacy Suen", "Daryl Jason Lazaro" ],
      endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints"},
        // NEIGHBORHOODS
        {method: "GET", path: "/api/neighborhood", description: "Index of neighborhoods"},
        {method: "GET", path: "/api/neighborhood/:id", description: "Show one neighborhood"},
        {method: "POST", path: "/api/neighborhood", description: "Create new neighborhood"},
        {method: "PUT", path: "/api/neighborhood/:id", description: "Update one neighborhood"},
        {method: "DELETE", path: "/api/neighborhood/:id", description: "Destroy one neighborhood"},
        {method: "GET", path: "/api/neighborhood/:id/restaurants", description: "Show a list of restaurants in a neighborhood"},
        {method: "PUT", path: "/api/neighborhood/:id/restaurants", description: "Update a neighborhood with a new restaurant"},
        // RESTAURANTS
        {method: "GET", path: "/api/restaurant", description: "Index of restaurants"},
        {method: "GET", path: "/api/restaurant/:id", description: "Show one restaurant"},
        {method: "PUT", path: "/api/restaurant/:id/tips", description: "Update restaurant tips"},
        {method: "DELETE", path: "/api/restaurant/:id", description: "Destroy one restaurant"}
      ]
    })
  });

  // GET /api/neighborhoods
  app.get('/api/neighborhood', function(req, res) {
    db.Neighborhood.find({}, function(err, allNeighborhoods) {
      res.json(allNeighborhoods);
    })
  });



// NOTE: SERVER
  app.listen(3000, function(){
    console.log('Express server is up and running on http://localhost:3000');
  });
