// const newMedicalHandler = async (event) => {
//     event.preventDefault();
    
//     const physicians = document.querySelector('#memberPhysicians').value.trim();
//     const bloodtype = document.querySelector('#memberBloodType').value.trim();
//     const allergies = document.querySelector('#memberAllergies').value.trim();
//     const conditions = document.querySelector('#memberConditions').value.trim();
//     const prescriptions = document.querySelector('#memberPrescriptions').value.trim();
    
//     // if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
//       console.log(id);

    
  
//     if (physicians && bloodtype && allergies && conditions && prescriptions) {
//       const response = await fetch(`/api/users/member/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({ physicians, bloodtype, allergies, conditions, prescriptions }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to add medical info!');
//       }
//     }
//   // }
//   };

// window.onload=function(){
//   var el2 = document.querySelector('#submitMedicalBtn');
//   if(el2) {
//     el2.addEventListener('click', newMedicalHandler);
//   }
// };


//   $("#memberMedicalBtn").click(function() {
//     $("#MedicalModal").toggleClass("is-active");
    
//   });

//     $("#medicalModalBackground").click(function() {
//     $("#MedicalModal").toggleClass("is-active");
//   });
