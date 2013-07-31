$(function(){

  var mapOptions = {
  zoom: 12,
  center: new google.maps.LatLng(51.5073, -0.1276),
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var canvas = document.getElementById("map-canvas");
  var map = new google.maps.Map(canvas, mapOptions);


  $.getJSON('/cameras.json', function(cameras){

    var markers = [];

    for(var i=0; i < cameras.length; i++){

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(cameras[i].lat), parseFloat(cameras[i].lng)),
          map: map,
          title: cameras[i].location,
          camera_id: i
      });

      markers[i] = marker;

      google.maps.event.addListener(markers[i], 'click', function() {

        camera = cameras[this.camera_id]
        
        var contentString = '<div id="content"><img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/' +
        camera.file + '"><h3>' + camera.location + "</h3><p> " + camera.postcode + '</p></div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        infowindow.open(map,markers[this.camera_id])

      });
    }
  });
});