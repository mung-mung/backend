import ownerRouter from "./userRouters/ownerRouter";
import walkerRouter from "./userRouters/walkerRouter";

import express from "express";

const userRouter = express.Router();

userRouter.route("/").get((req, res) => res.send("User"));
userRouter.use("/owner", ownerRouter);
userRouter.use("/walker", walkerRouter);

export default userRouter;
