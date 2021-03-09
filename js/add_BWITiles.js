export function addBWIRasterTiles(map) {
    /** Adds BWI-Raster Tiles to a map object
    *@param  {mapbox map object}   map   The map object which receives the BWI rastertiles
    */
    
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
        'minzoom': 6,
        'maxzoom': 20
        })
    
    //adjust opacity of raster tiles
    map.setPaintProperty('randomTiles', 'raster-opacity', 0.2);
}