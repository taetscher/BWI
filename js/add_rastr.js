export function addRAS(map) {
    //adds a source and layer to map
    
    //adding a local raster tile source
    map.addSource('raster_test', {
            'type': 'raster',
            'tiles': ['../QGIS/tiles/{z}/{x}/{y}.png'],
            'tileSize': 256
            
        })
    
    //only after a source was set can the feature be added
    map.addLayer({
        'id': 'msr25',
        'type': 'raster',
        'source': 'raster_test',
        'minzoom': 6,
        'maxzoom': 14
        })
}