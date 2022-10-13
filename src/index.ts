import express from 'express';
import cors from "cors";

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


app.listen(port, async () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});





