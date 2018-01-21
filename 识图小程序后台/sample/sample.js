var tencentyoutuyun = require('..');
var conf  = tencentyoutuyun.conf;
var youtu = tencentyoutuyun.youtu;

// 设置开发者和应用信息, 请填写你在开放平台
var appid = '10116202';
var secretId = 'AKID51lKivqwfCbopep8rPo13uZ2JOH7ZFWc';
var secretKey = '3uZ4NUP9g2pU2OZYLwLn381iDWiiZEhy';
var userid = 'daolunke';

conf.setAppInfo(appid, secretId, secretKey, userid, 0)

youtu.generalocr('/Users/dusicong/Desktop/WechatIMG174.jpeg', (data) => {
    console.log("imagetag:" + JSON.stringify(data));
})

//youtu.imageporn('a1.jpg', function(data){
//    console.log("imagetag:" + JSON.stringify(data));
//});

//youtu.idcardocr('a.jpg', 0, function(data){
//    console.log("idcardocr:" + JSON.stringify(data));
//});

//youtu.namecardocr('a.jpg', false, function(data){
//    console.log("namecardocr:" + JSON.stringify(data));
//});

// 其他接口 类似
