//env
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const {accessHandler} = require('./utils/accessHandler')
//Modules
const LogRoute = require("./Controler/LogRoute");
const {
  logErrorMiddleware,
  returnError,
  logError,
} = require("./Controler/ErrorHandler");

//Route Handler
const Home = require("./Routes/Home");
const Login = require("./Routes/Login");
const Signup = require("./Routes/Signup");
const Users = require("./Routes/Users");
const Call = require('./Routes/Call')
const Documents = require('./Routes/Documents')
const Translation = require('./Routes/Translation')
const Review = require('./Routes/Review')
const Task = require('./Routes/Task')
const File = require('./Routes/file')
const authUser = require('./utils/authUser')
app.set("view engine", "pug");

//MiddleWares
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});
app.use(LogRoute);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(logError)
// app.use(returnError)

//Routes

app.use("/", Home);
app.use("/login", Login);
app.use("/signup", Signup);
app.use("/user",authUser, Users);
app.use("/call", Call);
app.use("/document", Documents);
app.use("/translation", Translation);
app.use("/review", Review);
app.use("/task", Task);
app.use("/file", File);


app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port http://localhost:${process.env.PORT}`);
});


