export function addWeather(map, popup) {
    /**
    *Add source, layer and user interaction of wather measuring stations to map
    *@param  {mapbox map object}   map   The map which receives the weather stations layer
    *@param  {mapbox popup object} popup The mapbox popup object which receives tooltip information
    */
    
    //add source
    map.addSource('weatherstations_source', {
        type: 'geojson',
        data: '../geojson/weatherstations.geojson', //could theoretically also be a link!
        attribution: 'Bundesamt für Meteorologie und Klimatologie MeteoSchweiz'
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
        
        //get data
        var coordinates = e.features[0].geometry.coordinates.slice();
        var station = e.features[0].properties.Station;
        var name = e.features[0].properties.Name;
        var mUm = e.features[0].properties['Höhe'];
        var rain = e.features[0].properties['Niederschlag (mm)'];
        var humidity = e.features[0].properties['Luftfeuchtigkeit (%)'];
        var temp = e.features[0].properties['Temperatur (°C)'];
        var wind = e.features[0].properties["Windgeschwindigkeit (km/h)"];
        var timestamp = e.features[0].properties.Time;

        //create text snippets
        var t1 = '<h6>'+station+'</h6><br>';
        var t2 = 'Stationsname: '+name+'<br>';
        var t3 = 'Temperatur (°C)'+temp+'<br>';
        var t4 = 'Höhe (m.Ü.m): '+mUm+'<br>';
        var t5 = 'Niederschlag (mm): '+rain+'<br>';
        var t6 = 'Luftfeuchtigkeit (%): '+humidity+'<br>';
        var t7 = 'Windgeschwindigkeit (km/h): '+wind+'<br>';
        var t8 = 'Timestamp: '+parseTimestamp(timestamp);
        
        //combine text snippets
        var text = t1+t2+t3+t4+t5+t6+t7+t8;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

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
};


function parseTimestamp(timestamp){
    /** Takes timestamps of format {201905211320} and turns them into dd.yy.mm hh:mm
    */
    
    var timestamp = String(timestamp)
    
    var date = timestamp.slice(0,8);
    var time = timestamp.slice(8,)
    
    var year = date.substr(0,4);
    var month = date.substr(4,2);
    var day = date.substr(6,);
                   
    var hour = time.substr(0,2);
    var min = time.substr(2,);
    
    
    return day+'.'+month+'.'+year+' '+hour+':'+min

};
