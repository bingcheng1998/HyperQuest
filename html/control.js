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
    let hidden_size = [3, 5, 10, 50, 150];
    let batch_size = [10, 50, 100, 200, 400];
    let learning_rate = [4e-3, 3e-3, 1e-3, 5e-4, 1e-4];
    let regularization = [0, 0.1, 0.5, 1, 10];
    // let epoch = [1,2,3,4,5,6,7,8];
    let innerHTML = generateFrom(hidden_size, 'hidden_size', 'hidden_size');
    innerHTML += generateFrom(batch_size, 'batch_size', 'batch_size');
    innerHTML += generateFrom(learning_rate, 'learning_rate', 'learning_rate');
    innerHTML += generateFrom(regularization, 'regularization', 'regularization');
    // innerHTML += generateFrom(epoch, 'epoch', 'epoch');
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

best_acc = 0;
prev_acc = 0;
function showAcc(data){
    let acc = data["val_acc"];
    document.getElementById("acc").innerHTML = '<p>best_acc = '+best_acc+', prev_acc ='+prev_acc+'<p>validation accuracy is '+acc+ '.';
    if(acc>best_acc){best_acc = acc};
    prev_acc = acc;
}

async function showJson(jsonName){
    showLoading();
    await sleep(2000);
    loadJSON(jsonName, plotAllHiddenStates, drawLineChart, showAcc);
}

function showLoading(){
    let loading_html = '<div class="loader"></div>';
    document.getElementById("acc").innerHTML = loading_html+ 'Running on server: https://bingcheng.openmc.cn/HyperQuest/';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function submitForm() {
    

    let hidden_size =  findSelection("hidden_size");
    let batch_size =  findSelection("batch_size");
    let learning_rate =  findSelection("learning_rate");
    let regularization =  findSelection("regularization");
    // let epoch = findSelection("epoch")-1;
    let num_epoch = 8;

    jsonName = jsonFileHead+hidden_size+'-'+batch_size+'-'+
        learning_rate+'-'+regularization+'-'+num_epoch+'.json';

    
    showJson(jsonName);

}

var jsonFileHead = '../data/2layerJson/'
showForm()
showJson(jsonFileHead+'3-10-0.004-0-8.json');



