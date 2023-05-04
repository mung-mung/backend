import User from "../models/User";
import bcrypt from "bcrypt";

const loginUserToSession = (req, user) => {
  req.session.isLoggedIn = true;
  req.session.loggedInUser = user;
};

export const postSignup = async (req, res) => {
  const {userType, email, id, pw, confirmpw, location} = req.body;
  if (pw !== confirmpw) {
    return httpResponse.BAD_REQUEST(
      res,
      "",
      "입력하신 비밀번호와 확인 비밀번호가 같지 않습니다. 다시 시도해주세요.",
    );
  }
  const exists = await User.exists({$or: [{id}, {email}]});
  if (exists) {
    return httpResponse.BAD_REQUEST(
      res,
      "",
      "같은 이메일 또는 아이디를 가진 계정이 이미 존재합니다. 다시 시도해주세요.",
    );
  }
  try {
    const user = await User.create({
      userType,
      email,
      id,
      pw,
      location,
      socialLogin: false,
    });
    loginUserToSession(req, user);
    return httpResponse.SUCCESS_OK(res, "회원가입 성공", user);
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
      "",
      "계정이 존재하지 않습니다. 다시 시도해주세요.",
    );
  }
  const ok = await bcrypt.compare(pw, user.pw);
  if (!ok) {
    return httpResponse.BAD_REQUEST(
      res,
      "",
      "비밀번호가 올바르지 않습니다. 다시 시도해주세요.",
    );
  }
  loginUserToSession(req, user);
  return httpResponse.SUCCESS_OK(res, "로그인 성공", user);
};
