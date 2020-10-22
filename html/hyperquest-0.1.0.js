function genData(dataNames, rawJson){
  data = [];
  for(const dataName in dataNames){
    showName = dataNames[dataName];
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
  dataNames = {"loss_history": "loss",};

  let data = genData(dataNames, rawJson);

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
    'val_acc_history':'validation', 
    'train_acc_history':'train',
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
  data = genData(dataNames, rawJson);

  Plotly.newPlot('train_and_vali_acc', data, layout2);
}
function generateCanvas(num){
  innerHTML = '';
  for(let i = 0; i < num; i++){
  innerHTML += '<canvas id="myCanvas' + i +'" width="32" height="32"></canvas>\n';
  };
  document.getElementById("gradient_canvas").innerHTML = innerHTML;
}

function plot(data, i, canvasId) {
  let rgbdata = data['W1'][i];
  let c = document.getElementById(canvasId); 
  let ctx = c.getContext("2d"); 

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

function plotAllHiddenStates(data) {
  let num = data["W1"].length;
  console.log(num);
  generateCanvas(num);
  for(let i = 0; i < num; i++){
  plot(data, i, 'myCanvas'+i);
  };
}
function generateFrom(data, name, id){
  let innerHTML = '<div><form name="'+id+'">\n<label>'+name+':</label>\t<p>'+
  '<input type="radio" name="'+id+'" value='+data[0]+' checked> '+data[0]+' ';
  for(let i=1; i<data.length; i++){
    innerHTML += 
    '<input type="radio" name="'+id+'" value='+data[i]+' > '+data[i]+' ';
  };
  innerHTML += 
    '<\p></form></div>';
  return innerHTML
}

function showForm(){
  let hidden_size = [3, 5, 10, 50, 150];
  let batch_size = [10, 50, 100, 200, 400];
  let learning_rate = [4e-3, 3e-3, 1e-3, 5e-4, 1e-4];
  let regularization = [0, 0.1, 0.5, 1, 10];
  let innerHTML = generateFrom(hidden_size, 'hidden_size', 'hidden_size');
  innerHTML += generateFrom(batch_size, 'batch_size', 'batch_size');
  innerHTML += generateFrom(learning_rate, 'learning_rate', 'learning_rate');
  innerHTML += generateFrom(regularization, 'regularization', 'regularization');
  console.log(innerHTML);
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

function loadJSON(jsonFile, fun1, fun2, fun3) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', jsonFile, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      let data = JSON.parse(xobj.responseText);
      fun1(data);
      fun2(data);
      fun3(data);
    }
  }
  xobj.send(null);
}

function showAcc(data){
  let acc = data["val_acc"];
  document.getElementById("acc").innerHTML = 'validation accuracy is '+acc+ '.';
}

function showJson(jsonName){
  loadJSON(jsonName, plotAllHiddenStates, drawLineChart, showAcc);
}

function submitForm() {

  let hidden_size =  findSelection("hidden_size");
  let batch_size =  findSelection("batch_size");
  let learning_rate =  findSelection("learning_rate");
  let regularization =  findSelection("regularization");
  let num_epoch = 8;

  jsonName = jsonFileHead+hidden_size+'-'+batch_size+'-'+
    learning_rate+'-'+regularization+'-'+num_epoch+'.json';
  showJson(jsonName);

}

var jsonFileHead = 'https://bingcheng.openmc.cn/HyperQuest/json/'
showForm()
showJson(jsonFileHead+'3-10-0.004-0-8.json');
