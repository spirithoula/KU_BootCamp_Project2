var locations = [
    {
      name: "Barker Field",
      lat: 37.5391116,
      lon: -77.4842119
    },
    {
      name: "Churchill Dog Park",
      lat: 37.5239282,
      lon: -77.4126637
    },
    {
      name: "Phideaux Dog Park",
      lat: 37.5198621,
      lon: -77.483193
    },
    {
      name: "Northside Dog Park",
      lat: 37.5977001,
      lon: -77.4436564
    },
    {
      name: "Rockwood Park",
      lat: 37.4469508,
      lon: -77.5840857
    }
  ];
  
  //seed button for parks to facilitate easier initial deployment on heroku and elsewhere
  $("#parkSeeds").click(function(){
    $.get("/api/users/location/", result => {
      console.log(result);
     //a check to make sure you haven't already clicked the button and double seeded the table
        console.log("Location Seeds being added");
        locations.forEach( location => {
          $.post("/api/users/location/seeds",{
            name: location.name,
            lat: location.lat,
            lon: location.lon
          }).then( response => {
          console.log(response);
          });
        })
    })
  });//end of seed click