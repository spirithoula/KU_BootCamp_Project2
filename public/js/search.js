


var searchForm = $("#searchform");
 


  $(searchForm).on("submit", function(event) {
    event.preventDefault();
    $("#memberContainer").remove();
    $("#userContainer").remove();
    $("#noUsers").remove();
    $("#noMembers").remove();
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
          var memberResultWeight = $("<p>Weight (lbs): " + data.members[x].weight + "</p>");
          var memberResultHeight = $("<p>Height (inches): " + data.members[x].height + "</p>");

          // medical info
          var memberResultPhysician = $("<p>Physicians: " + data.members[x].physicians + "</p>");
          var memberResultBloodType = $("<p>Blood Type: " + data.members[x].bloodtype + "</p>");
          var memberResultCondition = $("<p>Conditions: " + data.members[x].conditions + "</p>");
          var memberResultPrescription = $("<p>Prescriptions: " + data.members[x].prescriptions + "</p>");
          
          
          
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
            memberResultWeight,
            memberResultHeight,             
            memberResultBio
          );
          $(memberRightColumn).append(
            memberResultPhysician,
            memberResultBloodType,
             memberResultCondition,
             memberResultPrescription
          );
          $(memberColumns).append(memberLeftColumn, memberMiddleColumn, memberRightColumn);
          $(memberContainer).append(memberColumns);
          $(memberContainer).prepend(memberCount);
        }
        $("#searchModalBody").append(memberContainer);
      } else {
        var noMembers = $(
          "<h4 class='subtitle search-title' id='noMembers'>Members found: " +
            data.members.length +
            "</h4>"
        );
        $("#searchModalBody").append(noMembers);
    
      }
    if (data.users.length !== 0) {
      console.log('USERS:')
      var userContainer = $("<div id='userContainer'></div>");
      var userCount = $(
        "<h3 class='subtitle search-title'>Users found: " + data.users.length + "</h3>"
      );
      for (x in data.users) {
        var userResultName = $("<p>Name: " + data.users[x].name + "</p>");
        var userResultMembers = $("<p>" + data.users[x].name + "'s members: </p>");
        for (y in data.users[x].members) {
        var userColumns = $("<hr><div class='columns' id='userColumns'></div>");
        var userLeftColumn = $("<div class='column is-narrow'></div>");
        var userMiddleColumn = $("<div class='column'></div>");
        var userRightColumn = $("<div class='column'></div>");
        var userMemberResultName = $(
          "<p>Name: " + data.users[x].members[y].name + "</p>"
        );
        var userMemberResultGender = $(
          "<p>Gender: " + data.users[x].members[y].gender + "</p>"
        );
        var userMemberResultBio = $(
          "<p>Bio: " + data.users[x].members[y].bio + "</p>"
        );
        var userMemberResultWeight = $(
          "<p>Weight: " + data.users[x].members[y].weight + "</p>"
        );
        var userMemberResultHeight = $(
          "<p>Height: " + data.users[x].members[y].height + "</p>"
        );

        // medical info
        var userMemberResultPhysicians = $(
          "<p>Physicians: " + data.users[x].members[y].physicians + "</p>"
        );
        var userMemberResultBloodType = $(
          "<p>Blood Type: " + data.users[x].members[y].bloodtype + "</p>"
        );
        var userMemberResultConditions = $(
          "<p>Conditions: " + data.users[x].members[y].conditions + "</p>"
        );
        var userMemberResultPrescriptions = $(
          "<p>Prescriptions: " + data.users[x].members[y].prescriptions + "</p>"
        );


        let profileImage = "https://bulma.io/images/placeholders/128x128.png";
        if (data.users[x].members[y].profileImage) {
          profileImage = data.users[x].members[y].profileImage;
        }
        var userMemberResultPic = $(
          `<figure class="image is-128x128">
          <img src="${profileImage}">
        </figure>`
        );
        
        $(userLeftColumn).append(userMemberResultPic);
        
        $(userMiddleColumn).append(
          userMemberResultName,
          userMemberResultGender,
          userMemberResultHeight,
          userMemberResultWeight,
          userMemberResultBio,
        );
        $(userRightColumn).append(
          userMemberResultPhysicians,
          userMemberResultBloodType,
          userMemberResultConditions,
          userMemberResultPrescriptions
          
        );
        $(userColumns).append(
          userLeftColumn,
          userMiddleColumn,
          userRightColumn
        );
        $(userContainer).append(userColumns);
        $(userContainer).prepend(userCount);
        $(userCount).after(userResultName, userResultMembers);
       
      }
      $("#searchModalBody").append(userContainer);
    }  
  }
    else {
    var noUsers = $(
      "<h4 class='subtitle search-title' id='noUsers'>Users found: " +
        data.users.length +
        "</h4>"
    );
    $("#searchModalBody").append(noUsers);
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
