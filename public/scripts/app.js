console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  //render all neighborhoods to the page
  $.ajax({
    method: "GET",
    url: 'api/neighborhood',
    success: handleSuccess
  });

  function handleSuccess(json) {
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
      $('#saveRestaurant').on('click', handleNewRestaurantSubmit);
    }
  // });

  function renderRestaurant(json) {
    var neighborhood = json;

      // for each location, create a list item and marker
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
              <h2 id="neighborhood-title">${name}</h2>
            </div>
            <div class="neighborhood-img-div">
              <a href="${wikiUrl}" target="blank"><img class="neighborhood-img" src="/images/embarcadero-fidi.jpg" alt="SF"></a>
            </div>
            <button type="button" class="btn btn-primary add-restaurant" name="">Add ${name} Restaurant</button>
            <div class="restaurant-info">
              <a href="${json.restaurants.url}"><h3>${json.restaurants.name}</h3></a>
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


      $('.add-restaurant').on('click', handleAddRestaurant);
      $('#saveRestaurant').on('click', handleNewRestaurantSubmit);
    }
  // });



function handleAddRestaurant(e){
  console.log("add-restaurant clicked!");
  var closestNei = $(this).closest('.neighborhood-box')[0];
  var $neighEle = $(closestNei);
  console.log("CLOSEST neighborhood", $neighEle.attr('id'));
  var currentNeighborhoodId = $neighEle.attr('id');

  console.log("THIS IS THE CURRENT NEIGHTBORHOODID!!", currentNeighborhoodId);
  $('#restaurantModal').data('neighborhood_id', currentNeighborhoodId);
  $('#restaurantModal').modal();
}

// when the song modal submit button is clicked:
function handleNewRestaurantSubmit(e) {
  console.log("CLICKED");
  e.preventDefault();

  var $modal = $('#restaurantModal');
  // console.log("RESTAURANT MODAL", $modal);

  var $restaurantNameField = $modal.find('#restaurantModal')[0].value;
  console.log("RESTAURANT NAME FIELD", $restaurantNameField);
  var $restaurantUrl = $modal.find('#restaurant-web')[0].value;
  console.log("RESTAURANT URL", $restaurantUrl);
  // get data from modal fields
  var dataToPost = {
    name: $restaurantNameField,
    restaurantUrl: $restaurantUrl
  };
  console.log("NAME", name);

  var neighborhoodId = $modal.data('neighborhood_id');
  console.log("MODAL-DATA", $modal.data());
  console.log("NEIGHBORHOOD ID: ", neighborhoodId);
  // POST to SERVER
  var restaurantPostToServerUrl = '/api/neighborhood/'+ neighborhoodId + '/restaurants';
  $.post(restaurantPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /restaurants:', data);
    console.log("RESTAURTANTPOSTTOSERVERRRRRR", restaurantPostToServerUrl);
  //   // clear form
    // $restaurantNameField;
    // $restaurantUrl;

    // close modal
    $modal.modal('hide');
    $.get('api/neighborhood/' + neighborhoodId, function(data){
        $('[id=' + neighborhoodId + ']').remove();
        renderRestaurant(data);
    });

    // update the correct album to show the new song

      // fetchAndRenderNeighborhoodWithId(neighborhoodId);
    });
//   }).error(function(err) {
//     console.log('post to /api/neighborhood/:neighborhoodId/restaurants resulted in error', err);
// });
// $('#restaurants').on('click', '.district-name', handleNavigationClick);

//when neighborhood is clicked from drop down menu
// function handleNavigationClick(e){
//
};

});
