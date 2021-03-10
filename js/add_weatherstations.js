export function addWeather(map, popup) {
    
    // The data here is in EPSG:21781 and needs to be converted to EPSG:3857 in order to be displayed properly
    
    //add source
    map.addSource('weatherstations_source', {
        type: 'geojson',
        data: '../geojson/weatherstations.geojson', //could theoretically also be a link!
        attribution: 'Bundesamt für Umwelt BAFU'
    });
    
    //add layer
    map.addLayer({
        'id': 'Wetterstationen',
        'type': 'circle',
        'source': 'weatherstations_source',
        'minzoom': 10,
        'maxzoom': 19
    });
    
    
    //-------------- USER INTERACTION HANDLING START --------------------
    //display popup on mouseenter
    map.on('mouseenter', 'Wetterstationen', function (e) {

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var station = e.features[0].properties.Station;
        var name = e.features[0].properties.Name;
        

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        var text = '<h6>'+station+'</h6><br>Stationsname: '+name;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(text).addTo(map);
    });
    
    //remove popup on mousleave
    map.on('mouseleave', 'Wetterstationen', function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });
    
    //-------------- USER INTERACTION HANDLING END --------------------
}
