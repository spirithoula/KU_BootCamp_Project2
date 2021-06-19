function newAccountButton(){
    $("#createAccount").click(function() {
      window.location.href = "/new";
    });
  };
  
  function somethingWentWrong(){
    $("#wentWrongModal").toggleClass("is-active");
  }
  
  function modalCloseListener(){
    //click action for dismissing modal
    $(".modal-background").click(function() {
      $("#wentWrongModal").toggleClass("is-active");
    });
  };
  
  
  modalCloseListener()
  newAccountButton();

  //
  const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-input').value.trim().toLowerCase();
    const password = document.querySelector('#password-input').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
 
  
  document
    .querySelector('#login')
    .addEventListener('submit', loginFormHandler);
  
