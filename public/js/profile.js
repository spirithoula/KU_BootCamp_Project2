$('#addMemberBtn').click(function () {
  $('#newMemberModal').toggleClass('is-active');
});

$('#profileImageModalBackground').click(function () {
  $('#profile-image-modal').toggleClass('is-active');
});
// close modal

function modalCloseListener() {
  //click action for dismissing modal
  $('.modal-background').click(function () {
    $('#newMemberModal').toggleClass('is-active');
  });
}

modalCloseListener();

//
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#memberName').value.trim();
  const dob = document.querySelector('#memberDOB').value.trim();
  const gender = document.querySelector('#memberGender').value.trim();
  const bio = document.querySelector('#memberBio').value.trim();
  const memberHeight = document.querySelector('#memberHeight').value.trim();
  const memberWeight = document.querySelector('#memberWeight').value.trim();

  if (name && dob && gender && bio && memberHeight && memberWeight) {
    const response = await fetch(`/api/users/member`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        dob,
        gender,
        bio,
        memberHeight,
        memberWeight,
      }),
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

window.onload = function () {
  var el = document.querySelector('#submitMemberBtn');
  if (el) {
    el.addEventListener('click', newFormHandler);
  }

  var element = document.querySelector('#memberDeleteBtn');
  if (element) {
    element.addEventListener('click', delButtonHandler);
  }
};
