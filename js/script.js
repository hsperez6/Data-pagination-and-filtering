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

let ul = document.querySelector('.student-list');

ul.innerHTML = `<img class="avatar" src=${Object.values(data[0][3][0])} alt="Profile Picture">`




/***
<h3>${list[i][0][1] list[i][0][2]}</h3>
<span class="email">${list[i][1]}ethel.dean@example.com</span>
</div>
<div class="joined-details">
<span class="date">Joined 12-15-2005</span>
</div>`
***/





/*
function showPage (list, page) {
   let startIndex  = (page * 9) - 9;
   let endIndex = (page * 9);
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i=0; i<list.length ; i++) {
      if (i >= startIndex && <= endIndex) {
         let studentCard = document.createElement('li');
         studentCard.className = 'student-item cf';
         
         studentCard.appendChild(cardInfo);
            
      };
   };
}
*/














/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
