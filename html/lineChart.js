function loadJSON(callback, jsonFile) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}


function drawLineChart(response) {

let lineChartData = JSON.parse(response)["loss_history"];
let num = lineChartData.length;

var limit = 50000;
var y = 100;    

var dataSeries = { type: "line" };
var dataPoints = [];
for (var i = 0; i < num; i += 1) {
	y = lineChartData[i]/1000000.0;
	dataPoints.push({
		x: i,
		y: y
	});
}

var data = [];
dataSeries.dataPoints = dataPoints;
data.push(dataSeries);

//Better to construct options first and then pass it as a parameter
var options = {
	zoomEnabled: true,
	animationEnabled: true,
	title: {
		text: "Try Zooming - Panning"
	},
	axisY: {
		lineThickness: 1
	},
	data: data  // random data
};

var chart = new CanvasJS.Chart("chartContainer", options);
var startTime = new Date();
chart.render();
var endTime = new Date();
// document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";

}

// drawLineChart()
loadJSON(drawLineChart, '../json/10-100-0.001-1-8.json');