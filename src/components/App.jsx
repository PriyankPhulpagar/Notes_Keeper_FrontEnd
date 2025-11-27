import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes on page load
  useEffect(() => {
  fetch("https://your-backend.onrender.com/notes")
    .then(res => res.json())
    .then(data => setNotes(data))
    .catch(err => console.error(err));
}, []);


 function addNote(newNote) {
  fetch("https://your-backend.onrender.com/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newNote)
  })
    .then(res => res.json())
    .then(data => {
      // Append the saved note returned from backend
      setNotes(prevNotes => [...prevNotes, newNote]);
    })
    .catch(err => console.error(err));
}



  function deleteNote(id) {
  const noteId = notes[id].id; // assuming backend sends `id` with each note

  fetch(`https://your-backend.onrender.com/notes/${noteId}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      setNotes(prevNotes => prevNotes.filter((noteItem, index) => index !== id));
    })
    .catch(err => console.error(err));
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
