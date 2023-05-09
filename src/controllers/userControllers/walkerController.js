import User from "../../models/User";
import Walker from "../../models/Walker";

const {httpResponse} = require("../../configs/httpResponse");

export const getLoggedInWalker = async (req, res) => {
  const {_id} = req.session.loggedInUser;
  try {
    const loggedInWalker = await Walker.find({userId: _id});
    return httpResponse.SUCCESS_OK(res, "", loggedInWalker);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
