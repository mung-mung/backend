export const userId_owner = async (req, res) => {
  const loggedInUserId = req.session.loggedInUser._id;
  const loggedInOwner = await Owner.findById(userId);
  return {loggedInUserId, loggedInOwner};
};

export const userId_walker = async (req, res) => {
  const loggedInUserId = req.session.loggedInUser._id;
  const loggedInWalker = await Walker.findById(userId);
  return {loggedInUserId, loggedInWalker};
};
