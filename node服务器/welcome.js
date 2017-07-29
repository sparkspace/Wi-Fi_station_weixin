
var request = require("request");
var model = require("./model"); //引入自定义的数据模型

//该URL为百度天气的API
var url = "http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8";




var getData = (req, res) => {
    var thres = req.query.threshold; //从小程序发来的数据中读取用户设置的门限值
    var threshold = +thres;
    var user = "test";

    //根据自定义模型构造一个可以存到mongoDB的model对象
    var docu = new model({
        user: user,
        threshold: threshold,
        rule: req.query.rule,
    });

    var query = () => {
        //model.findOne(）函数返回一条符合条件的记录
        model.findOne({ user: user }, (err2, document2) => {
            //从mongoDB里读出来的用户之前上传的门限温度和报警规则
            var threshold_from_mongodb = document2.threshold;
            var rule_from_mongodb = document2.rule;

            //调用百度天气API，返回天气数据
            request(url, function (error, response, body) {
                //通过json对象访问，正则表达式和字符串处理从返回数据中摘出当日温度
                var str = JSON.parse(body).results[0].weather_data[0].date;
                var tmp1 = str.match(/实时.+/);
                var tmp2 = tmp1[0].substring(3, tmp1[0].length-2);
                var tmp = +tmp2;

                //根据不同情况返回不同消息，报警返回1，不报警返回0
                if(tmp > threshold_from_mongodb) {
                    if(rule_from_mongodb == "up") res.send("1");
                    else if (rule_from_mongodb == "down") res.send("0");
                }
                else if (tmp <= threshold_from_mongodb) {
                    if(rule_from_mongodb == "up") res.send("0");
                    else if (rule_from_mongodb == "down") res.send("1");
                }else {
                    res.send("mongodb error");
                }


            });
        });

    }

    //model.find(）函数查询所有符合条件的记录
    model.find({ user: user}, (err1, document1) => {
        if(document1.length == 0){
            //若mongoDB里没有该用户的上传记录，则插入当前数据
            docu.save(function (err) {
                if (err) res.end("mongo save error!");
                else query();//存完数据调用百度天气API查天气
            });
        }else {
            //若mongoDB里已经有该用户的上传记录，则更新该数据记录
            model.update({user: user}, {
                threshold: threshold,
                rule: req.query.rule,
            }, function(error){
                if(error) {
                    res.end(error.stack);
                }else query();//更新完数据调用百度天气API查天气
            });

        }

    });


};


module.exports = getData;

