const ejs = require('ejs');
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");




const app = express();

app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const tasks = [];
const workTasks = [];

app.get("/" , function(req , res) {
    
    const day = date.getDay();

    res.render("list" , {listTitle: day, newtasks: tasks});
})

app.get("/work" , function(req , res) {
    const work = "Work List";
    res.render("list" , {listTitle: work, newtasks: workTasks});

})

app.post("/" , function(req , res){

    const task = req.body.mytask ;
    const types = req.body.list ;


    if (types.trim() === "Work List") {
        
        workTasks.push(task);
        res.redirect("/work");
        
    }  else {
        tasks.push(task);
        res.redirect("/");
        }

});  




app.listen( 3000 , function() {
    console.log("server is running on port 3000");
})