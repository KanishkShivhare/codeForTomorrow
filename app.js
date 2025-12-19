const express = require("express");
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");

app.use("/",authRoutes);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(express.static("public"));
app.use("/",require("./routes/authRoutes"));

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("mongoDb connected"));

app.get("/",(req,res)=> res.redirect("/login"));
app.get("/register",(req,res)=> res.redirect("/register"));
app.get("/login",(req,res)=> res.redirect("/login"));


app.listen(process.env.PORT,()=> {
    console.log(`server running ${process.env.PORT}`)
})


