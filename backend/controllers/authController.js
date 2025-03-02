const User = require('../models/User');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');

require ('dotenv').config();

//Register a new user
const register = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = await User.create({ username, email, password});
        res.status(201).json({message: 'User is now registered', user});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Login an existing user
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if user's email exists in the database
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: 'User not found'});

        //Check if the found user's password in the database matches the entered password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({message: 'Invalid credentials'});

        //The user exists and the password matches the entered password - assign a token with an expiry time
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        //Tell the client that the user has been logged in
        res.status(200).json({message: 'Login successful', token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {register, login};
