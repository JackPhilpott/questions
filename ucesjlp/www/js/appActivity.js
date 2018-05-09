//Javascript file which defines the data and functions used in the index map box

// Loading tile layers in to seperate variables, to give multiple map layer options
var Light = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxy26u500262roa9yk2e7r0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig', 
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'}),
	
	Cream = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxy8du3001q2qmzwl3id3f9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig',
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'}),
				
	Satellite = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxyaclj00002ro8ehqsjf7b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig',
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'}),
				
	Basic = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxy6f9400272roa7rk37us5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig',
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'}),
				
	Dark = L.tileLayer('https://api.mapbox.com/styles/v1/puffer1210/cjgxy5x0n000t2rn8sjo97h8k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHVmZmVyMTIxMCIsImEiOiJjamd4eHlrN3IyYmlwMzBwMW05enRiejA0In0.HISDyJ-JxCB8SZSIsZdpig',
				{maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'mapbox.streets'});
				

//Load default map, zoomed to University College of London (UCL)
var mymap = L.map('mapid', {
    center: [51.5246, -0.1340],
    zoom: 13,
    layers: [Cream]
});

//Create basemap varaibles 
var baseMaps = {
    "Default": Cream,
    "Light": Light,
	"Dark": Dark,
	"Satellite": Satellite,
	"Basic": Basic
};
// Add the layers to map
L.control.layers(baseMaps).addTo(mymap);




	   
// Create draggable marker which is present when opening web page. Coordinates are found by dragging the marker to desired location. 
var marker = L.marker([51.5246, -0.1340], {draggable:true});
marker.addTo(mymap);
marker.on('dragend', function(e) {
			document.getElementById("lat").value = marker.getLatLng().lat;
			document.getElementById("lng").value = marker.getLatLng().lng;
		});




// Function links to Clear Question button in index.html file to reset question input
function resetForm() {
	document.getElementById("location").value = "";
	document.getElementById("question").value = "";
	document.getElementById("answera").value = "";
	document.getElementById("answerb").value = "";
	document.getElementById("answerc").value = "";
	document.getElementById("answerd").value = "";
	document.getElementById("lat").value = "";
	document.getElementById("lng").value = "";
}




/// -- Create geoJSON layer that is return all submitted questions from the database using the View Questions button in index.html file --///
//Create variables used to create questions layer
// Variable that holds the XMLHttpRequest()
var qvariable;
// Variable that holds the layer of questions
var questionsLayer;
// Global marker variable using AwesomeMarkers to be used as marker for questions layer 
var QuestionMarker = L.AwesomeMarkers.icon({
	markerColor: 'purple'
	});

// Get the question data using an XMLHttpRequest
function getQuestions() {
	qvariable = new XMLHttpRequest();
	qvariable.open('GET','http://developer.cege.ucl.ac.uk:30302/getquestions');
	qvariable.onreadystatechange = questionResponse; 
	qvariable.send();
}



// Receive response from the data server
function questionResponse() {
	if (qvariable.readyState == 4) {
		var questionData = qvariable.responseText;
		loadQuestionLayer(questionData);
	}
}



// Convert the received non-text data received in to JSON format and then add layer to map created from data
function loadQuestionLayer(questionData) {
	// Convert text to JSON
	var questionJSON = JSON.parse(questionData);
	// Load geoJSON layer
	var questionsLayer = L.geoJson(questionJSON,
		{
		// Point to layer creates the question points
		pointToLayer: function (feature, latlng)
		{
			// Includes a pop-up describing the location description (location) and question name (question)
			return L.marker(latlng, {icon:QuestionMarker}).bindPopup("<b>"+feature.properties.questionlock +"</b>" + "<p>" + feature.properties.question + "</b>");
			},
		}).addTo(mymap);
	// The map is then fitted to the extent of the questions layer 
	mymap.fitBounds(questionsLayer.getBounds());
}