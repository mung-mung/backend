const {httpResponse} = require("../configs/http-response");

export const onlyisLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const onlyisLoggedOut = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
