const express = require('express');
const userRouter = require('./routes/user.routes');
// home requires
const indexRouter = require('./routes/index.routes');

// database coneection url use anywhere default

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

  

// Use the user, home router
app.use('/', indexRouter);
app.use('/user', userRouter);

  

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
