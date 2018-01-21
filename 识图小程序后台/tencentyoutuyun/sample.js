const express = require('express');

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser());

var conf = require('./conf');
var youtu = require('./youtu');

var fs = require('fs');

const formidable = require('formidable');
var form = new formidable.IncomingForm();
form.uploadDir = __dirname + "/upload"

// 设置开发者和应用信息, 请填写你在开放平台
var appid = '10116202';
var secretId = 'AKID51lKivqwfCbopep8rPo13uZ2JOH7ZFWc';
var secretKey = '3uZ4NUP9g2pU2OZYLwLn381iDWiiZEhy';
var userid = 'daolunke';

app.post("/", (req, res, next) => {
    form.parse(req, function (error, fields, files) {
        // fs.readFile(files.image.path, function (err, data) {
        //     if (err) return err
        //     console.log('isBuffer: ' + Buffer.isBuffer(data)) // isBuffer: true
        //     console.log(data) //
        // })
        conf.setAppInfo(appid, secretId, secretKey, userid, 0)

        youtu.generalocr(files.image.path, (data) => {
            res.end(JSON.stringify(data));
            return;
        })
    });

});

app.use((req, res, next) => {
    res.end("0");
});

const port = 8000;
app.listen(port);

console.log(`Server listening at http://127.0.0.1:${port}`);

