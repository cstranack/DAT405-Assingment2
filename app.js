const express = require("express");
const app = express();
const mongo = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://admin:Password123@cluster0-ylc3g.mongodb.net/test?retryWrites=true";
const port = process.env.PORT || 3000;
//body-parser is middlewear formats data for us to interact with it,
//like JSON

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" ,(req,res) => {
  res.sendFile( __dirname + "/www/")
});

app.post("/addQuotes", (req, res) => {

  db.collection("quotes").insertOne(req.body,(err, result) => {
    if (err) throw err;
    console.log("Saved");
    res.redirect("/");
  })
})


app.get("/getQuotes", (req, res) => {
  //putting the results from find into an array
  //if not it returns alot
  db.collection("quotes").find().toArray((err, result) => {
    if (err) throw err;
    //prints it in JSON
    res.send(result);
  })
})

//Delete Route - uses the post HTTP Method as we can't call a delete from a form, but Mongo Handles the delete for us with .deleteOne. We are using the _id value to make sure that we identify and delete the correct post
app.post("/deleteQuotes/:id", (req, res) => {
  var id = req.params.id;
  db.collection("quotes").deleteOne({ _id: new mongo.ObjectId(id) }, (err, obj) => {
      if (err) throw err;
      console.log(`Successfully Deleted Post with id of ${id}`);
      res.redirect("/");
  });
});


MongoClient.connect(url, (err, client) => {
  if (err) throw err;
  console.log("Connection to database has been successful");
  db = client.db("movieQuote");
});

app.listen(port,function(){
  console.log(`App listening on port ${port}`);
});



