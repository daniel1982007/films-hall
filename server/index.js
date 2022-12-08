import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.js";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.json({ limited: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limited: "30mb", extended: true }));
app.use(cors());

app.use(router);

dotenv.config();

// const CONNECTION_URL = 'mongodb+srv://webbylab:webbylab@cluster0.knari.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

console.log(process.env.PORT);
console.log(process.env.CONNECTION_URL);

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
