const {httpResponse} = require("../../configs/httpResponse");
import Owner from "../../models/Owner";

export const getLoggedInOwner = async (req, res) => {
  const {_id} = req.session.loggedInUser;
  try {
    const loggedInOwner = await Owner.find({userId: _id});
    return httpResponse.SUCCESS_OK(res, "", {
      loggedInOwner,
    });
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const patchLoggedInOwner = async (req, res) => {
  const userId = req.session.loggedInUser._id;
  const {greeting, availableTime, location} = req.body;
  try {
    const loggedInUser = await Owner.findOne({userId});
    const ownerId = loggedInUser._id;
    const newOwner = await Owner.findByIdAndUpdate(
      ownerId,
      {
        greeting,
        availableTime,
        location,
      },
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "", newOwner);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
