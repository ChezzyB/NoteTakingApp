const express = require('express');
const router = express.Router();
const {
    createNote,
    getNote,
    getNoteById,
    updateNote,
    deleteNote,
} = require('../controllers/noteController');

//Define routes for CRUD operations
router.post('/', createNote); // Create a new note
router.get('/', getNote); // Get a note
router.get('/:id', getNoteById); // Get a note by ID
router.put('/:id', updateNote); // Update a note by ID
router.delete('/:id', deleteNote); //Delete a note by ID

module.exports = router;
