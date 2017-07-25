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
      message: "Welcome to our Ramen API!",
      baseUrl: "https://young-lowlands-84241.herokuapp.com/",
      documentationUrl: "https://github.com/dalazaro/project-01",
      authors: [ "Stacy Suen", "Daryl Jason Lazaro" ],
      endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints"},

        // RESTAURANTS
        {method: "GET", path: "/api/restaurants", description: "Index of restaurants"},
        {method: "GET", path: "/api/restaurants/:id", description: "Show one restaurant"},
        {method: "POST", path: "/api/restaurants", description: "Create new restaurant"},
        {method: "PUT", path: "/api/restaurants/:id", description: "Update one restaurant"},
        {method: "DELETE", path: "/api/restaurants/:id", description: "Destroy one restaurant"},

        // NEIGHBORHOODS
        {method: "GET", path: "/api/neighborhoods", description: "Index of neighborhoods"},
        {method: "GET", path: "/api/neighborhoods/:id", description: "Show one neighborhood"},
        {method: "POST", path: "/api/neighborhoods", description: "Create new neighborhood"},
        {method: "PUT", path: "/api/neighborhoods/:id", description: "Update one neighborhood"},
        {method: "DELETE", path: "/api/neighborhoods/:id", description: "Destroy one neighborhood"}
      ]
    })
  });



// NOTE: SERVER
// listen on the port Heroku prescribes (process.env.PORT) OR port 3000

  app.listen(process.env.PORT || 3000, function(){
    console.log('Express server is up and running on http://localhost:3000');
  });
