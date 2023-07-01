const {httpResponse} = require("../../configs/httpResponse");
import Owner from "../../models/Owner";

export const getAllOwners = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
  try {
    const allOwners = await Owner.find();
    return httpResponse.SUCCESS_OK(res, "", allOwners);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const patchLoggedInOwner = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
  try {
    const {greeting, availableTime, location} = req.body;
    const userId = req.session.loggedInUser._id;
    const loggedInOwner = await Owner.findOne({userId});
    const ownerId = loggedInOwner._id;
    const newOwner = await Owner.findByIdAndUpdate(
      ownerId,
      {
        greeting,
        availableTime,
        location,
      },
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "", newOwner);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
