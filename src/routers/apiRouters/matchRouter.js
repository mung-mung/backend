import express from "express";
import chatRouter from "./matchRouters/chatRouter";
import {onlyisLoggedIn} from "../../middlewares/authMiddleware";
import {
  getAllMatches,
  postOneMatch,
  getOneMatch,
  deleteOneMatch,
} from "../../controllers/matchController";

const matchRouter = express.Router();

matchRouter.use(onlyisLoggedIn);
matchRouter.route("/").get(getAllMatches).post(postOneMatch);
matchRouter.route("/:matchId").get(getOneMatch).delete(deleteOneMatch);

matchRouter.use("/chat", chatRouter);

export default matchRouter;
