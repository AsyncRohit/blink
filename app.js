const express= require('express');
const app=express();
const indexRouter = require("./routes");
const userSchema= require("./models/user")


app.use('/',indexRouter);

app.listen(3000);