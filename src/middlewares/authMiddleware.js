const {httpResponse} = require("../configs/httpResponse");

export const onlyisLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
};

export const onlyisLoggedOut = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return next();
  } else {
    return httpResponse.BAD_REQUEST(
      res,
      "이미 로그인된 상태입니다. 로그아웃 후 이용해주세요.",
      "",
    );
  }
};
