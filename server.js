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

// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
//* GET `*` - Should return the `index.html` file
app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
//* GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  res.json(database);
});

// * POST `/api/notes` - Should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes",function (req,res) {
    let newNote = req.body;
    let lastNoteId = database.length
    newNote.id = lastNoteId + 1;
    database.push(newNote)
    fs.writeFile(path.join(__dirname, "/db/db.json", JSON.stringify(database), function (err) {
      if (err) {
      return console.log(err);
      }
      console.log("Your note was saved!");
    database.push(newNote)
    
})

//* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
//This means you'll need to find a way to give each note a unique `id` when it's saved. 
//In order to delete a note, you'll need to read all notes from the `db.json` file, 
//remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
