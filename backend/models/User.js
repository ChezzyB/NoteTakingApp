const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, 'Text contents cannot be empty'], //Validation for: Contents must be present
        minlength: [5,'Text contents must be over 5 characters long'], //Validation for: Minimum length
        maxlength: [25, 'Text contents must be less than 50 characters long'], //Validation for: Maximum length
        trim: true, //Remove excess spaces 
        unique: true
    },
    email: {
        type: String, 
        required: [true, 'Text contents cannot be empty'], //Validation for: Contents must be present
        minlength: [5,'Text contents must be over 5 characters long'], //Validation for: Minimum length
        maxlength: [50, 'Text contents must be less than 50 characters long'], //Validation for: Maximum length
        trim: true, //Remove excess spaces
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Text contents cannot be empty'], //Validation for: Contents must be present
        minlength: [5,'Text contents must be over 5 characters long'], //Validation for: Minimum length
        maxlength: [50, 'Text contents must be less than 50 characters long'], //Validation for: Maximum length
        trim: true //Remove excess spaces
    },
});

//Pre-middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//Check if given password matches the saved password in the database
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
