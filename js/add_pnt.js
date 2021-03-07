export function addPnt(map) {
    //adds a source and layer to map
    
    //in order to use data with mapbox, you need to specify its source
    map.addSource('pnt_test', {
            type: 'geojson',
            data: '../geojson/vector_pnt_testLyr.geojson',
        })
    
    //only after a source was set can the feature be added
    map.addLayer({
        'id': 'pont_test',
        'type': 'circle',
        'source': 'pnt_test',
        'layout': {}
        })
}
