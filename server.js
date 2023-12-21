require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const notesRouter = require("./routes/notesRouter");
const bodyParser = require("body-parser");

// connect to mongodb
const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
mongoose.connect(URI);

// middleware
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/users", userRouter);
app.use("/notes", notesRouter);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

// listen to server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
