import Walker from "../../models/Walker";

const {httpResponse} = require("../../configs/httpResponse");

export const getAllWalkers = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
  try {
    const allWalkers = await Walker.find();
    return httpResponse.SUCCESS_OK(res, "", allWalkers);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const patchLoggedInWalker = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
  try {
    const {greeting, availableTime, appeal, location} = req.body;
    const userId = req.session.loggedInUser._id;
    const loggedInWalker = await Walker.findOne({userId});
    const walkerId = loggedInWalker._id;
    await Walker.findByIdAndUpdate(
      walkerId,
      {
        greeting,
        availableTime,
        appeal,
        location,
      },
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "walker 정보 수정 성공", {
      userId,
      walkerId,
    });
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
