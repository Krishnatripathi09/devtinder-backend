const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET",
});

module.exports = instance;
