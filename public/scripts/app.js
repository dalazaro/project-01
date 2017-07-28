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
              <li>${json.restaurants[0].tips[0]}</li>
              <li>${json.restaurants[0].tips[1]}</li>
              </ul>
              <button type="button" class="btn btn-warning add-tip" name="">Add Slurp for ${json.restaurants[0].name}</button>
              </div>
            </div>
          </div>
          <hr>`
        );

      });
      $('.add-restaurant').on('click', handleAddRestaurant);
      $('#saveRestaurant').on('click', handleNewRestaurantSubmit);    }
  });
});

function handleAddRestaurant(e){
  console.log("add-restaurant clicked!");
  var currentNeighborhoodId = $(this).closest('.neighborhood').data('neighborhood_id');
  console.log(('THIS IS THE CURRENT NEIGHTBORHOODID!!', currentNeighborhoodId));
  $('#restaurantModal').data('neighborhood_id', currentNeighborhoodId);
  $('#restaurantModal').modal();
}

// when the song modal submit button is clicked:
function handleNewRestaurantSubmit(e) {
  e.preventDefault();
  var $modal = $('#restaurantModal');
  var $restaurantNameField = $modal.find('#restaurantName');
  var $restaurantUrl = $modal.find('#restaurant-web');
  // get data from modal fields
  var dataToPost = {
    name: $restaurantNameField.val(),
    restaurantUrl: $restaurantUrl.val()
  };

  var restaurantId = $modal.data('restaurantId');
  console.log("RESTAURANT ID: ", restaurantId);
  // POST to SERVER
  var restaurantPostToServerUrl = '/api/neighborhood/:'+ restaurantId + '/restaurants';
  // $.post(restaurantPostToServerUrl, dataToPost, function(data) {
  //   console.log('received data from post to /restaurants:', data);
  //   // clear form
  //   $restaurantNameField.val('');
  //   $restaurantUrl.val('');

    // close modal
    // $modal.modal('hide');
    // update the correct album to show the new song
    // $.get('/api/neighborhood/' + restaurantId, function(data) {
    //   // remove the current instance of the album from the page
    //   $('[data-restaurant-id=' + restaurantId + ']').remove();
    //   // re-render it with the new album data (including songs)
    //   renderRestaurant(data);
    // });
  // }).error(function(err) {
    // console.log('post to /api/neighborhood/:neighborhoodId/restaurants resulted in error', err);
}
// $('#restaurants').on('click', '.district-name', handleNavigationClick);

//when neighborhood is clicked from drop down menu
// function handleNavigationClick(e){
//
// }
