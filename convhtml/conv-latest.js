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
function generateCanvas(num){
  innerHTML = '';
  for(let i = 0; i < num; i++){
    innerHTML += '<canvas id="myCanvas' + i +'" width="5" height="5"></canvas>\n';
  };
  document.getElementById("gradient_canvas").innerHTML = innerHTML;
}

function plot(data, i, canvasId, epoch) {
  let rgbdata = data["epo_W1"][epoch][i];
  let c = document.getElementById(canvasId); 
  var ctx = c.getContext("2d"); 
  let smooth = false;
  let r,g,b; 

  for(let i=0; i< rgbdata.length; i++){ 
    for(let j=0; j< rgbdata[0].length; j++){ 
      r = rgbdata[i][j][0]; 
      g = rgbdata[i][j][1];  
      b = rgbdata[i][j][2];    
      ctx.fillStyle = "rgba("+r+","+g+","+b+", 1)";  
      ctx.fillRect( j, i, 1, 1 ); 
    } 
  } 
}

function plotAllHiddenStates(data, epoch) {
  console.log('"'+epoch+'"');
  let num = data["epo_W1"][epoch].length;
  
  generateCanvas(num);
  for(let i = 0; i < num; i++){
    plot(data, i, 'myCanvas'+i, epoch);
  };
}



function generateFrom(data, name, id){
    let innerHTML = '<div><form name="'+id+'">\n<label>'+name+':</label>\t<p>'+
    '<input type="radio" name="'+id+'" value='+data[0]+' checked> '+data[0]+'';
    for(let i=1; i<data.length; i++){
        innerHTML += 
        '<input type="radio" name="'+id+'" value='+data[i]+' > '+data[i]+'';
    };
    innerHTML += 
        '<\p></form></div>';
    return innerHTML
}

function showForm(){
    let CNN_mid_width = [32, 64, 128];
    let dropout = [0, 0.2, 0.5];
    let regularization = [0.02, 0.03];
    let CNN_depth = [0, 2, 4, 6];
    let epoch = [1,2,3,4,5,6,7,8];
    let innerHTML = generateFrom(CNN_mid_width, 'CNN_mid_width', 'CNN_mid_width');
    innerHTML += generateFrom(dropout, 'dropout', 'dropout');
    innerHTML += generateFrom(CNN_depth, 'CNN_depth', 'CNN_depth');
    innerHTML += generateFrom(regularization, 'regularization', 'regularization');
    innerHTML += generateFrom(epoch, 'epoch', 'epoch');
    // console.log(innerHTML);
    document.getElementById("form").innerHTML = innerHTML;
}


function findSelection(field) {
    var radios = document.getElementsByName(field);
    for (let i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
}

function loadJSON(jsonFile, fun1, fun2, fun3, epoch) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            let data = JSON.parse(xobj.responseText);
            fun1(data, epoch);
            fun2(data, epoch);
            fun3(data);
        }
    }
    xobj.send(null);
}

best_acc = 0;
prev_acc = 0;
function showAcc(data){
    let acc = data["val_acc"];
    document.getElementById("acc").innerHTML = '<p>best accuracy: '+best_acc+', previous accuracy: '+prev_acc+'.<p>validation accuracy is '+acc+ '.';
    if(acc>best_acc){best_acc = acc};
    prev_acc = acc;
}

async function showJson(jsonName, epoch){
    showLoading();
    await sleep(epoch * 1000);
    loadJSON(jsonName, plotAllHiddenStates, drawLineChart, showAcc, epoch);
}

function showLoading(){
    let loading_html = '<div class="loader"></div>';
    document.getElementById("acc").innerHTML = loading_html+ 'Running on server: https://bingcheng.openmc.cn/HyperQuest/';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function submitForm() {
    let CNN_mid_width =  findSelection("CNN_mid_width");
    let dropout =  findSelection("dropout");
    let CNN_depth =  findSelection("CNN_depth");
    let regularization =  findSelection("regularization");
    let epoch = findSelection("epoch")-1;
    let lr = 0.002;
    let CNN_out_width = 20;
    let h_fc = 50;
    let num_epoch = 8;
    jsonName = jsonFileHead+CNN_mid_width+'-'+CNN_depth+'-'+
        dropout+'-'+regularization+'-'+lr+'-'+CNN_out_width+'-'+h_fc+'-'+num_epoch+'.json';
    console.log('Run:'+CNN_mid_width+'-'+CNN_depth+'-'+
        dropout+'-'+regularization+'-'+lr+'-'+CNN_out_width+'-'+h_fc+'-'+num_epoch+'-epoch = '+epoch);
    showJson(jsonName, epoch);

}

var jsonFileHead = 'https://bingcheng.openmc.cn/HyperQuest/data/convJson/'
showForm()
showJson(jsonFileHead+'32-0-0-0.02-0.002-20-50-8.json', 0);
