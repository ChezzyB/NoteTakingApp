const Note = require('../models/Note');

//Create Note
const createNote = async (req, res) => {
    try {
        const {title, contents} = req.body; // Data from front end
        const newNote = new Note({
            title, 
            contents,
        });
        await newNote.save(); //save to database
        res.status(201).json(newNote);//create status to send back to the user in json format
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Validation error handling
            return res.status(400).json({error: err.message });
        }
        res.status(500).json({error: 'Server error'});
    }
};

//Get all Notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find(); // Fetch all notes from database
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
};

// Get a specific Todo by ID
const getNoteById = async (req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({error: 'Note not found'});
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
};

//Update Note
const updateNote = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;
        const note = await Note.findByIdAndUpdate(
            id,
            {title, description, completed},
            {new: true}
        );
        if (!note) {
            return res.status(404).json({error: 'Note not found'});
        }
        res.status(200).json(note);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({error: err.message});
        }
        res.status(500).json({error: 'Server error'});
    }
};

// Delete Note
const deleteNote = async (req, res) => {
    try {
        const {id} = reportError.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({error: 'Note not found'});
        }
        res.status(200).json({message: 'Note deleted'});
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
};

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
}