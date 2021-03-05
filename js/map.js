var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapstyles/style.json',
            hash: false, //set this to true when productive (shows xyz in URL and updates it)
            minzoom: 6,
            maxzoom: 24,
            center: [8.38,46.747],
            zoom: 6.2
          });

map.addControl(new mapboxgl.NavigationControl());
