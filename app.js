const express= require('express');
const app=express();
const indexRouter = require("./routes");
const authRouter=require("./routes/auth")
const expressSession= require("express-session");
const path=require("path");

require("dotenv").config();
require("./config/google_oauth_config")
require("./config/db");


app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(expressSession({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}))

app.use('/',indexRouter);
app.use("/auth",authRouter);

app.listen(3000);