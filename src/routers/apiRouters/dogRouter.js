import {onlyisLoggedIn} from "../../middlewares/authMiddleware";
import {
  getAllDogs,
  postOneDog,
  getOneDog,
  patchOneDog,
  deleteOneDog,
} from "../../controllers/dogController";

import express from "express";

const dogRouter = express.Router();

dogRouter.use(onlyisLoggedIn);
dogRouter.route("/").get(getAllDogs).post(postOneDog);
dogRouter
  .route("/:dogId")
  .get(getOneDog)
  .patch(patchOneDog)
  .delete(deleteOneDog);

export default dogRouter;
