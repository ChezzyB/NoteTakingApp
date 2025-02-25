const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require ('dotenv').config();

const register = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = await User.create({ username, email, password});
        res.status(201).json({message: 'User registered successfully', user});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: 'User not found'});

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({message: 'Login successful', token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {register, login};
