const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const order = await razorpayInstance.orders.create({
      amount: 80000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: "value3",
        lastName: "value2",
        membershipType: "Silver",
      },
    });
    //Save it in Data-Base

    //Retrurn back the order Details
    console.log(order);
  } catch (error) {}
});

module.exports = paymentRouter;
