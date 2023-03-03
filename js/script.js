/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
`showPage` function
 * The showPage funciton takes two parameters `list` and `page`
 * The `list` parameter is the array of student objects used to fill in template literal with student information
 * The `page` parameter is used to create the `startIndex` and `endIndex` variables. It is also used for selecting 
   which students to be displayed, as well as the page number to be displayed on.
 * `studentList` variable is created to select the area in the index.HTML in which the student information will be
   displayed
 * First, the `studentList` is cleared of all content using `.innerHTML = '';`
 * A for loop loops through the entire array, and if the students are within the `startIndex` and `endIndex` of the
   given page, the template literal within the `.insertAdjacentHTML` operator is inserted at the end of the 
   `studentList` node.
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
`addPagination` function
 * `addPagination` function takes one parameter: the array used to create the number of pages.
 * Since there are nine students shown per page, we divide the length of the array by 9 and round up with Math.ciel 
   to get a number between 1 - max. This number is saved onto the `numOfPages` variable.
 * `linkList` variable is created to select the area in the index.html file in which the pagination buttons will be
   created.
 * `linkList` is cleared of any content using `.innerHTML ='';`
 * A for loop is used with `.insertAdjacentHTML()` to create `li` and `button` tags, fill text with page number, 
   and append the pagination buttons to the `linkList` variable.
 * The class of 'active' is added to the first `button` tag in the document, which automatically selected and displays
   the first page of students.
 * A 'click' eventListener is added to the `linkList` section, but it only works if the clicked node is a button. 
   The event handler then adds the 'active' class name to the clicked button and removes the 'active' class from the 
   previous button.
 * Lastly, the `showPage` function is called to display the page number in the textContent of the target.
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

let searchInput = document.querySelector('#search');
let searchIcon = document.querySelector('button img'); 

/***
`doSearch` function
 * The `doSearch` function takes two parameters: `input` and `list`.
 * The `input` parameter takes in the keys types into the searchbox.
 * The `list` parameter takes the array of student objects.
 * First, we create a `matches` variable to hold all the student objects whose name matches the search input.
 * Second, we loop through the `list` parameter.
    * Inside the loop we create a variable `fullName` to hold the full name of each individual student object.
    * Then, we convert full name string to all lowercase using the `.toLowerCase()` method and save it to a second variable
      called `fullNameLow`.
    * We then use a conditional inside the loop to compare the search input to every name in the `list` parameter
    * If there is a match, the object at that index is added to the `matches` variable using the `.push()` method.
    * End of for loop
 * After the loop is finished, we use a conditional to one of three outcomes.
    * If the user has not keyed in any text, the conditional will display all students including total pages
    * If the user has keyed in text in the searchbox and any matches have been found, the conditional will display the matched
      students with proper pagination
    * For everything else, the conditional will display a "No results found" message on the page with zero pagination buttons.
 */
 
function doSearch (Input, list) {
   let matches = [];
   for (let i=0; i<list.length ; i++) {
      let fullName = `${list[i].name.first} ${list[i].name.last}`;
      let fullNameLow = fullName.toLowerCase();
      if (Input.value.length !== 0 && fullNameLow.includes(Input.value.toLowerCase())) {
         matches.push(list[i]);
      };
   };
   if (Input.value.length === 0) {
      showPage(data, 1);
      addPagination(data);
   } else if (Input.value.length !== 0 && matches.length !== 0) {
      showPage(matches, 1);
      addPagination(matches);
   } else {
      let studentList = document.querySelector('.student-list');
      studentList.innerHTML = '<li>No results found</li>';
      addPagination(matches);
   }
};
   
/***
`.addEventLister` to search box and search icon
 */
searchIcon.addEventListener('click', (e) => {
   e.preventDefault();
   doSearch(searchInput, data);
});

searchInput.addEventListener('keyup', (e) => {
   doSearch(searchInput, data);
 });