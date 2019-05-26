if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");
const connectMongo = require("connect-mongo");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Express Init
const app = express();

// View Engine Setup
app.set("view engine", "ejs");

// Experss Body Parser
app.use(express.urlencoded({ extended: false }));

// Public Folder
app.use(express.static("public"));

// Logging Morgan
app.use(morgan("dev"));

// Method Override
app.use(methodOverride("_method"));

// Mongo Setup
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected ..."))
  .catch(err => console.log(err.message));

// Mongo Store
const mongoStore = connectMongo(expressSession);

// Express Session
app.use(
  expressSession({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// Connect Flash
app.use(connectFlash());

// Routes
const index = require("./routes/index");
const signup = require("./routes/signup");
const login = require("./routes/login");
const home = require("./routes/home");
const rent = require("./routes/rent/index");
const rentPerson = require("./routes/rent/person");
const rentItem = require("./routes/rent/rentItem");
const rentDelete = require("./routes/rent/delete");
const rentAdd = require("./routes/rent/add");
const rentEdit = require("./routes/rent/edit");
const note = require("./routes/note/index");
const noteAdd = require("./routes/note/add");
const expense = require("./routes/expense/index");
const expenseAdd = require("./routes/expense/add");
const item = require("./routes/expense/item");
const itemAdd = require("./routes/expense/itemAdd");
const itemDelete = require("./routes/expense/delete");
const logout = require("./routes/logout");

// Routes Middlewares
app.use("/", index);
app.use("/auth", signup);
app.use("/auth", login);
app.use("/", home);
app.use("/", rent);
app.use("/rent", rentPerson);
app.use("/", rentDelete);
app.use("/rent/user", rentItem);
app.use("/rent/add", rentAdd);
app.use("/", rentEdit);
app.use("/", note);
app.use("/note", noteAdd);
app.use("/", expense);
app.use("/expense", expenseAdd);
app.use("/expense/item", item);
app.use("/item/add", itemAdd);
app.use("/", itemDelete);
app.use("/", logout);

// Port & Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
