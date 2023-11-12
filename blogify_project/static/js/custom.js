
// Function to show a toast message
function showToast(activity="Validation",fieldname, value,bgColor='bg-danger') {
  console.log('show toast')
  const toastContainer = document.querySelector('.toast-container');
  const toastElement = document.createElement('div');
  toastElement.classList.add('toast');
  toastElement.setAttribute('role', 'alert');
  toastElement.setAttribute('aria-live', 'assertive');
  toastElement.setAttribute('aria-atomic', 'true');
  
  toastElement.innerHTML = `
  <div class="toast-header  ${bgColor}" >
  
  <strong class="me-auto text-white">${activity}</strong>
  <div class="d-flex justify-content-evenly">
    <small class="text-white mx-3">just now</small>
  <button type="button" class="btn-close btn-close-white me-2 m-auto fw-3" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  </div>
  <div class="toast-body  ${bgColor}">
  ${fieldname} : ${value}</div>`;
  
  toastContainer.appendChild(toastElement);
  
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
 console.log(toastContainer)
  }


//============================== Sign Up form validation styling ============================
let usernameFlag=0;
let emailFlag=0;
let passwordFlag=0;
let password2Flag=0;


// Get input element
const usernameInput = document.getElementById('username');
const emailInput = document.querySelector('#email')
const password1 = document.querySelector('#password1')
const password2 = document.querySelector('#password2')

function signUpStyling(fieldInput, flag, fieldFlag) {
  console.log('signup styling called')
  if (flag !== 1) {
   
    fieldFlag = 0;
    fieldInput.classList.remove('bg-danger');
    fieldInput.style.border = '1px solid #ced4da';
    fieldInput.style.color = 'black';
  } else {
    fieldFlag = 1;
    fieldInput.style.border = '2px solid white';
    fieldInput.classList.add('bg-danger');
    fieldInput.style.color = 'white';
  }
  return fieldFlag; // Return the updated fieldFlag value
}
  

document.addEventListener('DOMContentLoaded', function() {

 
  //slider in home page 
  if (window.location.pathname === '/')
  {
 
   // Get the carousel element
   var carousel = document.getElementById('imageSlider');

   // Create a new Carousel instance
   var myCarousel = new bootstrap.Carousel(carousel, {
       interval: 1000 // Auto slide every 2 seconds
   });


   var fileInput = document.getElementById('validatedCustomFile');
    var fileLabel = document.querySelector('.custom-file-label');



    fileInput.style.display = "none";

    // Trigger file input click when the label is clicked
    fileLabel.addEventListener('click', function() {
        fileInput.click();
    });

    // Listen for changes in the file input
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            // If a file is selected, update the label text
            fileLabel.textContent = fileInput.files[0].name;
        } else {
            // If no file is chosen, reset the label text
            fileLabel.textContent = 'Add images if any...';
        }
    });
  }
    




usernameInput.addEventListener("blur", () => {
  usernameFlag = signUpStyling(usernameInput, 0, usernameFlag); // Update emailFlag with the returned value
  flag = 0;
  const fieldname = "Username"; // Replace with the appropriate field name
  const value = usernameInput.value; // Get the input value
 
  if (value !== "") {
    
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      showToast(
        "Validation",
        fieldname,
        "Use only alphabets and numbers in the username",
        
        
      );
      flag = 1;
    }
    if (value.length < 5) {
      console.log('-----------------',value)
      showToast(
        "Validation",
        fieldname,
        "Username should be at least 5 characters long",
        
        
      );
      flag = 1;
    }

  } else {
    flag=1;
  }

  fetch(`/username_check/?username=${value}`)
  .then((res)=>res.json())
  .then((res)=>{

    if(res.userNameExist){

      showToast(
        "Validation",
        fieldname,
        "Username already exists.Try new one.",
        
        
      );
      flag =1;
      usernameFlag = signUpStyling(usernameInput, 1, usernameFlag); 
    }

  })
  if (flag ===1){
    usernameFlag = signUpStyling(usernameInput, 1, usernameFlag); 
  }

}); 

emailInput.addEventListener("blur", () => {
  const fieldname = "Email";
  const value = emailInput.value;
  emailFlag = signUpStyling(emailInput, 0, emailFlag); // Update emailFlag with the returned value
  flag = 0;

  if (value !== "") {
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
      showToast("Validation", fieldname, "Please enter a valid email address");
      flag = 1;
    }
  } else {
    flag = 1;
  }

  if (flag === 1) {
    emailFlag = signUpStyling(emailInput, 1, emailFlag); // Update emailFlag again
  }

  
});

password1.addEventListener("blur", () => {
  const fieldname = "Password"; // Replace with the appropriate field name
  const value = password1.value; // Get the input value
  passwordFlag = signUpStyling(password1, 0, passwordFlag); // Update emailFlag with the returned value
  flag = 0;
  if (password1.value !== "") {
    
    if (password1.value.length < 5) {
      showToast(
        "Validation",
        fieldname,
        "Password should be at least 5 characters long",
        
        
      );
      flag=1;
    }
     // Check if the password contains at least one numeric character
  if (!/\d/.test(value)) {
    
    showToast(
      "Validation",
      fieldname,
      "Password must contain at least one numeric character"
    );
    flag = 1;
  }

  // Check if the password is similar to the username
  const username = usernameInput.value;

  if (value.includes(username)) {
    showToast(
      "Validation",
      fieldname,
      "Password cannot be similar to the username"
    );
    flag = 1;
    console.log('enters the function')
  }
  }
  else {
    flag=1;
  }
  if (flag ===1){
    passwordFlag = signUpStyling(password1, 1, passwordFlag); 
  }
});



password2.addEventListener("blur", () => {
  const fieldname = "Confirm Password"; // Replace with the appropriate field name
  const value = password2.value; // Get the input value
  password2Flag = signUpStyling(password2, 0, password2Flag); // Update emailFlag with the returned value
  flag = 0;
  if (password2.value !== "") {
    
    if (password2.value !== password1.value) {
      showToast(
        "Validation",
        fieldname,
        "Passwords not matching",
      
      );
      flag=1;
    }
   
  }
  else {
    flag=1;
  }
  if (flag ===1){
    password2Flag = signUpStyling(password2, 1, password2Flag); 
  }
});




});




//==============================sign in ===================================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signInModal').addEventListener('submit', (event) => {
    event.preventDefault();
console.log('comes here')
    const username = document.querySelector('#signInUsername').value;
    const password = document.querySelector('#password').value; // Corrected the selector

    if (username !== '' && password !== '') { // Use "&&" to check both conditions
      fetch(`/sign_in/?username=${username}&password=${password}`) // Use "&" to separate parameters
        .then((res) => res.json()) // Removed extra braces
        .then((res) => {
          if (res.userLogin) {
            location.reload(); // Corrected the window reload
          } else {
            showToast('Login', 'Credentials', 'Invalid credentials'); // Corrected the function call
          }
        });
    }

    if (username === '') {
      showToast('Login', 'Username', "Can't leave empty");
    }
    if (password === '') {
      showToast('Login', 'Password', "Can't leave empty");
    }
  });
});


//=================================== User Sign UP ===========================================
document.getElementById('signUpModal').addEventListener('submit',(event)=>{
  event.preventDefault();


  

  if (usernameInput.value !== '' && emailInput.value !== '' && password1.value !== '' 
  && password2.value !==''&& usernameFlag !==1 && emailFlag !== 1
  && password2Flag !==1 && passwordFlag !==1
  ){

     // Create a FormData object to serialize the form data
     const formData = {
      username: usernameInput.value,
      email: emailInput.value,
      password1: password1.value,
      password2: password2.value,
    };

      
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

fetch("/signup/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrfToken, // Include the CSRF token in the header
  },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          showToast('Account ','Created','Successfully','bg-success')
          //redirect
          
          setTimeout(()=>{

            fetch(`/sign_in/?username=${usernameInput.value}&password=${password1.value}`)
            .then((res) => res.json())
            .then((res) => {
              if (res.userLogin) {
                location.reload();
              }
              else{
                  
                showToast('Account ','Login ','now.. ','bg-success')
                        }
            });

          },2000)

            
        }
        
      else {
        showToast('Account ','Creation ','Failed ','bg-danger')
      }
        })
        

    
      .catch((error) => {
        showToast('Account ','Creation ','Failed ','bg-danger')
      });
    
  }else{
    showToast('Account ','Creation ','Give acceptable values in the red boxes.','bg-danger')
  }
})



//=====================================  post page ===========================================


//==================================== review adding in the form ============================
document.addEventListener('DOMContentLoaded', () => {

 
  showLabel=document.querySelector('#descEmptyInfo')
  

  if (showLabel){
    showLabel.style.display='none';
  }
      let reviewRating = 0;
  const review_stars = document.querySelectorAll('.add-form-stars');
      
  if (review_stars) {
      review_stars.forEach((element, index) => {
          element.addEventListener('click', () => {
              // Clear the 'checked' class for all stars before setting the new selection
              review_stars.forEach((star, i) => {
                  if (i <= index) {
                      star.classList.add('checked');
                  } else {
                      star.classList.remove('checked');
                  }
              });
              reviewRating = index + 1;
              
              document.getElementById('starRating').value = reviewRating;
          


          
              
          });
      });

    }

  let form = document.querySelector('#addCommentForm')
  
  if (form){
  
  form.addEventListener('submit', (event) => {
      

      if (document.querySelector('#addComment').value === ''){
        console.log('empty')
        showToast('Comment',"Cannot ",'Submit empty description','bg-danger')
        showLabel=document.querySelector('#descEmptyInfo')
        showLabel.style.display='block';
        event.preventDefault();
      }
      
      
  });

}
  
});


//===================================== Comment Update ============================================

if (window.location.pathname.startsWith('/post/')){
document.addEventListener('DOMContentLoaded',()=>{
  updateModalComment = document.querySelector('#updateCommentText')
  updateCommentTextBtn = document.querySelector('#updateCommentTextBtn')

  commentText = document.getElementById('commentText').innerText
  commentReview = updateCommentTextBtn.getAttribute('rating-value')

  updateCommentTextBtn.addEventListener('click',()=>{
    
    updateModalComment.innerHTML = commentText
    ratingValue = commentReview

    console.log(` comment text ${commentText} , comment review ${commentReview},${document.querySelectorAll('.update-review')}`)
    ratingStarElement = document.querySelectorAll('.update-review')
    
      for(let i =0;i<5;i++){
        ratingStarElement[i].classList.remove('checked', 'text-white');
        if (i < ratingValue) {
          
          ratingStarElement[i].classList.add('checked');
        } else {
          ratingStarElement[i].classList.add('text-white');
        }
      }
    

    
  })


  //========================== upating review star ====================================

  document.querySelectorAll('.update-review').forEach((element, index) => {
    
    element.addEventListener('click', () => {
      console.log('up star getting clicked')
        // Clear the 'checked' class for all stars before setting the new selection
        document.querySelectorAll('.update-review').forEach((star, i) => {
            if (i <= index) {
                star.classList.add('checked');
                star.classList.remove('text-white')
            } else {
                star.classList.remove('checked');
                star.classList.add('text-white')
            }
        });
    })
  })
})
 
}