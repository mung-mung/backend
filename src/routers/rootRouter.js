import authRouter from "./authRouter";
import userRouter from "./userRouter";
import matchRouter from "./matchRouter";

import express from "express";

const rootRouter = express.Router();

rootRouter.route("/").get((req, res) => res.send("Home"));
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/match", matchRouter);

export default rootRouter;
