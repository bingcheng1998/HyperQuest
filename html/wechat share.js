/**
 * @param {jssdk为从后台请求过来的各种信息,包括appId,timestamp,nonceStr,signature} jssdk 
 * 以上4个参数，需要后台在公众号相关平台进行配置，然后得出！前端页面必须放在服务号配置的域名下面才可以保证成功！
 * @param {为js对象格式,options里面包含自定义的title,desc,link,imgUrl} options 
 * 引入jweixin文件后,直接调用该函数，即可实现自定义分享功能
 */
 
 
function shareJs(jssdk, options) {
    wx.config({
        debug: false,//是否开启调试功能，这里关闭！
        appId: jssdk.appId,//appid
        timestamp: parseInt(jssdk.timestamp), //时间戳
        nonceStr: jssdk.nonceStr, //生成签名的随机字符串
        signature: jssdk.signature,//签名
        jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage"
        ]
    });
    var defaults = {
        title: "分享的标题",
        desc: "分享的描述",
        link: location.href, //分享页面地址,不能为空，这里可以传递参数！！！！！！！
        imgUrl: 'https://tup.iheima.com/sport.png', //分享是封面图片，不能为空
        success: function () { }, //分享成功触发
        cancel: function () { } //分享取消触发，需要时可以调用
    }
    // 合并对象，后面的替代前面的！
    options = Object.assign({}, defaults, options);
    wx.ready(function () {
        var thatopts = options;
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: thatopts.title, // 分享标题
            desc: thatopts.desc, // 分享描述
            link: thatopts.link, // 分享链接
            imgUrl: thatopts.imgUrl, // 分享图标
            success: function () {
                // alert("成功");
            },
            cancel: function () {
                // alert("失败")
            }
        });
        // 分享给朋友
        wx.onMenuShareAppMessage({
            title: thatopts.title, // 分享标题
            desc: thatopts.desc, // 分享描述
            link: thatopts.link, // 分享链接
            imgUrl: thatopts.imgUrl, // 分享图标
            success: function () {
                // alert("成功");
            },
            cancel: function () {
                // alert("失败")
            }
        });
    });
}