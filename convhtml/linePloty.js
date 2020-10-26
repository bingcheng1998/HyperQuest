function genData(dataNames, rawJson, epoch){
    data = [];
    itrations = rawJson["epo_it"][epoch];
    for(const dataName in dataNames){
        showName = dataNames[dataName];
        let lineChartData = rawJson["his"][dataName];
        let num = lineChartData.length;
        if (itrations < num && epoch != 8 && dataName == "loss_his"){
          num = itrations;
        } else if (epoch < 8 && dataName != "loss_his") {
          num = epoch+2;
        }
        console.log(num);
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

function drawLineChart(rawJson, epoch) {
    dataNames = {"loss_his": "loss",};

    let data = genData(dataNames, rawJson, epoch);

    let layout = {
      title:'loss vs. time when training',
      xaxis: {
        title: 'iteration',
        showgrid: false,
        zeroline: false,
      },
      yaxis: {
        showexponent: 'all',
        exponentformat: 'e',
        title: 'loss',
        showline: false,
      },
    };

    Plotly.newPlot('loss_chart', data, layout);


    dataNames = {
        'vali_his':'validation', 
        'train_his':'train',
    };
    let layout2 = {
      title:'train and validation accuracy for each epoch',
      xaxis: {
        tickmode: "array",
        title: 'epoch',
        showgrid: false,
        zeroline: false,
      },
      yaxis: {
        showexponent: 'all',
        exponentformat: 'e',
        title: 'accuracy',
        showline: false,
      }
    };
    data = genData(dataNames, rawJson, epoch);

    Plotly.newPlot('train_and_vali_acc', data, layout2);
}
