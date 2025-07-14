const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: process.env.RAZAORPAY_KEY_ID,
  key_secret: process.env.RAZAORPAY_KEY_SECRET,
});

module.exports = instance;
