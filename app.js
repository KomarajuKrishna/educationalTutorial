const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const userRouters = require("./routes/userRoutes");
const tutorialRouters = require("./routes/tutorialRoutes");
const Tutorial = require("./schema/tutorialSchema");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3007;

// MongoDB connection URL
const dbUrl =
  "mongodb+srv://KomarajuBablu:Honeybablu1772@cluster0.zktypoh.mongodb.net/EducationTutorial?retryWrites=true&w=majority";

// Connecting to MongoDB

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDatabase();

//Start The Server

// app.get('/status', (req, res) => res.send({status: "I'm up and running"}));
// app.listen(port, () => console.log(`Dockerized Nodejs Applications is listening on port ${port}!`));

app.listen(port, () => {
  console.log(`Server is Running at: http://localhost:${port}`);
});

//API's MiddleWare

app.use("/", userRouters);
app.use("/tutorial", tutorialRouters);
