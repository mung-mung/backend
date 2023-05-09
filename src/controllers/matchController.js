import Match from "../models/Match";
import User from "../models/User";
import Owner from "../models/Owner";
import Walker from "../models/Walker";

const {httpResponse} = require("../configs/httpResponse");

export const getAllMatches = async (req, res) => {
  try {
    const loggedInUser = req.session.loggedInUser;
    const loggedInUserType = loggedInUser.userType;
    const userId = loggedInUser._id;
    if (loggedInUserType === "owner") {
      const loggedInOwner = await Owner.findOne({userId});
      const ownerId = loggedInOwner._id;
      const matches = await Match.find({ownerId});
      return httpResponse.SUCCESS_OK(
        res,
        "현재 로그인 되어있는 owner에 대한 모든 match들 입니다.",
        matches,
      );
    } else if (loggedInUserType === "walker") {
      const loggedInWalker = await Walker.findOne({userId});
      const walkerId = loggedInWalker._id;
      const matches = await Match.find({walkerId});
      return httpResponse.SUCCESS_OK(
        res,
        "현재 로그인 되어있는 walker에 대한 모든 match들 입니다.",
        matches,
      );
    }
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const postOneMatch = async (req, res) => {
  try {
    const {ownerId, walkerId, dogId} = req.body;
    const owner = await Owner.findById(ownerId);
    const ownerDogArray = owner.dogArray;
    if (!ownerDogArray.includes(dogId)) {
      return httpResponse.BAD_REQUEST(
        res,
        "등록하려는 강아지가 owner의 강아지가 아닙니다.",
        error,
      );
    }
    const match = await Match.create({ownerId, walkerId, dogId});
    return httpResponse.SUCCESS_OK(res, "match 등록 성공", match);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
