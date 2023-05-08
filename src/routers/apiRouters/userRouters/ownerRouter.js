import express from "express";
import {onlyisLoggedIn} from "../../../middlewares/authMiddleware";
import {
  getLoggedInOwner,
  patchLoggedInOwner,
} from "../../../controllers/userControllers/ownerController";

const ownerRouter = express.Router();

ownerRouter.use(onlyisLoggedIn);
ownerRouter.route("/").get(getLoggedInOwner).patch(patchLoggedInOwner);

export default ownerRouter;
