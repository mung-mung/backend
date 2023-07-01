import Walker from "../../models/Walker";
import {userId_walker} from "../functions";

const {httpResponse} = require("../../configs/httpResponse");

export const getAllWalkers = async (req, res) => {
  try {
    const allWalkers = await Walker.find();
    return httpResponse.SUCCESS_OK(res, "", allWalkers);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const patchLoggedInWalker = async (req, res) => {
  try {
    const {greeting, availableTime, appeal, location} = req.body;

    const userType = req.session.loggedInUser.userType;
    if (userType !== "walker") {
      return httpResponse.BAD_REQUEST(
        res,
        "walker 계정으로만 접속할 수 있는 api 입니다.",
        "",
      );
    }
    const {loggedInUserId, loggedInWalker} = userId_walker(req);
    const loggedInWalkerId = loggedInWalker._id;
    await Walker.findByIdAndUpdate(
      loggedInWalkerId,
      {
        greeting,
        availableTime,
        appeal,
        location,
      },
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "walker 정보 수정 성공", {
      userId: loggedInUserId,
      walkerId: loggedInWalkerId,
    });
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
