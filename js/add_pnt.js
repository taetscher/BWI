export function addPnt(map) {
    //adds a source and layer to map
    
    //in order to use data with mapbox, you need to specify its source
    map.addSource('CH_freibaeder', {
            type: 'geojson',
            data: '../geojson/swimming_spots.geojson',
            attribution: "© OpenStreetMap contributors"
        })
    
    //only after a source was set can the feature be added
    map.addLayer({
        'id': 'freibaeder',
        'type': 'circle',
        'source': 'CH_freibaeder',
        'layout': {},
        'minzoom': 12,
        'maxzoom': 19
        })
}
