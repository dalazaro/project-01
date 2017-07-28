var db = require('../models');

function index(req, res) {
  db.Neighborhood.find({}, function(err, allNeighborhoods) {
    res.json(allNeighborhoods);
  })
};

function show(req, res) {
  // get neighborhood id
  var neighborhoodId = req.params.id;
  console.log('show neighborhood', neighborhoodId);

  db.Neighborhood.findById(neighborhoodId, function(err, neighborhood) {
    if(err) {
      console.log(err);
    }
    res.json(neighborhood);
  })
};

function create(req, res) {
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
};

function update(req, res) {
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
};

function destroy(req, res) {
  // destroy method
  db.Neighborhood.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      res.status(500);
      console.log("index error: " + err);
    }
    res.json({ message: 'Neighborhood deleted!' });
  });
};

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
