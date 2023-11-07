
// Function to show a toast message
function showToast(activity="Validation",fieldname, value,bgColor='bg-danger') {

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
    

// Get input element
const usernameInput = document.getElementById('username');
const emailInput = document.querySelector('#email')
const password1 = document.querySelector('#password1')
const password2 = document.querySelector('#password2')
let usernameFlag;
let emailFlag;
let passwordFlag;
let password2Flag;

usernameInput.addEventListener("blur", () => {
  usernameFlag = 0;
  usernameInput.classList.remove('bg-danger')
  usernameInput.style.border = '1px solid #ced4da;'
  usernameInput.style.color='black';
  const fieldname = "Username"; // Replace with the appropriate field name
  const value = usernameInput.value; // Get the input value
  console.log(value)
  if (value !== "") {
    
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      showToast(
        "Validation",
        fieldname,
        "Use only alphabets and numbers in the username",
        
        
      );
      usernameFlag = 1;
    }
    if (value.length < 5) {
      console.log('-----------------',value)
      showToast(
        "Validation",
        fieldname,
        "Username should be at least 5 characters long",
        
        
      );
      usernameFlag = 1;
    }

  }else{
    usernameFlag =1;
  }
  if (usernameFlag === 1){
    usernameInput.style.border='2px solid white';
    usernameInput.classList.add('bg-danger')
    usernameInput.style.color='white';
  }

}); 


emailInput.addEventListener("blur", () => {
  const fieldname = "Email"; // Replace with the appropriate field name
  const value = emailInput.value; // Get the input value

  if (value !== "") {
if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
showToast(
  "Validation",
fieldname,
"Please enter a valid email address",


);
}
}
});



password1.addEventListener("blur", () => {
  const fieldname = "Password"; // Replace with the appropriate field name
  const value = password1.value; // Get the input value

  if (password1.value !== "") {
    
    if (password1.value.length < 5) {
      showToast(
        "Validation",
        fieldname,
        "Password should be at least 5 characters long",
        
        
      );
    }
  }
});



password2.addEventListener("blur", () => {
  const fieldname = "Confirm Password"; // Replace with the appropriate field name
  const value = password2.value; // Get the input value

  if (password2.value !== "") {
    
    if (password2.value !== password1.value) {
      showToast(
        "Validation",
        fieldname,
        "Passwords not matching",
      
      );
    }
   
  }
});




});



//=====================================  post page ===========================================

document.addEventListener('DOMContentLoaded', () => {


    const review_stars = document.querySelectorAll('.fa-star');
    if (review_stars){
        
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
            console.log(`index : ${index+1}`)
        });
       
    });
    }
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

