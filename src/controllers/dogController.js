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

export const patchOneDog = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
  try {
    const {dogId} = req.params;
    const {dogName, birthYearMonth, breed, weight} = req.body;
    const newDog = await Dog.findByIdAndUpdate(
      dogId,
      {
        dogName,
        birthYearMonth,
        breed,
        weight,
      },
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "", newDog);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};

export const deleteOneDog = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
  try {
    const {dogId} = req.params;
    const userId = req.session.loggedInUser._id;
    const loggedInOwner = await Owner.findOne({userId});
    const ownerId = loggedInOwner._id;
    const dogArray = loggedInOwner.dogArray;

    const isDogInDb = await Dog.exists({_id: dogId});
    const indexOfDogId = dogArray.indexOf(dogId);
    const isDogIdInDogArray = indexOfDogId !== -1;
    if (!isDogInDb && !isDogIdInDogArray) {
      return httpResponse.BAD_REQUEST(
        res,
        "삭제하려는 강아지가 이미 존재하지 않는 강아지입니다.",
        "",
      );
    } else if (isDogInDb && !isDogIdInDogArray) {
      const deletedDog = await Dog.findByIdAndDelete(dogId);
      return httpResponse.SUCCESS_OK(
        res,
        "알 수 없는 오류로 DB에만 등록되어 있고 Owner에는 등록되어있지 않았던 강아지임. DB에서만 강아지를 삭제함.",
        deletedDog,
      );
    } else if (!isDogInDb && isDogIdInDogArray) {
      dogArray.splice(indexOfDogId, 1);
      const newOwner = await Owner.findByIdAndUpdate(
        ownerId,
        {dogArray},
        {new: true},
      );
      return httpResponse.SUCCESS_OK(
        res,
        "알 수 없는 오류로 Owner에만 등록되어 있고 DB에는 등록되어 있지 않았던 강아지임. Owner에서만 강아지를 삭제함.",
        newOwner,
      );
    } else if (isDogInDb && isDogIdInDogArray) {
      const deletedDog = await Dog.findByIdAndDelete(dogId);
      dogArray.splice(indexOfDogId, 1);
      const newOwner = await Owner.findByIdAndUpdate(
        ownerId,
        {dogArray},
        {new: true},
      );
      return httpResponse.SUCCESS_OK(res, "정상적으로 강아지 삭제 성공함.", {
        deletedDog,
        newOwner,
      });
    }
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
