var map;
var userLatitude = 34.040800499999996;
var userLongitude = -118.2557107;
var availableCars;
var flag = false;

if(sessionStorage.getItem('user') == null)
  window.location.replace('/login.html');

function getAvailableCars(){
$.ajax({
    url: 'https://34.212.86.167:80/available_cars',
    type: 'GET',
    async: false,
    data: 
    {
    },
    dataType: 'json',
    success: function(response) {

      availableCars = response;

      var divCol  = "<div class='col-sm-4 col-md-4'>";
        
        var divClose= "</div>";

        for(var prop in response) {
          console.log(response[prop]);
           var make     = "<h3>"      + response[prop].info.make + " " + response[prop].info.model  + " " + 
            response[prop].info.year + "</h3>";
            var odometer = "<h3>" + response[prop].odometer.data.distance + " miles driven. </h3>";

            var linkStart = "<a href='/rent.html?id=" + prop + "'>";
            var image     = "RENT NOW"
            var linkEnd   = "</a>";

            var div = divCol    +
                            make       +
                            odometer + 
                            linkStart       +
                            image       +
                            linkEnd +
                      divClose;

            $('.col-sm-12').append(div); // insert the div you've just created

        }

        sessionStorage.setItem('response', response);
        sessionStorage

}

});

}




function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function setPosition(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
  
}

function initMap() {


getLocation();
getAvailableCars();

  
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: new google.maps.LatLng(userLatitude, userLongitude), zoom: 16});

  var iconBase =
      './images/car_clipart_resized.png';


  var markers = [];
  var contentStrings = [];
        for(var prop in availableCars) {
          console.log(availableCars[prop]);
          var contentString = 
          '<div id="content">' + 
          '<div id="siteNotice">' + 
          '</div>' + 
          '<div id="bodyContent">' + 
          '<p>' + availableCars[prop].info.make + " " + availableCars[prop].info.model  + " " + 
            availableCars[prop].info.year + '</p>' +
            '</div></div>';

            contentStrings.push(contentString);

            var carLat = availableCars[prop].location.data.latitude;
            var carLong = availableCars[prop].location.data.longitude;

            var position = new google.maps.LatLng(carLat, carLong);


        

             var marker = new google.maps.Marker({
      position: position,
      icon: iconBase,
      map: map,
    });
            markers.push(marker);

        }

var infowindows = [];
for(let i = 0; i < markers.length; i++){

  console.log(contentStrings[i]);
var infowindow = new google.maps.InfoWindow({
          content: contentStrings[i]
        });
infowindows.push(infowindow);



}

for(let i = 0; i < infowindows.length; i++){
  markers[i].addListener('click', function() {
          infowindows[i].open(map, markers[i]);
        });
}
 
}
  
