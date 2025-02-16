const mongoose = require('mongoose');

//Note Schema definition
const noteSchema = new mongoose.Schema({
    //Title of note
    title: {
        type: String,
        trim: true, //remove excess spaces
    },
    //Content in the note
    contents: {
        type: String,
        trim: true, //remove excess spaces
    },
}, {timestamps: true}); //Automatically add createdAt and updatedAt timestamps

//Create a mongoose model for the Note schema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;