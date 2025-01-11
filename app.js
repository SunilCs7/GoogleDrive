const express = require('express');
const userRouter = require('./routes/user.routes');

// database coneection

const dotenv = require('dotenv');
dotenv.config();


// connection
const connectToDB = require('./config/db')
connectToDB();

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

  

// Use the user router
app.use('/user', userRouter);

  

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
