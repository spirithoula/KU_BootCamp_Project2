// where we store the data-id for submitting medical info
let submitMedId;
let user_id;


$('#addMemberBtn').click(function () {
  $('#newMemberModal').toggleClass('is-active');
});

$('#memberModal').click(function () {
  $('#newMemberModal').toggleClass('is-active');
});

$('#emailBtn').click(function () {
  $('#newEmailModal').toggleClass('is-active');
});

// close modal
$("#profileImageModalBackground").click(function() {
  $("#profile-image-modal").toggleClass("is-active");
});


 //click action for dismissing modal
 $("#medicalModalBackground").click(function() {
  $("#MedicalModal").toggleClass("is-active");
});  

let members = []
  


window.onload= function(){

  var el = document.querySelector('#submitMemberBtn');
  if(el) {
    el.addEventListener('click', newFormHandler);
  }
  
  var el = document.querySelector('#emailBtn');
  if(el) {
    el.addEventListener('click');
  }

  var element = document.querySelectorAll('.memberDeleteBtn');
  for (i=0; i < element.length; i++) {
    element[i].addEventListener('click', delButtonHandler);
  }

  var el3 = document.querySelector('#submitMedicalBtn');  
    el3.addEventListener('click', newMedicalHandler);


    $('.memberMedicalBtn').each(function() {
      $(this).click(function(event) {
        $("#MedicalModal").toggleClass("is-active");
        submitMedId = event.target.getAttribute('data-id');
         console.log(submitMedId);
         
        
      });
    })
  
 
};

  const newFormHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#memberName').value.trim();
    const dob = document.querySelector('#memberDOB').value.trim();
    const gender = document.querySelector('#memberGender').value.trim();
    const bio = document.querySelector('#memberBio').value.trim();
    const height = document.querySelector('#memberHeight').value.trim();
    const weight = document.querySelector('#memberWeight').value.trim();
    const phone = document.querySelector('#memberPhone').value.trim();
   
  
    if (name && dob && gender && bio && height && weight && phone) {
      const response = await fetch(`/api/users/member`, {
        method: 'POST',
        body: JSON.stringify({ name, dob, gender, bio, height, weight, phone }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create member');
      }
    }
  };
  const newMedicalHandler = async (event) => {
    event.preventDefault();
    
    const physicians = document.querySelector('#memberPhysicians').value.trim();
    const bloodtype = document.querySelector('#memberBloodType').value.trim();
    const allergies = document.querySelector('#memberAllergies').value.trim();
    const conditions = document.querySelector('#memberConditions').value.trim();
    const prescriptions = document.querySelector('#memberPrescriptions').value.trim();
    
  
    if (physicians && bloodtype && allergies && conditions && prescriptions) {
      const response = await fetch(`/api/users/member/${submitMedId}`, {
        method: 'PUT',
        body: JSON.stringify({ physicians, bloodtype, allergies, conditions, prescriptions }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to add medical info!');
      }
    }
  // }
  };
const newEmailBtn = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-is');
    console.log(id);
  }
}



  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
  
      const response = await fetch(`/api/users/member/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete member!');
      }
    }
  };

  //update name
  $("#nameBtn").click(function(event) {
    user_id = event.target.getAttribute('data-id');
     console.log(user_id);
    var newName = $("#nameInput")
      .val()
      .trim();
    var apiURL = `/api/users/name/${user_id}`;
  
    $.ajax({
      url: apiURL,
      method: "PUT",
      data: { name: newName }
    }).then(function() {
      location.reload();
    });
  });

// UPLOAD IMAGE
$(document).on("click", ".upload-button", (event) => {
  user_id = event.target.getAttribute('data-id');
  console.log(user_id);
  event.stopPropagation();
  const button = $(event.currentTarget);

  uploadTarget = {
    type: button.data("upload-target-type"),
    id: button.data("upload-target-id"),
  };

  $("#pick-file").val(null);
  $("#pick-file-name").text("");
  $("#upload-feedback").hide();

  $("#profile-image-modal").toggleClass("is-active");
});

$("#pick-file").change((event) => {
  const input = event.currentTarget;
  if (input.files.length > 0) {
    $("#pick-file-name").text(input.files[0].name);
  } else {
    $("#pick-file-name").text("");
  }
});

$("#picture-upload").submit((event) => {
  event.preventDefault();

  if ($("#pick-file")[0].files.length === 0) {
    return;
  }

  $("#upload-feedback").hide();
  $("#upload-progress").show();

  let apiUrl;
  switch (uploadTarget.type) {
    case "user":
      apiUrl = `/api/users/${user_id}/profile-image`;
      break;

    case "member":
      apiUrl = `/api/users/member/${user_id}/profile-image`;
      break;

      case "memberInsuranceCard":
      apiUrl = `/api/users/member/${user_id}/insurance-image`;
      break;

      case "userInsuranceCard":
      apiUrl = `/api/users/${user_id}/insurance-image`;
      break;
  }

  $.ajax({
      url: apiUrl,
      type: "PATCH",
      data: new FormData(event.currentTarget),
      cache: false,
      contentType: false,
      processData: false,
      xhr: () => {
        const myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
          myXhr.upload.addEventListener("progress", (event) => {
              if (event.lengthComputable) {
                $("#upload-progress").attr({
                  value: event.loaded,
                  max: event.total,
                });
              }
            }, false);
        }
        return myXhr;
      },
    })
    .then((responseJson) => {
      location.reload();
    })
    .catch((error) => {
      console.error(error);
      $("#upload-feedback").show();
      $("#upload-progress").hide();
    });
  });
