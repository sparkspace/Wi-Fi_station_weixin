var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var vacationSchema = mongoose.Schema({
  username : { type: String },                    //用户账号
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date}                       //最近登录时间
});


var model = mongoose.model('model', vacationSchema);
module.exports = model;