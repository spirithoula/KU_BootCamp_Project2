function memberListeners() {
    var dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function (event) {
      event.preventDefault();
      dropdown.classList.toggle('is-active');
    });
  
    $("#addMemberBtn").click(function() {
      $("#newMemberModal").toggleClass("is-active");
    });
  
    $("#profileImageModalBackground").click(function() {
      $("#profile-image-modal").toggleClass("is-active");
    });
  };//end of member listener

// submit member button
  $("#submitMemberBtn").click(function(event) {
    event.preventDefault();
  
    var newMember = {
      name: $("#memberName")
        .val()
        .trim(),
      gender: $("#memberGender")
        .val()
        .trim(),      
      bio: $("#memberBio")
        .val()
        .trim(),
      height: $("#memberHeight")
        .val()
        .trim(),
      weight: $("#memberWeight")
        .val()
        .trim(),
      UserId: user_ID
    };
  
    if (
      (newMember.name,
      newMember.gender,
      newMember.weight,
      newMember.bio,
      newMember.height,
      newMember.UserId)
    ) {
      $.ajax("/api/member", {
        type: "POST",
        data: newMember
      }).then(function() {
        location.reload();
      });
    } else {
      alert("Please fill out the entire form.");
    }
  });

  //
  memberListeners();