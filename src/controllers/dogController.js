import Dog from "../models/Dog";
import Owner from "../models/Owner";

const {httpResponse} = require("../configs/httpResponse");

export const getAllDogs = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
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
    const loggedInUser = req.session.loggedInUser;
    const userId = loggedInUser._id;
    const userType = loggedInUser.userType;
    if (userType !== "owner") {
      return httpResponse.BAD_REQUEST(
        res,
        "owner로 로그인 된 경우에만 강아지를 등록할 수 있습니다.",
        error,
      );
    }

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
    await Owner.findByIdAndUpdate(ownerId, {dogArray}, {new: true});
    return httpResponse.SUCCESS_OK(res, "강아지 추가 성공", {
      dogId: newDogId,
      ownerId: ownerId,
    });
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};

export const getOneDog = async (req, res) => {
  if (req.session.loggedInUser === undefined) {
    return httpResponse.BAD_REQUEST(
      res,
      "로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.",
      "",
    );
  }
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
    const userId = req.session.loggedInUser._id;
    const loggedInOwner = await Owner.findOne({userId});
    const loggedInOwnerId = loggedInOwner._id;

    const {dogId} = req.params;
    const dog = await Dog.findById(dogId);

    const isLoggedInUserOwnerOfDog = dog.ownerId === loggedInOwnerId;

    if (!isLoggedInUserOwnerOfDog) {
      return httpResponse.BAD_REQUEST(
        res,
        "강아지 수정 실패: 현재 로그인 된 계정이 수정하려 하는 강아지의 owner 계정이 아닙니다.",
        "",
      );
    }

    const {dogName, birthYearMonth, breed, weight} = req.body;
    await Dog.findByIdAndUpdate(
      dogId,
      {
        dogName,
        birthYearMonth,
        breed,
        weight,
      },
      {new: true},
    );
    return httpResponse.SUCCESS_OK(res, "", {dogId, ownerId: loggedInOwnerId});
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
    const dog = findById(dogId);
    const userId = req.session.loggedInUser._id;
    const loggedInOwner = await Owner.findOne({userId});
    const loggedInOwnerId = loggedInOwner._id;
    const dogArray = loggedInOwner.dogArray;

    const isDogInDb = dog !== undefined;
    const indexOfDogId = dogArray.indexOf(dogId);
    const isDogIdInDogArray = indexOfDogId !== -1;

    if (!isDogInDb && !isDogIdInDogArray) {
      return httpResponse.BAD_REQUEST(
        res,
        "삭제하려는 강아지가 이미 존재하지 않는 강아지입니다.",
        "",
      );
    } else if (isDogInDb && !isDogIdInDogArray) {
      const isLoggedInUserOwnerOfDog = dog.ownerId === loggedInOwnerId;
      if (!isLoggedInUserOwnerOfDog) {
        return httpResponse.BAD_REQUEST(
          res,
          "강아지 삭제 실패: 현재 로그인 된 계정이 수정하려 하는 강아지의 owner 계정이 아닙니다.",
          "",
        );
      } else {
        await Dog.findByIdAndDelete(dogId);
        return httpResponse.SUCCESS_OK(
          res,
          "알 수 없는 오류로 DB에만 등록되어 있고 Owner에는 등록되어있지 않았던 강아지임. DB에서만 강아지를 삭제함.",
          {dogId: dogId, ownerId: ownerId},
        );
      }
    } else if (!isDogInDb && isDogIdInDogArray) {
      dogArray.splice(indexOfDogId, 1);
      await Owner.findByIdAndUpdate(ownerId, {dogArray}, {new: true});
      return httpResponse.SUCCESS_OK(
        res,
        "알 수 없는 오류로 Owner에만 등록되어 있고 DB에는 등록되어 있지 않았던 강아지임. Owner에서만 강아지를 삭제함.",
        {dogId: dogId, ownerId: ownerId},
      );
    } else if (isDogInDb && isDogIdInDogArray) {
      const isLoggedInUserOwnerOfDog = dog.ownerId === loggedInOwnerId;
      if (!isLoggedInUserOwnerOfDog) {
        return httpResponse.BAD_REQUEST(
          res,
          "강아지 삭제 실패: 현재 로그인 된 계정이 삭제하려 하는 강아지의 owner 계정이 아닙니다.",
          "",
        );
      } else {
        await Dog.findByIdAndDelete(dogId);
        dogArray.splice(indexOfDogId, 1);
        await Owner.findByIdAndUpdate(loggedInOwnerId, {dogArray}, {new: true});
        return httpResponse.SUCCESS_OK(res, "정상적으로 강아지 삭제 성공함.", {
          dogId,
          ownerId: loggedInOwnerId,
        });
      }
    }
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
