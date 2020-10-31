# HyperQuest
This project mimics HyperQuest from Stanford University, CS231n.

HyperQuest is a web-app used by beginners in Machine Learning to easily get a proper intuition for choosing the right hyperparameters. This is initially an extremely daunting task because not having proper hyperparameters leads to the models breaking down.

---

## TODO

- [x] Generate data
- [x] Construct website with javascript
- [x] Transfer all json files online
- [x] Merge all javascript to one file
- [ ] ~~Minimize the javascript~~
- [x] Push the first beautiful version to github pages
- [x] Add PV/UV to web
- [x] Use brighter color
- [x] Try flat design
- [ ] ~~generate wechat share `<meta>`~~
- [x] generate tweeter share `meta`
- [x] Add more description to web
- [x] Provide the easy-to-use model for other web pages
- [x] Add 404 page
- [ ] Generate new model

---

## Embed HyperQuest to your site

1. Use the anchor HTML:

   ```html
   <div id = 'form'></div>
   <a type="button" href="javascript: submitForm()">Run</a>
   <span id="acc"></span>
   <p id="gradient_canvas"></p>
   <div id="loss_chart" style="height: 300px; width: 100%;"></div>
   <div id="train_and_vali_acc" style="height: 300px; width: 100%;"></div>
   ```

2. Use the HyperQuest Javascript (below the anchor HTML)

   1. Embed the 2-layer net
   
   ```javascript
   <script type="text/javascript" src='https://cdn.plot.ly/plotly-latest.min.js'></script>
   <script type="text/javascript" src='https://bingcheng.openmc.cn/HyperQuest/html/2-layer-latest.js'></script>
   ```
   
   2. Embed the neural net
   
   ```html
   <script type="text/javascript" src='https://cdn.plot.ly/plotly-latest.min.js'></script>
   <script type="text/javascript" src='https://bingcheng.openmc.cn/HyperQuest/convhtml/conv-latest.js'></script>
   ```

---

## 1. Two Layer Net
Try the simple version [here](https://bingcheng.openmc.cn/HyperQuest/versions/TwoLayerNet/).

## 2. Conv Neural Net 
Try the convolutional version [here](https://bingcheng.openmc.cn/HyperQuest/versions/ConvNet/).

### Tuning Parameters is time-consuming?
![https://bingcheng.openmc.cn/HyperQuest/](https://img.vim-cn.com/71/067577b8e3103b3d990144be72a6b5772f85ea.png)

### Don't understand the usage of each parameter?
![https://bingcheng.openmc.cn/HyperQuest/](https://img.vim-cn.com/6a/2716de2b962e985cf4bfb5d64d9292d8165237.png)

### The meaning of the curve is difficult to understand?
![https://bingcheng.openmc.cn/HyperQuest/](https://img.vim-cn.com/f8/547ddd6e90b010b448d4473e8d081bc40dd777.png)

### HyperQuest can turn you into an expert!
![https://bingcheng.openmc.cn/HyperQuest/](https://img.vim-cn.com/58/16771e2f97c0468052b4120ca2c68062b42b74.png)