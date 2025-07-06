const jwt = require("jsonwebtoken");
const User = require("../models/user");
//Handle Auth MiddleWare for all GET,POST,....Requests
const userAuth = async (req, res, next) => {
  //Read the token from req cookies
  //validate the token
  //find the user
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login Again!!!");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$619");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

module.exports = { userAuth };
