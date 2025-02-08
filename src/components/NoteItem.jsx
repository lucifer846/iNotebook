import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function NoteItem(props) {
  const { note , updateNote} = props;  // props is object and note is key of that object
  const {deleteNote} = useContext(noteContext)

  function handleClick(element){
    deleteNote(note)
  }

  return (
    <div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title.length>=30?note.title.split('').slice(0, 30).join('') + '...':note.title}</h5>
            <div className="d-flex">
              <i className="fa-solid fa-pen-to-square mx-2" onClick={(element)=>{updateNote(note)}}></i>
              <i className="fa-solid fa-trash mx-2" onClick={handleClick}></i>
            </div>
          </div>
          <p className="card-text">{note.desc.split(' ').slice(0, 30).join(' ') + '...'}</p>
        </div>
      </div>
    

    </div >
  )
}
