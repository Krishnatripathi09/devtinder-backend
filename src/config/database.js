const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shreejinetwork702:Xd5OsAeqRz2SLOD4@cluster0.dhjwe.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
