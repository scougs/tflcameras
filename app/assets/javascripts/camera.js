$(function(){

  var mapOptions,
        canvas,
        map;

  mapOptions = {
  zoom: 12,
  center: new google.maps.LatLng(51.5073, -0.1276),
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  canvas = document.getElementById("map-canvas");
  map = new google.maps.Map(canvas, mapOptions);


  var cameras = $.getJSON('/cameras.json', function(data){
    cameras = data

    var markers = []

    for(var i=0; i < cameras.length; i++){

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(cameras[i].lat), parseFloat(cameras[i].lng)),
          map: map,
          title: 'text',
          camera_id: i
      });

      markers[i] = marker;

      google.maps.event.addListener(markers[i], 'click', function() {
        camera = cameras[this.camera_id]
        var contentString = '<div id="content"><img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/' +
        cameras[this.camera_id].file + '"><p>' + cameras[this.camera_id].location + ", " + cameras[this.camera_id].postcode + '</p></div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        infowindow.open(map,markers[this.camera_id])

      });

    }

  });


});