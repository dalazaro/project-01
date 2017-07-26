var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/project-01" );
// FIXME: make sure localhost string is valid

module.exports.Neighborhood = require('./neighborhood');
module.exports.Restaurant = require('./restaurant');
