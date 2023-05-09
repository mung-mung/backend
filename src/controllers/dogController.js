const {httpResponse} = require("../configs/httpResponse");

export const getAllDogs = async (req, res) => {};
export const postOneDog = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }

  try {
    const {dogName, birthYearMonth, breed, weight} = req.body;
    const userId = req.session.loggedInUser._id;
    const loggedInOwner = await Owner.findOne({userId});
    const ownerId = loggedInOwner._id;
    const newDog = await Dog.create({
      ownerId,
      dogName,
      birthYearMonth,
      breed,
      weight,
    });
    return httpResponse.SUCCESS_OK(res, "강아지 추가 성공", newDog);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};

export const getOneDog = async (req, res) => {};

export const patchOneDog = async (req, res) => {};

export const deleteOneDog = async (req, res) => {};
