import express from "express";

const walkerRouter = express.Router();

walkerRouter.route("/").get((req, res) => res.send("Walker"));

export default walkerRouter;
