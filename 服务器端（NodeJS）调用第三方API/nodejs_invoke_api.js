/**
 * Created by sicongdu on 17-11-3.
 */

const express = require('express');
const request = require("request");

var url = 'http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8';

const app = express();

app.use(function(req, res, next){
    request(url, function (error, response, body) {
	     console.log(JSON.stringify(JSON.parse(body)));
             res.send(JSON.stringify(JSON.parse(body)));
            });
});

const port = 5757;
app.listen(port);

console.log(`Server listening at http://127.0.0.1:${port}`);