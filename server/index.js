import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.js";
import dotenv from "dotenv";

const app = express();

app.use(express.json({ limit: "30mb", extended: false }));
app.use(
  express.urlencoded({ limit: "30mb", extended: false, parameterLimit: 50000 })
);
app.use(cors());

app.use(router);

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
