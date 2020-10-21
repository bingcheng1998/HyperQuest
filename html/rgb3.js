function preload(){
	let url = '../json/3-10-0.001-1-8.json';
	data = loadJSON(url);

	
}

function setup() {
  noLoop();
  console.log(data["W1"][0]);
}

// 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';