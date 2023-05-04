import express from "express";

const authRouter = express.Router();

authRouter.route("/").get((req, res) => res.send("Auth"));

export default authRouter;
