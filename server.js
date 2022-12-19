//env
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

//Modules
const LogRoute = require("./Controler/LogRoute");
const {
  logErrorMiddleware,
  returnError,
  logError,
} = require("./Controler/ErrorHandler");
const Home = require("./Routes/Home");
const Login = require("./Routes/Login");
const Signup = require("./Routes/Signup");
const Users = require("./Routes/Users");

app.set("view engine", "pug");

//MiddleWares
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
app.use("/users", Users);
app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port http://localhost:${process.env.PORT}`);
});
