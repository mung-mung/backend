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
