const mongoose = require('mongoose');

//Note Schema definition
const noteSchema = new mongoose.Schema({
    //Title of note
    title: {
        type: String,
        required: [true, 'Text contents cannot be empty'], //Validation for: Contents must be present
        minlength: [1,'Text title cannot be empty'], //Validation for: Minimum length
        maxlength: [25, 'Text title must be less than 25 characters long'], //Validation for: Maximum length
        trim: true, //Remove excess spaces
    },
    //Content in the note
    contents: {
        type: String,
        required: [true, 'Text contents cannot be empty'], //Validation for: Contents must be present
        minlength: [5,'Text contents must be over 5 characters long'], //Validation for: Minimum length
        maxlength: [50, 'Text contents must be less than 50 characters long'], //Validation for: Maximum length
        trim: true, //Remove excess spaces
    },
}, {timestamps: true}); //Automatically add createdAt and updatedAt timestamps

//Create a mongoose model for the Note schema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;