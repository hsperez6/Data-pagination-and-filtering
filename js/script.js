/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/


function showPage (list, page) {
   let startIndex  = (page * 9) - 9;
   let endIndex = (page * 9);
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i=0; i<list.length ; i++) {
      if (i >= startIndex && i < endIndex) {
         studentList.insertAdjacentHTML(
            'beforeend',
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`
          );
      };
   };
};


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination (list) {
   let numOfPages = Math.ceil(list.length / 9);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i=1; i<=numOfPages; i++) {
      linkList.insertAdjacentHTML(
         'beforeend',
         `<li>
            <button type="button">${i}</button>
         </li>`
       );
   };
   document.querySelector('button').className = 'active';
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent)
      }
   });
 }



// Call functions
showPage(data, 1)
addPagination(data);


/**
 * Add Search Components
 */

let header = document.querySelector('.header')
header.insertAdjacentHTML(
   'beforeend',
   `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`
 );















/***
 * When the "Search" is performed, the student data is filtered so that only students whose 
   name includes the search value are shown. The search should be case-insensitive and work 
   for partial matches. For example, if the value B or b is typed into the search field, 
   students with “Bill” in the name would be shown. Likewise, if LL were typed into the 
   search field, students with the first name "Bill" would appear, as well as students with 
   the last name "Williams".
  
 * Pro Tip: To improve the functionality and improve the user experience, consider adding a 
   keyup event listener to the search input so that the list filters in real time as the user 
   types. This should be in addition to making the search button clickable since pasting text 
   into the search bar might not trigger the keyup event.

 * Pro Tip: Remember you have already created a function to show nine students per page in 
   Step 3. All you really need to do here is create a new student list based on the search 
   matches and then use that new list as an argument when calling the already existing 
   function to display the students.




 * Handle No Search Matches
 * If no matches are found for a search, display a “No results found” type message on the 
   page.
 * Note: Don't use the built-in alert() method for this. The "No results found" message 
   should be printed to the page.  
 */


 
   
let searchInput = document.querySelector('#search');
let searchIcon = document.querySelector('button img'); 

function doSearch (Input, list) {
   let matches = [];
   for (let i=0; i<list.length ; i++) {
      let fullName = `${list[i].name.first} ${list[i].name.last}`;
      let fullNameLower = fullName.toLowerCase();
      if (Input.value.length !== 0 && fullNameLower.includes(Input.value.toLowerCase())) {
         matches.push(list[i]);
         showPage(matches,1);
         addPagination(matches);
      } else if (!fullNameLower.includes(Input.value.toLowerCase())) {
         let studentList = document.querySelector('.student-list');
         studentList.innerHTML = '<li>No results found</li>'; 
      } else if (Input.value.length === 0) {
         showPage(data, 1)
         addPagination(data)
      };
   };
   
};


searchIcon.addEventListener('click', (e) => {
   e.preventDefault();
   doSearch(searchInput, data);
});

searchInput.addEventListener('keyup', (e) => {
   "use strict";
   doSearch(searchInput, data);
 });