const router = require('express').Router();
const Notes = require('../models/Notes'); 
const fetchUser = require('../middlewares/fetchUser');
const { body, validationResult } = require('express-validator');

// Route 1 : Get all the notes using: GET "/api/notes/fetchallnotes" . Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user}); // req.user is userID which is fetched from middleware fetchUser
        res.json(notes.reverse());
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2 : post a new note using : POST "/api/notes/createnote" . Login required
router.post('/createnote', fetchUser ,[
    body('title', 'title must be atleast 3 characters').isLength({ min: 3 }),
    body('desc', 'desc must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, desc, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,
            desc,
            tag,
            user: req.user // req.user is _id of user
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3 : Update an existing note using : PUT "/api/notes/updatenote" . Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => { // post can also be used
    
    try {
        const { title, desc, tag } = req.body;
        // Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(desc){newNote.desc = desc};
        if(tag){newNote.tag = tag};

        // Find the note to be updated and update it
        // let note = await Notes.findByIdAndUpdate
        let note = await Notes.findById(req.params.id); // note is instance of Notes
        if(!note){return res.status(404).send("Not Found");}

        if(note.user.toString() != req.user){  // note.user is objectID and req.user is string.
// The user field in the notesSchema stores a reference (ObjectId) to the _id of a user in your Users collection.
            return res.status(401).send("Not Allowed");  
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note}); 
    } catch (error) { 
        console.error(error.message);
        res.status(500).send("Internal Server Error");
        
    }
});

// Route 4 : Delete an existing note using : DELETE "/api/notes/deletenote" . Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id); // note is instance of Notes
        if(!note){return res.status(404).send("Not Found");}

        // Allow deletion only if user owns this note
        if(note.user.toString() != req.user){  // note.user is objectID and req.user is string.
            return res.status(401).send("Not Allowed");  
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note}); 
    } catch (error) { 
        console.error(error.message);
        res.status(500).send("Internal Server Error");
}
});


module.exports = router;  