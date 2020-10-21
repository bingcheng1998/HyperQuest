
var generateCanvas = function(num){
  innerHTML = '';
  for(let i = 0; i < num; i++){
    innerHTML += '<canvas id="myCanvas' + i +'" width="32" height="32"></canvas>\n';
  };
  document.getElementById("demo").innerHTML = innerHTML
}


var plot = function (data, i, canvasId) {
  var rgbdata = data['W1'][i];
  var c = document.getElementById(canvasId); 
  var ctx = c.getContext("2d"); 

  var r,g,b; 

  for(var i=0; i< rgbdata.length; i++){ 
    for(var j=0; j< rgbdata[0].length; j++){ 
      r = rgbdata[i][j][0]; 
      g = rgbdata[i][j][1];  
      b = rgbdata[i][j][2];    
      ctx.fillStyle = "rgba("+r+","+g+","+b+", 1)";  
      ctx.fillRect( j, i, 1, 1 ); 
    } 
  } 
}

let sketch = function (p) {
  let data;

  p.preload = function () {
    let url =
     '../json/50-50-0.001-1-8.json';
    data = p.loadJSON(url);
  };

  p.setup = function () {
    p.noLoop();
  };

  p.draw = function () {
    num = data["W1"].length;
    console.log(num);
    generateCanvas(num);
    for(let i = 0; i < num; i++){
      plot(data, i, 'myCanvas'+i)
    }
    };
};

let myp5 = new p5(sketch);