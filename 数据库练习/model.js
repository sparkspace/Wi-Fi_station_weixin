var mongoose = require('mongoose');

//连接mongoDB
mongoose.connect('mongodb://localhost/test');


//定义数据模型
var schema = mongoose.Schema({
    user: String,
    threshold: Number,
    rule: String,
});

//生成模型
var model = mongoose.model('model', schema);

//导出模型
module.exports = model;