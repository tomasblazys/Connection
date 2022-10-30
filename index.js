const express = require("express");
const https = require('node:https');
const bodyParser = require("body-parser");
const fs = require("fs");
const url = require('url');

const app = express();

app.use(express.static(__dirname + '/Page'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){              //issiuncia index html localcost/ dir
res.sendFile(__dirname + "/Page/index.html")
});

app.get("/form",function(req,res){              //issiuncia index html localcost/ dir
res.sendFile(__dirname + "/Page/form.html")
});

// app.get("/data.json",function(req,res){              //issiuncia index html localcost/ dir
// res.sendFile(__dirname +"/page/data.json")
// });


app.get("/details",function(req,res){

res.sendFile(__dirname + "/Page/details.html")

const queryObject = url.parse(req.url, true).query;
var id = queryObject.ak;

var dataFull = fs.readFileSync(__dirname +'/page/data.json');

var myObject= JSON.parse(dataFull);
var dataRows = myObject.rows;
// var klausimas = dataRows[1].indexOf(id);
// console.log(klausimas);
var index = -1;

for (var i = 0; i < dataRows.length; i++) {
  if (dataRows[i].indexOf(id) > (-1)) {
    index = i;
    i = dataRows.length;
  }
};
var foundData = dataRows[index];

myObject.selected.splice(0,1,foundData);
var naujasJson = JSON.stringify(myObject);
fs.writeFile(__dirname +'/page/data.json', naujasJson,  err => {
if (err) {
 console.error(err);
}

});

//console.log(myObject);

//
// var naujasJson = JSON.stringify(dataFull);
//
// fs.writeFile(__dirname +'/page/data.json', dataFull,  err => {
// if (err) {
//  console.error(err);
// }



});

//---------------------------form-------------------------

app.post("/form", function(req,res){           //pagauna post localcost/ dir

  var newData = req.body;
  var newDataRow = [newData.ak, newData.fname, newData.lname, newData.email, newData.age];

  var data = fs.readFileSync(__dirname +'/page/data.json');
  var myObject= JSON.parse(data);


//tikrinam ID duplikatu
  if (data.includes(newData.ak)) {
//randa ID duplikata
    //res.write("<h1>The temperature in London is degrees Celcius.</h1>");
    res.sendFile(__dirname + "/Page/error.html");

  } else {


  myObject.rows.push(newDataRow);
  var naujasJson = JSON.stringify(myObject);

  fs.writeFile(__dirname +'/page/data.json', naujasJson,  err => {
  if (err) {
   console.error(err);
  }

  res.sendFile(__dirname + "/Page/success.html");
  // file written successfully
 });
};

//  console.log(naujasJson);

});












app.listen(process.env.PORT || 3000, function(){
});
