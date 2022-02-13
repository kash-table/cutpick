let express = require('express');
// let models = require("../models");
let router = express.Router();

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { Users } = require('../models');

// 1. Create User
router.post("/", async (req, res, next) => {
  let { userId, userPw, isAdmin } = req.body;
  if (isAdmin == null) isAdmin = false;
  try {
    // ID Duplicate Check
    const existingUser = await Users.findOne({
      where: { userId: userId }
    })
    // If Duplicated, return false
    if (existingUser) res.json({
      success: false,
      reason: "중복된 아이디"
    });
    // If Not Duplicated, return true
    else {
      // Table Create
      Users.create({
        userId: userId,
        pw: userPw,
        isAdmin: isAdmin
      });
      // Return true
      res.json({
        success: true,
        reason: "회원가입 성공"
      });
    }
    // If Error Occur
  } catch (e) {

  }
})

// 2. Read UserInfo By Token
router.get("/", async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    const User = jwt.verify(
      token,
      secretObj.secret
    );
    if (User) {
      const existingUser = await Users.findOne({
        where: { userId: User.userId }
      })
      if (existingUser) {
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
    } else {
      res.json({
        success: false,
        reason: "Token Expired"
      })
    }
  }
  catch (e) {

  }
})
// 2-2. Read userInfo By ID
router.get("/:userId", async (req, res, next) => {
  try {
    const existingUser = await Users.findOne({
      where: { userId: req.params.userId }
    })
    if (existingUser) {
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
  } catch { }
})

// 3. Update UserInfo
router.put("/", async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    const User = jwt.verify(
      token,
      secretObj.secret
    );
    const { userPw, newUserPw } = req.body;

    if (User) {
      const existingUser = await Users.findOne({
        where: { userId: User.userId, pw: userPw }
      })
      if (existingUser) {
        Users.update({
          pw: newUserPw
        }, {
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
  } catch { }
})
// 4. Delete UserInfo
router.delete("/", async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    const User = jwt.verify(
      token,
      secretObj.secret
    );

    if (User) {
      const existingUser = await Users.findOne({
        where: { userId: User.userId }
      })
      if (existingUser) {
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
  } catch { }
})

module.exports = router;