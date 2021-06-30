const currentDate = window.location.href
  .split('/day/')
  .slice(-1)
  .toString()
  .replace(/[#]/g, '');
console.log(currentDate);

('use strict');

let infoWindow;
let map;
let markers = new Map(); // Don't get confused! This is a *hash map* and not a google map.

function setUpShowOnMapButtons() {
  $('.show-on-map').click((location) => {
    const button = $(location.currentTarget);
    const locationId = button.data('location-id');
    const marker = markers.get(locationId);
    map.panTo(marker.getPosition());
    google.maps.location.trigger(marker, 'click');
  });
}

// This is the entry point callback specified in the script tag for the google maps API.
function initMap() {
  map = new google.maps.Map($('#map')[0], {
    center: { lat: 39.099792, lng: -94.57856 },
    zoom: 11,
  });

  infoWindow = new google.maps.InfoWindow();
}

function getTodaysLocations() {
  let route = '/api/users/day/';
  route += currentDate;
  $.get(route).then((data) => {
    console.log('Todays locations');
    console.log(data);
    updateClasses(data);
  });
} //end of getTodayslocations

function listItemClick() {
  $('.time-link').click(function () {
    // console.log($(this).text());
    let thisParentParent = $(this).parent().parent();
    let time = $(this).data('time-name');
    let locationId = thisParentParent.data('location-id');
    let locationName = thisParentParent.data('location-name');
    let locationObj = {
      time: time,
      locationId: locationId,
      date: currentDate,
      locationName: locationName,
    };
    sessionStorage.setItem('locationObj', JSON.stringify(locationObj));
    document.location.href =
      '/location/day/' + currentDate + '/' + time + '/' + locationId;
    // console.log(locationObj);
  });
} //end of list item click

$(document).ready(function () {
  // console.log(window.location.href);
  listItemClick();
  // getTodaysLocations();

  setUpShowOnMapButtons();
  // checks to see if the user had entered the page using the back button - if so it refreshes the page to keep active locations updated
  if (performance.navigation.type == 2) {
    location.reload(true);
  }
});
