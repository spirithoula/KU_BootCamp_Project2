const currentDate = window.location.href
  .split('/day/')
  .slice(-1)
  .toString()
  .replace(/[#]/g, '');
console.log(currentDate);




"use strict";

let infoWindow;
let map;
let markers = new Map(); // Don't get confused! This is a *hash map* and not a google map.



function addLocationsToMap(parks) {
  for (const park of parks) {
    const marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(park.lat, park.lon),
    });

    markers.set(park.id, marker);
  
    google.maps.park.addEventListener(marker, "click", function() {
      const coordinates = encodeURIComponent(park.lat + "," + park.lon);
      const directionsLink = "https://www.google.com/maps/dir/?api=1&destination=" + coordinates;

      const content = "<h1>" + park.name + "</h1>"
        + "<a href=\"" + directionsLink + "\">Get Directions</a>";

      infoWindow.setContent(content);
      infoWindow.open(map, this);
    });
  }
}

function setUpShowOnMapButtons() {
  $(".show-on-map").click((location) => {
    const button = $(location.currentTarget);
    const locationId = button.data("park-id");
    const marker = markers.get(locationId);
    map.panTo(marker.getPosition());
    google.maps.location.trigger(marker, "click");
  });
}

// This is the entry point callback specified in the script tag for the google maps API.
function initMap() {
  map = new google.maps.Map($("#map")[0], {
    center: {lat: 39.099792, lng: -94.57856},
    zoom: 11,
  });

  infoWindow = new google.maps.InfoWindow();

  addLocationsToMap(parks);
  setUpShowOnMapButtons();
}

function getTodaysLocations(){
  let route = "/api/users/event/current/";
  route += currentDate;
  $.get(route).then(data => {
    console.log("Todays locations");
    console.log(data);
    updateClasses(data);
  })
};//end of getTodayslocations

function listItemClick(){
  $(".time-link").click(function(){
    // console.log($(this).text());
    let thisParentParent = $(this).parent().parent();
    let time = $(this).data("time-name");
    let locationId = thisParentParent.data("location-id");
    let locationName = thisParentParent.data("location-name");
    let locationObj = {
      time: time,
      locationId: locationId,
      date: currentDate,
      locationName: locationName
    };
    sessionStorage.setItem('locationObj', JSON.stringify(locationObj));
    document.location.href = "/location/day/" + currentDate + "/" + time + "/" + locationId;
    // console.log(locationObj);
  })
}//end of list item click


//updates classes of list of times based on whether or not there are active locations for that day and whether the user is active on one of those days
function updateClasses(data){
  data.forEach((event) => {
    let userId = event.User.id;
    let parkId = event.locationId;
    let time = event.time

    if (userId == myUserId){
      $(`[data-park-id = ${parkId}] .${time} a`).addClass("userEvent")
    };
    $(`[data-park-id = ${parkId}] .${time} a`).addClass("activeEvent")
  })//end of forEach
}//end of updateClasses


$(document).ready(function(){
  // console.log(window.location.href);
  listItemClick();
  getTodaysLocations();

  // checks to see if the user had entered the page using the back button - if so it refreshes the page to keep active locations updated
  if(performance.navigation.type == 2){
    location.reload(true);
 }
})