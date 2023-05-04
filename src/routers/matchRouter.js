import express from "express";

const matchRouter = express.Router();

matchRouter.route("/").get((req, res) => res.send("Match"));

export default matchRouter;
