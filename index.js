// lat: 31.8025971, lng: -85.9593448

function initMap() {
	initAutocomplete();
	const directionsService = new google.maps.DirectionsService();
	const directionsRenderer = new google.maps.DirectionsRenderer({
		panel: document.getElementById("directions-panel"),
	  });
	const map = new google.maps.Map(document.getElementById("map"), {
	  zoom: 7,
	  center: { lat: 31.8025971, lng: -85.9593448 },
	});
  
	directionsRenderer.setMap(map);
  
	let startInputChanged = false;
	let endInputChanged = false;

	document.getElementById("start").addEventListener("change", () => {
		startInputChanged = true;
	});

	document.getElementById("end").addEventListener("change", () => {
		endInputChanged = true;
	});

	document.getElementById("get-directions").addEventListener("click", () => {
		if (startInputChanged && endInputChanged) {
			calculateAndDisplayRoute(directionsService, directionsRenderer);
			
		} else {
			window.alert("Please enter a valid start and end location");
		}
	 });

  }
    function initAutocomplete() {
	const startInput = document.getElementById("start");
	const endInput = document.getElementById("end");
  
	const startAutocomplete = new google.maps.places.Autocomplete(startInput);
	const endAutocomplete = new google.maps.places.Autocomplete(endInput);
  
	startAutocomplete.addListener("place_changed", () => {
	  const place = startAutocomplete.getPlace();
	  if (!place.geometry) {
		window.alert("No details available for input: '" + place.name + "'");
		return;
	  }
	});
  
	endAutocomplete.addListener("place_changed", () => {
	  const place = endAutocomplete.getPlace();
	  if (!place.geometry) {
		window.alert("No details available for input: '" + place.name + "'");
		return;
	  }
	});
  }
 

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
	const start = document.getElementById("start").value.trim();
	const end = document.getElementById("end").value.trim();
	
	if (start && end) {
		directionsService
		.route({
			origin: {
			query: start,
			},
			destination: {
			query: end,
			},
			travelMode: google.maps.TravelMode.DRIVING,
		})
		.then((response) => {
			directionsRenderer.setDirections(response);
			const route = response.routes[0];
			const legs = route.legs;
			const distance = legs.reduce((sum, leg) => sum + leg.distance.value, 0) / 1000; // Total distance in kilometers
			const duration = legs.reduce((sum, leg) => sum + leg.duration.value, 0) / 60; // Total duration in minutes
        const distanceElement = document.getElementById("distance");
        if (distanceElement) {
          distanceElement.textContent = `Distance: ${distance.toFixed(2)} km`;
        }

        const durationElement = document.getElementById("duration");
        if (durationElement) {
          durationElement.textContent = `Duration: ${duration.toFixed(0)} min`;
        }	
		})
		.catch((e) => window.alert("Directions request failed due to " + e));
  	}
}
  window.initMap = initMap;