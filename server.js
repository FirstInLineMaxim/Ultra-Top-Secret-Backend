//env
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
//Modules
const LogRoute = require("./Controler/LogRoute");

//Route Handler
const Login = require("./Routes/Login");
const Signup = require("./Routes/Signup");
const Users = require("./Routes/Users");
const Review = require("./Routes/Review");
const Task = require("./Routes/Task");
const Request = require("./Routes/Request");
const File = require("./Routes/file");
const UploadRouter = require("./Routes/UploadRouter");
const cookieHandler = require("./Routes/cookieHandler");
const Api = require("./Routes/Api/Api");
const Chats = require("./Routes/Chats");
//ViewEngine for pug
app.set("view engine", "pug");

//MiddleWares
const authUser = require("./utils/authUser");
const { errorHandler } = require("./Controler/ErrorHandler");

app.use(LogRoute);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handeling the OPTIONS Request
app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.sendStatus(200);
});

//Routes

app.use("/login", Login);
app.use("/signup", Signup);

app.use("/review", Review);
app.use("/file", File);

//API ROUTES FOR FETCHING DATA
app.use("/api", Api);

//AuthRoutes
app.use("/task", authUser, Task);
app.use("/request", authUser, Request);
app.use("/upload", authUser, UploadRouter);
app.use("/user", authUser, Users);
app.use("/chat", authUser, Chats);

app.get("*", function (req, res) {
  res.status(404).render("404");
});

// STRIPE TEST
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Translator" }],
  [2, { priceInCents: 25000, name: "Translator" }],
 
])

app.post("/create-checkout-session", async (req, res) => {
  const { items, card } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port http://localhost:${process.env.PORT}`);
});
