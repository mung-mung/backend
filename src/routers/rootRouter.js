import authRouter from "./apiRouters/authRouter";
import userRouter from "./apiRouters/userRouter";
import dogRouter from "./apiRouters/dogRouter";
import matchRouter from "./apiRouters/matchRouter";

import express from "express";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/dog", dogRouter);
rootRouter.use("/match", matchRouter);

export default rootRouter;
