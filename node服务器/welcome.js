
var request = require("request");
var model = require("./model");
var url = "http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8";




var getData = (req, res) => {
    var thres = req.query.threshold;
    var threshold = +thres;
    var user = "test";

    var docu = new model({
        user: user,
        threshold: threshold,
        rule: req.query.rule,
    });

    var query = () => {
        model.findOne({ user: user }, (err2, document2) => {
            var threshold_from_mongodb = document2.threshold;
            var rule_from_mongodb = document2.rule;

            request(url, function (error, response, body) {

                var str = JSON.parse(body).results[0].weather_data[0].date;
                var tmp1 = str.match(/实时.+/);
                var tmp2 = tmp1[0].substring(3, tmp1[0].length-2);
                var tmp = +tmp2;


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

    model.find({ user: user}, (err1, document1) => {
        if(document1.length == 0){
            docu.save(function (err) {
                if (err) res.end("mongo save error!");
                else query();
            });
        }else {
            model.update({user: user}, {
                threshold: threshold,
                rule: req.query.rule,
            }, function(error){
                if(error) {
                    res.end(error.stack);
                }else query();
            });

        }

    });


};


module.exports = getData;

