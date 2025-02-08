import React, { useContext, useState, useRef} from 'react'
import noteContext from '../context/notes/noteContext'


export default function AddNote() {
    const {addNote} = useContext(noteContext)
    const [note, setNote] = useState({title:"", desc:"", tag:""})
    const refTitle = useRef(null)
    const refDesc = useRef(null)
    const refAddNote = useRef(null)

    function handleclick(element){
        element.preventDefault() // does not reload the page 
        addNote(note)
        refTitle.current.value = ""
        refDesc.current.value = ""
        refAddNote.current.disabled = true

    }
    function onChange(e){
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <div className="container my-3">
              <h2>Add a Note</h2>
              <form className='my-3'>  {/*could have used method=POST and action=/idk ... that way it could have sent req.body to the backend api ig*/}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" ref={refTitle} className="form-control" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input ref={refDesc} type="text" className="form-control" name="desc" onChange={onChange} />
                </div>
                <button ref={refAddNote} disabled={note.title.length<3||note.desc.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
              </form>
            </div>
      
    </div>
  )
}
