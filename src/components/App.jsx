import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend
  useEffect(() => {
    axios.get("https://notes-keeper-backend-3.onrender.com/api/notes")
      .then(res => setNotes(res.data)) // res.data contains array of notes
      .catch(err => console.error(err));
  }, []);

  // Add note
  async function addNote(newNote) {
    try {
      const res = await axios.post(
        "https://notes-keeper-backend-3.onrender.com/api/notes",
        newNote
      );

      setNotes(prevNotes => [res.data, ...prevNotes]); // add note with id
    } catch (err) {
      console.error(err);
    }
  }

  // Delete note
  async function deleteNote(id) {
    try {
      await axios.delete(
        `https://notes-keeper-backend-3.onrender.com/api/notes/${id}`
      );

      setNotes(prevNotes => prevNotes.filter(note => note.id !== id)); // remove from UI
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      {notes.map(noteItem => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
