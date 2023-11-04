
document.addEventListener('DOMContentLoaded', function() {
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

// Get input element
const usernameInput = document.getElementById('username');
const emailInput = document.querySelector('#email')
const password1 = document.querySelector('#password1')
const password2 = document.querySelector('#password2')

// Function to show a toast message
function showToast(fieldname, value) {

const toastContainer = document.querySelector('.toast-container');
const toastElement = document.createElement('div');
toastElement.classList.add('toast');
toastElement.setAttribute('role', 'alert');
toastElement.setAttribute('aria-live', 'assertive');
toastElement.setAttribute('aria-atomic', 'true');
bgColor='bg-danger'
toastElement.innerHTML = `
<div class="toast-header  ${bgColor}" >

<strong class="me-auto text-white">Validation</strong>
<div class="d-flex justify-content-evenly">
  <small class="text-white mx-3">just now</small>
<button type="button" class="btn-close btn-close-white me-2 m-auto fw-3" data-bs-dismiss="toast" aria-label="Close"></button>

</div>


</div>
<div class="toast-body  ${bgColor}">

${fieldname} : ${value}



</div>

`;

toastContainer.appendChild(toastElement);

const toast = new bootstrap.Toast(toastElement);
toast.show();
}

usernameInput.addEventListener("blur", () => {
  const fieldname = "Username"; // Replace with the appropriate field name
  const value = usernameInput.value; // Get the input value
  console.log(value)
  if (value !== "") {
    
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      showToast(
        fieldname,
        "Use only alphabets and numbers in the username",
        "red",
        "Validation"
      );
    }
    if (value.length < 5) {
      console.log('-----------------',value)
      showToast(
        fieldname,
        "Username should be at least 5 characters long",
        "red",
        "Validation"
      );
    }
  }
}); 


emailInput.addEventListener("blur", () => {
  const fieldname = "Email"; // Replace with the appropriate field name
  const value = emailInput.value; // Get the input value

  if (value !== "") {
if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
showToast(
fieldname,
"Please enter a valid email address",
"red",
"Validation"
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
        fieldname,
        "Password should be at least 5 characters long",
        "red",
        "Validation"
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
        fieldname,
        "Passwords not matching",
        "red",
        "Validation"
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