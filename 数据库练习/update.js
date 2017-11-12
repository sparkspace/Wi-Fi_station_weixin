/**
 * Created by sicongdu on 17-11-13.
 */

var model = require("./model");

var wherestr = {
    user: "student"
};

var updatestr = {
    threshold: 45
};

model.update(wherestr, updatestr, (err, res) => {
    if (err){
        console.log("error: " + err);
    }else{
        model.find({user: "student"}, (errin, resin) => {
            if (errin) {
                console.log("error: " + errin);
            }else{
                console.log("update: " + resin[0])
            }
        })
    }
});