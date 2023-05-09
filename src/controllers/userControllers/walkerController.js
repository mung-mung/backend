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
export const patchLoggedInWalker = async (req, res) => {
  const userId = req.session.loggedInUser._id;
  const {greeting, availableTime, appeal, location} = req.body;
  try {
    const loggedInWalker = await Walker.findOne({userId});
    const walkerId = loggedInWalker._id;
    const newWalker = await Walker.findByIdAndUpdate(
      walkerId,
      {
        greeting,
        availableTime,
        appeal,
        location,
      },
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "", newWalker);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
