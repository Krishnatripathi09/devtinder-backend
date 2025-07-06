const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //validation of data
  try {
    validateSignUpData(req);

    const { firstName, lastName, email, password, gender, photoUrl } = req.body;
    //Encrypt The Password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating the new instance of the  User Model by passing the data of that Model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
      photoUrl,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    //Add the Token to Cookie and send the response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 1 * 3600000),
    });

    res.json({ message: "User Added Successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).send("Invalid Credentials"); // Incorrect password
    }
    //Create a JWT Token
    const token = await user.getJWT();
    //Add the Token to Cookie and send the response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 1 * 3600000),
    });
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully");
});

module.exports = authRouter;
