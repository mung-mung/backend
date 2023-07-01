import express from "express";
import {onlyisLoggedIn} from "../../../middlewares/authMiddleware";
import {
  getAllOwners,
  patchLoggedInOwner,
} from "../../../controllers/userControllers/ownerController";

const ownerRouter = express.Router();

ownerRouter.use(onlyisLoggedIn);
ownerRouter.route("/").get(getAllOwners).patch(patchLoggedInOwner);

export default ownerRouter;
