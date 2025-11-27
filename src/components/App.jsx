import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes on page load
  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.log(err));
  }, []);

  function addNote(newNote) {
    fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then(() => {
        // Refresh list after adding
        fetch("http://localhost:5000/api/notes")
          .then(res => res.json())
          .then(data => setNotes(data));
      });
  }


  function deleteNote(id) {
    fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE" })
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      });
  }


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
