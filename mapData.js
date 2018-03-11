// **** TODO IMPORTANT : add(include) CountryCode.js before this js file
// calling fn from different js file

function Get(yourUrl) {
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET", yourUrl, false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

function hitMovieApi(map) {
	var arr = ["AR", "AU", "BR", "CA", "CN", "DK", "FR", "DE", "GR", "IN", "ID", "IR", "IT", "JP", "KR", "NL", "NO", "PH", "PL", "RU", "ES", "SE", "CH", "TR", "UA", "GB", "US"];
	for (let i = 0; i < arr.length; i++) {
		var key = arr[i];
		var json_obj = JSON.parse(Get('https://api.themoviedb.org/3/movie/now_playing?api_key=39fda37c1a2b7aca9c188eb7d67a34e1&page=1&region=' + key));
		for (let i = 0; i < json_obj.results.length; i++) {
			const element = json_obj.results[i];
			var latlon = getRANLATLON(key);
			var googlelatlon = new google.maps.LatLng(latlon.lat, latlon.lon);

			// var mapLabel = new MapLabel({
			// 	text: element.original_title,
			// 	position: googlelatlon,
			// 	map: map,
			// 	fontSize: 35,
			// 	align: 'right'
			// });
			var marker = new google.maps.Marker({
				position: googlelatlon,
				title: element.original_title,
				icon: 'icon.png',
				visible: true,
				optimize: false,
				label: { text: element.original_title + " " + key, color: 'purple'},
				map: map
			});
		}
	}
}

function hitTvApi(map) {
	var json_obj1 = JSON.parse(Get('https://api.themoviedb.org/3/tv/on_the_air?api_key=39fda37c1a2b7aca9c188eb7d67a34e1&page=1'));
	for (let index = 1; index <= json_obj1.total_pages; index++) {
		var url = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=39fda37c1a2b7aca9c188eb7d67a34e1&page=' + index;
		var json_obj = JSON.parse(Get(url));
		var i = 0;
		while (i < json_obj.results.length) {
			if (json_obj.results[i].origin_country.length == 0) {
				//No country TODO
			}
			else {
				var TVtitle = json_obj.results[i].original_name;
				var key = json_obj.results[i].origin_country[0];
				var dictLatLon = getRANLATLON(key);
				var lat = dictLatLon.lat;
				var lon = dictLatLon.lon;
				//make marker
				var myLatlng = new google.maps.LatLng(lat, lon);

				var marker = new google.maps.Marker({
					position: myLatlng,
					title: TVtitle,
					icon: 'icon.png',
					visible: true,
					optimize: false,
					label: { text: TVtitle, color: 'orange'},
					map: map
				});
			}

			i++;
		}
	}
}
