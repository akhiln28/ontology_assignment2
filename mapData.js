// **** TODO IMPORTANT : add(include) CountryCode.js before this js file
// calling fn from different js file

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function hitTvApi(map){
  var json_obj1 = JSON.parse(Get('https://api.themoviedb.org/3/tv/on_the_air?api_key=39fda37c1a2b7aca9c188eb7d67a34e1&page=1'));
  for (let index = 1; index <= json_obj1.total_pages; index++) {
    var url = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=39fda37c1a2b7aca9c188eb7d67a34e1&page=' + index;
    var json_obj = JSON.parse(Get(url));
    var i = 0;
    while (i < json_obj.results.length) {
      if(json_obj.results[i].origin_country.length==0){
          //No country TODO
      }
      else{
        var TVtitle = json_obj.results[i].original_name;
        var key = json_obj.results[i].origin_country[0];
        var lat = getRandomLat(key);
        var lon = getRandomLon(key);
        //make marker
        var myLatlng = new google.maps.LatLng(lat,lon);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: TVtitle,
            icon: 'icon.png',
            visible: true,
            optimize: false,
            label: {text: "random text"},
            map: map
        });
      }

      i++;
    }
  }
}
