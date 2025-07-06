const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: { values: ["ignored", "interested", "accepted", "rejected"] },
      message: `{VALUE} is incorrect status type`,
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //Check if fromUserId is same as toUserId.
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Khud ko hi bhejega Re 😏 ");
  }
  next();
}); // Always use normal function when using pre because Arrow functions do not work for pre

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
