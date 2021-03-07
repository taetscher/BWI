export function addPly(map) {
    //adds a source and layer to map
    
    //in order to use data with mapbox, you need to specify its source
    map.addSource('ply_test', {
            type: 'geojson',
            data: '../geojson/vector_ply_testLyr.geojson',
        })
    
    //only after a source was set can the feature be added
    map.addLayer({
        'id': 'molki',
        'type': 'fill',
        'source': 'ply_test',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
            }
        })
}
