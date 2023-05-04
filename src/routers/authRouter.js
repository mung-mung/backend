import express from "express";
import {postSignup, postLogin, getLogout} from "../controllers/authController";
import {onlyisLoggedIn, onlyisLoggedOut} from "../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter.route("/").get((req, res) => res.send("Auth"));

authRouter.route("/signup").all(onlyisLoggedOut).post(postSignup);
authRouter.route("/login").all(onlyisLoggedOut).post(postLogin);
authRouter.route("/logout").all(onlyisLoggedIn).get(getLogout);

export default authRouter;
