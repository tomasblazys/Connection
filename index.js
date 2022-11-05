const express = require("express");
const https = require('node:https');
const bodyParser = require("body-parser");
const fs = require("fs");
const url = require('url');

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//--------------------------------list------------------------------------------


app.get("/", function(req, res) {
  let data = fs.readFileSync(__dirname + '/data.json');
  let parsedData = JSON.parse(data);
  res.render("list", {
    headers: parsedData.headers,
    rows: parsedData.rows
  });
});


//--------------------------------/form-----------------------------------------

app.get("/form", function(req, res) {
  res.sendFile(__dirname + "/form.html")
});

//-------form post

app.post("/form", function(req, res) {

  let newData = req.body;
  let newDataRow = [newData.ak, newData.fname, newData.lname, newData.email, newData.age];
  let data = fs.readFileSync(__dirname + '/data.json');
  let myObject = JSON.parse(data);
  //tikrinam ID duplikatu
  if (data.includes(newData.ak)) {
    //randa ID duplikata
    res.sendFile(__dirname + "/error.html");
  } else {
    //write File
    myObject.rows.push(newDataRow);
    let naujasJson = JSON.stringify(myObject);

    fs.writeFile(__dirname + '/data.json', naujasJson, err => {
      if (err) {
        console.error(err);
      }
      res.sendFile(__dirname + "/success.html");
    });
  };
});

//--------------------------------/details--------------------------------------

app.get("/details", function(req, res) {
//-----url parse id
  const queryObject = url.parse(req.url, true).query;
  let id = queryObject.ak;
//------parse data.json
  let dataFull = fs.readFileSync(__dirname + '/data.json');
  let parsedData = JSON.parse(dataFull);
  let dataRows = parsedData.rows;
//------search for match
  let index = -1;
  for (var i = 0; i < dataRows.length; i++) {
    if (dataRows[i].indexOf(id) > (-1)) {
      index = i;
      i = dataRows.length;
    }
  };
  var foundData = dataRows[index];
//------render details
  res.render("details", {
    headers: parsedData.headers,
    rows: foundData
  });
});

//---------------------------listen-------------------------

app.listen(process.env.PORT || 3000, function() {});
