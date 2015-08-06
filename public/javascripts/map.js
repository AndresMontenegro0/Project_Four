$(function(){
    function initialize() {
        geocoder   = new google.maps.Geocoder();

        var latlng = new google.maps.LatLng(40.71, -74.0059);
        var mapOptions = {
            zoom: 12,
            center: latlng
        }

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    // function codeAddress(address, title) {
    //     //var address =
    //     geocoder.geocode( { 'address': address}, function(results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             map.setCenter(results[0].geometry.location);
    //             var marker = new google.maps.Marker({
    //                 map: map,
    //                 position: results[0].geometry.location,
    //                 title: title
    //             });
    //             marker.setMap(map)
    //         } else {
    //             alert('Geocode was not successful for the following reason: ' + status);
    //         }
    //     });
    // }


    // //console.log(document.querySelector('#searchGoogle'))
    // //$('#searchGoogle').click(function(evt){
    // //    console.log('hey');
    // //    var location = document.getElementById('address').value;
    // //    codeAddress(location);
    // //})

    // $('.location-grabber').click(function(e){
    //     e.preventDefault();
    //     var loc = $(this).text();
    //     var titleSpan = $(this).closest('.title')
    //     var title = titleSpan.text();
    //     console.log(titleSpan);
    //     codeAddress(loc, title);
    // })


    google.maps.event.addDomListener(window, 'load', initialize);



})