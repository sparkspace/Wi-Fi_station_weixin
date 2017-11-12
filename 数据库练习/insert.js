/**
 * Created by sicongdu on 17-11-13.
 */

var model = require("./model");

var document = new model({
    user: "student",
    threshold: 19,
    rule: "up",
});

document.save((err, res) => {
    if (err){
        console.log("error: " + err);
    }else{
        model.find({user: "student"}, (errin, resin) => {
            if (errin) {
                console.log("error: " + errin);
            }else{
                console.log("insert: " + resin[0])
            }
        })
    }
});