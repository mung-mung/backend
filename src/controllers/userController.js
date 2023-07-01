import User from "../models/User";
const {httpResponse} = require("../configs/httpResponse");

export const getLoggedInUser = (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
  const loggedInUser = req.session.loggedInUser;
  try {
    return httpResponse.SUCCESS_OK(res, "", loggedInUser);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const patchUserEdit = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
  const loggedInUserId = req.session.loggedInUser._id;
  const userType = req.session.loggedInUser.userType;
  const {email, id, pw, avataUrl, contact, sex, birthYear} = req.body;

  try {
    await User.findByIdAndUpdate(
      loggedInUserId,
      {
        userType,
        email,
        id,
        pw,
        avataUrl,
        contact,
        sex,
        birthYear,
      },
      {new: true},
    );
    httpResponse.SUCCESS_OK(res, "유저 정보 수정 성공", {loggedInUserId});
  } catch (error) {
    httpResponse.BAD_REQUEST(res, "", error);
  }
};
