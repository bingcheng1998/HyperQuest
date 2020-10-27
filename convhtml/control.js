function generateFrom(data, name, id, show_data){
    if(show_data == null){
        show_data = data;
    };
    let innerHTML = '<div><form name="'+id+'">\n<label>'+name+':</label>\t<p>'+
    '<input type="radio" name="'+id+'" value='+data[0]+' checked> '+show_data[0]+' ';
    for(let i=1; i<data.length; i++){
        innerHTML += 
        '<input type="radio" name="'+id+'" value='+data[i]+' > '+show_data[i]+' ';
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
    let CNN_depth_show = [2, 4, 6, 8];
    let epoch = [1,2,3,4,5,6,7,8];
    let innerHTML = "";
    innerHTML += generateFrom(dropout, 'Dropout (P)', 'dropout');
    innerHTML += generateFrom(CNN_depth, 'CNN depth', 'CNN_depth', CNN_depth_show);
    innerHTML += generateFrom(CNN_mid_width, 'CNN width', 'CNN_mid_width');
    innerHTML += generateFrom(regularization, 'regularization', 'regularization');
    innerHTML += generateFrom(epoch, 'Epoch', 'epoch');
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
            fun3(data, epoch);
        }
    }
    xobj.send(null);
}

best_acc = 0;
prev_acc = 0;
function showAcc(data, epoch){
    console.log(data["his"]["vali_his"])
    let acc = data["his"]["vali_his"][epoch+1]/1000000;
    document.getElementById("acc").innerHTML = '<p>best_acc = '+best_acc+', prev_acc ='+prev_acc+'<p>validation accuracy is '+acc+ '.';
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
    document.getElementById("acc").innerHTML = loading_html+ 'ML server connects successfully! Running on ML server ...';
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

var jsonFileHead = '../data/convJson/'
showForm()
showJson(jsonFileHead+'32-0-0-0.02-0.002-20-50-8.json', 0);
