import express from "express";
import {onlyisLoggedIn} from "../../../middlewares/authMiddleware";
import {
  getAllWalkers,
  patchLoggedInWalker,
} from "../../../controllers/userControllers/walkerController";

const ownerRouter = express.Router();

ownerRouter.use(onlyisLoggedIn);
ownerRouter.route("/").get(getAllWalkers).patch(patchLoggedInWalker);

export default ownerRouter;
