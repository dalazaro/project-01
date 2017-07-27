console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: 'api/neighborhood',
    success: function handleSuccess(json) {
      console.log(json);
      var neighborhood = json;
      // for each location, create a list item and marker
      neighborhood.forEach(function (json) {
        console.log("PRINT ME");
        //List neighborhood info
        var name = json.name;
        var wikiUrl = json.wikiUrl;
        var restaurants = json.restaurants;
        var neighborhoodId = json._id;
        $('.neighborhood').append(
          `<div class="neighborhood-box" id="${neighborhoodId}">

            <div class="neighborhood-title">
              <h2 class="col-sm-9">${name}</h2>
              <button type="button" class="add-restaurant col-sm-3" name="">Add Restaurant</button>
            </div>

            <div class="restaurant-img-div">
              <a href="${wikiUrl}"><img  class="restaurant-img" src="/images/embarcadero-fidi.jpg" alt="SF"></a>
            </div>

            <div class="restaurant-info">
              <h4>${json.restaurants[0].name}</h4>
              <a href="${json.restaurants[0].url}">${json.restaurants[0].url}</a>

              <div class="restaurant-tips">
                <h5><b>Tips:</b></h5>
                <li>${json.restaurants[0].tips}</li>
                <button type="button" class="add-tip" name="">Add Tip</button>
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
