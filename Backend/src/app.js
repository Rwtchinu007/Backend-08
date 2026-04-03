// server create and config
const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
// http://localhost:3000/assets/index-B0onbTEb.js
// http://localhost:3000/assets/index-BictVQ64.css
app.use(express.static("./public"));

// POST Notes
// create new note and save data in MongoDB
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// GET Notes
// fetch the notes data from MONGO DB and send them as response
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

// DELETE Notes
// delete a specific note from the database
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  //   console.log(id);
  await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Note deleted successfully",
  });
});

// PATCH Notes
// update the description part of the selected note
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  await noteModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "Note updated successfully",
  });
});

console.log(__dirname);
app.use("*name", (req, res) => {
  // res.sendFile("D:\\Coding-X\\Cohort 2.0\\Backend\\Day8\\Backend\\public\\index.html"); this method is very fragile and not preferred so we use path module
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
