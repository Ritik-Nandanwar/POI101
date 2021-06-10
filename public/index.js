// async function log(){
//   const response = await  fetch(`/logged`);
//   const result = await response.json();
//   if (result.username != null){
//     document.getElementById("loginIcon").className="hidden";
//     document.getElementById("loggedAs").innerHTML=`Logged in as <span class="font-semibold">${result.username}</span>`;
//     document.getElementById("logOut").innerHTML="Log out";
//   }
// }

// log();

// // TOAST NOTIFICATION SETTINGS
// iziToast.settings({
//   timeout: 3000, // default timeout
//   resetOnHover: true,
//   // icon: '', // icon class
//   transitionIn: 'fadeIn',
//   transitionOut: 'fadeOut',
//   position: 'topRight',
// });




// // SEARCH 
// async function poiSearch(type, field) {
    
//   // Send a request to our remote URL
//   const response = await  fetch(`/poi/${type}/${field}`);

//   // Parse the JSON.
//   const result = await response.json();
//   // Loop through the array of JSON objects and add the results to a <div>
//   let html = "";
//   document.getElementById('mapResults').innerHTML = "";
//   document.getElementById('results').innerHTML = "";

//   let header =
//     `
//         <h2 class="text-2xl mx-12 font-bold">Results for: <span class=" font-extrabold">${field}, ${type}</span></h2>
//     `
//   let resultsdivsstart =
//     `
//       <div class="py-2 mx-12 align-middle ">
//         <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//           <table class="min-w-full divide-y divide-gray-200">
//     `

//   let resultsdivsend =
//     `       </tbody
//           </table>
//         </div>
//       </div>
//     `
//   let tableHeader = 
//     `
//     <thead class="bg-purple-200">
//       <tr>
//         <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Name
//         </th>
//         <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Type
//         </th>
//         <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Country
//         </th>
//         <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Region
//         </th>
//         <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Lon
//         </th>
//         <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Lat
//         </th>
//         <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Description
//         </th>
//         <th scope="col" class="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Recommendations
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//   `;

//   let noResultsNotification = `<h2 class="text-2xl mx-12 text-red-500 font-extrabold">Results for: <span class="pl-1 font-extrabold">${field}, ${type}</span></h2><p class="text-red-700 text-xl mx-12 font-normal ">No matching results returned . Try searching "City" , "Town"</p>`

//   if (result.length === 0){
//       document.getElementById('results').innerHTML = noResultsNotification + html;
//   } else {
//       result.forEach ( result => {
//           html += `
//             <tr class="bg-white">
//               <td class="px-4 py-4 whitespace-wrap text-sm font-medium text-gray-900">
//                 ${result.name}
//               </td>
//               <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                 ${result.type}
//               </td>
//               <td class="px-4 py-4 whitespace-wrap text-sm text-gray-500">
//                 ${result.country}
//               </td>
//               <td class="px-4 py-4 whitespace-wrap text-sm text-gray-500">
//                 ${result.region}
//               </td>
//               <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                 ${result.lon}
//               </td>
//               <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                 ${result.lat}
//               </td>
//               <td class="px-4 py-4 whitespace-wrap text-sm text-gray-500">
//                 ${result.description}
//               </td>
//               <td class="pl-6 pr-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                 ${result.recommendations}
//                 <a id="recommendButton" onclick='recommend(${result.ID})' class="pl-8 text-sm text-brand-orange hover:underline cursor-pointer">Recommend</a>
//               </td>
//             </tr>
//           `
//       });
//       document.getElementById('results').innerHTML = header +  resultsdivsstart + tableHeader + html + resultsdivsend;
//   }
// }

// function showTableReviewField() {
//   document.getElementById("tableModal").classList.remove('hidden');
// }

// // SEARCH WITH MAP
// async function poiSearchMap(type, field) {
//   // Send a request to our remote URL
//   const response = await  fetch(`/poi/${type}/${field}`);

//   // Parse the JSON.
//   const result = await response.json();
//   // Loop through the array of JSON objects and add the results to a <div>
//   let html = "";
//   document.getElementById('mapResults').innerHTML = "";
      
//   var resultHeaderDiv = document.createElement("div");
//   resultHeaderDiv.className = "flex flex-row justify-between items-center sm:px-6 lg:px-8 py-4 text-md text-brand-navy" ;

//   var resultHeader = document.createElement("h2");
//   resultHeader.className= "py-4 text-brand-navy text-2xl font-bold";
//   var resultHeaderText = document.createTextNode(`Results for: ${field}, ${type}`);

//   var resultButtons = document.createElement("div");
//   resultButtons.className="";
//   var mapButton = document.createElement("button");
//   mapButton.className = "font-bold hover:font-bold focus:outline-none";
//   mapButton.id="mapButton";
//   var divider = document.createElement("span");
//   var dividerText = document.createTextNode(" | ");
//   divider.className = "";
//   var tableButton = document.createElement("button");
//   tableButton.className= "hover:font-bold focus:outline-none";
//   tableButton.id= "tableButton";
//   tableButton.addEventListener('click', ()=> {
//     document.getElementById("mapResults").innerHTML= "";
//     const type = document.getElementById('poiType').value;
//     const field = document.getElementById('poiField').value;
//     poiSearch(type, field);
//   });

//   var mapButtonText = document.createTextNode("Map");
//   var tableButtonText = document.createTextNode("Table");
  
//   resultHeader.appendChild(resultHeaderText);
//   mapButton.appendChild(mapButtonText);
//   divider.appendChild(dividerText);
//   tableButton.appendChild(tableButtonText);
//   resultButtons.appendChild(mapButton);
//   resultButtons.appendChild(divider);
//   resultButtons.appendChild(tableButton);
//   resultHeaderDiv.appendChild(resultHeader);
//   resultHeaderDiv.appendChild(resultButtons);
//   document.getElementById('mapResults').appendChild(resultHeaderDiv);
 

//   var div = document.createElement("div");
//   div.id = "map1";
//   div.className = "sm:mx-6 lg:mx-8 lg:mr-8 w-auto mb-8 h-43.75 z-10";
//   document.getElementById('mapResults').appendChild(div);

  
//   const map = L.map ("map1");
//   const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";
//   L.tileLayer
//           ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//               { attribution: attrib } ).addTo(map);

//   map.on("click", e => {
//     iziToast.question({
//       timeout: 20000,
//       close: false,
//       overlay: true,
//       displayMode: 'once',
//       id: 'question',
//       zindex: 999,
//       title: 'Add New?',
//       message: 'Would you like to add a new point of interest?',
//       position: 'center',
//       buttons: [
//           ['<button><b>YES</b></button>', function (instance, toast) {
   
//               instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
//               const newPos = [`${e.latlng.lat}`, `${e.latlng.lng}`];       
//               const newMarker = L.marker(newPos).addTo(map);
//               newMarker.bindPopup(`
//               <b>Name:</b>
//               <input type="text" name="name" id="name" class="text-brand-navy mt-1 block w-32 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-cadet-blue focus:border-cadet-blue text-xs">
//               <b>Region:</b>
//                 <input type="text" name="region" id="region" class="mt-1 block w-32 border border-purple-400 rounded-md  py-1 px-2  text-xs">
//               <b>Country:</b> 
//                 <input type="text" name="country" id="country" class="mt-1 block w-32 border border-purple-400 rounded-md  py-1 px-2  text-xs">
//               <b>Type:</b>
//                 <select id="type" name="type" class="text-brand-navy mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-cadet-blue focus:border-cadet-blue text-xs">
//                 <option>City</option>
//                 <option>Hill</option>
//                 <option>Industrial Estate</option>
//                 <option>Lost City</option>
//                 <option>Moor</option>
//                 <option>Mountain</option>
//                 <option>Point</option>
//                 <option>Port</option>
//                 <option>Pob</option>
//                 <option>Restaurant</option>
//                 <option>Town</option>
//               </select>
//               <b>Lon:</b> 
//               <input type="number" name="lon" id="lon" value="${e.latlng.lng}" class="text-brand-navy mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-cadet-blue focus:border-cadet-blue sm:text-sm">
//               <b>Lat:</b>
//               <input type="number" name="lat" id="lat" value="${e.latlng.lat}" class="text-brand-navy mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-cadet-blue focus:border-cadet-blue sm:text-sm">
             
//               <b>Description:</b>
//               <textarea id="description" name="description" rows="2" class="text-brand-navy border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cadet-blue focus:border-cadet-blue mt-1 py-1 px-2 block w-full text-xs"></textarea>
//               <span id="error-msg" class="pt-1 pb-0 hidden col-span-6 text-xs text-red-500">Plase fill all of the fields.</span>
//               <button onClick="addNew()" id="addNewButton" type="submit" class="w-full bg-cadet-blue border border-transparent rounded-md shadow-sm mt-2 py-1 px-2 inline-flex justify-center text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">
//                   Create
//               </button>
//               `).openPopup();
             
   
//           }, true],
//           ['<button>NO</button>', function (instance, toast) {
   
//               instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
   
//           }],
//       ],
//   });
//   });
       
//   let noResultsNotification = `<h2 class="py-4 text-2xl text-brand-navy font-extrabold">Results for: <span class="pl-1 font-extrabold">${field}, ${type}</span></h2><p class="text-brand-navy text-xl font-normal sm:px-6 lg:px-8">Oops... Sorry, no matching results. Please check your spelling or search for something else!</p>`

//   if (result.length === 0){
//       document.getElementById('mapResults').innerHTML = noResultsNotification;
//   } else {
//       result.forEach ( result => {
           
//         const pos = [`${result.lat}`, `${result.lon}`];            
//         map.setView(pos, 8);

//         const marker = L.marker(pos).addTo(map);
//         marker.bindPopup(
//           ` 
//             <b>Name:</b> 
//             ${result.name} <br> 
//             <b>Description:</b> 
//             ${result.description} <br> 
//             <button onClick="showReviewField()" id="showReviewField" type="submit" class="w-full bg-cadet-blue border border-transparent rounded-md shadow-sm mt-2 py-1 px-2 inline-flex justify-center text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">
//             Add a review
//           </button>
//             <b id="reviewHeaderTitle" class="hidden" >Add a review:</b> 
//             <textarea id="review" name="review" rows="2" class="hidden text-brand-navy border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cadet-blue focus:border-cadet-blue mt-1 py-1 px-2 block w-full text-xs"></textarea>
//             <span id="error-msg" class="pt-1 pb-0 hidden col-span-6 text-xs text-red-500">Plase write a review.</span>
//             <button onClick="addReview(${result.ID})" id="addReviewButton" type="submit" class="hidden w-full bg-cadet-blue border border-transparent rounded-md shadow-sm mt-2 py-1 px-2 inline-flex justify-center text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">
//               Add
//             </button>
//           `);
//       });
     
//   }
// }

// function showReviewField(){
//   document.getElementById('showReviewField').classList.add('hidden');
//   document.getElementById('reviewHeaderTitle').classList.remove('hidden');
//   document.getElementById('review').classList.remove('hidden');
//   document.getElementById('addReviewButton').classList.remove('hidden');
// }

// function addReview(id){
//   const poi_id = id;
//   const review = document.getElementById('review').value;

//   if(!review.length) {
//     document.getElementById('error-msg').classList.remove('hidden');
//   } else {
//     document.getElementById('error-msg').classList.add('hidden');
//     ajaxAddMapReview(poi_id,review);
//   };
// }

// // add a review
// async function  ajaxAddMapReview(poi_id,review) {
//   const newReview= {
//     'poi_id': poi_id,
//     'review': review
//   }

//   const response = await fetch(`/poi/review`, {
//     method: 'POST',
//     headers: {
//         'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify(newReview)
//   });

//   if(response.status == 400) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Please fill a review field.',
//     });
//   } else if(response.status == 500){
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong, please try again',
//     });
//   } else if(response.status == 401){
//     iziToast.error({
//       title: 'Error',
//       message: 'Please log in to add a review',
//     });
//   } else {
//       const data = await response.json();
//       iziToast.success({
//         title: 'Success',
//         message: 'You have added a new review',
//     });
//   }
// }

// function addNew(){
//   const name = document.getElementById('name').value;
//   const region = document.getElementById('region').value;
//   const country = document.getElementById('country').value;
//   const type = document.getElementById('type').value;
//   const description = document.getElementById('description').value;
//   const lon = document.getElementById('lon').value;
//   const lat = document.getElementById('lat').value;


//   if (!name.length || !region.length || !country.length || !type.length || !description.length) {
//     document.getElementById('error-msg').classList.remove('hidden');
//   } else {
//     document.getElementById('error-msg').classList.add('hidden');
//     ajaxAddNewMapPoi(name,region,country,type,lon, lat, description);
//   };
// }

// //  add a poi
// async function ajaxAddNewMapPoi(name,region,country,type,lon,lat,description) {
//   const newPoi = {
//      'name': name,
//      'region': region,
//      'country': country,
//      'type': type,
//      'lon': lon,
//      'lat': lat,
//      'description' : description
//   }

//   const response = await fetch(`/addNew/poi`, {
//       method: 'POST',
//       headers: {
//           'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify(newPoi)
//   });

//   if(response.status == 404) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Could not add a point of interest. Please try again.',
//     });
//   } else if(response.status == 500){
//     iziToast.error({
//       title: 'Error',
//       message: 'All fields must be filled with correct data.',
//     });
//   } else if(response.status == 401){
//     iziToast.error({
//       title: 'Error',
//       message: 'Please log in!',
//     });
//   } else {
//       const data = await response.json();
//       iziToast.success({
//         title: 'Success',
//         message: 'You have added a new point of interest.',
//     });
//   } 
// }


// function mapButtonClicked() {
//   document.getElementById("results").innerHTML= "";
//   const type = document.getElementById('poiType').value;
//   const field = document.getElementById('poiField').value;
//   poiSearchMap(type, field);
// }

// // Make the AJAX run when we click a search button
// if (document.getElementById('searchButton')){
//   document.getElementById('searchButton').addEventListener('click', ()=> {
//     const type = "Type";
//     const field = document.getElementById('poiField').value;
//     poiSearch(type, field);
//   });
// }

// // Make the AJAX run when we click a map button
// if (document.getElementById('mapButton')){
//   document.getElementById('mapButton').addEventListener('click', ()=> {
//     const type = document.getElementById('poiType').value;
//     const field = document.getElementById('poiField').value;
//     poiSearchMap(type, field);
//   });
// }

// // Make the AJAX run when we click a table button
// if (document.getElementById('tableButton')){
//   document.getElementById('tableButton').addEventListener('click', ()=> {
//     const type = document.getElementById('poiType').value;
//     const field = document.getElementById('poiField').value;
//     poiSearch(type, field);
//   });
// }



// //  recommend a poi
// async function recommend(id) {
//   const poi = {
//      recommendations : 1 
//   }

//   const response = await fetch(`/poi/${id}/recommend`, {
//       method: 'POST',
//       headers: {
//           'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify(poi)
//   });

//   if(response.status == 404) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Could not recommend. Please try again.',
//   });
//   } else {
//       const data = await response.json();
//       iziToast.success({
//         title: 'Success',
//         message: 'You have recommended a point of interest.',
//     });
//   } 
// }

// // Make the AJAX run when user clicks recommend button
// if (document.getElementById('recommendButton')){
//   document.getElementById('recommendButton').addEventListener('click', ()=> {
//     const id = `${result.id}`;
//     recommend(id);
//   });
// }


// //  add a new poi
// async function ajaxAddNewPoi(name,region,country,type,lon,lat,description) {
//   const newPoi = {
//      'name': name,
//      'region': region,
//      'country': country,
//      'type': type,
//      'lon': lon,
//      'lat': lat,
//      'description' : description
//   }

//   const response = await fetch(`/addNew/poi`, {
//       method: 'POST',
//       headers: {
//           'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify(newPoi)
//   });

//   if(response.status == 404) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Could not add a point of interest. Please try again.',
//     });
//   } else if(response.status == 500){
//     iziToast.error({
//       title: 'Error',
//       message: 'All fields must be filled with correct data.',
//     });
//   } else if(response.status == 401){
//     iziToast.error({
//       title: 'Error',
//       message: 'Please log in!',
//   });
//   } else {
//       const data = await response.json();
//       document.getElementById('name').value='';
//       document.getElementById('region').value='';
//       document.getElementById('country').value='';
//       document.getElementById('type').value='';
//       document.getElementById('lon').value='';
//       document.getElementById('lat').value='';
//       document.getElementById('description').value='';
//       iziToast.success({
//         title: 'Success',
//         message: 'You have added a new point of interest.',
//     });

//   } 
// }

// // Make the AJAX run when user clicks add button
// if (document.getElementById('addNewButton')){
//   document.getElementById('addNewButton').addEventListener('click', ()=> {
//       const name = document.getElementById('name').value;
//       const region = document.getElementById('region').value;
//       const country = document.getElementById('country').value;
//       const type = document.getElementById('type').value;
//       const lon = document.getElementById('lon').value;
//       const lat = document.getElementById('lat').value;
//       const description = document.getElementById('description').value;


//     if (!name.length || !region.length || !country.length || !type.length || !lon.length || !lat.length || !description.length) {
//       document.getElementById('error-msg').classList.remove('hidden');
//     } else {
//       document.getElementById('error-msg').classList.add('hidden');
//       ajaxAddNewPoi(name,region,country,type,lon,lat,description);
//     };
//   });
// }

// // LOGIN
// if (document.getElementById('loginButton')){
//   document.getElementById('loginButton').addEventListener('click', ()=> {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     login(username, password);
//   });
// }

// async function login(username, password) {
//   const loginDetails = {
//      'username': username,
//      'password': password,
//   }

//   const response = await fetch(`/login`, {
//       method: 'POST',
//       headers: {
//           'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify(loginDetails)
//   });
//   const data = await response.json();

//   if((response.status == 200)) {
//     document.getElementById('username').value='';
//       document.getElementById('password').value='';
//       iziToast.success({
//         title: 'Success',
//         message: `You have logged in as ${data.username}`,
//         timeout: 1000,
//         onClosing: function(instance, toast, closedBy){
//           window.location="/";
//         }
//       });
//       document.getElementById("loginIcon").className="hidden";
//       document.getElementById("loggedAs").innerHTML=`Logged in as <span class="font-semibold">${data.username}</span>`;
//       document.getElementById("logOut").innerHTML="Log out";
//   } else {
//     iziToast.error({
//       title: 'Error',
//       message: 'The credentials do not match. Please try again',
//     });
//   } 
// }

// async function logout() {

//   const response = await fetch(`/logout`, {
//       method: 'POST',
//       headers: {
//           'Content-Type' : 'application/json'
//       },
//   });
//   const data = await response.json();

//   if(data) {
//       iziToast.success({
//         title: 'Success',
//         message: `You have logged out.`,
//         timeout: 1000,
//         onClosing: function(instance, toast, closedBy){
//           window.location="/login";
//         }
//       });
//       document.getElementById("loginIcon").className="flex";
//       document.getElementById("loggedAs").className="hidden";
//       document.getElementById("logOut").className="hidden";
//   } else {
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again',
//     });
//   } 
// }

// if (document.getElementById("logOut")){
//   document.getElementById("logOut").addEventListener('click',()=> {
//     logout();
//   })
// }



// async function log(){
//   const response = await  fetch(`/logged`);
//   const result = await response.json();
//   if (result.username != null){
//     document.getElementById("loginIcon").className="hidden";
//     document.getElementById("loggedAs").innerHTML=`Logged in as <span class="font-semibold">${result.username}</span>`;
//     document.getElementById("logOut").innerHTML="Log out";
//   }
// }

// log();

// // TOAST NOTIFICATION SETTINGS
// iziToast.settings({
//   timeout: 3000, // default timeout
//   resetOnHover: true,
//   // icon: '', // icon class
//   transitionIn: 'fadeIn',
//   transitionOut: 'fadeOut',
//   position: 'topRight',
// });



// // AUTOMATIC DATE UPDATE FOR FOOTER

// const footerYear = document.getElementById("year");
// const date = new Date();
// const year = date.getFullYear();

// footerYear.innerText = year;



// // STAT COUNTER
// function animateNumber(id, start, end, duration) {
//   if (start === end) return;
//   var range = end - start;
//   var now = start;
//   var increment = end > start? 1 : -1;
//   var stepTime = Math.abs(Math.floor(duration / range));
//   var obj = document.getElementById(id);
//   var counter = setInterval(function() {
//       now += increment;
//       obj.innerHTML = now;
//       if (now == end) {
//           clearInterval(counter);
//       }
//   }, stepTime);
// }
// if (document.getElementById('stats')) {
//   animateNumber("statAll", 0, 332, 5000);
//   animateNumber("statRegions", 0, 19, 5000);
//   animateNumber("statRestaurants", 0, 99, 5000);

// }

// //TO TOP BUTTON

// toTopbutton = document.getElementById("toTopBtn");

// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (
//     document.body.scrollTop > 700 ||
//     document.documentElement.scrollTop > 700
//   ) {

//     toTopbutton.style.display = "block";
//   } else {
//     toTopbutton.style.display = "none";
//   }
// }

// function toTopFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }
async function log(){
  const response = await  fetch(`/logged`);
  const result = await response.json();
  if (result.username != null){
    document.getElementById("loggedAs").innerHTML=`Logged in as <span class="font-semibold">${result.username}</span>`;
    document.getElementById("logOut").innerHTML="Log out";
  }
}

log();

// SEARCH 
async function poiSearch(type, field) {
    
  // Send a request to our remote URL
  const response = await  fetch(`/poi/${type}/${field}`);

  // Parse the JSON.
  const result = await response.json();
  // Loop through the array of JSON objects and add the results to a <div>
  let html = "";
  document.getElementById('mapResults').innerHTML = "";
  document.getElementById('results').innerHTML = "";

  let header =
    `
      <div class="flex flex-row justify-between sm:px-6 lg:px-8 py-4 text-md text-brand-navy ">
        <h2 class="text-2xl font-bold">Results for: <span class="pl-1 font-extrabold">${field}, ${type}</span></h2>
        <div>
          <button onclick="mapButtonClicked()" id="mapButton" class="focus:outline-none hover:font-bold">Map</button>
          <span> | </span>
          <button onclick="tableButtonClicked()" id="tableButton" class="focus:outline-none font-bold hover:font-bold">Table</button>
        </div>
      </div>
    `
  let resultsdivsstart =
    `
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 pb-4 sm:pb-10">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
    `

  let resultsdivsend =
    `       </tbody
          </table>
        </div>
      </div>
    `
  let tableHeader = 
    `
    <thead class="bg-brand-light-gray">
      <tr>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Type
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Country
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Region
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Lon
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Lat
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Description
        </th>
        <th scope="col" class="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Recommendations
        </th>
      </tr>
    </thead>
    <tbody>
  `;

  let noResultsNotification = `<h2 class="text-2xl mx-12 text-red-500 font-extrabold">Results for: <span class="pl-1 font-extrabold">${field}, ${type}</span></h2><p class="text-red-700 text-xl mx-12 font-normal ">No matching results returned . Try searching "City" , "Town"</p>`

  if (result.length === 0){
      document.getElementById('results').innerHTML = noResultsNotification + html;
  } else {
      result.forEach ( result => {
          html += `
            <tr class="bg-white">
              <td class="px-4 py-4 whitespace-wrap text-sm font-medium text-gray-900">
                ${result.name}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.type}
              </td>
              <td class="px-4 py-4 whitespace-wrap text-sm text-gray-500">
                ${result.country}
              </td>
              <td class="px-4 py-4 whitespace-wrap text-sm text-gray-500">
                ${result.region}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.lon}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.lat}
              </td>
              <td class="px-4 py-4 whitespace-wrap text-sm text-gray-500">
                ${result.description}
              </td>
              <td class="pl-6 pr-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.recommendations}
                <a id="recommendButton" onclick='recommend(${result.ID})' class="pl-8 text-sm text-purple-500 hover:underline cursor-pointer">Recommend</a>
              </td>
            </tr>
          `
      });
      document.getElementById('results').innerHTML = header +  resultsdivsstart + tableHeader + html + resultsdivsend;
  }
}

function showTableReviewField() {
  document.getElementById("tableModal").classList.remove('hidden');
}

// SEARCH WITH MAP
async function poiSearchMap(type, field) {
  // Send a request to our remote URL
  const response = await  fetch(`/poi/${type}/${field}`);

  // Parse the JSON.
  const result = await response.json();
  // Loop through the array of JSON objects and add the results to a <div>
  let html = "";
  document.getElementById('mapResults').innerHTML = "";
      
  var resultHeaderDiv = document.createElement("div");
  resultHeaderDiv.className = "flex flex-row justify-between items-center sm:px-6 lg:px-8 py-4 text-md text-brand-navy" ;

  var resultHeader = document.createElement("h2");
  resultHeader.className= "py-4 text-brand-navy text-2xl font-bold";
  var resultHeaderText = document.createTextNode(`Results for: ${field}, ${type}`);

  var resultButtons = document.createElement("div");
  resultButtons.className="";
  var mapButton = document.createElement("button");
  mapButton.className = "font-bold hover:font-bold focus:outline-none";
  mapButton.id="mapButton";
  var divider = document.createElement("span");
  var dividerText = document.createTextNode(" | ");
  divider.className = "";
  var tableButton = document.createElement("button");
  tableButton.className= "hover:font-bold focus:outline-none";
  tableButton.id= "tableButton";
  tableButton.addEventListener('click', ()=> {
    document.getElementById("mapResults").innerHTML= "";
    const type ="Type"
    const field = document.getElementById('poiField').value;
    poiSearch(type, field);
  });

  var mapButtonText = document.createTextNode("Map");
  var tableButtonText = document.createTextNode("Table");
  
  resultHeader.appendChild(resultHeaderText);
  mapButton.appendChild(mapButtonText);
  divider.appendChild(dividerText);
  tableButton.appendChild(tableButtonText);
  resultButtons.appendChild(mapButton);
  resultButtons.appendChild(divider);
  resultButtons.appendChild(tableButton);
  resultHeaderDiv.appendChild(resultHeader);
  resultHeaderDiv.appendChild(resultButtons);
  document.getElementById('mapResults').appendChild(resultHeaderDiv);
 

  var div = document.createElement("div");
  div.id = "map1";
  div.className = "sm:mx-6 border-2xl border-purple-400  lg:mx-8 lg:mr-8 w-auto mb-8 h-43.75 z-10";
  document.getElementById('mapResults').appendChild(div);

  
  const map = L.map ("map1");
  const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";
  L.tileLayer
          ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              { attribution: attrib } ).addTo(map);

  map.on("click", e => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: 'Add New?',
      message: 'Would you like to add a new point of interest?',
      position: 'center',
      buttons: [
          ['<button><b>YES</b></button>', function (instance, toast) {
   
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
              const newPos = [`${e.latlng.lat}`, `${e.latlng.lng}`];       
              const newMarker = L.marker(newPos).addTo(map);
              newMarker.bindPopup(`
              <b>Name:</b>
              <input type="text" name="name" id="name" class="mt-1 block w-32 border border-purple-400 rounded-md  py-1 px-2  text-xs">
              <b>Region:</b>
                <input type="text" name="region" id="region" class="mt-1 block w-32 border border-purple-400 rounded-md  py-1 px-2  text-xs">
              <b>Country:</b> 
                <input type="text" name="country" id="country" class="mt-1 block w-32 border border-purple-400 rounded-md  py-1 px-2  text-xs">
              <b>Type:</b>
                <input id="type" name="type" class="mt-1 block w-32 border border-purple-400 rounded-md  py-1 px-2  text-xs">
                
              
              <b>Lon:</b> 
              <input type="number" name="lon" id="lon" value="${e.latlng.lng}" class="mt-1 block w-full border border-purple-400 rounded-md py-1 px-2">
              <b>Lat:</b>
              <input type="number" name="lat" id="lat" value="${e.latlng.lat}" class="mt-1 block w-full border border-purple-400 rounded-md py-1 px-2">
             
              <b>Description:</b>
              <textarea id="description" name="description" rows="2" class=" border border-purple-400 rounded-md mt-1 py-1 px-2 block w-full text-xs"></textarea>
              <span id="error-msg" class="pt-1 pb-0 hidden col-span-6 text-xs text-red-500">Plase fill all of the fields.</span>
              <button onClick="addNew()" id="addNewButton" type="submit" class="w-full bg-purple-500 border border-transparent rounded-md shadow-sm mt-2 py-1 px-2 inline-flex justify-center text-sm font-medium text-white hover:opacity-90 ">
                  Create
              </button>
              `).openPopup();
             
   
          }, true],
          ['<button>NO</button>', function (instance, toast) {
   
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
   
          }],
      ],
  });
  });
       
  let noResultsNotification = `<h2 class="py-4 text-2xl text-brand-navy font-extrabold">Results for: <span class="pl-1 font-extrabold">${field}, ${type}</span></h2><p class="text-brand-navy text-xl font-normal">Oops... Sorry, no matching results. Please check your spelling or search for something else!No results returned , please recheck the input .</p>`

  if (result.length === 0){
      document.getElementById('mapResults').innerHTML = noResultsNotification;
  } else {
      result.forEach ( result => {
           
        const pos = [`${result.lat}`, `${result.lon}`];            
        map.setView(pos, 8);

        const marker = L.marker(pos).addTo(map);
        marker.bindPopup(
          ` 
            <b>Name:</b> 
            ${result.name} <br> 
            <b>Description:</b> 
            ${result.description} <br> 
            <button onClick="showReviewField()" id="showReviewField" type="submit" class="w-full bg-cadet-blue border border-transparent rounded-md shadow-sm mt-2 py-1 px-2 inline-flex justify-center text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">
            Add a review
          </button>
            <b id="reviewHeaderTitle" class="hidden" >Add a review:</b> 
            <textarea id="review" name="review" rows="2" class="hidden text-brand-navy border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cadet-blue focus:border-cadet-blue mt-1 py-1 px-2 block w-full text-xs"></textarea>
            <span id="error-msg" class="pt-1 pb-0 hidden col-span-6 text-xs text-red-500">Plase write a review.</span>
            <button onClick="addReview(${result.ID})" id="addReviewButton" type="submit" class="hidden w-full bg-cadet-blue border border-transparent rounded-md shadow-sm mt-2 py-1 px-2 inline-flex justify-center text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">
              Add
            </button>
          `);
      });
     
  }
}

function showReviewField(){
  document.getElementById('showReviewField').classList.add('hidden');
  document.getElementById('reviewHeaderTitle').classList.remove('hidden');
  document.getElementById('review').classList.remove('hidden');
  document.getElementById('addReviewButton').classList.remove('hidden');
}

function addReview(id){
  const poi_id = id;
  const review = document.getElementById('review').value;

  if(!review.length) {
    document.getElementById('error-msg').classList.remove('hidden');
  } else {
    document.getElementById('error-msg').classList.add('hidden');
    ajaxAddMapReview(poi_id,review);
  };
}

// add a review
async function  ajaxAddMapReview(poi_id,review) {
  const newReview= {
    'poi_id': poi_id,
    'review': review
  }

  const response = await fetch(`/poi/review`, {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(newReview)
  });

  if(response.status == 400) {
    iziToast.error({
      title: 'Error',
      message: 'Please fill a review field.',
    });
  } else if(response.status == 500){
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong, please try again',
    });
  } else if(response.status == 401){
    iziToast.error({
      title: 'Error',
      message: 'Please log in to add a review',
    });
  } else {
      const data = await response.json();
      iziToast.success({
        title: 'Success',
        message: 'You have added a new review',
    });
  }
}

function addNew(){
  const name = document.getElementById('name').value;
  const region = document.getElementById('region').value;
  const country = document.getElementById('country').value;
  const type = document.getElementById('type').value;
  const description = document.getElementById('description').value;
  const lon = document.getElementById('lon').value;
  const lat = document.getElementById('lat').value;


  if (!name.length || !region.length || !country.length || !type.length || !description.length) {
    document.getElementById('error-msg').classList.remove('hidden');
  } else {
    document.getElementById('error-msg').classList.add('hidden');
    ajaxAddNewMapPoi(name,region,country,type,lon, lat, description);
  };
}

//  add a poi
async function ajaxAddNewMapPoi(name,region,country,type,lon,lat,description) {
  const newPoi = {
     'name': name,
     'region': region,
     'country': country,
     'type': type,
     'lon': lon,
     'lat': lat,
     'description' : description
  }

  const response = await fetch(`/addNew/poi`, {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newPoi)
  });

  if(response.status == 404) {
    iziToast.error({
      title: 'Error',
      message: 'Could not add a point of interest. Please try again.',
    });
  } else if(response.status == 500){
    iziToast.error({
      title: 'Error',
      message: 'All fields must be filled with correct data.',
    });
  } else if(response.status == 401){
    iziToast.error({
      title: 'Error',
      message: 'Please log in!',
    });
  } else {
      const data = await response.json();
      iziToast.success({
        title: 'Success',
        message: 'You have added a new point of interest.',
    });
  } 
}


function mapButtonClicked() {
  document.getElementById("results").innerHTML= "";
  const type = "Type"
  const field = document.getElementById('poiField').value;
  poiSearchMap(type, field);
}

// Make the AJAX run when we click a search button
if (document.getElementById('searchButton')){
  document.getElementById('searchButton').addEventListener('click', ()=> {
    const type = "Type"
    const field = document.getElementById('poiField').value;
    poiSearch(type, field);
  });
}

// Make the AJAX run when we click a map button
if (document.getElementById('mapButton')){
  document.getElementById('mapButton').addEventListener('click', ()=> {
    const type = document.getElementById('poiType').value;
    const field = document.getElementById('poiField').value;
    poiSearchMap(type, field);
  });
}

// Make the AJAX run when we click a table button
if (document.getElementById('tableButton')){
  document.getElementById('tableButton').addEventListener('click', ()=> {
    const type = document.getElementById('poiType').value;
    const field = document.getElementById('poiField').value;
    poiSearch(type, field);
  });
}



//  recommend a poi
async function recommend(id) {
  const poi = {
     recommendations : 1 
  }

  const response = await fetch(`/poi/${id}/recommend`, {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(poi)
  });

  if(response.status == 404) {
    iziToast.error({
      title: 'Error',
      message: 'Could not recommend. Please try again.',
  });
  } else {
      const data = await response.json();
      iziToast.success({
        title: 'Success',
        message: 'You have recommended a point of interest.',
    });
  } 
}

// Make the AJAX run when user clicks recommend button
if (document.getElementById('recommendButton')){
  document.getElementById('recommendButton').addEventListener('click', ()=> {
    const id = `${result.ID}`;
    recommend(id);
  });
}


//  add a new poi
async function ajaxAddNewPoi(name,region,country,type,lon,lat,description) {
  const newPoi = {
     'name': name,
     'region': region,
     'country': country,
     'type': type,
     'lon': lon,
     'lat': lat,
     'description' : description
  }

  const response = await fetch(`/addNew/poi`, {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newPoi)
  });

  if(response.status == 404) {
    iziToast.error({
      title: 'Error',
      message: 'Could not add a point of interest. Please try again.',
    });
  } else if(response.status == 500){
    iziToast.error({
      title: 'Error',
      message: 'All fields must be filled with correct data.',
    });
  } else if(response.status == 401){
    iziToast.error({
      title: 'Error',
      message: 'Please log in!',
  });
  } else {
      const data = await response.json();
      document.getElementById('name').value='';
      document.getElementById('region').value='';
      document.getElementById('country').value='';
      document.getElementById('type').value='';
      document.getElementById('lon').value='';
      document.getElementById('lat').value='';
      document.getElementById('description').value='';
      iziToast.success({
        title: 'Success',
        message: 'You have added a new point of interest.',
    });

  } 
}

// Make the AJAX run when user clicks add button
if (document.getElementById('addNewButton')){
  document.getElementById('addNewButton').addEventListener('click', ()=> {
      const name = document.getElementById('name').value;
      const region = document.getElementById('region').value;
      const country = document.getElementById('country').value;
      const type = document.getElementById('type').value;
      const lon = document.getElementById('lon').value;
      const lat = document.getElementById('lat').value;
      const description = document.getElementById('description').value;


    if (!name.length || !region.length || !country.length || !type.length || !lon.length || !lat.length || !description.length) {
      document.getElementById('error-msg').classList.remove('hidden');
    } else {
      document.getElementById('error-msg').classList.add('hidden');
      ajaxAddNewPoi(name,region,country,type,lon,lat,description);
    };
  });
}

// LOGIN
if (document.getElementById('loginButton')){
  document.getElementById('loginButton').addEventListener('click', ()=> {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
  });
}

async function login(username, password) {
  const loginDetails = {
     'username': username,
     'password': password,
  }

  const response = await fetch(`/login`, {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(loginDetails)
  });
  const data = await response.json();

  if((response.status == 200)) {
    document.getElementById('username').value='';
      document.getElementById('password').value='';
      iziToast.success({
        title: 'Success',
        message: `You have logged in as ${data.username}`,
        timeout: 1000,
        onClosing: function(instance, toast, closedBy){
          window.location="/";
        }
      });
      document.getElementById("loggedInAsDiv").classList.add="bg-purple-100 m-4 flex space-x-4";
      document.getElementById("loggedAs").innerHTML=`Logged in as <span class="font-semibold">${data.username}</span>`;
      document.getElementById("logOut").innerHTML=`<span class="bg-red-200"> Log out</span>` ;
      document.getElementById("logOut").className ="bg-red-200";
  } else {
    iziToast.error({
      title: 'Error',
      message: 'The credentials do not match. Please try again',
    });
  } 
}

async function logout() {

  const response = await fetch(`/logout`, {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
  });
  const data = await response.json();

  if(data) {
      iziToast.success({
        title: 'Success',
        message: `You have logged out.`,
        timeout: 1000,
        onClosing: function(instance, toast, closedBy){
          window.location="/login";
        }
      });
      document.getElementById("loginIcon").className="flex";
      document.getElementById("loggedAs").className="hidden";
      document.getElementById("loggedInAsDiv").className="hidden";
      document.getElementById("logOut").className="hidden";
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again',
    });
  } 
}

if (document.getElementById("logOut")){
  document.getElementById("logOut").addEventListener('click',()=> {
    logout();
  })
}