import express from "express";

const ownerRouter = express.Router();

ownerRouter.route("/").get((req, res) => res.send("Owner"));

export default ownerRouter;
