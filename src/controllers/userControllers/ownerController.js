import Owner from "../../models/Owner";
import {userId_owner} from "../functions";

const {httpResponse} = require("../../configs/httpResponse");

export const getAllOwners = async (req, res) => {
  try {
    const allOwners = await Owner.find();
    return httpResponse.SUCCESS_OK(res, "", allOwners);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const patchLoggedInOwner = async (req, res) => {
  try {
    const {greeting, availableTime, location} = req.body;

    const userType = req.session.loggedInUser.userType;
    if (userType !== "owner") {
      return httpResponse.BAD_REQUEST(
        res,
        "owner 계정으로만 접속할 수 있는 api 입니다.",
        "",
      );
    }
    const {loggedInUserId, loggedInOwner} = userId_owner(req);
    const loggedInOwnerId = loggedInOwner._id;

    await Owner.findByIdAndUpdate(
      loggedInOwnerId,
      {
        greeting,
        availableTime,
        location,
      },
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "owner 정보 수정 성공", {
      userId: loggedInUserId,
      ownerId: loggedInOwnerId,
    });
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
