import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import { contractRouter } from "./controller/contract"
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: 100000000 }));
app.use(express.urlencoded({ limit: 100000000, extended: true, parameterLimit: 100000000 }));
app.use(
  cors({
    credentials: true,
    origin: true /*function(origin, callback) {
        if (whitelist.some((route) => origin?.includes(route))) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      }*/,
  })
);

mongoose.connect(process.env.MONGO_URI).catch(error => console.log("Error connecting to MongoDB: " + error));
mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

const contractRouts = contractRouter();
app.use("/", contractRouts); 

app.listen(port, async () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
