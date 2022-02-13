let express = require('express');
// let models = require("../models");
let router = express.Router();

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { Rating } = require('../models');

// 1. Create rating
router.post("/", async (req,res,next) => {
  let {userId, designerId, designType, rating} = req.body;
  try {
    // ID Duplicate Check
    const existingUser = await Rating.findOne({
        where: { userId: userId, designerId: designerId, designType: designType }
    })
    // If Duplicated, return false
    if (existingUser) res.json({
        success: false,
        reason: "이미 리뷰하셨습니다."
      });
    // If Not Duplicated, return true
    else {
      // Table Create
      Rating.create({
        userId,
        designerId,
        designType,
        rating
      });
      // Return true
      res.json({
        success: true,
        reason: "해당 디자이너를 리뷰하셨습니다."
      });
    }
    // If Error Occur
  } catch (e){
      console.log(e);
  }
})

// 2. Read UserInfo By Token
router.get("/:designerId", async (req,res,next) =>{
  try{
    let {designerId} = req.params;

    const types = ["커트", "염색", "펌"];
    let rating = [0, 0, 0];
    let count;
    for (let i = 0; i<3; i++){
        const existingUser = await Rating.findAll({
        where: { designerId: designerId, designType: types[i] }
        })
        count = 0;
        existingUser.map( (rate) => {
            count++;
            rating[i] += rate.dataValues.rating;
            console.log(rate.dataValues.rating);
        })
        console.log(rating[i] / count);
    }
    if (count === 0) 
    res.json({
        success: true,
        result: {
            cut: 0,
            color: 0,
            purm: 0,
            total: 0,
            count: 0
        }
    })
    else 
    res.json({
        success: true,
        result: {
            cut: rating[0] / count,
            color: rating[1] / count,
            purm: rating[2] / count,
            total: (rating[0] + rating[1] + rating[2]) / 3 / count,
            count: count
        }
    })
  } catch {}
})
// 2-2. Read userInfo By ID
router.get("/:userId", async (req,res,next) =>{
  try{
    const existingUser = await Users.findOne({
      where: { userId: req.params.userId }
    })
    if (existingUser){
      res.json({
        success: true,
        result: {
          id: existingUser.id,
          userId: existingUser.userId,
          isAdmin: existingUser.isAdmin
        }
      });
    } else {
      res.json({
        success: false,
        reason: "No Such ID"
      })
    }
  } catch {}
})

// 3. Update UserInfo
router.put("/", async (req,res,next) => {
  try{
    const token = req.headers['x-access-token']
    const User = jwt.verify(
        token,
        secretObj.secret
    );
    const {userPw, newUserPw} = req.body;

    if (User){
      const existingUser = await Users.findOne({
        where: { userId: User.userId, pw: userPw }
      })
      if (existingUser){
        Users.update({
          pw: newUserPw
        },{
          where: { id: User.id }
        })
        res.json({
          success: true,
          reason: "회원정보가 성공적으로 변경되었습니다."
        })
      } else {
        res.json({
          success: false,
          reason: "패스워드가 올바르지 않습니다."
        })
      }
    } else {
      res.json({
        success: false,
        reason: "token expired"
      })
    }
  } catch {}
})
// 4. Delete UserInfo
router.delete("/", async (req,res,next) => {
  try{
    const token = req.headers['x-access-token']
    const User = jwt.verify(
        token,
        secretObj.secret
    );

    if (User){
      const existingUser = await Users.findOne({
        where: { userId: User.userId}
      })
      if (existingUser){
        Users.destroy({
          where: { id: User.id }
        })
        
        res.json({
          success: true,
          reason: "회원정보가 삭제되었습니다."
        })
      } else {
        res.json({
          success: false,
          reason: "회원정보가 존재하지 않습니다."
        })
      }
    } else {
      res.json({
        success: false,
        reason: "token expired"
      })
    }
  } catch {}
})

module.exports = router;