import {addSwimSpots} from "../js/add_swimspots.js";
import {addBWIRasterTiles} from "../js/add_BWITiles.js";
//import {addPly} from "../js/add_ply.js";
//import {addLin} from "../js/add_line.js";


//-------------- INITIALIZE MAP START --------------------
//create new map
var map = new mapboxgl.Map({
            container: 'map',
            style: '../mapstyles/BWIStyle.json',
            hash: true, //set this to true when productive (shows xyz in URL and updates it on the fly)
            minZoom: 6,
            maxZoom: 19,
            center: [8.38,46.747],
            zoom: 6.2,
            maxBounds: [[-2.841779,42.621299], //southwestern corner of bounds
                        [18.710814,50.955364]  //northeastern corner of bounds
                       ]
          });

//add map control (navigation) buttons
map.addControl(new mapboxgl.NavigationControl());

//when map is loaded, load additional layers
map.on('load', function (){
    
    addBWIRasterTiles(map);
    addSwimSpots(map);
        
});

//-------------- INITIALIZE MAP END --------------------
