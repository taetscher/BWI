export async function reprojectFromLink(link, targetCRS){
    /** takes a link to a geojson file and reprojects it into its target CRS using OGRE
    *@param {string} link        link to geojson file
    *@param {string} targetCRS   target coordinate system (e.g. EPSG:4326)
    *@return {geojson object} parsed   the reprojected geojson
    */
    
    const json_file = await fetch(link)
    .then(function(response){
        const json = response.json();
        console.log('BAFU: ', json);
        return json})

    //console.log('JSONFROMLINK:', json_file)
    
    //prepare FormData (convert json file to blob and simulate uploading a file in the form on the page)
    var formData = new FormData();
    var blob = new Blob([JSON.stringify(json_file)], { type: 'text/json' });
    formData.append('upload', blob,'bafujson.json');
    formData.append('targetSrs', targetCRS)
    
    
    //send the POST-Request
    var request = new XMLHttpRequest();
    request.open('POST', 'http://ogre.adc4gis.com/convert', 0);
    request.send(formData);
    
    
    var answer = request;
    var parsed = JSON.parse(answer.responseText);
    var timestamp = parsed.timestamp;

        
    return [parsed, timestamp]
};
