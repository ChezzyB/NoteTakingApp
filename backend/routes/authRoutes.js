const express = require('express');
const {register, login} = require('../controllers/authController');
const {isAuthenticated} = require('../middlewares/auth');

const router = express.Router();

//Define routes for CRUD operations
router.post('/register', register);//allows users to register themselves
router.post('/login', login);//allows users to log in

//Welcome message for the user that has been authenticated
router.get('/welcome', isAuthenticated, (req, res) => {
    res.status(200).json({message: `Welcome ${req.user.username}`});
});

module.exports = router;