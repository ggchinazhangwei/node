var express = require('express');
var router = express.Router();
var mongodb=require("mongodb");
mongodbCT=mongodb.MongoClient;
/* GET users listing. */
router.post('/', function(req, res, next) {
  mongodbCT.connect("mongodb://127.0.0.1:27017/demo",(err,db)=>{
      let user=db.collection("register");
      user.find({username:req.body.username}).toArray((err,data)=>{
            if(data.length>0){
                res.send({main:false,msg:"账户已经存在"});
            }else{
                user.insert([{username:req.body.username,password:req.body.password,pronews:{}}]);
                res.send({main:true});
            }
          });
  });
});

module.exports = router;
