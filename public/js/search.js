$("#searchbutton").click(function() {
    $("#searchModal").toggleClass("is-active");
  });
  
  $("#search-modal-background").click(function() {
    
    $("#searchModal").toggleClass("is-active");
  });

  var nameInput = $("input#searchinput")

  $("#searchform").on("submit", function(event) {
    event.preventDefault();

    

    var userData = {
        name: nameInput.val().trim()
    }

    if (userData.name = "") {
        modalAlert("Please input a name to search for.");
        return;
      } else{
       
        searchUser(userData.name);
        
        nameInput.val("");
      }

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