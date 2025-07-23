require("dotenv").config();
const connectDB = require("./config/database");
const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
//Routers Import
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
// const paymentRouter = require("./routes/payment");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
// app.use("/", paymentRouter);
connectDB()
  .then(() => {
    console.log("connected to database :)");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ⚡ ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection Failed:", err);
  });
