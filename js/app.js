// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let modalIndex;


// fetch data from API

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let street = employee.location.street;
    let city = employee.location.city;
    let picture = employee.picture;
    // template literals make this so much cleaner!
    employeeHTML += `

<div class="card" data-index="${index}">
<div class="img-container">
<img class="avatar" src="${picture.large}" />
</div>
<div class="text-container">
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}</p>
</div>
</div>

`
});
gridContainer.innerHTML = employeeHTML;
}



// This function displays the modal
// param is index
function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <div class="modal-img-container">
    <img class="avatar" src="${picture.large}" />
    </div>
    <div class="modal-text-container">
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}</p>
<hr />
<p>${phone}</p>
<p class="address">${street.number} ${street.name} ${state} ${postcode}</p>
<p>Birthday:
${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
</div>

`;
overlay.classList.remove("hidden");
modalContainer.innerHTML = modalHTML;
   
}



// when the card is clicked
gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    
    const card = e.target.closest(".card");
   let index = card.getAttribute('data-index');
   modalIndex = index;
    displayModal(index);

};

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});
});
   
// ====================================================================
//  ---- Modal Cycle  ---- 
// ====================================================================
const rightArrow = document.querySelector(".right");
const leftArrow = document.querySelector(".left");

// when the right arrow is clicked
rightArrow.addEventListener('click', e => {
  // if the index is less than 11, increase the index  
     if(modalIndex < 11){
        modalIndex++;
        displayModal(modalIndex)  
  // else if the index is 11 change it to 0      
   }else if(modalIndex === 11)
   modalIndex = 0;
    displayModal(modalIndex);
});

// when the right arrow is clicked
leftArrow.addEventListener('click', e => {
// if the index is 0, increase the index and display that model
if(modalIndex > 0){
       modalIndex--;
       displayModal(modalIndex)  
// else change the index to 11 and display that model
  }else {
             modalIndex = 11;
   displayModal(modalIndex);
  }
});


    


// ====================================================================
//  ---- Search function ---- 
// This function listens for a "keyup" event on the search box and then
// filters the results
// ====================================================================

document.querySelector("#search").addEventListener("keyup", function () {
    // set local variables
    let searchInput = "";
    let searchInputLower = "";

    // Gets the search input 
    searchInput = document.querySelector("#search");
    // Makes the input lower case
    searchInputLower = searchInput.value.toLowerCase();    
    // get all the cards for the loop
    const cardItems = document.querySelectorAll(".card");
    
    // loops through all of the carditems
    for (let i = 0; i < cardItems.length; i++){
        // get the name class from the html
        const getName = document.querySelectorAll(".name");
        // get the text content from the name class for each iteration of the loop
        const name = getName[i].textContent.toLowerCase();
        // if the name is found in the search it displays, if not found it does not display
        if (name.includes(searchInputLower)) {
            cardItems[i].style.display = "flex";
        } else {
            cardItems[i].style.display = "none";
        }
    }
});

