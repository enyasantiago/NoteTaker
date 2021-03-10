//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
//create express server
const app = express();
//sets initial port for listeners
const PORT = process.env.PORT || 8000;
const database = require("./db/db.json");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
//* GET `*` - Should return the `index.html` file
app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
// Grab the notes list (this should be updated for every new note and deleted note.)
app.get("/api/notes", function (req, res) {
  res.json(database);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
