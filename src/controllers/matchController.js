import Match from "../models/Match";
import Owner from "../models/Owner";
import Walker from "../models/Walker";

import {userId_owner, userId_walker} from "./functions";

const {httpResponse} = require("../configs/httpResponse");

export const getAllMatches = async (req, res) => {
  try {
    const userType = req.session.loggedInUser.userType;
    if (userType === "owner") {
      const {loggedInOwner} = userId_owner(req);
      const loggedInOwnerId = loggedInOwner._id;
      const matches = await Match.find({
        ownerId: loggedInOwnerId,
        ownerOk: true,
        walkerOk: true,
      });
      return httpResponse.SUCCESS_OK(
        res,
        "현재 로그인 되어있는 owner에 대한 모든 match들 입니다.",
        matches,
      );
    } else if (loggedInUserType === "walker") {
      const {loggedInWalker} = userId_walker(req);
      const loggedInWalkerId = loggedInWalker._id;
      const matches = await Match.find({
        walkerId: loggedInWalkerId,
        ownerOkd: true,
        walkerOk: true,
      });
      return httpResponse.SUCCESS_OK(
        res,
        "현재 로그인 되어있는 walker에 대한 모든 match들 입니다.",
        matches,
      );
    }
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const postOneMatch = async (req, res) => {
  const {ownerId, walkerId, dogId} = req.body;

  const userType = req.session.loggedInUser.userType;

  try {
    if (userType === "owner") {
      const owner = await Owner.findById(ownerId);
      const ownerDogArray = owner.dogArray;
      if (!ownerDogArray.includes(dogId)) {
        return httpResponse.BAD_REQUEST(
          res,
          "등록하려는 강아지가 owner의 강아지가 아닙니다.",
          error,
        );
      }
      const match = await Match.create({
        ownerId,
        walkerId,
        dogId,
        ownerOk: true,
      });
      return httpResponse.SUCCESS_OK(res, "walker에게 match 요청 전송 성공", {
        matchId: match._id,
      });
    } else if (userType === "walker") {
      const match = await Match.create({
        ownerId,
        walkerId,
        dogId,
        walkerOk: true,
      });
      return httpResponse.SUCCESS_OK(res, "owner에게 match 요청 전송 성공", {
        matchId: match._id,
      });
    }
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const getOneMatch = async (req, res) => {
  const {matchId} = req.params;
  try {
    const match = await Match.findOne({
      _id: matchId,
      ownerOk: true,
      walkerOk: true,
    });
    if (match === undefined) {
      return httpResponse.BAD_REQUEST(
        res,
        "해당 match는 owner와 walker가 모두 수락하지 않았습니다.",
        error,
      );
    }
    return httpResponse.SUCCESS_OK(res, "", match);
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
export const deleteOneMatch = async (req, res) => {
  try {
    const {matchId} = req.params;
    await Match.findByIdAndDelete(matchId);
    return httpResponse.SUCCESS_OK(res, "match 삭제 성공", {matchId});
  } catch (error) {
    return httpResponse.BAD_REQUEST(res, "", error);
  }
};
