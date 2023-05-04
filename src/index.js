import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";

import "./configs/mongoose";
import rootRouter from "./routers/rootRouter";
import {saveSessionToLocal} from "./middlewares/sessionMiddleware";

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL}),
  }),
);
app.use(saveSessionToLocal);

app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log(`✅ Server listenting on port ${PORT} 🚀`);
});
