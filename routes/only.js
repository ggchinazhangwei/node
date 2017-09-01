var express = require('express');
var router = express.Router();
let mongodb=require("mongodb");
let mongoCT=mongodb.MongoClient;
router.get('/', function(req, res, next) {
    mongoCT.connect("mongodb://127.0.0.1:27017/demo",(err,db)=> {
        let user=db.collection("register");
        if(req.session.username){
            user.find({username:req.session.username}).toArray((err,result)=>{
                res.send({msg:true,username:req.session.username,pronews:result[0].pronews});
            })
        }else{
            res.send({msg:false});
        }
    });
});
module .exports=router;