const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (err) {
    console.log("Error Occured :", err);
  }
};

module.exports = connectDB;
