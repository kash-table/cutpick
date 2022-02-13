let express = require('express');
// let models = require("../models");
let router = express.Router();

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { Users } = require('../models');

// 1. Create Token
router.post("/", async (req,res,next) => {
    try {
    let {userId, userPw} = req.body;

    const getToken = (id, isAdmin) => {
      return new Promise ((resolve, reject) => {
        jwt.sign(
          {
            id: id,
            userId: userId,
            isAdmin: isAdmin,
          },
          secretObj.secret ,    
          {
            expiresIn: '1d'    
          },
          function (err, token){
            if(err) reject(err)
            else resolve(token);
          }
        )
      })
    }
    const existingUser = await Users.findOne({
        where: {
            userId: userId,
            pw: userPw
        }
    })
    if (existingUser)
        getToken(existingUser.dataValues.id, existingUser.dataValues.isAdmin).then(token => {
            res.json({
                success: true,
                token: token
            });
        });
    else
        res.json({
            success: false
        });
    } catch {}
})

// 2. Read Token
router.get("/", async (req,res,next) => {
    try{
        console.log("check");
        var token = req.headers['x-access-token']
        var User = jwt.verify(
            token,
            secretObj.secret
        );
        try {
            if (User){
                res.json({
                    success: true,
                    result: {
                        id: User.id,
                        userId: User.userId,
                        isAdmin: User.isAdmin
                    }
                })
            }
            res.json({
                success: false,
                reason: "Token Expired",
            })
        } catch (e) {
            console.log(e);
        }
    } catch {

    }
})
// 3. Update Token
router.put("/", async (req,res,next) => {
    try{
    var token = req.headers['x-access-token']
    var User = jwt.verify(
        token,
        secretObj.secret
    );
    const getToken = (id, isAdmin) => {
        return new Promise ((resolve, reject) => {
            jwt.sign(
                {
                    id: User.id,
                    userId: User.userId,
                    isAdmin: User.isAdmin,
                },
                secretObj.secret ,    
                {
                    expiresIn: '1d'    
                },
                function (err, token){
                    if(err) reject(err)
                    else resolve(token);
                }
            )
        })
    }
    if (User){
        getToken().then(token => {
            res.json({
                success: true,
                token: token
            });
        });
    }
    else
        res.json({
            success: false
        });
    } catch {}
})
// 4. Delete Token
router.delete("/", async (req,res,next) => {
    try{
        var token = req.headers['x-access-token']
        
        // jwt.destroy(token);
        // jwt destory가 없으므로, 세션에서 삭제하는 방식.
        res.json({
        success: true,
        reason: "로그아웃 성공"
        });
    } catch {}
})
module.exports = router;