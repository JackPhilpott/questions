// JavaScript

//Adapted from: https://github.com/claireellul/cegeg077-week6formcode

//Create function to ensure all question boxes are filled
function validateQuestion() {
// define question boxes
	var qlocal=document.getElementById("questionlock").value; 
	var qu=document.getElementById("question").value;
	var ansA=document.getElementById("answera").value;
	var ansB=document.getElementById("answerb").value;
	var ansC=document.getElementById("answerc").value;
	var ansD=document.getElementById("answerd").value;

	if (qlocal==null || qlocal=="",qu==null || qu=="",ansA==null || ansA=="",ansB==null || ansB=="",ansC==null || ansC=="",ansD==null || ansD=="")
        {
            alert("Please populate all fields in question form"); //alert when field not filled
            return false;
        }
        else
// if all boxes are filled begin data upload process
        {
        	DataStartUp()
        }
}






//Create variables for questions submission in to the database. These directly relate to the fields in the Web App that submit a question. 
function DataStartUp() {
	alert ("Question submitted to database!"); //return alert when question is submitted, linked with the Submit button in the index.html file


	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;
	var questionlock = document.getElementById("questionlock").value;
	
	var question = document.getElementById("question").value;
	var answera = document.getElementById("answera").value;
	var answerb = document.getElementById("answerb").value;
	var answerc = document.getElementById("answerc").value;
	var answerd = document.getElementById("answerd").value;
	






//Create string to query and ensure one of the radio button is selected 
	var postString = "questionlock="+questionlock +"&question="+question +"&answera="+answera +"&answerb="+answerb +"&answerc="+answerc+ "&answerd="+answerd;
	if (document.getElementById("Opt1").checked) {
        postString=postString+"&rightans=1";
    }
    if (document.getElementById("Opt2").checked) {
    	postString=postString+"&rightans=2";
    }
	if (document.getElementById("Opt3").checked) {
		postString=postString+"&rightans=3";
	}
	if (document.getElementById("Opt4").checked) {
		postString=postString+"&rightans=4";
	}
	postString = postString + "&lat=" + lat + "&lng=" + lng; //string latitude and longitude
	processData(postString); //processdata
}




// Create variable to retrieve the data uploaded to the database using the string above
var retrieveQ; //variable to hold XMLHttpRequest()
function processData(postString) {
   retrieveQ = new XMLHttpRequest();
   retrieveQ.open('POST','http://developer.cege.ucl.ac.uk:30302/SubmitData',true);
   retrieveQ.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   retrieveQ.onreadystatechange = UpData; //uploaded data
   retrieveQ.send(postString);
}


// Wait for response from the data server and then process once received
function UpData() {
  if (retrieveQ.readyState == 4) {
    document.getElementById("dataUploadResult").innerHTML = retrieveQ.responseText;
    }
}

