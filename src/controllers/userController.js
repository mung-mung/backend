import User from "../models/User";
const {httpResponse} = require("../configs/http-response");

export const getLoggedInUser = (req, res) => {
  const loggedInUser = req.session.loggedInUser;
  try {
    return httpResponse.SUCCESS_OK(res, "", loggedInUser);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const patchUserEdit = async (req, res) => {
  const {_id, userType} = req.session.loggedInUser;
  const {email, id, pw, avataUrl, contact, sex, birthYear} = req.body;

  const exists = await User.exists({$or: [{id}, {email}]});
  if (exists) {
    return httpResponse.BAD_REQUEST(
      res,
      "같은 이메일 또는 아이디를 가진 계정이 이미 존재합니다. 다시 시도해주세요.",
      "",
    );
  }
  try {
    const newUser = await User.findByIdAndUpdate(
      _id,
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
    httpResponse.SUCCESS_OK(res, "유저 정보 수정 성공", newUser);
  } catch (error) {
    httpResponse.BAD_REQUEST(res, "", error);
  }
};
