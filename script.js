document.addEventListener('DOMContentLoaded', () => {
 const apiUrl = 'https://api.publicapis.org/entries';

 // Fetch data with Promise
 fetch(apiUrl)
     .then(response => {
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         return response.json();
     })
     .then(data => {
         displayApiData(data.entries);
     })
     .catch(error => {
         console.error('Error fetching data:', error);
     });

 // Display API data on the webpage
 function displayApiData(entries) {
     const apiList = document.getElementById('api-list');

     entries.forEach(entry => {
         const card = document.createElement('div');
         card.classList.add('col-md-4', 'mb-4');
         card.innerHTML = `
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">${entry.API}</h5>
                     <p class="card-text">${entry.Description}</p>
                     <a href="${entry.Link}" class="btn btn-primary">Visit Site</a>
                 </div>
             </div>
         `;
         apiList.appendChild(card);
     });
 }
});