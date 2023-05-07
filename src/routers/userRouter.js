import ownerRouter from "./userRouters/ownerRouter";
import walkerRouter from "./userRouters/walkerRouter";

import {onlyisLoggedIn} from "../middlewares/authMiddleware";
import {getLoggedInUser, patchUserEdit} from "../controllers/userController";

import express from "express";

const userRouter = express.Router();

userRouter.route("/").all(onlyisLoggedIn).get(getLoggedInUser);
userRouter.route("/edit").all(onlyisLoggedIn).patch(patchUserEdit);

userRouter.use("/owner", ownerRouter);
userRouter.use("/walker", walkerRouter);

export default userRouter;
