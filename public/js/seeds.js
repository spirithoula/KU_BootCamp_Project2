var locations = [
  {
    name: 'Test Location',
    lat: 39.099792,
    lon: -94.57856,
  },
  {
    name: 'Test Location 2',
    lat: 39.099792,
    lon: -94.57856,
  },
];

//seed button for to facilitate easier initial deployment on heroku and elsewhere
$('#').click(function () {
  console.log('Location Seeds being added');
  locations.forEach((location) => {
    $.post('/api/users/location/seeds', {
      name: location.name,
      lat: location.lat,
      lon: location.lon,
    }).then((response) => {
      console.log(response);
    });
  });
}); //end of seed click
