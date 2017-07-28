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
