import Dog from "../models/Dog";
import Owner from "../models/Owner";

const {httpResponse} = require("../configs/httpResponse");

export const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find({});
    return httpResponse.SUCCESS_OK(res, "", dogs);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};

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
    const newDogId = newDog._id;
    const dogArray = loggedInOwner.dogArray;
    dogArray.push(newDogId);
    const newOwner = await Owner.findByIdAndUpdate(
      ownerId,
      {dogArray},
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "강아지 추가 성공", {newDog, newOwner});
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};

export const getOneDog = async (req, res) => {
  try {
    const {dogId} = req.params;
    const dog = await Dog.findById(dogId);
    return httpResponse.SUCCESS_OK(res, "", dog);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};

export const getOneDog = async (req, res) => {};

export const patchOneDog = async (req, res) => {};

export const deleteOneDog = async (req, res) => {};
