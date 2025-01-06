// create a express server
const express = require('express');
const app = express();
const userRouter=require("./routes/user.routes")
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.render('index');
});

app.use("/user", userRouter);

const port = 3000;
app.listen(port);