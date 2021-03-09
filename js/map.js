import {addPnt} from "../js/add_pnt.js";
import {addPly} from "../js/add_ply.js";
import {addLin} from "../js/add_line.js";
import {addRas} from "../js/add_rastr.js";

//-------------- INITIALIZE MAP START --------------------
//create new map
var map = new mapboxgl.Map({
            container: 'map',
            style: '../mapstyles/style.json',
            hash: true, //set this to true when productive (shows xyz in URL and updates it on the fly)
            minZoom: 6,
            maxZoom: 19,
            center: [8.38,46.747],
            zoom: 6.2,
            maxBounds: [[5.422,45.559],
                        [10.8884,47.991]
                       ]
          });

//add map control (navigation) buttons
map.addControl(new mapboxgl.NavigationControl());

//create a popup (not added to map yet)
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

//-------------- INITIALIZE MAP END --------------------



map.on('load', function (){
    
    //add layers to the map on load
    //addPly(map)
    //addLin(map)
    addRas(map)
    addPnt(map)
    
    //adjust opacity of raster tiles
    map.setPaintProperty('randomTiles', 'raster-opacity', 0.2);
    
    //-------------- USER INTERACTION HANDLING START --------------------
    //create a function on mouseenter
    map.on('mouseenter', 'freibaeder', function (e) {

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.name;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(name).addTo(map);
    });
    
    //remove popup on mousleave
    map.on('mouseleave', 'freibaeder', function () {
        map.getCanvas().style.cursor = '';
        if (popup) popup.remove();
    });
    //-------------- USER INTERACTION HANDLING END --------------------
    
})
