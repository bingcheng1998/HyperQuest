function genData(dataNames, rawJson){
	data = []
	for(const dataName in dataNames){
		showName = dataNames[dataName]
		// console.log(dataNames)
		let lineChartData = rawJson[dataName];
		let num = lineChartData.length;
		let x = [];
		let y = [];
		for (let i = 0; i < num; i += 1) {
			y_i = lineChartData[i]/1000000.0;
			x.push(i);
			y.push(y_i);
		}
		let trace = {
		  x: x,
		  y: y,
		  mode: 'lines',
		  name: showName,
		};
		data.push(trace);
	}
	return data;
}

function drawLineChart(rawJson) {
	dataNames = {"loss_history": "loss",}

	let data = genData(dataNames, rawJson);

	let layout = {
	  title:'loss vs. time when training',
	  xaxis: {
	    title: 'iteration',
	    showgrid: false,
	    zeroline: false
	  },
	  yaxis: {
	  	showexponent: 'all',
    	exponentformat: 'e',
	    title: 'loss',
	    showline: false
	  }
	};

	Plotly.newPlot('loss_chart', data, layout);


	dataNames = {
		'val_acc_history':'validation', 
		'train_acc_history':'train',
	};
	let layout2 = {
	  title:'train and validation accuracy for each epoch',
	  xaxis: {
	  	tickmode: "array",
	    title: 'epoch',
	    showgrid: false,
	    zeroline: false
	  },
	  yaxis: {
	  	showexponent: 'all',
    	exponentformat: 'e',
	    title: 'accuracy',
	    showline: false,
	  }
	};
	data = genData(dataNames, rawJson);

	Plotly.newPlot('train_and_vali_acc', data, layout2);
}
