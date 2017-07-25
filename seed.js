//This file will allow us to send our application with data

var db = require("./models");

var neighborhoodList = [];

neighborhoodList.push({
  name: "Financial District",
  wikiUrl: "https://en.wikipedia.org/wiki/Financial_District,_San_Francisco",
  restaurants: [
    {
     name: "Kirimachi Ramen",
     url: "http://kirimachi.com",
     tips: ["Love the Tsukemen Ramen!", "Try the Duck one!"]
    },
    {
      name: "The Ramen Bar",
      url: "http://theramenbar.com",
      tips: ["Tokyo Roast Chicken Ramen w/ and egg!!"]
    }
  ]
});

neighborhoodList.push({
  name: "Japantown",
  wikiUrl: "https://en.wikipedia.org/wiki/Japantown,_San_Francisco",
  restaurants: [
    {
      name: "Marufuku Ramen",
      url: "http://marufukuramen.com",
      tips: ["Chicken Karaage!", "Hakata style ramen"]
    },
    {
      name: "Hinodeya Ramen Bar",
      url: "http://sasala-group.com/hinodeya",
      tips: ["Tori Paitan", "Black Sesame Icecream with granola!"]
    }
  ]
});

neighborhoodList.push({
  name: "Hayes Valley",
  wikiUrl: "https://en.wikipedia.org/wiki/Hayes_Valley,_San_Francisco",
  restaurants: [
    {
      name: "Nojo Ramen Tavern",
      url: "https://nojosf.com",
      tips: ["Spicy Chicken Soboro Tossed Noodles", "Chicken Paitan Soy Sauce Ramen"]
    },
    {
      name: "O-Toro Sushi",
      url: "http://otorosushi.com",
      tips: ["Miso Ramen!", "Get sushi instead"]
    }
  ]
});


db.Neighborhood.remove({}, function(err, restaurant) {
    db.Neighborhood.create(neighborhoodData, function(err, neighborhood) {
        if (err) {
          return console.log('ERROR', err);
        }
        console.log("all neighborhood: ", neighborhood);
        console.log("created ", neighborhoodData.length, " neighborhood");
        process.exit();
    }); //closes create function
}); //closes remove function
