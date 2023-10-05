const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../schema/registerSchema");

//Register User Api

router.post("/signup", async (request, response) => {
  const { name, email, password, gender } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);
  const registerUser = {
    name: name,
    email: email,
    password: hashedPassword,
    gender: gender,
  };
  // console.log(registerUser);
  try {
    const checkEmail = await Users.find({ email: email });
    if (checkEmail.length === 0) {
      response.send(`User Registered Successfully With email: ${email}`);
      const newUser = new Users(registerUser);
      newUser.save();
    } else {
      response.send("Email Address You have Provided is  Already Exists");
    }
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

//User Login Api

router.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  try {
    const checkEmail = await Users.find({ email: email });
    // console.log(checkEmail);
    // console.log(checkEmail[0].password);
    // response.send("login Successful");
    if (checkEmail.length !== 0) {
      const verifyPassword = await bcrypt.compare(
        password,
        checkEmail[0].password
      );
      // console.log(verifyPassword);
      if (verifyPassword) {
        const playLoad = {
          email: email,
        };
        const jwtToken = jwt.sign(playLoad, "AccessToken");
        response.send({ jwtToken });
      } else {
        response.status(400);
        response.send("Invalid Password");
      }
    } else {
      response.status(400);
      response.send("Email Doesn't Exists");
    }
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

router.get("/users", async (request, response) => {
  try {
    const getAllUsersQuery = await Users.find();
    response.send(getAllUsersQuery);
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

router.put("/updatepassword", async (request, response) => {
  const { email, password } = request.body;
  try {
    const getUserQuery = await Users.find({ email: email });
    response.send(getUserQuery);
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

module.exports = router;
