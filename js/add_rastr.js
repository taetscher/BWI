export function addRAS(map) {
    //adds a source and layer to map
    
    //adding a local raster tile source
    map.addSource('raster_Tiling_test', {
            'type': 'raster',
            'tiles': ['../rasterTiles/randomTiles/{z}/{x}/{y}.png'],
            'tileSize': 256
            
        })
    
    //only after a source was set can the feature be added
    map.addLayer({
        'id': 'randomTiles',
        'type': 'raster',
        'source': 'raster_Tiling_test',
        'minZoom': 6,
        'maxZoom': 14
        })
}