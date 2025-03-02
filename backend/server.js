//Load environment variables
require ('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes'); //All Note operations
const authRoutes = require('./routes/authRoutes'); //All Authorization operations

const {logRequests, errorHandler} = require('./middlewares/auth');



//Initialize the app
const app = express();

//Middleware
app.use(cors()); // allows front end to talk with backend
app.use(bodyParser.json()); // allows json responses with requests and responses
app.use(logRequests); //middleware logging of requests

//Connect to MongoDB
connectDB();

//Routes
app.use('/api/notes',noteRoutes);
app.use('/api/auths',authRoutes);

//Use of error reporter middleware
app.use(errorHandler);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
