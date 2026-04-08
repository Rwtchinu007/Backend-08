import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  function fetchNotes() {
    axios.get("https://notes-xydj.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  function handleDeleteNote(noteId) {
    axios.delete("https://notes-xydj.onrender.com/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("https://notes-xydj.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
        e.target.reset();
      });
  }

  function handleUpdateDescription(noteId) {
    axios
      .patch("https://notes-xydj.onrender.com/api/notes/" + noteId, {
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
        setEditingNoteId(null);
        setNewDescription("");
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="create-note">
        <h1>Create Note</h1>
        <form className="note-create-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Enter your title" />
          <input
            type="text"
            name="description"
            placeholder="Enter your description"
          />
          <button>Submit</button>
        </form>
      </div>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>

            {editingNoteId === note._id ? (
              <div className="edit-section">
                <input
                  type="text"
                  value={newDescription}
                  placeholder="Enter new description"
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button onClick={() => handleUpdateDescription(note._id)}>
                  Save
                </button>
                <button onClick={() => setEditingNoteId(null)}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setEditingNoteId(note._id)}>
                Edit Description
              </button>
            )}

            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
