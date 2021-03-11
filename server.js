//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
//create express server
const app = express();
//sets initial port for listeners
const PORT = process.env.PORT || 8000;
const database = require("./db/db.json");
const { dirname } = require("path");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
// //* GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  return res.json(database);
});
// });
// app.get("/api/notes", function(req, res) {
//   let savedNotes = JSON.parse(fs.readFileSync(database, "utf8"));
//   res.json(savedNotes[Number(req.params.id)]);
// });
app.get("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync(database, "utf8"));
  res.json(savedNotes[Number(req.params.id)]);
});

//* GET `*` - Should return the `index.html` file
app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
// * POST `/api/notes` - Should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes",function (req,res) {
  
  let newNote = req.body;
  let newNoteId = database.length
  newNote.id = newNoteId
  database.push(newNote)
  fs.writeFile("./db/db.json", JSON.stringify(database), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Note saved to db.json. Content: ", newNote);
  });
  
  res.json(newNote)
  
})

//* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
//This means you'll need to find a way to give each note a unique `id` when it's saved. 
//In order to delete a note, you'll need to read all notes from the `db.json` file, 
//remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function (req, res) {
  
  // request to delete note by id.
  for (let i = 0; i < database.length; i++) {
    
    if (database[i].id === req.params.id) {
      // Splice takes i position, and then deletes the 1 note.
      database.splice(i, 1);
      break;
    }
  }
  // // Write the db.json file again.
  // fs.writeFileSync("/db/db.json", JSON.stringify(database), function (err) {
    
    //     if (err) {
      //         return console.log(err);
      //     } else {
        //         console.log("Your note was deleted!");
        //     }
        // });
        res.json(database);
      });
      
      // Starts the server to begin listening
      // =============================================================
      app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
      });
      