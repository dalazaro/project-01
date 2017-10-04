function index(req, res) {
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
      {method: "DELETE", path: "/api/neighborhood/:neighborhood_id/restaurants/:restaurant_id", description: "Destroy one id-specified restaurant in an id-specified neighborhood"},

      // SLURPS
      {method: "POST", path: "/api/neighborhood/:neighborhood_id/restaurant/:restaurant_id/slurps", description: "Create a new slurp in an id-specified restaurant"}
    ]
  })
}

module.exports = {
  index: index
}
