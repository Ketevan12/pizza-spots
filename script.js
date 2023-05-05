function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const mapElement = document.getElementById("map");
  const mapOptions = {
    center: { lat: latitude, lng: longitude },
    zoom: 14,
  };
  const map = new google.maps.Map(mapElement, mapOptions);

  // Fetch pizza spot data from the NYC Open Data API with a pizza spot filter
  fetch(
    "https://data.cityofnewyork.us/resource/43nn-pn8j.json?cuisine_description=Pizza"
  )
    .then((response) => response.json())
    .then((data) => {
      // Loop through the pizza spot data and create a marker for each spot
      for (let i = 0; i < data.length; i++) {
        const spot = data[i];
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(spot.latitude),
            lng: parseFloat(spot.longitude),
          },
          map: map,
          title: spot.dba,
        });

        // Add an info window for each marker that shows the pizza spot name and address
        const infowindow = new google.maps.InfoWindow({
          content:
            "<h3>" +
            spot.dba +
            "</h3>" +
            "<p>" +
            spot.address +
            "</p>",
        });
        marker.addListener("click", function () {
          infowindow.open(map, marker);
        });
      }
    });
}



/ // Elements
// const $randomPizzaspot = document.getElementById('random-triathalon')
// const $shortestPzzaspot = document.getElementById('shortest-triathalon')
// const $longestPizzaspot = document.getElementById('longest-triathalon')
// const $result = document.getElementById('result')
// const $poolSelect = document.getElementById('pool-select')



// // Helper Functions
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   lat1 = parseFloat(lat1)
//   lon1 = parseFloat(lon1)
//   lat2 = parseFloat(lat2)
//   lon2 = parseFloat(lon2)

//   var p = 0.017453292519943295;    // Math.PI / 180
//   var c = Math.cos;
//   var a = 0.5 - c((lat2 - lat1) * p)/2 + 
//           c(lat1 * p) * c(lat2 * p) * 
//           (1 - c((lon2 - lon1) * p))/2;

//   return 12742 * Math.asin(Math.sqrt(a)) * 0.621371; // 2 * R; R = 6371 km, 0.621371 miles per km
// }

// // Fetch the data when the page loads
// fetch('https://data.cityofnewyork.us/resource/43nn-pn8j.json')
//   .then((response) => response.json())
//   .then((json) => {
//       runningTracks = json.filter(function(track) {
//         return track.lat !== null && track.long !== null
//       })

//       console.log('running tracks', runningTracks)
//   });

// fetch('data/DPR_Pools_outdoor_001.json')
//   .then((response) => response.json())
//   .then((json) => {
//     // Set the data to our app variable
//     swimmingPools = json

//     // Add each pool to the select tag list of pools
//     swimmingPools.forEach(function(pool) {
//       // Create an option element
//       const option = document.createElement('option')
//             option.setAttribute('value', pool.Name)
//             option.innerText = pool.Name

//       // Add it to the select element
//       $poolSelect.appendChild(option)
//     })

//     console.log('swimming pools', swimmingPools)
//   });

// // Track when a person selects a pool from the list
// // and save that information so we can use it later

// $poolSelect.addEventListener('change', function() {
//   // 'value' is the *name* of the pool
//   const value = $poolSelect.value

//   // we need to use this name, to get the full data about that pool
//   // Go through the array of all pools
//   selectedPool = swimmingPools.find(function(pool) {
//     // Return true if the name of the pool matches the name we selected
//     return pool.Name === value
//   })

//   console.log(selectedPool)
// })


// $randomTriathalon.addEventListener('click', function() {
//   // Get a random track from the array of tracks
//   const randomTrack = runningTracks[Math.floor(Math.random() * runningTracks.length)]

//   // Render the information about the starting pool and ending track to the page
//   renderResult(selectedPool, randomTrack)
// })

// // Shortest Triathalon Button
// $shortestTriathalon.addEventListener('click', function() {
//   let closestTrack = null
//   let closestDistance = 9999

//   runningTracks.forEach(function(track) {
//     // Check the distance from the selected pool
//     const distanceToSelectedPool = calculateDistance(selectedPool.lat, selectedPool.lon, track.lat, track.lon)

//     // If the distance is smaller than the previous value
//     // we've found the next closest track
//     if (distanceToSelectedPool < closestDistance) {
//       closestDistance = distanceToSelectedPool
//       closestTrack = track
//     }
//   })

//   renderResult(selectedPool, closestTrack)
// })



// // Longest Triathalon Button
// $longestTriathalon.addEventListener('click', function() {
//   // Find the track *furthest* from the selected pool
//   let furthestTrack = null
//   let furthestDistance = 0

//   runningTracks.forEach(function(track) {
//     // Check the distance from the selected pool
//     const distanceToSelectedPool = calculateDistance(selectedPool.lat, selectedPool.lon, track.lat, track.lon)

//     // If the distance is larger than the previous value
//     // we've found the next furthest track
//     if (distanceToSelectedPool > furthestDistance) {
//       furthestDistance = distanceToSelectedPool
//       furthestTrack = track
//     }
//   })

//   renderResult(selectedPool, furthestTrack)
// })




// // Take the starting pool and ending track
// // and render the information to the page in the #result element
// function renderResult(pool, track) {
//   $result.innerHTML = `
//     <div class="pane-right">
//       <h4>Your Triathalon</h4>

//       <p>
//         <small>Total distance: ${calculateDistance(pool.lat, pool.lon, track.lat, track.lon).toFixed(2)} miles</small>
//       </p>      

//       <div class="tri-step">
//         <i>🏊‍♂️</i>
//         <p>
//           This triathalon starts at the <strong>${pool.Name}</strong> pool located at ${pool.Location}.
//         </p>
//       </div>

//       <div class="tri-step">
//         <i>🚴‍♂️</i>
//         <p>Get on your bike and ride to...</p>
//       </div>

//       <div class="tri-step">
//         <i>🏃‍♂️</i>
//         <p>The <strong>${track.Name}</strong> track located at ${track.Location}</p> 
//       </div>

//       <a href="https://www.google.com/maps/dir/${pool.lat},${pool.lon}/${track.lat},${track.lon}" target="_blank">
//         See Map on Google
//       </a>
//     </div>

//     <iframe src="https://www.google.com/maps/embed?pb=!1m20!1m8!1m3!1d193845.05577005667!2d${track.lon}!3d40.6115964!3m2!1i1024!2i768!4f13.1!4m9!3e1!4m3!3m2!1d${pool.lat}!2d${pool.lon}!4m3!3m2!1d${track.lat}!2d-73.8874!5e0!3m2!1sen!2sus!4v1682621151712!5m2!1sen!2sus" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
//   `
// }

// {grade}{location}{
//   CUISINE DESCRIPTION
//   DBA
//   Latitude
//   latitude
// Longtitude}
//if (navigator.geolocation) {
  //navigator.geolocation.getCurrentPosition(showPosition);
//} else {
 // console.log("Geolocation is not supported by this browser.");}


//function showPosition(position) {
//  const latitude = position.coords.latitude;
  //const longitude = position.coords.longitude;
 // const locationElement = document.getElementById("location");
  //locationElement.innerHTML = "Latitude: " + latitude + ", Longitude: " + longitude;
//}


//fetch('https://data.cityofnewyork.us/resource/43nn-pn8j.json')
  //.then(response => response.json())
  //.then((data) => {
    //let parentElement = document.getElementById('background')

    ///for(let i = 0; i < data.length; i++) {
      // Only show data with a grade of A and cuisine_description containing "pizza"
      //if(data[i].grade == "A" && data[i].cuisine_description.includes("Pizza")) {
        //let newDiv = document.createElement ('div')
        //newDiv.innerHTML =` 
          //<h4>${data[i].grade}</h4>
         // <p>${data[i].boro}</p>
         // <p>${data[i].street}</p>
        //  <p>${data[i].zipcode}</p>
          //<p>${data[i].dba}</p>
          //<p>${data[i].cuisine_description}</p>
        `
       // parentElement.append(newDiv)
     // }
   // }
 // });

 // if (navigator.geolocation) {
   // navigator.geolocation.getCurrentPosition(showPosition);
 // } else {
  //  console.log("Geolocation is not supported by this browser.");
 // }
  
  //function showPosition(position) {
    //const latitude = position.coords.latitude;
    //const longitude = position.coords.longitude;
  
    //const mapElement = document.getElementById("map");
   // const mapOptions = {
    //  center: { lat: latitude, lng: longitude },
      //zoom: 14,
   // };
   // const map = new google.maps.Map(mapElement, mapOptions);
 // }
  
 