import User from "../models/User";
import Owner from "../models/Owner";
import Walker from "../models/Walker";
import bcrypt from "bcrypt";
const {httpResponse} = require("../configs/httpResponse");

const loginUserToSession = (req, user) => {
  req.session.isLoggedIn = true;
  req.session.loggedInUser = user;
};

export const postSignup = async (req, res) => {
  const {userType, email, id, pw, confirmPw, contact, sex, birthYear} =
    req.body;
  if (pw !== confirmPw) {
    return httpResponse.BAD_REQUEST(
      res,
      "입력하신 비밀번호와 확인 비밀번호가 같지 않습니다. 다시 시도해주세요.",
      "",
    );
  }
  const exists = await User.exists({$or: [{id}, {email}]});
  if (exists) {
    return httpResponse.BAD_REQUEST(
      res,
      "같은 이메일 또는 아이디를 가진 계정이 이미 존재합니다. 다시 시도해주세요.",
      "",
    );
  }
  try {
    const user = await User.create({
      userType,
      email,
      id,
      pw,
      contact,
      sex,
      birthYear,
    });
    const userId = user._id;
    loginUserToSession(req, user);
    if (userType === "owner") {
      const owner = await Owner.create({userId: user._id});
      const ownerId = owner._id;
      return httpResponse.SUCCESS_OK(res, "owner 회원가입 성공", {
        userId,
        ownerId,
      });
    } else {
      const walker = await Walker.create({userId: user._id});
      const walkerId = walker._id;
      return httpResponse.SUCCESS_OK(res, "walker 회원가입 성공", {
        userId,
        walkerId,
      });
    }
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};

export const postLogin = async (req, res) => {
  const {id, pw} = req.body;
  const user = await User.findOne({id});
  if (!user) {
    return httpResponse.BAD_REQUEST(
      res,
      "계정이 존재하지 않습니다. 다시 시도해주세요.",
      "",
    );
  }
  const ok = await bcrypt.compare(pw, user.pw);
  if (!ok) {
    return httpResponse.BAD_REQUEST(
      res,
      "비밀번호가 올바르지 않습니다. 다시 시도해주세요.",
      "",
    );
  }
  loginUserToSession(req, user);
  const userId = user._id;
  return httpResponse.SUCCESS_OK(res, "로그인 성공", {userId});
};

export const getLogout = (req, res) => {
  const userId = req.session.loggedInUser._id;
  req.session.destroy();
  return httpResponse.SUCCESS_OK(res, "로그아웃 성공", {
    userId,
  });
};
