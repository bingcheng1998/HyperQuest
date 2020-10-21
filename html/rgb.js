function generateCanvas(num){
  innerHTML = '';
  for(let i = 0; i < num; i++){
    innerHTML += '<canvas id="myCanvas' + i +'" width="32" height="32"></canvas>\n';
  };
  document.getElementById("gradient_canvas").innerHTML = innerHTML
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
      plot(data, i, 'myCanvas'+i)
    };
}



