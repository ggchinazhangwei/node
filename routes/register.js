var express = require('express');
var router = express.Router();
let mongodb=require("mongodb");
let mongoCT=mongodb.MongoClient;
/* GET home page. */
router.post('/', function(req, res, next) {
  mongoCT.connect("mongodb://127.0.0.1:27017/demo",(err,db)=>{
    let user=db.collection("register");
  user.find({username:req.body.username},{_id:0}).toArray((err,result)=>{
    if(result.length>0){
      if(req.body.password==result[0].password){
        req.session.username=req.body.username;
        res.send({"main":true});
      }else{
        res.send({main:false,msg:"密码错误"});
      }
  }else{
    res.send({"main":"false","msg":"账号输入错误"});
  }
})
});

});

module.exports = router;
