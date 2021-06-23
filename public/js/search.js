$("#searchbutton").click(function() {
    $("#searchModal").toggleClass("is-active");
  });
  //close modal
  

 var searchForm = $("#searchform");
 var nameInput = $("input#searchinput")
 $("#search-modal-background").click(function() {    
  $("#searchModal").toggleClass("is-active");
});

  $(searchForm).on("submit", function(event) {
    event.preventDefault();
    
    var userData = {
        name: nameInput.val().trim(),
    };
    console.log(userData.name);
    if(userData.name) {
      searchUser(userData.name)
    }
    // if (userData.name = " ") {
    //     alert("Please input a name to search for.");
    //     return;
    //   } else{
    //    console.log(userData.name)
    //     searchUser(userData.name);
        
    //     nameInput.val("");
    //   }

      function searchUser(input) {
        $.get("/api/users/search/" + input)
          .then(function(data) {
            console.log(`data:`, data)
            
            
          })
          .catch(function(err) {
            console.error(err)
          })
      }

  });