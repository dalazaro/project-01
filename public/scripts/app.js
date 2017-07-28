console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  //render all neighborhoods to the page
  $.ajax({
    method: "GET",
    url: 'api/neighborhood',
    success: function handleSuccess(json) {
      var neighborhood = json;

      // for each location, create a list item and marker
      neighborhood.forEach(function (json) {
        //List neighborhood info
        var name = json.name;
        var wikiUrl = json.wikiUrl;
        var restaurants = json.restaurants;
        var neighborhoodId = json._id;

        $('.nav-neighborhoods').append(
          `<li><a href="#${neighborhoodId}">${name}</a></li>`
        )

        $('.neighborhood').append(
          `<div class="neighborhood-box" id="${neighborhoodId}">

            <div class="neighborhood-title">
              <h2>${name}</h2>
            </div>

            <div class="neighborhood-img-div">
              <a href="${wikiUrl}" target="blank"><img class="neighborhood-img" src="/images/embarcadero-fidi.jpg" alt="SF"></a>
            </div>

            <button type="button" class="btn btn-primary add-restaurant" name="">Add ${name} Restaurant</button>

            <div class="restaurant-info">

              <a href="${json.restaurants[0].url}"><h3>${json.restaurants[0].name}</h3></a>
              <div class="restaurant-tips">
              <h4><b>Recommended Slurps:</b></h5>
              <ul class="restaurant-tip-render">
              </ul>
              <button type="button" class="btn btn-warning add-tip" name="">Add Slurp for ${json.restaurants[0].name}</button>
              </div>

            </div>
          </div>
          <hr>`
        );

      });
    }
  });
});


//
//
//   console.log("app.js is loaded!");
//
//
// // TODO: CALLBACK FUNCTIONS
//
// $('#restaurants').on('click', '.district-name', handleNavigationClick);
// $('.add-restaurant').on('click', handleAddRestaurant);
//
//
//
//
//
//
// //when neighborhood is clicked from drop down menu
// function handleNavigationClick(e){
//
// }
//
// function handleAddRestaurant(e){
//   console.log("add-restaurant clicked!");
//   var currentNeighborhoodId = $(this).closest('.neighborhood').data('neighborhood_id');
//   console.log(('ID', currentNeighborhoodId));
//   $()
// }
