// Import required libraries and modules
require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
const mongoose = require('mongoose'); // MongoDB driver for Node.js

// Create an instance of the Express application
const app = express();

// Define the port that the server will listen on
const port = 4000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing to allow requests from different domains
app.use(express.json()); // Parse incoming requests with JSON payloads

// Get the MongoDB URI from the environment variables
const uri = process.env.URI; // URI for connecting to the MongoDB database

// Asynchronous function to connect to the MongoDB database
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

// Get a reference to the MongoDB connection
const connection = mongoose.connection;

// Event handler for when the MongoDB connection is open
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Import the routers for handling different routes
const exercisesRouter = require('./routes/exercises'); // Router for exercise-related routes
const usersRouter = require('./routes/users'); // Router for user-related routes

// Use the imported routers to handle specific routes
app.use('/exercises', exercisesRouter); // Routes related to exercises
app.use('/users', usersRouter); // Routes related to users

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
