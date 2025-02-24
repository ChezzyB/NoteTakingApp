const express = require('express');
const {register, login} = require('../controllers/authController');
const {isAuthenticated} = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/welcome', isAuthenticated, (req, res) => {
    res.status(200).json({message: `Welcome ${req.user.username}`});
});

module.exports = router;