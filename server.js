const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
// const connectDb = require("./config/connectDB");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};
dotenv.config();

connectDb();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/userRoute"));
app.use("/transactions", require("./routes/transactionRoutes"));
const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
