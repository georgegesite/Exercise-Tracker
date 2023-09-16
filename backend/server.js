require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

app.use(cors()); //cors middleware
app.use(express.json()); // parse json 

const uri = process.env.URI; //local server
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
const connection = mongoose.connection;
connection.once('open' , () => {
    console.log("MondoDB database connection established sucessfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
