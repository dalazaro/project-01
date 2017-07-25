var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/project-01");

// TODO: make sure current localhost connection string above is working
