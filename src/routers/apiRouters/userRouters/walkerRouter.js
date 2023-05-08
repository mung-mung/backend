import express from "express";
import {onlyisLoggedIn} from "../../../middlewares/authMiddleware";
import {
  getLoggedInWalker,
  patchLoggedInWalker,
} from "../../../controllers/userControllers/walkerController";

const ownerRouter = express.Router();

ownerRouter.use(onlyisLoggedIn);
ownerRouter.route("/").get(getLoggedInWalker).patch(patchLoggedInWalker);

export default ownerRouter;
