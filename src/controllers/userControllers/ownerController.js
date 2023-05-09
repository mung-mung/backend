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
