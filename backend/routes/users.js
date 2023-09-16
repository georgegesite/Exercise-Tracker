const router = require('express').Router(); // Create an instance of an Express router.

// Import the User model from '../models/user.model'.
let User = require('../models/usermodel');

// Handle GET requests to the '/' endpoint.
router.route('/').get((req, res) => {
  // Use the Mongoose 'find' method to retrieve all users from the database.
  User.find()
    .then(users => res.json(users)) // If successful, respond with the users in JSON format.
    .catch(err => res.status(400).json('Error: ' + err)); // If an error occurs, respond with an error message.
});

// Handle POST requests to the '/add' endpoint.
router.route('/add').post((req, res) => {
  // Extract the 'username' field from the request body.
  const username = req.body.username;

  // Create a new User instance with the extracted 'username'.
  const newUser = new User({ username });

  // Use the Mongoose 'save' method to save the new user to the database.
  newUser.save()
    .then(() => res.json('User added!')) // If successful, respond with a success message.
    .catch(err => res.status(400).json('Error: ' + err)); // If an error occurs, respond with an error message.
});

// Export the router instance so that it can be used in the main application.
module.exports = router;
