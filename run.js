var latitude;
var longitude;
var report;
var reportId;
var retrievedLatitude;
var GJ;

// Function that retrieves user's location and displays status messages//
function geoFindMe(){
  var output = document.getElementById("outLocation");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    output.innerHTML = '<p>Your location has been acquired. It will not be saved until you submit your report.</p>';
  }

  function error() {
    output.innerHTML = "<p>Unable to acquire your location.</p>";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

// Function to get report counter and get location on startup //
function startUp(){
    geoFindMe();

    var reportRef = firebase.database().ref('counter');
    reportRef.once('value').then(function(snapshot){
        reportId = snapshot.val();
    });
}

// Function to get the report text //
function getReport(){
    report = document.getElementById("report").value;
    var output = document.getElementById("outLocation");
    output.innerHTML = '<p>Your report has been submitted.</p>';
}

// Function to write report to Database //
function writeUserReport(){
    getReport();

    firebase.database().ref('reports/' + reportId).set({
        latitude: latitude,
        longitude: longitude,
        reportText: report
    });

    reportId++;
    firebase.database().ref('counter').set(reportId);
}

function readUserReport2(){
    var reportRef = firebase.database().ref('reports/0/reportText');
    reportRef.on('value', function(snapshot) {
        retrievedLatitude = snapshot.val();
        console.log(retrievedLatitude);
    });
}

function readUserReport(){
    var reportRef = firebase.database().ref('reports/0/');
     reportRef.once('value').then(function(snapshot) {
        retrievedLatitude = snapshot.val().reportText;
        console.log(retrievedLatitude);
    });
}

function readGeoJson(){

    $.getJSON('map2.geojson', function(response){
       GJ = response;
       alert(JSON.property);
    })
    .success(function() { alert("second success"); })
    .error(function() { alert("error"); })
    .complete(function() { alert("complete"); });

    console.log(GJ);
}