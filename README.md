# HyperQuest
This project mimics HyperQuest from Stanford University, CS231n.

HyperQuest is a web-app used by beginners in Machine Learning to easily get a proper intuition for choosing the right hyperparameters. This is initially an extremely daunting task because not having proper hyperparameters leads to the models breaking down.

---

## HyperQuest Alpha is ready!

You can visit [this site](https://bingcheng.openmc.cn/HyperQuest/) to try!

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
- [ ] generate wechat share `<meta>`
- [ ] generate tweeter share `meta`
- [ ] Add more description to web
- [ ] Provide the easy-to-use model for other web pages
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

   ```javascript
   <script type="text/javascript" src='https://cdn.plot.ly/plotly-latest.min.js'></script>
   <script type="text/javascript" src='https://bingcheng.openmc.cn/HyperQuest/html/hyperquest-0.1.0.js'></script>
   ```

---

