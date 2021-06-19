$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("#signup");
    var nameInput = $("input#name-input");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var passwordVerify = $("input#password-check");
    $("#password-check").keyup(checkPasswordMatch);
    $(".modal-background").click(function(){
      $(".modal").toggleClass("is-active");
    });
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        name: nameInput.val().trim(),
        email: emailInput.val().trim().toLowerCase(),
        password: passwordInput.val().trim(),
        passwordCheck: passwordVerify.val().trim()
      };
      console.log(userData.name)
      console.log(userData.email);
      console.log(userData.password);
      console.log(userData.passwordCheck)
     
        if (!userData.email || !userData.password) {
            modalAlert("Please complete user info.");
            return;
          }
          else if (userData.password !== userData.passwordCheck){
            modalAlert("Passwords do not match!");
          } else{
            // If we have an email and password, run the signUpUser function
            signUpUser(userData.email, userData.password, userData.name);
            console.log(`signup user:`, userData.email, userData.password, userData.name)
            emailInput.val("");
            passwordInput.val("");
            passwordCheck.val("");
            nameInput.val("");
          }
  
        function signUpUser(email, password, name) {
          $.post("/api/users/signup", {
            name: name,
            email: email,
            password: password
          })
            .then(function(data) {
              console.log(`data:`, data)
              document.location.replace('/profile');
              
            })
            .catch(function(err) {
              console.error(err)
            })
        }

      });
    }); 
     
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors  
  
  function checkPasswordMatch() {
    var password = $("#password-input").val();
    var confirmPassword = $("#password-check").val();
  
    if (password !== confirmPassword){
      $("#divCheckPasswordMatch").html("Passwords do not match!");
    }
    else{
      $("#divCheckPasswordMatch").html("Passwords match.");
    }
  };
  
  function modalAlert(text){
    $(".modal h1").html(text + "<br> Please Try Again!");
    $(".modal").toggleClass("is-active");
  };  
