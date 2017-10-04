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
        var restaurants = json.restaurants;
        var wikiUrl = json.wikiUrl;
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
            </div>
          </div>
          <hr>`
        );

        restaurants.forEach(function(restaurant) {
          var restaurantId = restaurant._id;

          $(`#${neighborhoodId} .restaurant-info`).append(`
            <div class="restaurant-box" id="${restaurantId}">
              <a href="${restaurant.url}"><h3>${restaurant.name}</h3></a>
              <div class="restaurant-slurps">
                <h4><b>Recommended Slurps:</b></h4>
                <ul class="restaurant-slurp-render">
                </ul>
              </div>
              <button type="button" class="btn btn-warning add-slurp" name="">Add Slurp!</button>
            </div>`
          )

          restaurant.slurps.forEach(function(slurp) {
            $(`#${restaurantId} .restaurant-tip-render`).append(
              `<li><i>"${slurp}"</i></li>`
            )
          })
        });

      });

      $('.add-restaurant').on('click', handleAddRestaurant);
      $('#saveRestaurant').on('click', handleNewRestaurantSubmit);
      $('.add-slurp').on('click', handleAddSlurp);
    }

  function handleAddRestaurant(e){
    console.log("add-restaurant clicked!", $('.add-restaurant'));
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

    var $restaurantName = $modal.find('#restaurantName')[0].value;
    var $restaurantUrl = $modal.find('#restaurantUrl')[0].value;

    // get data from modal fields
    var dataToPost = {
      name: $restaurantName,
      url: $restaurantUrl
    };
    console.log("NAME", name);
    console.log("URL", dataToPost.restaurantUrl);

    var neighborhoodId = $modal.data('neighborhood_id');
    console.log("MODAL-DATA", $modal.data());

    // POST to SERVER
    var restaurantPostToServerUrl = '/api/neighborhood/'+ neighborhoodId + '/restaurants';
    $.post(restaurantPostToServerUrl, dataToPost, function(data) {
      console.log('received data from post to /restaurants:', data);
      restaurantId = data._id
      // clear form

      // close modal
      $modal.modal('hide');
      $.get('api/neighborhood/' + neighborhoodId, function(data){
          $(`#${neighborhoodId} .restaurant-info`).append(`
            <div class="restaurant-box" id="${restaurantId}">
              <a href="${dataToPost.restaurantUrl}"><h3>${dataToPost.name}</h3></a>
              <div class="restaurant-slurps">
                <h4><b>Recommended Slurps:</b></h4>
                <ul class="restaurant-slurp-render">
                </ul>
              </div>
              <button type="button" class="btn btn-warning add-slurp" name="">Add Slurp!</button>
            </div>`);
      });
    });
  };

  function handleAddSlurp(e){
    console.log("CLICKED TO ADD A SLURRRRRP!");
    e.preventDefault();

    var $modal = $('#slurpModal');
    console.log("SLURPOIADFS JSADFL; JS;LKFJ]", $modal);

    var $slurp = $modal.find('#slurpId');
  }


});
