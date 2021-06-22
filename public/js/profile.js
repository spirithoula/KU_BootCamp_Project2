
$("#addMemberBtn").click(function() {
  $("#newMemberModal").toggleClass("is-active");
});

$("#memberMedicalBtn").click(function() {
  $("#MedicalModal").toggleClass("is-active");
});

$("#profileImageModalBackground").click(function() {
  $("#profile-image-modal").toggleClass("is-active");
});
// close modal

function modalCloseListener(){
  //click action for dismissing modal
  $(".modal-background").click(function() {
    $("#newMemberModal").toggleClass("is-active");
  });  
};
function modalCloseMedical(){

  $(".modal-background").click(function() {
    $("#MedicalModal").toggleClass("is-active");
  });
}

modalCloseListener();
modalCloseMedical();
  //
  const newFormHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#memberName').value.trim();
    const dob = document.querySelector('#memberDOB').value.trim();
    const gender = document.querySelector('#memberGender').value.trim();
    const bio = document.querySelector('#memberBio').value.trim();
    const height = document.querySelector('#memberHeight').value.trim();
    const weight = document.querySelector('#memberWeight').value.trim();
   
  
    if (name && dob && gender && bio && height && weight) {
      const response = await fetch(`/api/users/member`, {
        method: 'POST',
        body: JSON.stringify({ name, dob, gender, bio, height, weight }),
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
      const response = await fetch(`/api/users/member`, {
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
  };

 
  

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
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

  window.onload=function(){
  var el = document.querySelector('#submitMemberBtn');
  if(el) {
    el.addEventListener('click', newFormHandler);
  }

  var element = document.querySelector('#memberDeleteBtn');
  if(element) {
    element.addEventListener('click', delButtonHandler);
  }

  var el2 = document.querySelector('#submitMedicalBtn');
  if(el2) {
    el2.addEventListener('click', newMedicalHandler);
  }

};


$(document).on("click", ".upload-button", (event) => {
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
      apiUrl = `/api/users/${userId}/profile-image`;
      break;

    case "dog":
      apiUrl = `/api/users/member/${uploadTarget.id}/profile-image`;
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