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
