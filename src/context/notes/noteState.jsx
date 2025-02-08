import { useState, useEffect } from 'react';
import noteContext from './noteContext';

export default function NoteState(props) {
  const host = "http://localhost:5000"

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchAllNotes() {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('token')
        }
      });
      const fetchedNotes = await response.json();
      setNotes(fetchedNotes);
    }
    fetchAllNotes();
  }
    , [])


  // Add a note
  async function addNote(note) {

    const response = await fetch(`${host}/api/notes/createnote`,
      {
        method: "POST", headers: { 'Content-Type': 'application/json', "authtoken": localStorage.getItem('token') },
        body: JSON.stringify(note)
      })
      setNotes([await response.json(), ...notes]) // concat your note with the notes array
      props.showAlert("Note Added Successfully", "success");
  };

  // Delete a Note
  async function deleteNote(note) {
    const response = await fetch(`${host}/api/notes/deletenote/${note._id}`,
      {
        method: "DELETE", headers: { 'Content-Type': 'application/json', "authtoken": localStorage.getItem('token') }

      }
    )
    const notesAfterDel = notes.filter((n) => n._id !== note._id);
    setNotes(notesAfterDel);
    props.showAlert("Note Deleted Successfully", "success");
  }

  // Edit a Note
  async function editNote(note) {

    const response = await fetch(`${host}/api/notes/updatenote/${note._id}`,
      {
        method: "PUT", headers: { 'Content-Type': 'application/json', "authtoken": localStorage.getItem('token'), },
        body: JSON.stringify(note)
      },)

    const editedNote = await response.json();


    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === note._id) {
        element.title = note.title;
        element.desc = note.desc; 
        element.tag = note.tag;
      }
      const updatedNotes = notes.map((n) =>
        n._id === note._id ? { ...n, ...editedNote } : n
      );
  
      setNotes(updatedNotes);
      props.showAlert("Note Updated Successfully", "success");
    } 
  } 

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}