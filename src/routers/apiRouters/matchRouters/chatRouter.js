import express from "express";
import {onlyisLoggedIn} from "../../../middlewares/authMiddleware";
import {} from "../../../controllers/matchControllers/chatController";

const chatRouter = express.Router();

chatRouter.use(onlyisLoggedIn);

export default chatRouter;
