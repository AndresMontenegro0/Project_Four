$(function(){
    function initialize() {
        geocoder   = new google.maps.Geocoder();

        var latlng = new google.maps.LatLng(40.71, -74.0059);
        var mapOptions = {
            zoom: 12,
            center: latlng
        }
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        function codeAddress(address, title) {
            //var address =
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: title, 
                        visible: true
                    });
                    marker.setMap(map);
                    
                    var infobox = new InfoBox({
                         content: document.getElementById("infobox"),
                         disableAutoPan: false,
                         maxWidth: 150,
                         pixelOffset: new google.maps.Size(-140, 0),
                         zIndex: null,
                         boxStyle: {
                            background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                            opacity: 0.75,
                            width: "280px"
                        },
                        closeBoxMargin: "12px 4px 2px 2px",
                        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                        infoBoxClearance: new google.maps.Size(1, 1)
                    });
                     google.maps.event.addListener(marker, 'click', function() {
                        infobox.open(map, this);
                        map.panTo(latlng);
                     });
                    
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        
        $('.location-grabber').click(function(e){
            e.preventDefault();
            var loc = $(this).text();
            var titleSpan = $(this).closest('.title')
            var title = titleSpan.text();
            console.log(titleSpan);
            codeAddress(loc, title);
        })
    }



    //console.log(document.querySelector('#searchGoogle'))
    //$('#searchGoogle').click(function(evt){
    //    console.log('hey');
    //    var location = document.getElementById('address').value;
    //    codeAddress(location);
    //})



    google.maps.event.addDomListener(window, 'load', initialize);



})