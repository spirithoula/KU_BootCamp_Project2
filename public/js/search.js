


var searchForm = $("#searchform");
 


  $(searchForm).on("submit", function(event) {
    event.preventDefault();
    console.log("clicked");

    var searchInput = $("#searchinput").val().trim();
     if (searchInput === "") {
       return;
  } else {
    console.log(searchInput);
    var apiURL = `/api/users/search/${searchInput}`;

    $.ajax({
      url: apiURL,
      contentType: "application/json; charset=utf-8",
      type: "GET"
    }).then(function(data) {
      console.log(data);
      if (data.members.length !== 0) {
        var memberCount = $(
          "<h3 class='subtitle search-title'>Members found: " + data.members.length + "</h3>"
        );
        var memberContainer = $("<div id='memberContainer'></div>");
        for (x in data.members) {
          var memberColumns = $("<hr><div class='columns' id='memberColumns'></div>");
          var memberLeftColumn = $("<div class='column is-narrow'></div>");
          var memberMiddleColumn = $("<div class='column'></div>");
          var memberRightColumn = $("<div class='column'></div>");
          var memberResultName = $("<p>Name: " + data.members[x].name + "</p>");
          var memberResultGender = $("<p>Gender: " + data.members[x].gender + "</p>");
          var memberResultBio = $("<p>Bio: " + data.members[x].bio + "</p>");
          var memberResultWeight = $("<p>Weight: " + data.members[x].weight + "</p>");
          
          
          
          let profileImage = "https://bulma.io/images/placeholders/128x128.png";
          if (data.members[x].profileImage) {
            profileImage = data.members[x].profileImage;
          }
          var memberResultPic = $(
            `<figure class="image is-128x128">
              <img src="${profileImage}">
            </figure>`
          );
          $(memberLeftColumn).append(memberResultPic);
          $(memberMiddleColumn).append(
            memberResultName,
            memberResultGender,
            memberResultBio
          );
          $(memberRightColumn).append(
            memberResultWeight,            
          );
          $(memberColumns).append(memberLeftColumn, memberMiddleColumn, memberRightColumn);
          $(memberContainer).append(memberColumns);
          $(memberContainer).prepend(memberCount);
        }
        $("#searchModalBody").append(memberContainer);
      } else {
        var noMembers = $(
          "<h4 class='subtitle search-title' id='noMembers'>Members found: " +
            data.members +
            "</h4>"
        );
        $("#searchModalBody").append(noMembers);
      }
        if (data.members === 0) {
        console.log('no members');
      }
    });
  }
});
   


  $("#searchbutton").click(function() {
    $("#searchModal").toggleClass("is-active");    
});


  $("#search-modal-background").click(function() {    
    $("#searchModal").toggleClass("is-active");
  });

  //close modal
  

 