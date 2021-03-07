import {addPnt} from "../js/add_pnt.js";
import {addPly} from "../js/add_ply.js";
import {addLin} from "../js/add_line.js";
import {addRAS} from "../js/add_rastr.js";

//create new map
var map = new mapboxgl.Map({
            container: 'map',
            style: '../mapstyles/style.json',
            hash: false, //set this to true when productive (shows xyz in URL and updates it)
            minZoom: 6,
            maxZoom: 19,
            center: [8.38,46.747],
            zoom: 6.2
          });

//add map control (navigation) buttons
map.addControl(new mapboxgl.NavigationControl());

//on load, add a polygon from geojson source
map.on('load', function (){
    
    
    addPly(map)
    addLin(map)
    addRAS(map)
    addPnt(map)
    
    //adjust opacity of raster tiles
    map.setPaintProperty(
        'randomTiles', 'raster-opacity', 0.2
    );
    
})