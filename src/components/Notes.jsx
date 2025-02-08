import React, { useContext, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
    const { notes, editNote } = useContext(noteContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/notes')
        }
        else {
            navigate('/login')
        }
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    
    const [note, setNote] = useState({ title: "", desc: "", tag: "" })
    function updateNote(currentNote) {
        ref.current.click()
        setNote(currentNote)
    }
    function onChange(e) {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    function handleClick(e){
        // e.preventDefault()  // this is not needed as we are not using form tag
        editNote(note)
        refClose.current.click()
    }

    return (
        <>
            <AddNote/>

            {/* -------------------EDIT Note Modal---------------------------- */}

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>  {/*could have used method=POST and action=/idk ... that way it could have sent req.body to the backend api ig*/}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" name="desc" value={note.desc} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------------------------END OF EDIT MODAL----------------------- */}
            <h2>Your Notes</h2>
            {notes.length === 0 && '------------------- Add a Note -------------------'}
            <div className="row my-3">
                {notes.map((note) => (
                    <div key={note._id} className="col-md-4 my-2">
                        <NoteItem updateNote={updateNote} note={note} />
                    </div>
                ))}
            </div>


        </>
    )
}
