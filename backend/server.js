const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const noteRoutes = require('.backend/routes/noteRoutes');
const connectDB = require('.backend/config/db');

//Load environment variables
require ('dotenv').config();

//Initialize the app
const app = express();

//Middleware
app.use(cors()); // allows front end to talk with backend
app.use(bodyParser.json()); // allows json responses with requests and responses

//Connect to MongoDB
connectDB();

//Routes
app.use('/api/notes',noteRoutes);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
