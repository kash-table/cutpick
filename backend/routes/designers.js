let express = require('express');
// let models = require("../models");
var path = require('path');
let router = express.Router();

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
const { Designers } = require('../models');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/img/",
  filename: function(req, file, cb) {
    cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
    console.log(file);
  }
});
const upload = multer({
  
    storage: storage,
    limits: { fileSize: 1000000 }
  
});
// 0. Image Upload
router.post("/image", upload.single("img"), async (req, res, next) => {
  try{
    res.send({
        fileName: req.file.filename
    });
  } catch (e){
    console.log(e);
  }
});

// 1. Create Designer
router.post("/", upload.single("img"), async (req, res, next) => {
    let {name, location, pictureUrl} = req.body;
    
    try {
      // Table Create
      Designers.create({
      name: name,
      location: location,
      pictureUrl: pictureUrl,
      });
      // Return true
      res.json({
      success: true,
      reason: "디자이너 등록 성공"
      });
  
      // If Error Occur
    } catch (e){
      res.json({
        success: false,
        reason: e
      });
    }
});


// 2. Read Designer All
router.get("/", async (req,res,next) => {
  try{
    const existingUser = await Designers.findAll({
        
      })
      if (existingUser){
        res.json({
          success: true,
          result: existingUser
        });
      } else {
        res.json({
          success: false,
          reason: "No Designers"
        })
      }
    } catch {}
})

// 2-2. Read Personal Designer Info
router.get("/:id", async (req,res,next) => {
    try {
        const existingUser = await Designers.findOne({
            where: { id: req.params.id}
        })
        
        if (existingUser){
            res.json({
                success: true,
                result: existingUser
            });
        } else {
            res.json({
                success: false,
                reason: "No Designers"
            })
        }
    } catch {

    }
})

// 2-3. Read Designer By Filter
router.get("/", async (req,res,next) => {
  try{
    const {location, cutType, arrange} = req.body;
    const existingUser = await Designers.findAll({
        where: {
            location: location,
        }
      })
      if (existingUser){
        res.json({
          success: true,
          result: existingUser
        });
      } else {
        res.json({
          success: false,
          reason: "No Designers"
        })
      }
    } catch {}
})

// 3. Update UserInfo
router.put("/", async (req,res,next) => {
  try{
    const token = req.headers['x-access-token']
    const {id, name, location,pictureUrl} = req.body;
    const existingUser = await Designers.findOne({
        where: { id: id}
    })
    if (existingUser){
        Designers.update({
            name: name,
            location: location,
            pictureUrl: pictureUrl
        },{
            where: { id: id }
        })
            res.json({
            success: true,
            reason: "디자이너 정보가 성공적으로 변경되었습니다."
        })
    } else {
            res.json({
            success: false,
            reason: "패스워드가 올바르지 않습니다."
        })
    }
  } catch {}
})
// 4. Delete UserInfo
router.delete("/:id", async (req,res,next) => {
  try{
    const token = req.headers['x-access-token']
    const User = jwt.verify(
        token,
        secretObj.secret
    );

    if (User.isAdmin){
      const existingUser = await Designers.findOne({
        where: { id: req.params.id}
      })
      if (existingUser){
          Designers.destroy({
              where: { id: req.params.id }
          })
      
          res.json({
          success: true,
          reason: "디자이너 정보가 삭제되었습니다."
        })
      } else {
        res.json({
          success: false,
          reason: "디자이너 정보가 존재하지 않습니다."
        })
      }
    } else {
      res.json({
        success: false,
        reason: "권한이 없습니다."
      })
    }
  } catch {}
})

module.exports = router;