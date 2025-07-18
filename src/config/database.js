const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shreejinetwork702:Xd5OsAeqRz2SLOD4@cluster0.dhjwe.mongodb.net/devTinder"
    );
  } catch (err) {
    console.log("Error Occured :", err);
  }
};

module.exports = connectDB;
