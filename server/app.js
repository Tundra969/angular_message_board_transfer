var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://admin:admin@ds053194.mongolab.com:53194/heroku_8m45xj1q');

var Person = mongoose.model('person', new Schema({name: String, comment: String}));

// Get all the comments
app.get("/people", function(req,res){
    Person.find({}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

// Add a new message
app.post("/people", function(req,res){
    var person = new Person({
        name: req.body.name,
        comment: req.body.comment
    });
    person.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});


app.get("/*", function(req,res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get("port"), function(){
    console.log("Yello: ", app.get("port"));
});


//app.delete("/people_id", function(req,res){
//    Person.findAndRemoveById({
//        _id : req.params.id
//    }, function(err, data){
//        console.log("._id");
//        if(err) console.log(err);
//        res.send(data);
//    });
//});
