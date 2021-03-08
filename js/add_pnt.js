export function addPnt(map) {
    //adds a source and layer to map
    
    //in order to use data with mapbox, you need to specify its source
    map.addSource('CH_freibaeder', {
            type: 'geojson',
            data: '../geojson/swimming_spots.geojson',
            attribution: "© OpenStreetMap contributors"
        })
    
    //load icon
    map.loadImage('../mapstyles/icons/swimming_icon_20.png', function (error, image){
        
        map.addImage('swim_icon', image);
        
        //only after a source was set can the feature be added
        map.addLayer({
            'id': 'freibaeder',
            'type': 'symbol',
            'source': 'CH_freibaeder',
            'layout': {
                'icon-image': 'swim_icon',
                'icon-size': 1
            },
            'minzoom': 12,
            'maxzoom': 19
            })
        
        
    });
    
    
}
